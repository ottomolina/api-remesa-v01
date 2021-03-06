const { request, response } = require("express")
const dao = require('../../dao/usuarios/usuarios.dao')
const mensajes = require('../../util/mensajes')

const listaUsuario = async(req = request, res = response) => {
    const filtro = req.query
    dao.listaUsuario(filtro).then(result => {
        res.json({ listaUsuario: result })
    }).catch(err => {
        mensajes.errorException(res)
    })
}

const login = async(req = request, res = response) => {
    const { login, offset } = req.body
    const filtro = { login, offset }
    dao.listaUsuario(filtro).then(result => {
        if(result.length === 0) {
            mensajes.loginErrCredenciales(res)
        } else {
            if(result[0].estadoid !== 1) {
                mensajes.enviarMensaje(res, 'El usuario no se encuentra activo.')
            } else {
                res.json({ usuario: result[0] })
            }
        }
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const insertaUsuario = async(req = request, res = response) => {
    const user = req.body
    dao.insertaUsuario(user).then(result => {
        result === 1 ? mensajes.registroOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const actualizaUsuario = async(req = request, res = response) => {
    const user = req.body
    dao.actualizaUsuario(user).then(result => {
        result === 1 ? mensajes.actualizaOK(res) : mensajes.resultZero(res)
    }).catch(err => {
        console.log(err);
        mensajes.errorException(res)
    })
}

const eliminaUsuario = async(req = request, res = response) => {
    const user = req.body
    try{
        let result = await dao.validaIntegridad1(user)
        if(result > 0) {
            mensajes.integridad(res)
            return
        }
        result = await dao.validaIntegridad2(user)
        if(result > 0) {
            mensajes.integridad(res)
            return
        }
        result = await dao.eliminaUsuario(user)
        result === 1 ? mensajes.eliminaOK(res) : mensajes.resultZero(res)

    } catch(e) {
        console.log('Error', e)
        mensajes.enviarMensaje(res, 'Ocurrió un error al realizar la operación solicitada.')
    }
}

const listaEstado = async(req = request, res = response) => {
    dao.listaEstado().then(result => {
        res.json({ listaEstado: result })
    }).catch(err => {
        console.log(err)
        mensajes.errorException(res)
    })
}

module.exports = {
    listaUsuario, insertaUsuario, actualizaUsuario, eliminaUsuario, login, listaEstado
}
