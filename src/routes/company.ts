import express from 'express';
const router = express.Router();

import {
  deleteCompanyById,
  getCompany,
  getCompanyById,
  createCompany,
  updateCompanyById,
} from '@controllers/companycontroller';

import {
  idValidation,
  createCompanyValidation,
  updateCompanyValidation,
  validationErrorMiddleware,
} from '@middleware/validations';

import authorization from '@middleware/jwt';
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         profileurl:
 *           type: string
 *           nullable: true
 *           example: null

 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: novastrid
 *         location:
 *           type: string
 *           example: madurai
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-28T10:25:41.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-04-28T10:25:41.000Z
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'

 *   securitySchemes:
 *     authToken:                # ✅ Your custom header name for JWT token
 *       type: apiKey
 *       in: header              # ✅ Look for it in headers
 *       name: authorization     # ✅ Header key must be exactly "authorization"
 */

/**
 * @swagger
 * /company/:
 *   get:
 *     summary: Get all companies with their employees
 *     description: Requires an auth token in the `authorization` header
 *     tags:
 *       - Company
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *       401:
 *         description: Unauthorized – Token missing or invalid
 */
router.get('/get', authorization, getCompany);

router.post(
  '/create',
  authorization,
  createCompanyValidation,
  validationErrorMiddleware,
  createCompany
);

router.put(
  'update/:id',
  authorization,
  updateCompanyValidation,
  validationErrorMiddleware,
  updateCompanyById
);

router.delete(
  '/delete/:id',
  authorization,
  idValidation,
  validationErrorMiddleware,
  deleteCompanyById
);

router.get('/getbyid/:id', authorization, idValidation, validationErrorMiddleware, getCompanyById);

export default router;
