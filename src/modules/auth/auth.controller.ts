import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../../dto/UserDTO';

import AuthService from './auth.service';
import createHttpError from 'http-errors';
import { RegisterRequest } from '../../dto/auth/register.request';
import { RegisterResponse } from '../../dto/auth/register.response';
import { LoginRequest } from '../../dto/auth/login.request';

class AuthController {
	private readonly authService = new AuthService();
	public register = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const data: RegisterRequest = req.body;
			console.log(data);

			const user = await this.authService.register(data);

			const resBody: RegisterResponse = user as RegisterResponse;
			console.log(`response body ${resBody}`);
			// console.log(`username ${resBody.username}`);
			// console.log(`email ${resBody.email}`);
			// console.log(`authentication ${resBody.authentication}`);
			return res.status(200).json(resBody).end();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	};

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data: LoginRequest = req.body;
			return res
				.status(200)
				.json(await this.authService.login(data))
				.end();
		} catch (error) {
			return next(error);
		}
	};

	public helloWord = (req: Request, res: Response, next: NextFunction) => {
		return res.status(200).json({ message: 'Hello world' });
	};
}

export default new AuthController();
