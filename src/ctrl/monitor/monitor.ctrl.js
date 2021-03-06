const { request, response } = require("express")
const propReader = require('properties-reader')

const props = propReader('./src/settings.properties')

const monitor = async(req = request, res = response) => {

    console.log(req.query)

    res.status(200).json({
        name: props.get('com.backend.name'),
        version: props.get('com.backend.version')
    })
}

module.exports = {
    monitor
}