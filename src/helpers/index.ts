import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

// export const random = () => crypto.randomBytes(128).toString('base64');
// export const authentication = (salt: string, password: string) => {
// 	return crypto
// 		.createHmac('sha256', [salt, password].join('/'))
// 		.update(process.env.SECRET_KEY_HASH_PASSWORD as string)
// 		.digest('hex');
// };


export const generateAccessToken = (payload : object) =>{
	jwt.sign(payload,process.env.SECRET_KEY_ACCESS_TOKEN as string,{
		
	})
}