import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IUser {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	dob?: Date;
	location?: string;
}

interface ILoginUser {
	email: string;
	password: string;
}

interface IGetUserAuthInfoRequest extends Request {
	user?: string | JwtPayload;
}

export { IUser, ILoginUser, IGetUserAuthInfoRequest };
