import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/router.index';
import connectMongoDB from './config/database';
import Router from './router/router.index';

dotenv.config();

class App {
	private express: Application;
	private PORT: number = process.env.SERVER_PORT
		? Number(process.env.SERVER_PORT)
		: 8081;
	private BASE_API_URL: string = process.env.BASE_API_URL as string;
	private DB_CONNECTION_STRING: string = process.env.BASE_API_URL as string;

	constructor() {
		this.express = express();
		this.initialMiddleWare();
		this.initialConnectMongoDB();
		this.initialRouter();
	}

	private initialMiddleWare(): void {
		this.express.use(cookieParser());
		this.express.use(compression());
		this.express.use(morgan('dev'));
		this.express.use(cors({ credentials: true }));
		this.express.use(express.urlencoded({ extended: true }));
		this.express.use(express.json());
	}

	private initialConnectMongoDB(): void {
		connectMongoDB();
	}

	private initialRouter(): void {
		// new Router(this.express, this.BASE_API_URL);
		router(this.express, this.BASE_API_URL);
		// router.initialRouter();
	}

	public listen(): void {
		this.express.listen(this.PORT, () =>
			console.log(`Server is listening http://localhost:${this.PORT}`)
		);
	}
}

export default App;
