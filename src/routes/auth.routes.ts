import express from 'express';
import CreateUserController from '../resources/user/controllers/CreateUserController';
import GenerateTokenController from '../resources/user/controllers/GenerateTokenController';

const authRouter = express.Router();

authRouter.post('/signup', new CreateUserController().create);
authRouter.post('/login', new GenerateTokenController().generate);

export { authRouter };
