const express = require('express')
const router = express.Router();
const cartService = require('./cart.service')
const middleware = require('../helpers/middleware')

router.get('/list', list, middleware);
router.post('/add-cart', addCart, middleware);
router.post('/remove-from-cart', removeFromCart, middleware);



function list(req, res, next) {
    cartService.list(req)
        .then(data => {
            req.outputData = data
            next()
        }).catch(err => {
            next(err)  
        })
}

function addCart(req, res, next) {
    cartService.addCart(req)
        .then(data => {
            req.outputData = data
            next()
        }).catch(err => {
            next(err)  
        })
}

function removeFromCart(req, res, next) {
    cartService.removeFromCart(req)
        .then(data => {
            req.outputData = data
            next()
        }).catch(err => {
            next(err)  
        })
}


module.exports = router;