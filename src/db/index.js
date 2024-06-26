import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDB  = async () =>{
    try {
      const connectionInstance  =  await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}}`);
         console.log('db msg -> mongodb connected:', connectionInstance.connection.host); 
    } catch (error) {
        console.log(" db msg -> mongodb connection failed:", error);
        process.exit(1)  //read more on this 
    }
}

export default connectDB