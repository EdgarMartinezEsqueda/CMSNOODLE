// const express = require('express');
// const router = express.Router();
// const pool = require('../config');
// const multer = require('multer');
// const mimeTypes = require('mime-types');

/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb("", '../public/'+req.user.correo);
    }
    filename: function(req, file, cb) {
        cb("", Date.now() + "." + mimeTypes.extension(file.mimetype) );
    }
})

const upload = multer({
    storage: storage
})
*/

// router.get('/upload', (req, res) => {
//     res.render('upload');
// });

// router.post('/upload', /*upload.single('archivo'),*/ async (req, res) => {
//     const {titulo, descripcion, link, archivo, usuario_idusuario} = req.body;
//     const nuevoProyecto = {
//       titulo,
//       descripcion,
//       link,
//       archivo/*: req.file.destination + req.file.filename */,
//       usuario_idusuario
//     };
//     await pool.query('INSERT INTO proyecto set ?', [nuevoProyecto]);
//     res.render('/coleccion');
// });

// router.get('/', async (req, res) => {
//     const proyectos = await pool.query('SELECT * FROM proyecto');
//     res.render( '/coleccion', { proyectos } );
// });

// router.get('/eliminar/:id', async (req, res) => {
//     const { id } = req.params;
//     await pool.query('DELETE FROM proyecto WHERE idproyecto = ?', [id]);
//     res.render('/coleccion');
// });

// router.get('/editar/:id', async (req, res) => {
//     const { id } = req.params;
//     const proyecto = await pool.query('SELECT * FROM proyecto WHERE idproyecto = ?', [id]);
//     res.render('/editar', {proyecto})
// });

// router.post('/editar/:id', /*upload.single('archivo'),*/  async (req, res) => {
//   const { id } = req.params;
//   const { titulo, descripcion, link, archivo, usuario_idusuario } = req.body;
//   const nuevoProyecto = {
//     titulo,
//     descripcion,
//     link,
//     archivo/*: req.file.filename */,
//     usuario_idusuario
//   };
//   await pool.query('UPDATE proyrcto set ? WHERE id = ?', [nuevoProyecto, id]);
//   res.render('/coleccion');
// });

// router.get('/editarCV/:id', async (req, res) => {
//   const { id } = req.params;
//   const CV = await pool.query('SELECT * FROM cv WHERE idcv = ?', [id]);
//   res.render('/editarCV', { CV });
// });

// router.post('/editarCV/:id', /*upload.single('archivo'),*/ async (req, res) => {
//   const { id } = req.params;
//   const {} = req.body;
//   const CVeditado {};
//   await pool.query('UPDATE cv set ? WHERE idcv = ?', [CVeditado, id]);
// });

// module.exports = router;
