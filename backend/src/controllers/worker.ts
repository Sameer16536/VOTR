import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getNextTask } from "../db";
import { createSubmissionInput } from "../types";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.WORKER_JWT_SECRET!;

const TOTAL_SUBMISSIONS = 100;
const TOTAL_DECIMALS = 100000;




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

  const task  = await getNextTask(Number(workerId));

  if (!task) {
    res
      .json({
        msg: "No task available for review",
      })
      .status(411);
  } else {
    res
      .json({
        task,
      })
      .status(411);
  }
};

export const postSubmission = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const workerId = req.workerId;
  const parsedBody = createSubmissionInput.safeParse(req.body)
  
  if(parsedBody.success){
    const task = await  getNextTask(Number(workerId));
    if(!task||task?.id !== Number(parsedBody.data.taskId)){
       res.status(411).json({msg:"Incorrect task id"})
  }

  const amount = (Number(task?.amount)/TOTAL_SUBMISSIONS)
  
 const subm = await  prisma.$transaction(async tx =>{
    const submission = await prisma.submission.create({
      data:{
        option_id:Number(parsedBody.data.selection),
        worker_id:Number(workerId),
        task_id:Number(parsedBody.data.taskId),
        amount
  
      }
    })
    await prisma.worker.update({
      where:{
        id:workerId
      },
      data:{
        pending_amount:{
          increment:amount * TOTAL_DECIMALS
        }
      }
    })
    return submission
  }
  )


  const nextTask = await getNextTask(Number(workerId));
  res.json({
    nextTask,
    amount
  })
} 
  else{

  }
  
};


export const getBalance = async(req:Request,res:Response):Promise<void> =>{
  //@ts-ignore
  const wokerId = req.workerId;

  const worker = await prisma.worker.findFirst({
    where:{
      id:Number(wokerId)
    }
  })

  res.json({
    pendingAmount:worker?.pending_amount,
    lockedAmount:worker?.locked_amount

  })
}