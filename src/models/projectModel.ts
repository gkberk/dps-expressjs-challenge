import { v4 as uuidv4 } from 'uuid';

import db from '../services/db.service';
import { Project } from '../types/project';

export const insertProject = (name: string, description: string) => {
	const id = uuidv4();
	const sql =
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)';
	db.run(sql, { id, name, description });
	return id;
};

export const readProjectById = (id: string) => {
	const sql = 'SELECT * FROM projects WHERE id = @id';
	return db.query(sql, { id })[0] as Project;
};

export const updateProjectById = (
	id: string,
	name?: string,
	description?: string,
) => {
	let sql: string = `UPDATE projects SET`;
	sql += name ? ` name = @name` : ``;
	sql += description ? ` description = @description` : ``;
	sql += ` WHERE id = @id`;
	const args: { description?: string; name?: string; id: string } = { id };
	if (description) {
		args['description'] = description;
	}
	if (name) {
		args['name'] = name;
	}
	return db.run(sql, args);
};

export const deleteProjectById = (id: string) => {
	const sql = 'DELETE FROM projects WHERE id = @id';
	return db.run(sql, { id });
};

export const getAllProjects = () => {
	const sql = 'SELECT * FROM projects';
	return db.query(sql) as Project[];
};
