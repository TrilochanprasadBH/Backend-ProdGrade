import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

 // Configuration

 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_NAME_API_KEY, 
    api_secret: process.env.CLOUD_NAME_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return "Local File Path is not available"; 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        // console.log("file has been successfully uploaded to cloudinary", response.url);
       //post successful upload, the file is removed from our local server, ie now cloud uploaded files wont be seen in public/temp like earlier  
        fs.unlinkSync(localFilePath);
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath);
        //removed locally saved temporary file (from my server) as the upload file option to cloudinary failed.
        return null  
    }
}

export {uploadOnCloudinary}