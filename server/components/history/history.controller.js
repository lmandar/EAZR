const express = require('express')
const router = express.Router();
const historyService = require('./history.service')
const middleware = require('../helpers/middleware')

router.get('/list', list, middleware);



function list(req, res, next) {
    historyService.list(req)
        .then(data => {
            req.outputData = data
            next()
        }).catch(err => {
            next(err)  
        })
}


module.exports = router;