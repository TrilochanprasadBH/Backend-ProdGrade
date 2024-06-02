import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

// thsee app.use etc are middlewares ,executed in order written  
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true  // Allow credentials (cookies, HTTP authentication) helps in maintaining sessions 
}));

app.use(express.json({limit:"16kb"})); 
// parses incoming json and limit ensures security and imporoves performance of server, prevents DoS attacks etc

app.use(express.urlencoded({extended:true,limit:"16kb"}));
//middleware to parse incoming requests with URL-encoded payloads,typically used for processing form submissions. 

app.use(cookieParser());


export {app}