const fs = require('fs')
const path = require('path');

module.exports = {
    addData,
    fetchData,
    addCart
}


async function addData(reqData) {
    let filepath = path.join(__dirname, '../../../localStorage/data.json')
    let existingData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    let obj = {
        id: existingData.length + 1,
        img: reqData.message,
        price: Math.floor(Math.random() * 900) + 100
    }
    existingData.push(obj);
    fs.writeFileSync(filepath, JSON.stringify(existingData));
    return obj
}

async function fetchData(filepath) {
    // let filepath = path.join(__dirname, '../../../localStorage/data.json')
    let existingData = await JSON.parse(fs.readFileSync(filepath, 'utf8'));
    return existingData
}


async function addCart(filepath, reqData){
    await fs.writeFileSync(filepath, JSON.stringify(reqData));
    return true
}