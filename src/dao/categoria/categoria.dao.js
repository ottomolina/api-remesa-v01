const query = require("../../bd/conexion");

const listaCategoria = async(filtro) => {
    let sql = `select categoriaid,usuarioid,nombre,descripcion,fecha from categoria
    where usuarioid = ${filtro.usuarioid}`
    let filter = ''
    if(filtro.categoriaid) {
        filter = `${filter} and categoriaid = ${filtro.categoriaid}`
    }
    if(filtro.nombre) {
        filter = `${filter} and nombre like '${filtro.nombre}'`
    }
    if(filtro.descripcion) {
        filter = `${filter} and descripcion like '${filtro.descripcion}'`
    }
    if(filtro.fecha) {
        filter = `${filter} and fecha = '${filtro.fecha}'`
    }
    if(filtro.fechaInicial) {
        filter = `${filter} and fecha between '${filtro.fechaInicial}' and '${filtro.fechaFinal}'`
    }

    filter !== '' 
        ? sql = `${sql} ${filter}`
        : null
    sql = `${sql} order by fecha desc`
    const result = await query(sql)
    return result
}

const insertaCategoria = async(cat) => {
    const sql = `insert into categoria(categoriaid,usuarioid,nombre,descripcion,fecha)
    select ifnull(max(categoriaid),0)+1,${cat.usuarioid},'${cat.nombre}','${cat.descripcion}','${cat.fecha}'
    from categoria where usuarioid = ${cat.usuarioid}`
    const result = await query(sql)
    return result.affectedRows
}

const actualizaCategoria = async(cat) => {
    const sql = `update categoria 
    set nombre='${cat.nombre}',
        descripcion='${cat.descripcion}'
     where usuarioid=${cat.usuarioid}
       and categoriaid=${cat.categoriaid}`
    const result = await query(sql)
    return result.affectedRows
}

const eliminaCategoria = async(cat) => {
    const sql = `delete from categoria where usuarioid=${cat.usuarioid} and categoriaid=${cat.categoriaid}`
    const result = await query(sql)
    return result.affectedRows
}

const validaIntegridad = async(cat) => {
    const sql = `select count(1) as conteo from operacion where usuarioid=${cat.usuarioid} and categoriaid = ${cat.categoriaid}`
    const result = await query(sql)
    return result
}

module.exports = {
    listaCategoria, insertaCategoria, actualizaCategoria, eliminaCategoria, validaIntegridad
}
