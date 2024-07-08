import mongoose  from "mongoose";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt"; 


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,  //automatically remove the whitespace  
        index:true   //improves our ability to search more efficient, important   
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
        required: [true, "Password is Required"] //ok so we can so like this too  
    },
    refreshToken:{
        type:String,
    }
 },
{timestamps:true}
)

// userSchema.pre('save', ()=>{})   cant use arrow function inside here , as in js arrow functions do have this variable
//explore more mongoose middlewares doc  
//just before data gets saved in db this below thing happens 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next(); 
    this.password = await brcypt.hash(this.password, 10);
    next();
})

//oh we can use as many methods on our schema as we want


userSchema.methods.isPasswordCorrect = async function (password){
   return  await brcypt.compare(password, this.password);
    //this.password is the hashed password  , password is the one we entered; this returns a bool 
}

//this.usernmae etc refers to data from db  
userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET , 
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}

    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id 
    },
    process.env.REFRESH_TOKEN_SECRET ,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}


export const User = mongoose.model("User", userSchema);