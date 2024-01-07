/* packages  */
const axios = require('axios')
const fs = require('fs');

/* constant */
const {apiDetails} = require('../../constants/constant');
const helper = require('../helpers/helper')
module.exports = {
    fetcImg,
}


async function fetcImg(reqData){
    console.log("inside fetch image")
    let img = await axios.get(apiDetails.url)
    if(img.data.status != "success"){
        throw {staus_code : "0", message: "image fetching failed Please try again later"}
    }
    let saveData = await helper.addData(img.data)
    

    return saveData
}