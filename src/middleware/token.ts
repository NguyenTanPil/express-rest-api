import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { IGetUserAuthInfoRequest, ILoginUser } from '../types';

export const generateToken = (payload: ILoginUser) => {
	const options = {
		expiresIn: '1h',
	};

	const token = jwt.sign(payload, process.env.JWT_KEY!, options);

	return token;
};

export const authenticateToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): any => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (token === null || token === undefined) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			success: false,
			error: {
				message: 'Unauthorized',
			},
		});
	} else {
		jwt.verify(token, process.env.JWT_KEY!, (error, user): any => {
			if (error) {
				return res.status(StatusCodes.FORBIDDEN).json({
					success: false,
					error: {
						message: 'Missing JWT token',
					},
				});
			} else {
				req.user = user;
				next();
			}
		});
	}
};
