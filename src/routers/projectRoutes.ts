import { Router } from 'express';
import {
	getProject,
	listProjects,
	createProject,
	updateProject,
	deleteProject,
} from '../controllers/projectController';

const router = Router();

router.get('/', getProject);
router.get('/list', listProjects);
router.post('/', createProject);
router.put('/', updateProject);
router.delete('/', deleteProject);

export default router;
