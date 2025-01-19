import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connectMongoDB() {
	try {
		mongoose.Promise = Promise;
		mongoose.set('strictQuery', false);
		mongoose.connect(process.env.DB_CONNECTION_STRING as string);
		mongoose.connection.on('error', (error: Error) => console.log(error));
		console.log(`Connect successfully`);
	} catch (error) {
		console.log(error);
		console.log(`Connect Failure`);
	}
}

export default connectMongoDB;
