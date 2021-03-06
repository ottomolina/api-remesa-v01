const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl/categoria/categoria.ctrl')

router.get('/listado', ctrl.listaCategoria)
router.post('/guardar', ctrl.insertaCategoria)
router.post('/actualizar', ctrl.actualizaCategoria)
router.post('/eliminar', ctrl.eliminaCategoria)

module.exports = router;
