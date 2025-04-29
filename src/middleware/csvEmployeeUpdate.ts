import { Request, Response, NextFunction } from 'express';

import { parseCsvBuffer } from '@utils/csv';

export const csvtojsonarray = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ msg: 'No file uploaded' });
      return;
    }
    const csvData = await parseCsvBuffer(req.file.buffer);
    req.file.buffer = Buffer.alloc(0); // clear buffer memeory
    req.body.data = csvData;
    next();
    // res.status(200).json({
    //   message: 'CSV parsed successfully',
    //   totalEmployee : csvData.length,
    //   data: csvData,
    // });
  } catch (error) {
    next(error);
  }
};
