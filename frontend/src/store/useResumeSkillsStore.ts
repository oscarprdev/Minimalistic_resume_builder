import { defaultResume } from '@/data/default-resume';
import { Skills } from '@/types';
import { create } from 'zustand';

export type ResumeSkillsDefaultValues = Omit<Skills, 'id'>;

export interface ResumeSkillsStore {
	resumeSkills: ResumeSkillsDefaultValues;
	updateSkills: (skills: ResumeSkillsDefaultValues) => void;
}

export const useResumeSkillsStore = create<ResumeSkillsStore>(set => ({
	resumeSkills: defaultResume.skills,
	updateSkills: (input: ResumeSkillsDefaultValues) => set(state => ({ ...state, resumeSkills: { ...input } })),
}));
