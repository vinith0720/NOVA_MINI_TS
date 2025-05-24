import { Request, Response, NextFunction } from 'express';
import db from '@models/index';
import { transporter } from '@utils/email';
import { SendMailOptions } from 'nodemailer';
import { Email as email } from '@models/emailtable';
const { Email } = db;
import { Emailresponse, emailbody } from '@dto/email';

export const sendEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const Body: emailbody = req.body;
    const data: email | null = await Email.findOne({ where: { type: Body.type } });
    const mailOption: SendMailOptions = {
      ...data?.dataValues,
      from: Body.from as string,
      to: Body.to as string,
    };
    const info: Emailresponse = await transporter.sendMail(mailOption);
    res.status(200).json(info);
    return;
  } catch (error) {
    next(error);
  }
};
