import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3bucket = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  },
});

export const uploadToS3Bucket = async (files: Buffer[], filename: string[]) => {
  const fileToUpload = files;
  console.log(filename);

  const params = fileToUpload.map((file, index) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${filename[index]}`,
      Body: file,
    };
  });

  return await Promise.all(
    params.map((param) => s3bucket.send(new PutObjectCommand(param)))
  );
};
