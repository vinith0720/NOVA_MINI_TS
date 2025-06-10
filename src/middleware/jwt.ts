import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import db from '@models/index';
const { Company } = db;

dotenv.config();

export const secret = process.env.JWT_SECRET_TOKEN as string;

if (!secret) {
  throw new Error('JWT_SECRET_TOKEN is not defined in environment variables');
}

// Define return type of verifyToken
const verifyToken = (token: string, secret: string): Promise<JwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
};

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

const authorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const user = await verifyToken(token, secret);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token', error: err });
  }
};

export const loginToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    const company = await Company.findOne({ where: { name } });
    if (!company) {
      res.status(400).json({ message: 'Company not found' });
      return;
    }
    const token = jwt.sign(
      { id: company.id, name: company.name, location: company.location },
      secret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    next(error);
  }
};

export default authorization;
