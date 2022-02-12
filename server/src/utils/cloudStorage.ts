import { Storage } from "@google-cloud/storage";

// import path from "path";

// const storage = new Storage({
//   keyFilename: path.join(__dirname, "../config/service-account-file.json"),
//   projectId: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID!,
// });

const storage = new Storage();

export const uploadFile = async (
  file: Express.Multer.File
): Promise<string | void> => {
  try {
    const response = await storage
      .bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKED_ID!)
      .upload(file.path);

    return response[0].name;
  } catch (error) {
    console.log("cloud storage upload error", error);
  }
};

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    console.log("start delete file storage");
    await storage
      .bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKED_ID!)
      .file(filename)
      .delete();
    console.log("end delete file storage");
  } catch (error) {
    console.log("cloud storage deletion error", error);
  }
};
