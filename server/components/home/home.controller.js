const express = require('express')
const router = express.Router();
const homeService = require('./home.service')
const middleware = require('../helpers/middleware')

router.get('/fetch-image', fetcImg, middleware);



function fetcImg(req, res, next) {
    homeService.fetcImg(req)
        .then(data => {
            req.outputData = data
            next()
        }).catch(err => { next(err)})
}


module.exports = router;