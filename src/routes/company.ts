import express from 'express';
const router = express.Router();

import {
  deleteCompanyById,
  getCompany,
  getCompanyById,
  postCompany,
  putCompanyById,
} from '@controllers/companycontroller';

import {
  idValidation,
  postCompanyValidation,
  putCompanyValidation,
  validationErrorMiddleware,
} from '@middleware/validations';

import authorization from '@middleware/jwt';

router.get('/', authorization, getCompany);

router.post('/', authorization, postCompanyValidation, validationErrorMiddleware, postCompany);

router.put('/:id', authorization, putCompanyValidation, validationErrorMiddleware, putCompanyById);

router.delete('/:id', authorization, idValidation, validationErrorMiddleware, deleteCompanyById);

router.get('/:id', authorization, idValidation, validationErrorMiddleware, getCompanyById);

export default router;
