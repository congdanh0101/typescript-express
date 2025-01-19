import { User } from '../model/Users';
class UserRepository {
	getUsers = () => User.find();

	getUserByEmail = (email: string) => User.findOne({ email });

	getUserBySessionToken = (sessionToken: string) =>
		User.findOne({
			'authentication.sessionToken': sessionToken
		});
	getUserById = (id: string) => User.findById(id);

	createUser = (values: Record<string, any>) =>
		new User(values).save().then((user) => user.toObject());

	deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });

	updateUserById = (id: string, values: Record<string, any>) =>
		User.findByIdAndUpdate(id, values);
}

export default new UserRepository();
