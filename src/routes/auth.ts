import express, { Router } from 'express';

import authController from "../controllers/auth"

let authRouter: Router = express.Router();

/* GET home page. */
authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

export default authRouter