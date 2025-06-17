import { Request, Response } from "express";
import { uploadImage } from "../../utils/uploadImage";

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

export const uploadImageController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const multerReq = req as MulterRequest;

    try {
        if (!multerReq.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        const imageUrl = await uploadImage(multerReq.file.path);
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Upload failed" });
    }
};
