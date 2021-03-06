const { request, response } = require("express")
const dao = require('../../dao/operacion/operacion.dao')
const mensajes = require('../../util/mensajes')

const listaOperacion = async(req = request, res = response) => {
    const filtro = req.query
    if(filtro.usuarioid === undefined) {
        mensajes.faltaCampo(res, 'usuarioid')
        return
    }
    if(filtro.categoriaid === undefined) {
        mensajes.faltaCampo(res, 'categoriaid')
        return
    }
    dao.listaOperacion(filtro).then(result => {
        res.json({ listaOperacion: result })
    }).catch(err => {
        mensajes.errorException(res)
    })
}

const insertaOperacion = async(req = request, res = response) => {
    const operacion = req.body
    dao.insertaOperacion(operacion).then(result => {
        result === 1 ? mensajes.registroOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const actualizaOperacion = async(req = request, res = response) => {
    const operacion = req.body
    dao.actualizaOperacion(operacion).then(result => {
        result === 1 ? mensajes.actualizaOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const eliminaOperacion = async(req = request, res = response) => {
    const operacion = req.body
    try{
        let result = await dao.eliminaOperacion(operacion)
        result === 1 ? mensajes.eliminaOK(res) : mensajes.resultZero(res)

    } catch(e) {
        console.log('Error', e)
        mensajes.enviarMensaje(res, 'Ocurrió un error al realizar la operación solicitada.')
    }
}

const listaTipoOperacion = async(req = request, res = response) => {
    dao.listaTipoOperacion().then(result => {
        res.json({ listaTipoOperacion: result })
    }).catch(err => {
        console.log(err)
        mensajes.errorException(res)
    })
}

module.exports = {
    listaOperacion, insertaOperacion, actualizaOperacion, eliminaOperacion, listaTipoOperacion
}
