import cloudinary from "./cloudinary";

export const uploadImage = async (filePath: string): Promise<string> => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: "epicure",
    });
    return result.secure_url;
};
