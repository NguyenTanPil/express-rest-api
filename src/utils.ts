import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getErrorResponse = (res: Response, error: unknown) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		success: false,
		error: error,
	});
};
