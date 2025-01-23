import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserRepository from '../modules/users/user.repository';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// import { get, merge } from 'lodash';
export default async function isAuthenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const userRepository = new UserRepository();
		const sessionToken = req.header('Authorization');
		if (!sessionToken) {
			throw createHttpError.Unauthorized('Unauthorized');
		}
		const existedUser = await userRepository.getUserBySessionToken(
			sessionToken
		);
		if (!existedUser) {
			throw createHttpError.Unauthorized('Unauthorized');
		}
		return next();
	} catch (error) {
		return next(error);
	}
}

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const header = req.header('Authorization');
		const accessToken = header && header.split(' ')[1];
		if (!accessToken) throw createHttpError.Unauthorized('Unauthorized');
		jwt.verify(
			accessToken,
			process.env.SECRET_KEY_ACCESS_TOKEN as string,
			(error, user: any) => {
				if (error) {
					throw error;
				}
				// req.user = user;
				res.cookie('user', user['id']);
				console.log(user);
				return next();
			}
		);
	} catch (error) {
		return next(error);
	}
};
