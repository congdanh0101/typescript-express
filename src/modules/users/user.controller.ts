import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';

class UserController {
	private readonly userService = new UserService();

	public getAllUsers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const listUsers = await this.userService.getAllUsers();
			return res.status(200).json(listUsers);
		} catch (error) {
			return next(error);
		}
	};
}

export default new UserController();
