import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    videoFile:{
        type:String,  //cloudinary link 
        required:true
    },
    thumbnail:{
        type:String,
        required: [true, "Thumbnail is needed"]   //writing like this is upto me, or just write true 
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0 
    },
    isPublished:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

export const Video = mongoose.model("Video", VideoSchema);