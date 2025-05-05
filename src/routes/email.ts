import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { sendEmail } from '@controllers/emailController';

router.post('/', sendEmail);

export default router;
