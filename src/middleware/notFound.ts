import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (_: Request, res: Response) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		success: false,
		error: {
			message: 'Route does not exist',
		},
	});
};

export default notFound;
