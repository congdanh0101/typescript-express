import { generateAccessToken } from './index';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default class TokenProvider {
	public generateAccessToken = (payload: Record<string, any>) =>
		jwt.sign(payload, process.env.SECRET_KEY_ACCESS_TOKEN as string, {
			expiresIn: '1h',
			algorithm: 'HS512'
		});
	public generateRefreshToken = (payload: Record<string, any>) =>
		jwt.sign(payload, process.env.SECRET_KEY_REFRESH_TOKEN as string, {
			expiresIn: '365d',
			algorithm: 'HS512'
		});
}
