let passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

let db = require("../config.js"),
  helpers = require("./helpers");

//Función para ingresar
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "correo",
      passwordField: "contra",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      let { correo, contra } = req.body;
      let datos = await db.query("SELECT * FROM usuario WHERE correo = ?", [
        correo
      ]);
      //si sí se encontro un usuario con ese correo...
      if (datos.length > 0) {
        let user = datos[0];
        //se valida la contraseña ingresada y la guardada en el db
        let validarContra = await helpers.compararContra(contra, user.contra);
        //si ambas coninciden
        if (validarContra) {
          helpers.hacerDir(user.idusuario);
          done(null, user, req.flash("success", "Bienvenido " + user.nombre));
        }
        //si hay discrepancias
        else done(null, false, req.flash("message", "Contraseña errónea "));
      }
      //Si el correo no pertenece a un usuario
      else return done(null, false, req.flash("message", "Correo erróneo "));
    }
  )
);

//Función para registrarse
passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "nombre",
      passwordField: "contra",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      console.log("entra");
      let { nombre, apellido, correo, contra, contraR } = req.body;
      //se validan los campos ingresados
      if (
        await helpers.validarCampos(nombre, apellido, correo, contra, contraR)
      ) {
        let datos = { nombre, apellido, correo, contra };
        datos.contra = await helpers.encriptador(contra);
        let resultado = await db.query("INSERT INTO usuario SET ? ", [datos]);
        datos.idusuario = resultado.insertId;
        helpers.hacerDir(datos.idusuario);
        console.log("Cuenta creada");
        return done(null, datos);
      } else {
        console.log("Se ha producido un error al crear la cuenta");
        return done(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.idusuario);
});

passport.deserializeUser(async (idusuario, done) => {
  const rows = await db.query("SELECT * FROM usuario WHERE idusuario = ?", [
    idusuario
  ]);
  done(null, rows[0]);
});
