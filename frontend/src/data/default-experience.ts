import { Experience } from '@/types';

export const DEFAULT_EXPERIENCE: Experience = {
	id: 'f4dfc6e7-804a-47c9-bb9b-fa95bc9fa31c',
	title: 'Professional Experience',
	jobList: [
		{
			id: 'f4dfc6e7-804a-47c9-bb9b-fa95bc9fa32c',
			title: 'Software Engineer',
			company: 'Tech Innovators Inc.',
			startDate: '2019-01-15',
			endDate: '2021-12-10',
			description:
				'Developed and maintained web applications using JavaScript, React, and Node.js. Collaborated with cross-functional teams to define, design, and ship new features.',
		},
		{
			id: 'a7dfb8c6-507b-46f3-bc1d-1f15bb9d3b2a',
			title: 'Junior Developer',
			company: 'Web Solutions LLC',
			startDate: '2017-06-01',
			endDate: '2018-12-31',
			description:
				'Assisted in the development of client projects, including website and mobile application development. Gained experience in HTML, CSS, and PHP.',
		},
	],
};
