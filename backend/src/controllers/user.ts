import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const config = {
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
}
const s3Client = new S3Client();

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
  const hardcodedWalletAddress = "0x1234567890";

  // If no user exists then create a new user using upsert , if exists then update
  // const user = await prisma.user.upsert()

  const existingUser = await prisma.user.findUnique({
    where: {
      address: hardcodedWalletAddress,
    },
  });

  if (existingUser) {
    const token = jwt.sign(
      {
        userId: existingUser.id,
      },
      JWT_SECRET
    );

    res.json({
      token,
      msg: "Token generated successfully for existing user",
    });
  } else {
    const newUser = await prisma.user.create({
      data: {
        address: hardcodedWalletAddress,
      },
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      JWT_SECRET
    );
    res.json({
      token,
      msg: "Token generated successfully for new user",
    });
  }
};

export const getPresignedUrl = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const uniqueId = uuidv4();

  const {url,fields} = await createPresignedPost(s3Client,{
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `Images/${userId}/${uniqueId}.jpg`,
    Conditions: [
      ['content-length-range', 0, 5 * 1024 * 1024] // 5 MB max
    ],
    Expires: 3600
  });

  res.json({
    msg: "Presigned URL generated successfully",
    preSignedUrl:url,
    fields
  });
};
