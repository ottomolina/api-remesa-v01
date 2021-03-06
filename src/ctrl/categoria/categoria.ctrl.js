const { request, response } = require("express")
const dao = require('../../dao/categoria/categoria.dao')
const mensajes = require('../../util/mensajes')

const listaCategoria = async(req = request, res = response) => {
    const filtro = req.query
    if(filtro.usuarioid === undefined) {
        mensajes.faltaCampo(res, 'usuarioid')
        return
    }
    dao.listaCategoria(filtro).then(result => {
        res.json({ listaCategoria: result })
    }).catch(err => {
        mensajes.errorException(res)
    })
}

const insertaCategoria = async(req = request, res = response) => {
    const categoria = req.body
    dao.insertaCategoria(categoria).then(result => {
        result === 1 ? mensajes.registroOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const actualizaCategoria = async(req = request, res = response) => {
    const categoria = req.body
    dao.actualizaCategoria(categoria).then(result => {
        result === 1 ? mensajes.actualizaOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const eliminaCategoria = async(req = request, res = response) => {
    const categoria = req.body
    try{
        let result = await dao.validaIntegridad(categoria)
        if(result > 0) {
            mensajes.integridad(res)
            return
        }
        result = await dao.eliminaCategoria(categoria)
        result === 1 ? mensajes.eliminaOK(res) : mensajes.resultZero(res)

    } catch(e) {
        console.log('Error', e)
        mensajes.enviarMensaje(res, 'Ocurrió un error al realizar la operación solicitada.')
    }
}

const listaTipoCategoria = async(req = request, res = response) => {
    dao.listaTipoCategoria().then(result => {
        res.json({ listaTipoCategoria: result })
    }).catch(err => {
        console.log(err)
        mensajes.errorException(res)
    })
}

module.exports = {
    listaCategoria, insertaCategoria, actualizaCategoria, eliminaCategoria, listaTipoCategoria
}
