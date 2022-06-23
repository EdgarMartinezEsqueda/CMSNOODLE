let express = require("express"),
  router = express.Router(),
  path = require("path"),
  multer = require("multer"),
  fs = require("fs");

const { join } = require("path");
let db = require("../config.js"),
  passport = require("passport");

let { isLoggedIn, isNotLoggedIn } = require("../lib/auth");
let helpers = require("../lib/helpers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/upload/" + req.user.idusuario));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
  }
});

const upload = multer({
  storage: storage
});

router.get("/", (req, res) => {
  res.render("index.html", { titulo: "Noodle" });
});

router.get("/main", async (req, res) => {
  let datos = await db.query("SELECT * FROM proyecto");
  let usuarios = await db.query("SELECT * FROM usuario");
  res.render("main.html", { titulo: "Noodle | Inicio", datos, usuarios });
});

router.get("/registrarse", isNotLoggedIn, (req, res) => {
  res.render("registrarse.html", { titulo: "Regístrate" });
});

router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("login.html", { titulo: "Iniciar Sesión" });
});

router.get("/coleccion", isLoggedIn, async (req, res) => {
  let datos = await db.query(
    "SELECT * FROM proyecto WHERE usuario_idusuario = ?",
    [req.user.idusuario]
  );
  res.render("coleccion.html", { titulo: "Mis proyectos", datos });
});

router.get("/contact", (req, res) => {
  res.render("contact.html", { titulo: "Contacto" });
});

router.get("/user", isLoggedIn, async (req, res) => {
  let datos = await db.query("SELECT * FROM cv WHERE usuario_idusuario = ?", [
    req.user.idusuario
  ]);
  res.render("user.html", { titulo: "Página de usuario", datos });
});

router.get("/proyecto/:id", isLoggedIn, async (req, res) => {
  let id = req.params.id;
  let resultado = await db.query(
    "SELECT * FROM proyecto WHERE idproyecto = ?",
    [id]
  );
  if (resultado.length > 0)
    res.render("proyecto.html", { titulo: "Página de proyecto", resultado });
  else res.redirect("/main");
});

//M;etodos POST para validar tanto el registro como el login
router.post(
  "/registrarse",
  passport.authenticate("local.signup", {
    successRedirect: "/registroExitoso",
    failureRedirect: "/registrarse",
    failureFlash: true
  })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/user",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/registroExitoso", isNotLoggedIn, async (req, res) => {
  res.render("registroExitoso.html", { titulo: "Registro Exitoso" });
});

router.get("/cerrarsesion", async (req, res) => {
  req.logOut();
  res.redirect("login");
});

router.get("/upload", isLoggedIn, async (req, res) => {
  res.render("upload.html", { titulo: "Crear proyecto" });
});

router.get("/error", (req, res) => {
  res.render("404.html", { titulo: "Ha surgido un error" });
});

router.post(
  "/upload",
  isLoggedIn,
  upload.single("archivo"),
  async (req, res, next) => {
    let usuario_idusuario = req.user.idusuario;
    let up = req.file.filename;
    let { titulo, descripcion, link, proceso } = req.body;
    const nuevoProyecto = {
      titulo,
      descripcion,
      link,
      img: up,
      proceso,
      usuario_idusuario
    };
    console.log("Archivo");
    console.log(req.file);
    let resultado = await db.query("INSERT INTO proyecto set ?", [
      nuevoProyecto
    ]);
    req.flash("success", "Su proyecto se ha subido correctamente.");
    res.redirect("coleccion");
  }
);

router.get("/editar/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const proyecto = await db.query(
    "SELECT * FROM proyecto WHERE idproyecto = ?",
    [id]
  );
  if (
    proyecto[0].usuario_idusuario === req.user.idusuario ||
    req.user.idusuario === 1
  )
    res.render("editar.html", { titulo: "Actualiza tu proyecto", proyecto });
  else res.redirect("/error");
});

router.post(
  "/editar/:id",
  isLoggedIn,
  upload.single("archivo"),
  async (req, res) => {
    const id = req.params.id;
    let usuario_idusuario = req.user.idusuario;
    let up = req.file.filename;
    let { titulo, descripcion, link, proceso } = req.body;
    const proyectoEditado = {
      titulo,
      descripcion,
      link,
      img: up,
      proceso,
      usuario_idusuario
    };
    await db.query("UPDATE proyecto set ? WHERE idproyecto = ?", [
      proyectoEditado,
      id
    ]);
    req.flash("success", "Su proyecto se ha editado correctamente.");
    res.redirect("../coleccion");
  }
);

router.get("/eliminalo/:id", async (req, res) => {
  const { id } = req.params;
  const prop = await db.query("SELECT * FROM proyecto WHERE idproyecto = ?", [
    id
  ]);
  console.log(prop[0].usuario_idusuario);
  if (
    prop[0].usuario_idusuario === req.user.idusuario ||
    req.user.idusuario === 1
  ) {
    await db.query("DELETE FROM proyecto WHERE idproyecto = ?", [id]);
    req.flash("success", "Su proyecto se ha eliminado correctamente.");
    res.redirect("../coleccion");
  } else res.redirect("/error");
});

router.get("/modificar", isLoggedIn, async (req, res) => {
  res.render("upload.html", { titulo: "Crear proyecto" });
});

router.get("/editarCV", isLoggedIn, async (req, res) => {
  let datos = await db.query("SELECT * FROM cv WHERE usuario_idusuario = ?", [
    req.user.idusuario
  ]);
  console.log(datos);
  res.render("editarCV.html", { titulo: "Editar tu CV", datos });
});

router.get("/crearCV", isLoggedIn, async (req, res) => {
  res.render("crearCV.html", { titulo: "Crea tu CV" });
});

router.post("/crearCV", isLoggedIn, async (req, res) => {
  let usuario_idusuario = req.user.idusuario,
    { biografia, habilidades, experiencia, formacion, idiomas } = req.body;
  let variables = {
    biografia,
    habilidades,
    experiencia,
    formacion,
    idiomas,
    usuario_idusuario
  };
  let datos = await db.query("INSERT INTO cv SET ?", [variables]);
  res.redirect("/user");
});

router.post("/editarCV", isLoggedIn, async (req, res) => {
  let { biografia, habilidades, experiencia, formacion, idiomas } = req.body;
  let variables = { biografia, habilidades, experiencia, formacion, idiomas };
  let datos = await db.query("UPDATE cv SET ? WHERE usuario_idusuario = ?", [
    variables,
    req.user.idusuario
  ]);
  res.redirect("/user");
});

module.exports = router;
