import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true   //improves our ability to search more efficient 
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    avatar:{
        type:String,  //this will be our cloudinary url 
        required:true,
    },
    coverImage:{
        type:String,  //this will be our cloudinary url 
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    password:{
        type:String,
        required: [true, "Password is Required"]
    },
    refreshToken:{
        type:String,
    }
 },
{timestamps:true}
)

export const User = mongoose.model("User", userSchema);