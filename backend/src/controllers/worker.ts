import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.WORKER_JWT_SECRET!;

export const registerWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const hardcodedWalletAddress = "0x123456789023asdasd";

  const existingWorker = await prisma.worker.findUnique({
    where: {
      address: hardcodedWalletAddress,
    },
  });

  if (existingWorker) {
    const token = jwt.sign(
      {
        workerId: existingWorker.id,
      },
      JWT_SECRET
    );

    res.json({
      token,
      msg: "Token generated successfully for existing user",
    });
  } else {
    const newWorker = await prisma.worker.create({
      data: {
        address: hardcodedWalletAddress,
        pending_amount: 0,
        locked_amount: 0,
      },
    });

    const token = jwt.sign(
      {
        workerId: newWorker.id,
      },
      JWT_SECRET
    );
    res.json({
      token,
      msg: "Token generated successfully for new user",
    });
  }
};

export const getWorkerTask = async (
  req: Request,
  res: Response
): Promise<void> => {
    //@ts-ignore
    const workerId = req.workerId;

    const task = await prisma.task.findFirst({
           where:{
            submissions:{
                none:{
                    worker_id:workerId
                }
            }
           } 
    })
};
