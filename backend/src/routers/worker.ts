import { Router } from "express";
import { getWorkerTask, postSubmission, registerWorker } from "../controllers/worker";
import { workerAuthMiddleware } from "../middleware/auth.middleware";


const router = Router();


router.post('/signin',registerWorker)
router.get('/nextTask',workerAuthMiddleware as any ,getWorkerTask)
router.post('/submission',workerAuthMiddleware as any ,postSubmission)


export default router;