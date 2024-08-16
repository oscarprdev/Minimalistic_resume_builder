import { create } from 'zustand';

export enum RESUME_THEME {
	DEFAULT = 'default',
}

export interface ResumeThemeStore {
	theme: RESUME_THEME.DEFAULT;
	updateHeader: (theme: RESUME_THEME) => void;
}

export const useResumeThemeStore = create<ResumeThemeStore>(set => ({
	theme: RESUME_THEME.DEFAULT,
	updateHeader: (theme: RESUME_THEME) => set(() => ({ theme })),
}));
