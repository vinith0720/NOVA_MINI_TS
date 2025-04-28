import express ,{Request,Response,NextFunction}from 'express';
const router = express.Router()

import {
  getEmployee,
  postEmployee,
  putEmployeeById,
  deleteEmployeeById,
  getEmployeeById,
  postEmployeeProfileById,
  employeefoundornot,
  postBulkInsertEmployee,
} from "@controllers/employeecontroller";

import {
  validationErrorMiddleware,
  idValidation,
  bodyValidationEmployee,
  putEmployeeValidation,
  validateCsvData
} from "@middleware/validations";

import authorization from '@middleware/jwt';

import awsUpload, { memmoryUpload } from '@middleware/multers';
import { csvtojsonarray } from '@middleware/csvEmployeeUpdate';

router.get('/',authorization, getEmployee);

router.post("/" , authorization, bodyValidationEmployee, validationErrorMiddleware, postEmployee);

router.put("/:id", authorization, putEmployeeValidation, validationErrorMiddleware, putEmployeeById);

router.delete("/:id", authorization, idValidation, validationErrorMiddleware, deleteEmployeeById); 

router.get("/:id", authorization, idValidation, validationErrorMiddleware, getEmployeeById)

// profileurl for aws releted to employee

router.post( "/profile/:id",authorization, idValidation, validationErrorMiddleware, employeefoundornot, 
  (req:Request, res:Response, next:NextFunction) => {
    awsUpload(req, res, function (err) {
      if (err) {
        return res.status(400).json({ err });
      }
      next();
    });
  },
  postEmployeeProfileById
);

// Bulkinsert Employee with Csv

router.post("/csvupload", authorization,
  (req:Request, res:Response, next:NextFunction) => {
    memmoryUpload(req, res, function (err) {
      if (err) {
        next(err);
        return; 
      }
      next();
    });
  }, 
  csvtojsonarray , validateCsvData , validationErrorMiddleware , postBulkInsertEmployee );

export default router;  