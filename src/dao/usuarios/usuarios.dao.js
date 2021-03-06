const query = require("../../bd/conexion");

const listaUsuario = async(filtro) => {
    let sql = `select usuarioid, nombres, apellidos, login, correo, estadousuarioid as estadoid,
               (select estadousuario from estado_usuario where u.estadousuarioid = estadousuarioid) as estado_desc 
               from usuario u `;
    let filter = ''

    if(filtro) {
        if(filtro.usuarioid) {
            filter = `${filter} usuarioid = ${filtro.usuarioid} and`
        }
        if(filtro.nombres) {
            filter = `${filter} nombres like '${filtro.nombres}' and`
        }
        if(filtro.apellidos) {
            filter = `${filter} apellidos like '${filtro.apellidos}' and`
        }
        if(filtro.login) {
            filter = `${filter} login like '${filtro.login}' and`
        }
        if(filtro.offset) {
            filter = `${filter} offset like md5('${filtro.offset}') and`
        }
        if(filtro.correo) {
            filter = `${filter} correo like '${filtro.correo}' and`
        }
        if(filtro.estadoid) {
            filter = `${filter} estadousuarioid = ${filtro.estadoid} and`
        }
    }

    filter !== '' 
        ? sql = `${sql} where ${filter.substring(0, filter.length-4)}`
        : null
    const result = await query(sql)
    return result
}

const insertaUsuario = async(user) => {
    const sql = `insert into usuario(usuarioid, nombres, apellidos, login, offset, correo, estadousuarioid) 
    select ifnull(max(usuarioid),0)+1, '${user.nombres}','${user.apellidos}','${user.login}',md5('${user.offset}'),
    '${user.correo}',${user.estadoid} from usuario`
    const result = await query(sql)
    return result.affectedRows
}

const actualizaUsuario = async(user) => {
    const sql = `update usuario 
    set nombres='${user.nombres}',
        apellidos='${user.apellidos}',
        correo='${user.correo}',
        estadousuarioid=${user.estadoid}
     where usuarioid=${user.usuarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const eliminaUsuario = async(user) => {
    const sql = `delete from usuario where usuarioid=${user.usuarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad1 = async(user) => {
    const sql = `select count(1) as conteo from operacion where usuarioid=${user.usuarioid}`
    const result = await query(sql)
    return result
}

const validaIntegridad2 = async(user) => {
    const sql = `select count(1) as conteo from categoria where usuarioid=${user.usuarioid}`
    const result = await query(sql)
    return result
}

const listaEstado = async() => {
    const sql = 'select estadousuarioid as estadoid, estadousuario as estado from estado_usuario'
    const result = await query(sql)
    return result
}

module.exports = {
    listaUsuario, insertaUsuario, actualizaUsuario, eliminaUsuario, validaIntegridad1, validaIntegridad2, listaEstado
}
