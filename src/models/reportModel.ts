import { v4 as uuidv4 } from 'uuid';

import db from '../services/db.service';
import { Report } from '../types/report';

export const insertReport = (text: string, projectid: string) => {
	const id = uuidv4();
	const sql =
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)';
	db.run(sql, { id, text, projectid });
	return id;
};

export const readReportById = (id: string) => {
	const sql = 'SELECT * FROM reports WHERE id = @id';
	return db.query(sql, { id })[0] as Report;
};

// Partial update possible
export const updateReportById = (
	id: string,
	text: string,
	projectid: string,
) => {
	let sql: string = `UPDATE reports SET`;
	sql += text ? ` text = @text` : ``;
	sql += projectid ? ` projectid = @projectid` : ``;
	sql += ` WHERE id = @id`;
	const args: { text?: string; projectid?: string; id: string } = { id };
	if (text) {
		args['text'] = text;
	}
	if (projectid) {
		args['projectid'] = projectid;
	}
	return db.run(sql, args);
};

export const deleteReportById = (id: string) => {
	const sql = 'DELETE FROM reports WHERE id = @id';
	return db.run(sql, { id });
};

export const getAllReports = () => {
	const sql = 'SELECT * FROM reports';
	return db.query(sql) as Report[];
};

export const getReportsByProjectId = (projectid: string) => {
	const sql = 'SELECT * FROM reports WHERE projectid = @projectid';
	return db.query(sql, { projectid }) as Report[];
};

export const deleteReportsByProjectId = (projectid: string) => {
	const sql = 'DELETE FROM reports WHERE projectid = @projectid';
	return db.run(sql, { projectid });
};

export const getReportsWithSpecialWord = (word: string) => {
	const sql = `SELECT * FROM reports WHERE \
                (LENGTH(text) - LENGTH(REPLACE(LOWER(text), LOWER(@word), ''))) / LENGTH(@word) >= 3;`;
	return db.query(sql, { word }) as Report[];
};
