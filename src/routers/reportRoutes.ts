import { Router } from 'express';
import {
	getReport,
	createReport,
	updateReport,
	deleteReport,
	getSpecialReports,
	deleteReportsOfProject,
	getReportsOfProject,
	listReports,
} from '../controllers/reportController';

const router = Router();

router.get('/', getReport);
router.get('/list', listReports);
router.post('/', createReport);
router.put('/', updateReport);
router.delete('/', deleteReport);
router.get('/special', getSpecialReports);
router.delete('/delete-by-project', deleteReportsOfProject);
router.get('/get-by-project', getReportsOfProject);

export default router;
