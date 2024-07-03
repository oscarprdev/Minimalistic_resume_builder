export interface Section {
	label: string;
	control: SectionControl;
}

export type SectionControl = 'info' | 'header' | 'summary' | 'experience' | 'education' | 'languages' | 'skills' | 'themes';
export const SECTION_CONTROL = {
	INFO: 'info' as SectionControl,
	HEADER: 'header' as SectionControl,
	SUMMARY: 'summary' as SectionControl,
	EXPERIENCE: 'experience' as SectionControl,
	EDUCATION: 'education' as SectionControl,
	LANGUAGES: 'languages' as SectionControl,
	SKILLS: 'skills' as SectionControl,
	THEMES: 'themes' as SectionControl,
};

export const SECTIONS: Section[] = [
	{
		label: 'Resume config',
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
	{
		label: 'Themes',
		control: SECTION_CONTROL.THEMES,
	},
];
