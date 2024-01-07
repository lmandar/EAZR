module.exports = errorHandler;


function errorHandler(err, req, res, next) {
    console.log("inside in global error handler",err)
    return res.status(200).json({ data: err });
}