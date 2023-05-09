import express, { Request, Response } from 'express';
import { body } from "express-validator"
import { Password } from '../../services/password';
import { BadRequestError, validateRequest } from '@arshpackages/common';
import { User } from '../models/user';
import jwt from "jsonwebtoken"

const router = express.Router();
const name = "333"
router.post('/api/users/signin',
[
  body("email")
  .isEmail()
  .withMessage("Enter valid Email"),
  body("password")
  .trim()
  .notEmpty()
  .withMessage("Enter password")

],validateRequest,
 async (req: Request, res: Response) => {
  
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })

  if(!existingUser){
    throw new BadRequestError("Invalid credentials")
  }
  const validPassword = await Password.compare(existingUser.password, password)
  
  if(!validPassword){
    throw new BadRequestError("Invalid credentials1")
  }
  const userJwt = jwt.sign({id: existingUser.id, email: existingUser.email},process.env.JWT_KEY!)

  req.session = { jwt: userJwt }

  res.status(200).send(existingUser);
});

export { router as signinRouter };
