/* packages  */
const path = require('path')

/* constant */
const helper = require('../helpers/helper')
module.exports = {
    list
}

async function list(reqData){
    let page = reqData.query.page == undefined ? 1 : reqData.query.page 
    let filepath = path.join(__dirname, '../../../localStorage/data.json')
    let history = await helper.fetchData(filepath)
    let totalRecords = history.length
    const resPerPage = 6;
    const skip =  resPerPage*page - resPerPage

    console.log(skip)
    if(skip == 0 ){
        history = history.slice(0, resPerPage)
    }else{
        history = history.slice(skip, skip + resPerPage)
    }
    let response = {"list": history, totalRecords : totalRecords}
    console.log("history",response)
    return response
}