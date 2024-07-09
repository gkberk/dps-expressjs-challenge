import { Request, Response } from 'express';
import { Project } from '../types/project';
import {
	insertProject,
	readProjectById,
	updateProjectById,
	deleteProjectById,
	getAllProjects,
} from '../models/projectModel';
import { deleteReportsByProjectId } from '../models/reportModel';

export const createProject = async (req: Request, res: Response) => {
	try {
		const { name, description } = req.body;
		const id: string = insertProject(name, description);
		res.status(201).json({ message: `Project created with id ${id}` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const getProject = async (req: Request, res: Response) => {
	const { id } = req.body;
	try {
		const project: Project = readProjectById(id);
		if (!project) {
			res.status(404).json({ error: `Project ${id} not found` });
		}
		res.status(200).json({
			message: `Project ${project.id} fetched.`,
			project,
		});
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const listProjects = async (req: Request, res: Response) => {
	try {
		const projects: Project[] = getAllProjects();
		res.status(200).json(projects);
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const updateProject = async (req: Request, res: Response) => {
	try {
		const { id, name, description } = req.body;
		const existingProject: Project = readProjectById(id);
		if (!existingProject) {
			return res.status(404).json({ errror: 'Project not found' });
		}
		updateProjectById(id, name, description);
		res.status(200).json({ message: `Project ${id} updated sucessfully.` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};

export const deleteProject = async (req: Request, res: Response) => {
	try {
		const { id } = req.body;
		const existingProject: Project = readProjectById(id);
		if (!existingProject) {
			return res
				.status(404)
				.json({ message: `Project ${id} not found.` });
		}
		deleteReportsByProjectId(id);
		deleteProjectById(id);
		return res.status(200).json({ message: `Project ${id} deleted.` });
	} catch (error) {
		res.status(500).json({ error: `Server error.` });
	}
};
