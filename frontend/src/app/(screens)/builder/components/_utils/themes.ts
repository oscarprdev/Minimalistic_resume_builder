import { Resume } from '@/types';

export interface Themes {
	DEFAULT: Resume.theme;
	VERTICAL: Resume.theme;
}
export const THEMES: Themes = {
	DEFAULT: Resume.theme.DEFAULT,
	VERTICAL: Resume.theme.VERTICAL,
} as const;
