import { Request, Response, NextFunction } from 'express';
import db from '@models/index';
import { transporter } from '@utils/email';
import { SendMailOptions } from 'nodemailer';
const { Email } = db;

export const sendEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { from, to, type } = req.body;
    const data = await Email.findOne({ where: { type } });
    const mailOption: SendMailOptions = { ...data?.dataValues, from, to };
    const info = await transporter.sendMail(mailOption);
    res.status(200).json(info);
    return;
  } catch (error) {
    next(error);
  }
};
