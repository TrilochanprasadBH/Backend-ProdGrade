// require('dotenv').config({path:'./env'})  
// we arent useing this as this import is common js 
// and module js import is still in experimental stage , see changes in package.json in script on dev 
//  to understand  -we are using this below method of import experimentally  

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
        app.listen(process.env.PORT || 8000 , ()=>{
            console.log(` index.js msg -> server is running on port, ${process.env.PORT}`);
        })
})
.catch((err)=>{
    console.log('index.js msg -> connection to db failed',err);
})