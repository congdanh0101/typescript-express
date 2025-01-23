import createHttpError from 'http-errors';
import { User } from '../../model/Users';
import { RegisterRequest } from '../../dto/auth/register.request';
import { RegisterResponse } from '../../dto/auth/register.response';
import { LoginRequest } from '../../dto/auth/login.request';
import UserRepository from '../users/user.repository';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import TokenProvider from '../../helpers/token.helper';

dotenv.config();
class AuthService {
	private readonly userRepository = new UserRepository();
	private readonly tokenProvider = new TokenProvider();
	public register = async (registerRequest: RegisterRequest) => {
		try {
			if (
				!registerRequest.email ||
				!registerRequest.password ||
				!registerRequest.username
			) {
				throw createHttpError.BadRequest('please input data');
			}
			const existedUser = await this.userRepository.getUserByEmail(
				registerRequest.email
			);

			if (existedUser) {
				throw createHttpError.BadRequest(
					'email was existed, please try another email'
				);
			}
			// registerRequest.salt = salt;
			// registerRequest.password = authentication(salt, registerRequest.password);
			const saved = new User(
				// email: registerRequest.email,
				// username: registerRequest.username,
				// password: registerRequest.password
				// // password: bcrypt.hashSync(registerRequest.password,process.env.SECRET_KEY_HASH_PASSWORD as string)
				// authentication: {
				// 	salt: salt,
				// 	password: authentication(salt, registerRequest.password)
				// }
				registerRequest
			).save();

			// const user = await UserRepository.createUser({
			// 	email: registerRequest.email,
			// 	username: registerRequest.username,
			// 	authentication: {
			// 		salt: salt,
			// 		password: authentication(salt, registerRequest.password)
			// 	}
			// });

			return saved;
		} catch (error) {
			throw error;
		}
	};

	public login = async (loginRequest: LoginRequest) => {
		try {
			if (!loginRequest.email || !loginRequest.password) {
				throw createHttpError.BadRequest(
					'Please input email or password'
				);
			}

			const existedUser = await this.userRepository
				.getUserByEmail(loginRequest.email)
				.select('+password');
			if (
				!existedUser ||
				!bcrypt.compareSync(
					loginRequest.password,
					existedUser.password ?? ''
				)
			) {
				throw createHttpError.BadRequest(
					'Email or password is invalid, please try again!'
				);
			}

			// const expectedHash = authentication(
			// 	existedUser.authentication?.salt ?? '',
			// 	loginRequest.password
			// );

			// if (existedUser.authentication?.password !== expectedHash) {
			// 	throw createHttpError.BadRequest(
			// 		'Email or password is invalid, please try again!'
			// 	);
			// }

			// const salt = random();
			// existedUser.authentication.sessionToken = authentication(
			// 	salt,
			// 	existedUser._id.toString()
			// );

			// await existedUser.save();
			const token = {
				access_token: this.tokenProvider.generateAccessToken({
					username: existedUser.username,
					email: existedUser.email,
					id: existedUser._id
				}),
				refresh_token: this.tokenProvider.generateRefreshToken({
					username: existedUser.username,
					email: existedUser.email,
					id: existedUser._id
				})
			};
			return { user: existedUser, token };
		} catch (error) {
			throw error;
		}
	};
}

export default AuthService;
