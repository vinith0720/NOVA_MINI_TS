import multer, { StorageEngine } from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Request } from "express";
import { S3ClientConfig } from "@aws-sdk/client-s3";
import { Callback } from "aws-lambda"; // Optional: Used for cb/cd types

dotenv.config();

if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_BUCKET) {
  throw new Error("AWS credentials or bucket not defined in .env");
}

export const bucket: string = process.env.AWS_BUCKET;

const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const s3 = new S3Client(s3Config);

const storage: StorageEngine = multerS3({
  s3,
  bucket,
  metadata: (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: any) => void) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) => {
    const fileName = `uploads/${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const awsUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");

export default awsUpload;
