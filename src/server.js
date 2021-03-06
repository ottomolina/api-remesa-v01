const express = require('express')
const cors = require('cors');
const propReader = require('properties-reader')

class Server {

    constructor() {
        this.props = propReader('./src/settings.properties')
        this.app = express()
        this.port = this.props.get('com.backend.ws.port')

        this.middlewares()

        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    routes() {
        this.app.use( this.props.get('com.backend.ws.routes.monitor'), require('./router/monitor/monitor.router'))
        this.app.use( this.props.get('com.backend.ws.routes.usuario'), require('./router/usuarios/usuario.router'))
        this.app.use( this.props.get('com.backend.ws.routes.operacion'), require('./router/operacion/operacion.router'))
        this.app.use( this.props.get('com.backend.ws.routes.categoria'), require('./router/categoria/categoria.router'))
        // this.app.use( process.env.CLIENTEPATH, require('./routes/cliente.route'));
        // this.app.use( process.env.CONCESIONARIOPATH, require('./routes/concesionario.route'));
        // this.app.use( process.env.COTIZACIONPATH, require('./routes/cotizacion.route'));

        // this.app.use( process.env.LINEAPATH, require('./routes/linea.route'));
        // this.app.use( process.env.MARCAPATH, require('./routes/marca.route'));
        // this.app.use( process.env.TIPOPATH, require('./routes/tipo.route'));
        // this.app.use( process.env.VEHICULOPATH, require('./routes/vehiculo.route'));

        this.app.use('*', (req, res) => res.status(404).json({mensaje: '404 | servicio no encontrado.'}))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor se ha iniciado en el puerto ${this.port}`)
        })
    }
}

module.exports = Server