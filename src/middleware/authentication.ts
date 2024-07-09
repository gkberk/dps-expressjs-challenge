import { Request, Response, NextFunction } from 'express';

const authToken = 'Password123';

export const authenticate = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers['authorization'];

	if (token === authToken) {
		next();
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}
};
