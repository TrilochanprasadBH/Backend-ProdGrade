import { asyncHandler } from "../utils/asyncHandler.js";
//imports do not have .js at end, automatically, we need to add , else erorr is thrown  
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/FileUploadCloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser  = asyncHandler(async(req,res)=>{
    console.log('user register controller is bing hit, it means already user/register route is hit');

    //steps to register a user : - 

    // 1. collect data from frontend, see user models for exact keys
    // 2. validation of the data - as we need 
    // 3. check if user already exists , we can use email or username or both  etc   whatever is unique 
    // 4. check for avatar , as it is required too , u can check coverimage too though it not required 
    // 5. upload them to multer -> cloudinary , avatar 
    // 6. create user object - create entry in db  
    // 7. once we get response from db, remove password and refresh token from it, dont show this to user in response 
    // 8. check if user is actually registered and created in db , IMP  
    // 9.  return res finally  
    
    //in postman body - raw, json details given , here i get them though req.body  
    //if files + text are to be uploaded, then use form-data option in postman , enable content type
            const {fullname,username,email,password} = req.body    //1 
            
            // console.log("fullname", fullname, 'email: ',email); //2 
            if([username,fullname,email,password].some((field)=>{field?.trim() === ""})){
                            throw new ApiError(400, 'All Fields are Required');
            }

            //3 
            const existingUser  = await User.findOne({
                $or: [{username},{email}]    //type $ explore other options in here $and , $nor etc, see syntax carefully  , this checks if any document with this email or username already exists
            })
           
            if(existingUser){
                throw new ApiError(409,'User with given Username or email already exists!');
            }

            //4 
            const avatarLocalPath = req.files?.avatar[0]?.path;
            // const coverImageLocalPath = req.files?.coverImage[0]?.path;  ->this throws undefined when cover is not uploaded

            let coverImageLocalPath; 

            if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
                coverImageLocalPath = req.files.coverImage[0].path 
            }

            if(!avatarLocalPath){
                throw new ApiError(400,"Avatar file is required");
            }

            //5  
          const avatar =   await uploadOnCloudinary(avatarLocalPath);
          const coverImage   = await uploadOnCloudinary(coverImageLocalPath);
        
          if(!avatar){
            throw new ApiError(400,"Avatar file is required, uploaded to local, but failed on cloudinary");
          }

          //6 
        const user =  await  User.create({
            fullname,
            email,
            password,
            avatar : avatar.url,
            coverImage: coverImage?.url || "", 
            username: username.toLowerCase()
          })

          const createdUser  = await User.findById(user._id).select(
            "-password -refreshToken"
          )
          // .select() method weird syntax, takes keys that should not be there in response.herer we do not want to show password and refresh token 

          if(!createdUser){
                throw new ApiError(500, "something went wrong while registering the user, please try again")
          }

        // return res.status(201).json({createdUser, "new user created"}) this way can be written but we need to standardise response in our app  so use ApiResponse 
        //   console.log('createduser', createdUser);
        return res.status(201).json(
            new ApiResponse(200,createdUser, "User Registered Successfully")
        );

    // return res.status(200).json({message:"/register route is hit, register user controller executed"}); 
})

export {registerUser}