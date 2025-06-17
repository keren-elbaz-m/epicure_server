import express from "express";
import multer from "multer";
import { uploadImageController } from "../modules/upload/upload.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/image", upload.single("image"), uploadImageController);

export default router;
