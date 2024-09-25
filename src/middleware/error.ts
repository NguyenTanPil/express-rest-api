import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { getErrorResponse } from '../utils';

const errorHandler: ErrorRequestHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
	return getErrorResponse(res, error);
};

export default errorHandler;
