import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.route("/register").post(registerUser);   

// router.route("/register").post((req,res,next)=>{
//     console.log('/register is being hit')
//     next();
//     //logging to find if route is being hit when requested ,this way also we can use
// },asyncHandler);  




export default router 
//default exporting router 