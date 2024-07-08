import { asyncHandler } from "../utils/asyncHandler.js";
//imports do not have .js at end, automatically, we need to add , else erorr is thrown  

const registerUser  = asyncHandler(async(req,res)=>{
    console.log('user register controller is bing hit, it measn already user/register route is hit');
    return res.status(200).json({message:"/register route is hit, register user controller executed"}); 
})

export {registerUser}