import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user';
import { createValidator } from '../middleware/validation';

const userRouter = Router();

userRouter.post('/', createValidator, createUser).get('/', getAllUsers);

userRouter.get('/:id', getUser).patch('/:id', updateUser).delete('/:id', deleteUser);

export default userRouter;
