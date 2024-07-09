import { Request, Response } from 'express';
import { Report } from '../types/report';
import { Project } from '../types/project';
import {
	insertReport,
	deleteReportById,
	readReportById,
	updateReportById,
	getAllReports,
	getReportsByProjectId,
	deleteReportsByProjectId,
	getReportsWithSpecialWord,
} from '../models/reportModel';
import { readProjectById } from '../models/projectModel';

// Checks if there is a project with the given projectid first. Then creates.
export const createReport = async (req: Request, res: Response) => {
	try {
		const { text, projectid } = req.body;
		const project: Project = readProjectById(projectid);
		if (!project) {
			res.status(400).json({
				message: `Report can't be created, project ${projectid} doesn't exist.`,
			});
		}
		const id: string = insertReport(text, projectid);
		res.status(201).json({ message: `Report created with id ${id}` });
	} catch (error) {
		res.status(500).json({ error: `Server error..` });
	}
};

export const getReport = async (req: Request, res: Response) => {
	const { id } = req.body;
	try {
		const report: Report = readReportById(id);
		if (!report) {
			res.status(404).json({ error: `Report ${id} not found` });
		}
		res.status(200).json({
			message: `Report ${report.id} returned.`,
			report,
		});
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const listReports = async (req: Request, res: Response) => {
	try {
		const reports: Report[] = getAllReports();
		res.status(200).json(reports);
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

// Checks if the report exists first. Then updates.
export const updateReport = async (req: Request, res: Response) => {
	try {
		const { id, text, project_id } = req.body;
		const existingReport: Report = readReportById(id);
		if (!existingReport) {
			return res.status(404).json({ errror: 'Report not found' });
		}
		updateReportById(id, text, project_id);
		res.status(200).json({ message: `Report ${id} updated sucessfully.` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const deleteReport = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const existingReport: Report = readReportById(id);
		if (!existingReport) {
			return res.status(404).json({ message: `Report ${id} not found.` });
		}
		deleteReportById(id);
		return res.status(200).json({ message: `Report ${id} deleted.` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

// Returns all reports of a project.
export const getReportsOfProject = async (req: Request, res: Response) => {
	try {
		const { projectid } = req.body;
		const existingProject: Project = readProjectById(projectid);
		if (!existingProject) {
			return res
				.status(404)
				.json({ message: `Project ${projectid} not found.` });
		}
		const reports: Report[] = getReportsByProjectId(projectid);
		res.status(200).json({
			message: `Reports of ${projectid} returned.`,
			reports,
		});
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

// Deletes all reports of a project.
export const deleteReportsOfProject = async (req: Request, res: Response) => {
	try {
		const { projectid } = req.body;
		const existingProject: Project = readProjectById(projectid);
		if (!existingProject) {
			return res
				.status(404)
				.json({ message: `Project ${projectid} not found.` });
		}
		deleteReportsByProjectId(projectid);
		res.status(200).json({ message: `Reports of ${projectid} deleted.` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

// Returns all reports that contain a given word for more than 3 times.
export const getSpecialReports = async (req: Request, res: Response) => {
	try {
		const { word } = req.body;
		const reports: Report[] = getReportsWithSpecialWord(word);
		res.status(200).json({ message: 'Special reports fetched.', reports });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};
