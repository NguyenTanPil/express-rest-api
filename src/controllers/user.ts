import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import UserModel from '../models/user';
import { ILoginUser, IUser } from '../types';
import { getErrorResponse } from '../utils';
import { generateToken } from '../middleware/token';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			const payload: IUser = req.body;
			const existingUser = await UserModel.findOne({
				name: payload.name,
			});

			if (existingUser) {
				return res.status(StatusCodes.OK).json({
					success: true,
					error: {
						message: 'User already exists',
					},
				});
			}
			const hashedPassword = await bcrypt.hash(payload.password, 10);
			const user = new UserModel<IUser>({
				...payload,
				password: hashedPassword,
			});
			const newUser = await user.save();
			return res.status(StatusCodes.OK).json({
				success: true,
				data: newUser.toJSON(),
			});
		}

		return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
			success: true,
			error: errors.array(),
		});
	} catch (error) {
		return getErrorResponse(res, error);
	}
};

export const getAllUsers = async (_: Request, res: Response) => {
	const users = await UserModel.find();
	return res.status(StatusCodes.OK).json({
		success: true,
		data: users,
	});
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;
		const existingUser = await UserModel.findOne({
			_id: new mongoose.Types.ObjectId(userId),
		});

		if (existingUser) {
			return res.status(StatusCodes.OK).json({
				success: true,
				data: existingUser.toJSON(),
			});
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			error: {
				message: 'User not found',
			},
		});
	} catch (error) {
		return getErrorResponse(res, error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const _id = new mongoose.Types.ObjectId(req.params.id);
		const existingUser = await UserModel.findOne({
			_id,
		});

		if (existingUser) {
			const payload: IUser = req.body;
			const updatedUser = await UserModel.updateOne({ _id }, { ...payload });

			return res.status(StatusCodes.OK).json({
				success: true,
				data: updatedUser,
			});
		}

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			error: {
				message: 'User not found',
			},
		});
	} catch (error) {
		return getErrorResponse(res, error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const _id = new mongoose.Types.ObjectId(req.params.id);
		const existingUser = await UserModel.findOne({
			_id,
		});

		if (existingUser) {
			await UserModel.deleteOne({ _id });
			return res.status(StatusCodes.OK).json({
				success: true,
				data: {
					message: 'Deleted successfully',
				},
			});
		}

		return res.status(StatusCodes.NOT_FOUND).json({
			success: false,
			error: {
				message: 'User not found',
			},
		});
	} catch (error) {
		return getErrorResponse(res, error);
	}
};

export const login = async (req: Request, res: Response) => {
	const loginUser: ILoginUser = {
		email: req.body.email,
		password: req.body.password,
	};

	try {
		const existingUser = await UserModel.findOne({
			email: loginUser.email,
		});

		if (existingUser) {
			const isCorrectPassword = await bcrypt.compare(loginUser.password, existingUser.password);

			if (isCorrectPassword) {
				const token = generateToken(loginUser);
				return res.status(StatusCodes.OK).json({
					accessToken: token,
				});
			} else {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					success: false,
					error: {
						message: 'Password is incorrect',
					},
				});
			}
		} else {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				error: {
					message: 'User not found',
				},
			});
		}
	} catch (error) {
		return getErrorResponse(res, error);
	}
};
