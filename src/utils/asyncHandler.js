const asyncHandler = (fn) => async(err,req,res,next) => {

    try {
        await fn(err,req,res,next)
    } catch (error) {
        res.status(error.code || 400).json({ 
            success:false,
            message: error.message
        })
    }
}

//same code in diff form , promise based 

// const asyncHandler = (fn) ={
//         (err,req,res,next)=>{
//             Promise.resolve(fn(err,req,res)).catch((err)=>next(err));
//         }
// }