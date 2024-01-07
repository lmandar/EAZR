/* packages  */
const path = require('path');

/* constant */
const helper = require('../helpers/helper')
module.exports = {
    list,
    addCart,
    removeFromCart
}

async function list(reqData) {
    let cartPath = path.join(__dirname, '../../../localStorage/cart.json')
    let cart = await helper.fetchData(cartPath)
    if (cart.length == 0) {
        throw { status_code: 0, message: "No items added" }
    }
    let productPath = path.join(__dirname, '../../../localStorage/data.json')
    let products = await helper.fetchData(productPath)

    let returnData = []
    for (key in cart) {
        for (j in products) {
            if (cart[key].product_id == products[j].id) {
                products[j].qty = cart[key].qty
                returnData.push(products[j])
            }
        }
    }
    return returnData
}

async function addCart(reqData) {
    if (reqData.body.id == undefined) {
        throw { "status_code": 0, message: "Please provide id" }
    }
    let filepath = path.join(__dirname, '../../../localStorage/cart.json')
    let cartItems = await helper.fetchData(filepath)

    let existingProduct = cartItems.findIndex(item => item.product_id === reqData.body.id);

    if (existingProduct != -1) {
        cartItems[existingProduct].qty += 1
        await helper.addCart(filepath, cartItems)
    } else {
        let obj = { product_id: reqData.body.id, qty: 1 }
        cartItems.push(obj)
        await helper.addCart(filepath, cartItems)
    }
    return {}
}

async function removeFromCart(reqData){
    if (reqData.body.id == undefined) {
        throw { "status_code": 0, message: "Please provide id" }
    }
    let filepath = path.join(__dirname, '../../../localStorage/cart.json')
    let cartItems = await helper.fetchData(filepath)

    let indexToRemove = cartItems.findIndex(item => item.product_id === reqData.body.id);

    if (indexToRemove == -1) {
        throw {status_code:0, message: "Product not found"}
    }
        cartItems.splice(indexToRemove, 1);
        await helper.addCart(filepath, cartItems)
    
    return {}
}