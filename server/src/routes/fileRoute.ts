import express from "express";
import { unlinkSync } from "fs";
import multer from "multer";
import { createFileFromBucket } from "../utils/cloudStorage";
import { checkErrors } from "../middlewares/checkErrors";
import { isAuth } from "../middlewares/isAuth";

const storage = multer.diskStorage({
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
  destination: "uploads/",
});

let upload = multer({
  storage,
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE!,
  },
});

const router = express.Router();

router.post(
  "/",
  isAuth,
  checkErrors,
  upload.single("file"),
  async (req, res) => {
    if (req.file) {
      const createdFilename = await createFileFromBucket(req.file);
      unlinkSync(process.cwd() + "/uploads/" + req.file.filename);
      res.send({ message: "file uploaded", filename: createdFilename });
    } else {
      res.status(400).json({ message: "file is missing" });
    }
  }
);

export default router;
