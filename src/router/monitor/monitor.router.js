const express = require('express');
const router = express.Router();
const ctrl = require('../../ctrl/monitor/monitor.ctrl')

router.get('/', ctrl.monitor)

module.exports = router
