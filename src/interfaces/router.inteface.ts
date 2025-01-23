import { NextFunction, Request, Response } from 'express';
import { HTTP_METHOD } from '../enums/http_method.enum';

interface DetailBaseRouter {
	path: string;
	method:
		| HTTP_METHOD.GET
		| HTTP_METHOD.POST
		| HTTP_METHOD.PUT
		| HTTP_METHOD.DELETE
		| HTTP_METHOD.PATCH
		| HTTP_METHOD.HEAD
		| HTTP_METHOD.OPTIONS;
	action: (req: Request, res: Response, next: NextFunction) => void;
}

export default interface BaseRouter {
	middleware?: Array<
		(req: Request, res: Response, next: NextFunction) => void
	>;
	module: string;
	detail: DetailBaseRouter[];
}
