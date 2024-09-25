import { body } from 'express-validator';

export const createValidator = [
	body('name', 'Username does not empty').not().isEmpty(),
	body('name', 'Username must least 3 characters').isLength({ min: 3 }),
	body('email', 'Invalid email address').isEmail(),
	body('dob', 'Invalid birth date').optional().isISO8601(),
];
