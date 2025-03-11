import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();
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

}

