import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";

const s3bucket = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  },
});

export const uploadToS3Bucket = async (files: Buffer[], filename: string[]) => {
  const fileToUpload = files;
  const uniqueFileName = randomBytes(16).toString("hex");
  const uploadTask = fileToUpload.map(async (file, index) => {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uniqueFileName}-${filename[index]}`,
      Body: file,
    });

    await s3bucket.send(command);

    const signedUrl = await getSignedUrl(s3bucket, command);
    return { url: signedUrl.split("?")[0] as string };
  });
  const results = await Promise.all(uploadTask);
  return results;
};
