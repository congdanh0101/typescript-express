import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export default function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
): any {
	return res.status(error.status || 500).json({
		success: false,
		message: error.message,
		timestamp: new Date().toLocaleString(),
		method: req.method,
		path: req.url
	});
}
