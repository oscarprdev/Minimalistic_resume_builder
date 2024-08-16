import { Skill } from '@/types';
import { create } from 'zustand';

export type OptionalSkill = Skill | Omit<Skill, 'id'>;

export interface ResumeSkillsDefaultValues {
	title: string;
	isHidden: boolean;
	skillList: OptionalSkill[];
}

export interface ResumeSkillsStore {
	resumeSkills: ResumeSkillsDefaultValues;
	updateSkills: (skills: ResumeSkillsDefaultValues) => void;
}

export const DEFAULT_SKILLS_VALUES: ResumeSkillsDefaultValues = {
	title: 'Skills',
	isHidden: false,
	skillList: [],
};

export const useResumeSkillsStore = create<ResumeSkillsStore>((set) => ({
	resumeSkills: DEFAULT_SKILLS_VALUES,
	updateSkills: (input: ResumeSkillsDefaultValues) => set((state) => ({ ...state, resumeSkills: { ...input } })),
}));
