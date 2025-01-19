// import express, { NextFunction, Request, Response } from 'express';
import AuthController from './auth.controller';
import BaseRouter from '../../interfaces/router.inteface';
import { HTTP_METHOD } from '../../enums/http_method.enum';

// const router = express.Router();

const AuthRouter: BaseRouter = {
	module: 'auth',
	detail: [
		{
			path: '/register',
			method: HTTP_METHOD.POST,
			action: AuthController.register
		},
		{
			path: '/hello',
			method: HTTP_METHOD.GET,
			action: AuthController.helloWord
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

export default AuthRouter;
