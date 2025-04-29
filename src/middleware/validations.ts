import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const validationErrorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

// JWT Token Validation
export const jwtTokenValidation = [
  body('name').notEmpty().withMessage('Company name is required').isString().trim(),
];

// Param ID validation
export const idValidation = [param('id').isInt({ min: 1 }).withMessage('Invalid user ID')];

// Employee Body Validations - POST
export const bodyValidationEmployee = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Provide valid name with minimum length 3'),

  body('email')
    .notEmpty()
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('Provide valid email address'),

  body('companyId').notEmpty().isInt({ min: 1 }).withMessage('Provide valid companyId'),
];

// Employee Body Validations - PUT
export const putEmployeeValidation = [
  ...idValidation,
  body('name')
    .optional()
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Provide valid name with minimum length 3'),

  body('email')
    .optional()
    .notEmpty()
    .isEmail()
    .trim()
    .normalizeEmail()
    .withMessage('Provide valid email address'),

  body('companyId').optional().notEmpty().isInt({ min: 1 }).withMessage('Provide valid companyId'),
];

// Company POST validation
export const postCompanyValidation = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Provide a valid company name'),

  body('location')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Provide a valid company location'),
];

// Company PUT validation
export const putCompanyValidation = [
  ...idValidation,

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company name cannot be empty')
    .isString()
    .withMessage('Company name must be a string')
    .isLength({ min: 3 })
    .withMessage('Company name must be at least 3 characters long'),

  body('location')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company location cannot be empty')
    .isString()
    .withMessage('Company location must be a string')
    .isLength({ min: 3 })
    .withMessage('Company location must be at least 3 characters long'),

  body('employees').optional().isArray().withMessage('Employees must be an array'),

  body('employees.*.id')
    .if(body('employees').exists())
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),

  body('employees.*')
    .if(body('employees').exists())
    .custom((employee: any) => {
      if (!employee.name && !employee.email) {
        throw new Error('Either employee name or email is required');
      }
      return true;
    }),

  body('employees.*.name')
    .optional()
    .trim()
    .isString()
    .withMessage('Post name must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('Post name must be between 3 and 100 characters'),

  body('employees.*.email')
    .optional()
    .isEmail()
    .withMessage('Provide a valid email address')
    .isLength({ min: 10, max: 100 })
    .withMessage('Email must be between 10 and 100 characters')
    .normalizeEmail(),
];

export const validateCsvData = [
  body('data').isArray({ min: 1 }).withMessage('Data must be a non-empty array'),

  body('data.*.name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

  body('data.*.email').isEmail().withMessage('Invalid email'),

  body('data.*.companyId')
    .isInt({ min: 1 })
    .withMessage('CompanyId must be a Integer')
    .notEmpty()
    .withMessage('CompanyId is required'),
];
