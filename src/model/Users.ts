import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const UserSchema = new mongoose.Schema({
	username: { type: String, require: true },
	email: { type: String, require: true },
	// authentication: {
	// 	password: { type: String, require: true, select: false },
	// 	salt: { type: String, require: true, select: false },
	// 	sessionToken: { type: String, select: false }
	// }
	password: { type: String, require: true, select: false }
});
UserSchema.pre('save', function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = bcrypt.hashSync(
			user.password ?? '',
			Number(process.env.SECRET_KEY_SALT_ROUND_HASH_PASSWORD)
		);
	}
	next();
});
export const User = mongoose.model('User', UserSchema);

// export const getUsers = () => User.find();
// export const getUserByEmail = (email: string) => User.findOne({ email });
// export const getUserBySessionToken = (sessionToken: string) =>
//     User.findOne({
//         'authentication.sessionToken': sessionToken
//     });
// export const getUserById = (id: string) => User.findById(id);
// export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id });
// export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate(id, values);
