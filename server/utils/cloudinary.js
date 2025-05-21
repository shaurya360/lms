import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    api_secret: process.env.API_SECRET,
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME

});

export const uploadMedia = async (file) => {
    try{
        const upload = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
            });
            return upload;
        }
        catch(err){
            console.log(err);
        }
    }

export const deleteMediaFromCloudinary = async (publicId) => {
    try{
        const deleteMedia = await cloudinary.uploader.destroy(publicId);
        return deleteMedia;
    }
    catch(err){
        console.log(err);
    }
}

export const deleteVideoFromCloudinary = async (publicId) => {
    try{
        const deleteMedia = await cloudinary.uploader.destroy(publicId,
            {resource_type:"video"}
        );
        return deleteMedia;
    }
    catch(err){
        console.log(err);
    }
}
