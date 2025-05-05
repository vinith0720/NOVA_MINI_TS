import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.DB_EMAIL,
    pass: process.env.DB_EMAIL_PASSWORD,
  },
});
