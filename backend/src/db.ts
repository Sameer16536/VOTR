import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNextTask =async (workerId: number) => {
    const task = await prisma.task.findFirst({
        where: {
          done: false,
          submissions: {
            none: {
              worker_id: workerId,
            },
          },
        },
        select: {
          id: true,
          title: true,
          options: true,
          amount: true,
        },
      });
      return task;
}