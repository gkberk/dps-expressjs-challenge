import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routers/projectRoutes';
import reportRoutes from './routers/reportRoutes';
import { authenticate } from './middleware/authentication';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authenticate);

app.use('/projects', projectRoutes);
app.use('/reports', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('', (req: Request, res: Response) => {
	res.send('Hello World!');
});
