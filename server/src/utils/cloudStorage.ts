import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/service-account-file.json"),
  projectId: process.env.GOOGLE_CLOUD_STORAGE_PROJECT_ID,
});

export const createBucket = async (bucketId: string) => {
  try {
    await storage.createBucket(bucketId);
  } catch (e) {
    throw new Error("error on create bucket");
  }
};

export const deleteBucket = async (bucketId: string) => {
  try {
    await storage.bucket(bucketId).delete();
  } catch (e) {
    throw new Error("error on delete bucket");
  }
};
