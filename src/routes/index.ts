import express from "express";
var router = express.Router();
import { loginToken } from "@middleware/jwt";
import { jwtTokenValidation, validationErrorMiddleware } from "@middleware/validations";
import db from "@models/index";

const {Company,Employee} = db;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send('Express is working !!!')
});


router.post("/", jwtTokenValidation, validationErrorMiddleware,loginToken);

export default router;
