import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserRepository from '../repository/UserRepository';
// import { get, merge } from 'lodash';
export default async function isAuthenticate(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const sessionToken = req.header('Authorization');
		if (!sessionToken) {
			throw createHttpError.Unauthorized('Unauthorized');
		}
		const existedUser = await UserRepository.getUserBySessionToken(
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
