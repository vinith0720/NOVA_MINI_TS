import express from 'express';
import { loginToken } from '@middleware/jwt';
import { jwtTokenValidation, validationErrorMiddleware } from '@middleware/validations';
import { htmlt2pdf } from '@middleware/html2pdf';

const router = express.Router();
router.get('/', function (req, res) {
  res.status(200).send('Express is working !!!');
});
/**
 * @swagger
 * components:
 *   schemas:
 *     Name:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: novastrid
 *
 *     Token:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Get JWT token
 *     description: Authenticates a company by name and returns a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Name'
 *     responses:
 *       '200':
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       '404':
 *         description: Company not found
 */
router.post('/', jwtTokenValidation, validationErrorMiddleware, loginToken);

router.post('/html', htmlt2pdf);

export default router;
