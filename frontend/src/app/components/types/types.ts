import { ReactNode } from 'react';

export enum SectionSelected {
	summary = 'summary',
	experience = 'experience',
	education = 'education',
	skills = 'skills',
	languages = 'languages',
}

export type Section = {
	name: SectionSelected;
	icon: ReactNode;
};
