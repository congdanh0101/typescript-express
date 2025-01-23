import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repository/UserRepository';

class UserController {
	public getAllUsers = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const listUsers = await UserRepository.getUsers();
			return res.status(200).json(listUsers);
		} catch (error) {
			return next(error);
		}
	};
}

export default new UserController();
