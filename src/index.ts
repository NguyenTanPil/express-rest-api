import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/connect';
import userRouter from './routes/user';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';
import { authenticateToken } from './middleware/token';
import { IGetUserAuthInfoRequest } from './types';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.POST || 3000;

const main = async () => {
	// connect to database
	await connectToDatabase();

	// initialize app
	const app = express();

	app.use(express.json());
	app.use(errorHandler);

	// routers
	app.use('/api/v1/users', userRouter);
	app.get('/api/v1/protected', authenticateToken, (req: IGetUserAuthInfoRequest, res) => {
		res.json({
			success: true,
			message: 'Welcome to the protected route!',
			user: req.user,
		});
	});
	// not found route
	app.use(notFound);

	app.get('/', (_, res) => {
		res.send('This is express');
	});

	app.listen(PORT, () => {
		console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
	});
};

main().catch((error) => console.log(error.message));
