const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl/usuarios/usuarios.ctrl')

router.post('/login', ctrl.login)
router.get('/get-estados', ctrl.listaEstado)
router.get('/listado', ctrl.listaUsuario)
router.post('/guardar', ctrl.insertaUsuario)
router.post('/actualizar', ctrl.actualizaUsuario)
router.post('/eliminar', ctrl.eliminaUsuario)

module.exports = router;
