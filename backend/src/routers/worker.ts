import { Router } from "express";
import { getBalance, getWorkerTask, payout, postSubmission, registerWorker } from "../controllers/worker";
import { workerAuthMiddleware } from "../middleware/auth.middleware";


const router = Router();


router.post('/signin',registerWorker)
router.get('/nextTask',workerAuthMiddleware as any ,getWorkerTask)
router.post('/submission',workerAuthMiddleware as any ,postSubmission)
router.get('/balance',workerAuthMiddleware as any ,getBalance)
router.post('/payout',workerAuthMiddleware as any, payout)


export default router;