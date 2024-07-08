const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };

//This pattern is useful in Express.js to avoid repetitive try-catch blocks in each async middleware or route handler, ensuring consistent error handling throughout the application.

//same code in diff form , promise based 

// const asyncHandler = (fn) => {
//        return  (err,req,res,next)=>{
//             Promise.resolve(fn(err,req,res)).catch((err)=>next(err));
//         }
// }
 
  

export {asyncHandler}