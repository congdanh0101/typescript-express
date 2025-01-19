import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../../dto/UserDTO';
import UserRepository from '../../repository/UserRepository';
import { authentication, random } from '../../helpers';
import AuthService from './auth.service';
import createHttpError from 'http-errors';

class AuthController {
	private readonly authService = new AuthService();

	public register = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const data: UserDto = req.body;
			console.log(data);

			const user = await this.authService.register(data);

			return res.status(200).json(user).end();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	};

	public helloWord = (req: Request, res: Response, next: NextFunction) => {
		return res.status(200).json({ message: 'Hello world' });
	};
}

export default new AuthController();
