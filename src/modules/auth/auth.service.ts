import createHttpError from 'http-errors';
import { UserDto } from '../../dto/UserDTO';
import UserRepository from '../../repository/UserRepository';
import { authentication, random } from '../../helpers';
import { User } from '../../model/Users';
import { RegisterRequest } from '../../dto/auth/register.request';
import { RegisterResponse } from '../../dto/auth/register.response';
import { LoginRequest } from '../../dto/auth/login.request';

class AuthService {
	public register = async (userDto: RegisterRequest) => {
		try {
			console.log('Auth service');
			if (!userDto.email || !userDto.password || !userDto.username) {
				throw createHttpError.BadRequest('please input data');
			}
			const existedUser = await UserRepository.getUserByEmail(
				userDto.email
			);

			if (existedUser) {
				throw createHttpError.BadRequest(
					'email was existed, please try another email'
				);
			}

			const salt = random();
			// userDto.salt = salt;
			// userDto.password = authentication(salt, userDto.password);
			const saved = new User({
				email: userDto.email,
				username: userDto.username,
				authentication: {
					salt: salt,
					password: authentication(salt, userDto.password)
				}
			}).save();
			// const user = await UserRepository.createUser({
			// 	email: userDto.email,
			// 	username: userDto.username,
			// 	authentication: {
			// 		salt: salt,
			// 		password: authentication(salt, userDto.password)
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

			const existedUser = await UserRepository.getUserByEmail(
				loginRequest.email
			).select('+authentication.salt + authentication.password');
			console.log(existedUser);
			if (!existedUser) {
				throw createHttpError.BadRequest(
					'Email or password is invalid, please try again!'
				);
			}

			const expectedHash = authentication(
				existedUser.authentication?.salt ?? '',
				loginRequest.password
			);

			console.log(`expected hash ${expectedHash}`);

			if (existedUser.authentication?.password !== expectedHash) {
				throw createHttpError.BadRequest(
					'Email or password is invalid, please try again!'
				);
			}

			const salt = random();
			existedUser.authentication.sessionToken = authentication(
				salt,
				existedUser._id.toString()
			);
			console.log(existedUser);

			await existedUser.save();
			console.log(existedUser);

			return existedUser;
		} catch (error) {
			throw error;
		}
	};
}

export default AuthService;
