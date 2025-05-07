import express from 'express';
import { loginToken } from '@middleware/jwt';
import { jwtTokenValidation, validationErrorMiddleware } from '@middleware/validations';
import { htmlt2pdf } from '@middleware/html2pdf';

const router = express.Router();
router.get('/', function (req, res) {
  res.status(200).send('Express is working !!!');
});

router.post('/', jwtTokenValidation, validationErrorMiddleware, loginToken);

router.post('/html', htmlt2pdf);

export default router;
