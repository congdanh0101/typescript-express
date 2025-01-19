import createHttpError from 'http-errors';
import { UserDto } from '../../dto/UserDTO';
import UserRepository from '../../repository/UserRepository';
import { authentication, random } from '../../helpers';
import { User } from '../../model/Users';

class AuthService {
	public register = async (userDto: UserDto) => {
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
}

export default AuthService;
