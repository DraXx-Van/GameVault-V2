const asyncHandler = (fn) => {
    return async(req,res,next) => {
        try{
            await fn(req,res,next);
        }catch(error){
            const statusCode = error.statusCode || 500;
            res.status(statusCode).json({message: error.message || "Server error"});
        }
    }
}

module.exports = asyncHandler;