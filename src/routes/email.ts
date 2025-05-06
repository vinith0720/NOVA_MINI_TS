import express, { Request, Response, NextFunction } from 'express';
import { sendEmail } from '@controllers/emailController';
import authorization from '@middleware/jwt';

const router = express.Router();

router.post('/', authorization, sendEmail);

export default router;
