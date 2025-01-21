import express, { ErrorRequestHandler } from 'express';
// import AuthRouter from './AuthRouter';
import BaseRouter from '../interfaces/router.inteface';
import AuthRouter from '../modules/auth/auth.route';
import dotenv from 'dotenv';
import errorHandler from '../middleware/error.middleware';

dotenv.config();

// export default class Router {
// 	private express: express.Application;
// 	private url: string;
// 	constructor(app: express.Application, url: string) {
// 		this.express = app;
// 		this.url = url;
// 		this.initialRouter();
// 	}

// 	private initialRouter(): void {
// 		this.express.use(`${this.url}/auth`, AuthRouter);
// 	}
// }

const routers: BaseRouter[] = [AuthRouter];

export default function router(app: express.Application, url: string) {
	const router = express.Router();

	routers.forEach((r) => {
		r.detail.forEach((detail) => {
			router[detail.method](detail.path, detail.action);
		});
		app.use(`${url}/${r.module}`, router);
	});

	// app.use(`${url}/auth`, AuthRouter);

	app.use(errorHandler);
}
