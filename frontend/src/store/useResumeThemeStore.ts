import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum RESUME_THEME {
	DEFAULT = 'default',
}

export interface ResumeThemeStore {
	theme: RESUME_THEME;
	updateTheme: (theme: RESUME_THEME) => void;
}

export const useResumeThemeStore = create<ResumeThemeStore>()(
	persist(
		set => ({
			theme: RESUME_THEME.DEFAULT,
			updateTheme: (theme: RESUME_THEME) => set(() => ({ theme })),
		}),
		{
			name: 'resume-theme-storage',
		}
	)
);
