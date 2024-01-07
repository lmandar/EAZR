

const middleware = (req, res, next) =>{
    try{
        req.outputData.status_code = 1
        req.outputData.message = "Success"

        res.status(200).json({data : req.outputData})
    }catch(e){
        console.log("error", e)
        next({message: e})
    }
}


module.exports = middleware