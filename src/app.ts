// import 'module-alias/register';

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import indexRouter from '@routes/index';
import companyRouter from '@routes/company';
import employeeRouter from '@routes/employee';
import emailRouter from '@routes/email';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/employee', employeeRouter);
app.use('/email', emailRouter);

app.use((err: any, req: Request, res: Response): void => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: `Multer Error: ${err.message}` });
    return;
  }

  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    res.status(400).json({
      error: 'Invalid JSON syntax',
      message: err.message,
    });
    return;
  }

  const statusCode = (err.status as number) || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      details: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

export default app;
