import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import {
  getEmployee,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
  createEmployeeProfileById,
  employeeFoundOrNot,
  bulkInsertEmployee,
} from '@controllers/employeecontroller';

import {
  validationErrorMiddleware,
  idValidation,
  createValidationEmployee,
  updateEmployeeValidation,
  validateCsvData,
} from '@middleware/validations';

import authorization from '@middleware/jwt';

import awsUpload, { memmoryUpload } from '@middleware/multers';
import { csvtoJsonArray } from '@middleware/csvEmployeeUpdate';

router.get('/getall', authorization, getEmployee);

router.post(
  '/create',
  authorization,
  createValidationEmployee,
  validationErrorMiddleware,
  createEmployee
);

router.put(
  '/update/:id',
  authorization,
  updateEmployeeValidation,
  validationErrorMiddleware,
  updateEmployeeById
);

router.delete(
  '/delete/:id',
  authorization,
  idValidation,
  validationErrorMiddleware,
  deleteEmployeeById
);

router.get('/getbyid/:id', authorization, idValidation, validationErrorMiddleware, getEmployeeById);

// profileurl for aws releted to employee

router.post(
  '/updateprofile/:id',
  authorization,
  idValidation,
  validationErrorMiddleware,
  employeeFoundOrNot,
  (req: Request, res: Response, next: NextFunction) => {
    awsUpload(req, res, function (err) {
      if (err) {
        return res.status(400).json({ err });
      }
      next();
    });
  },
  createEmployeeProfileById
);

// Bulkinsert Employee with Csv

router.post(
  '/csvupload',
  authorization,
  (req: Request, res: Response, next: NextFunction) => {
    memmoryUpload(req, res, function (err) {
      if (err) {
        next(err);
        return;
      }
      next();
    });
  },
  csvtoJsonArray,
  validateCsvData,
  validationErrorMiddleware,
  bulkInsertEmployee
);

export default router;
