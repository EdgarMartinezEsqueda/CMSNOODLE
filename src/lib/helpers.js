let bcrypt = require("bcryptjs"),
  fs = require("fs"),
  path = require("path");

let helpers = {};

helpers.encriptador = async (password) => {
  let salt = await bcrypt.genSalt(5),
    hash = await bcrypt.hash(password, salt);
  return hash;
};

//validación de los campos ingresados en el formulario de registro
helpers.validarCampos = (nombre, apellido, correo, contra, contraR) => {
  if (
    nombre.length === 0 ||
    apellido.length === 0 ||
    correo.match(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/) == null ||
    contra.length < 8 ||
    contra !== contraR
  )
    return false;

  return true;
};

helpers.compararContra = async (password, dbPassword) => {
  try {
    return bcrypt.compare(password, dbPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.hacerDir = async (id) => {
  fs.mkdir(path.resolve("src/public/upload", "" + id), (err) => {
    err ? console.log(err) : console.log("Directorio creado exitosamente");
  });
};

module.exports = helpers;
