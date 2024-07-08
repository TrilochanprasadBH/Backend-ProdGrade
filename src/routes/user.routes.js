import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//so first route is hit , then middleware, then controller   

router.route("/register").post(
    upload.fields([{name:"avatar", maxCount:1},{name:"coverImage", maxCount:1}])
    ,registerUser);   

// router.route("/register").post((req,res,next)=>{
//     console.log('/register is being hit')
//     next();
//     //logging to find if route is being hit when requested ,this way also we can use
// },asyncHandler);  




export default router 
//default exporting router 