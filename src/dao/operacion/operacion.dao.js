const query = require("../../bd/conexion");

const listaOperacion = async(filtro) => {
    let sql = ` select operacionid, usuarioid, tipooperacionid, cantidad, comentario, categoriaid,
                       (select tipooperacion from tipo_operacion where a.tipooperacionid = tipooperacionid) as tipooperacion,
                       DATE_FORMAT(fecha_operada,'%Y-%m-%d') AS fecha_operada,
                       DATE_FORMAT(fecha_ingresada,'%Y-%m-%d') AS fecha_ingresada
                  from operacion a
                 where usuarioid = ${filtro.usuarioid}
                   and categoriaid = ${filtro.categoriaid}`
    let filter = ''
    if(filtro.operacionid) {
        filter = `${filter} and operacionid = ${filtro.operacionid}`
    }
    if(filtro.tipooperacionid) {
        filter = `${filter} and tipooperacionid = ${filtro.tipooperacionid}`
    }
    if(filtro.cantidad) {
        filter = `${filter} and cantidad = ${filtro.cantidad}`
    }
    if(filtro.comentario) {
        filter = `${filter} and comentario like '${filtro.comentario}'`
    }
    if(filtro.fecha_operada) {
        filter = `${filter} and fecha_operada = '${filtro.fecha_operada}'`
    }
    if(filtro.fecha_ingresada) {
        filter = `${filter} and fecha_ingresada = '${filtro.fecha_ingresada}'`
    }
    if(filtro.fechaInicial) {
        filter = `${filter} and fecha_ingresada between '${filtro.fechaInicial}' and '${filtro.fechaFinal}'`
    }

    filter !== '' 
        ? sql = `${sql} ${filter}`
        : null
    sql = `${sql} order by fecha_operada desc`
    const result = await query(sql)
    return result
}

const insertaOperacion = async(op) => {
    const sql = `insert into operacion(operacionid,usuarioid,tipooperacionid,cantidad,comentario,fecha_operada,fecha_ingresada,categoriaid)
    select ifnull(max(operacionid),0)+1,${op.usuarioid},${op.tipooperacionid},${op.cantidad},'${op.comentario}','${op.fecha_operada}',
    '${op.fecha_ingresada}',${op.categoriaid}
    from operacion where usuarioid = ${op.usuarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const actualizaOperacion = async(op) => {
    const sql = `update operacion 
    set tipooperacionid=${op.tipooperacionid},
        cantidad=${op.cantidad},
        comentario='${op.comentario}',
        fecha_operada='${op.fecha_operada}'
     where usuarioid=${op.usuarioid}
       and operacionid=${op.operacionid}
       and categoriaid=${op.categoriaid}`
    const result = await query(sql)
    return result.affectedRows
}

const eliminaOperacion = async(op) => {
    const sql = `delete from operacion where usuarioid=${op.usuarioid}
    and operacionid=${op.operacionid} and categoriaid=${op.categoriaid}`
    const result = await query(sql)
    return result.affectedRows
}

const listaTipoOperacion = async() => {
    const sql = 'select tipooperacionid as tipoid, tipooperacion as tipo from tipo_operacion'
    const result = await query(sql)
    return result
}

module.exports = {
    listaOperacion, insertaOperacion, actualizaOperacion, eliminaOperacion, listaTipoOperacion
}
