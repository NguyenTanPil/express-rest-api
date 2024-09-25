import { model, Schema } from 'mongoose';
import { IUser } from 'src/types';

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: String,
		dob: Date,
		location: String,
	},
	{ timestamps: true, collection: 'users' },
);

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
