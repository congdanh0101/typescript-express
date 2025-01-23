
import { NextFunction, Request, Response } from 'express';

export default function preHandleRequest(req: Request,
	res: Response,
	next: NextFunction){
        const current = new Date().toUTCString();
        const method = req.method

        return next();
}