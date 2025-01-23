// import express, { NextFunction, Request, Response } from 'express';
import UserController from './user.controller';
import BaseRouter from '../../interfaces/router.inteface';
import { HTTP_METHOD } from '../../enums/http_method.enum';
import isAuthenticate from '../../middleware/authenticate.middleware';

// const router = express.Router();

const UserRouter: BaseRouter = {
	module: 'user',
    middleware: [isAuthenticate],
	detail: [
		{
			path: '/all',
			method: HTTP_METHOD.GET,
			action: UserController.getAllUsers
		}
	]
};

// AuthRouter.forEach((r) => {
// 	router[r.method](r.path, r.action);
// });

// router.post('/register', (req, res, next) => {
// 	AuthController.register(req, res, next);
// });

// router.post('/register', AuthController.register);

// export default router;

export default UserRouter;
