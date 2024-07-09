import { Report } from './report';
export interface Project {
	id: string;
	name: string;
	description: string;
	reports?: Report[];
}
