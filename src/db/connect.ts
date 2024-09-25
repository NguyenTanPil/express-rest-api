import mongoose, { connect, ConnectOptions } from 'mongoose';

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
	const options: ConnectOptions = {
		autoIndex: true,
	};
	try {
		await connect(process.env.ATLAS_URI!, options);
		console.log('Connected to database');
	} catch (error: any) {
		console.log('Received an Error ' + error.message);
	}
};

export { connectToDatabase };
