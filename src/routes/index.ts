import express from 'express';
import { loginToken } from '@middleware/jwt';
import { jwtTokenValidation, validationErrorMiddleware } from '@middleware/validations';

const router = express.Router();
router.get('/', function (req, res) {
  res.status(200).send('Express is working !!!');
});

router.post('/', jwtTokenValidation, validationErrorMiddleware, loginToken);

export default router;
