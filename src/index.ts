import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/connect';
import userRouter from './routes/user';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.POST || 3000;

const main = async () => {
	// connect to database
	await connectToDatabase();

	// initialize app
	const app = express();

	app.use(express.json());
	app.use(notFound);
	app.use(errorHandler);

	// routers
	app.use('/api/v1/users', userRouter);

	app.get('/', (_, res) => {
		res.send('This is express');
	});

	app.listen(PORT, () => {
		console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
	});
};

main().catch((error) => console.log(error.message));
