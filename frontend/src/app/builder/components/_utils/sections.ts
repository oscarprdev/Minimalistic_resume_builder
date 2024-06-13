export interface Section {
	label: string;
	control: SectionControl;
}

export type SectionControl = 'info' | 'header' | 'summary' | 'experience' | 'education' | 'languages' | 'skills';
export const SECTION_CONTROL: Record<string, SectionControl> = {
	INFO: 'info',
	HEADER: 'header',
	SUMMARY: 'summary',
	EXPERIENCE: 'experience',
	EDUCATION: 'education',
	LANGUAGES: 'languages',
	SKILLS: 'skills',
};

export const SECTIONS: Section[] = [
	{
		label: 'Resume information',
		control: SECTION_CONTROL.INFO,
	},
	{
		label: 'Personal information',
		control: SECTION_CONTROL.HEADER,
	},
	{
		label: 'Professional summary',
		control: SECTION_CONTROL.SUMMARY,
	},
	{
		label: 'Experience',
		control: SECTION_CONTROL.EXPERIENCE,
	},
	{
		label: 'Education',
		control: SECTION_CONTROL.EDUCATION,
	},
	{
		label: 'Languages',
		control: SECTION_CONTROL.LANGUAGES,
	},
	{
		label: 'Skills',
		control: SECTION_CONTROL.SKILLS,
	},
];
