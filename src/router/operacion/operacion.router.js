const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl/operacion/operacion.ctrl')

router.get('/get-tipo-operacion', ctrl.listaTipoOperacion)
router.get('/listado', ctrl.listaOperacion)
router.post('/guardar', ctrl.insertaOperacion)
router.post('/actualizar', ctrl.actualizaOperacion)
router.post('/eliminar', ctrl.eliminaOperacion)

module.exports = router;
