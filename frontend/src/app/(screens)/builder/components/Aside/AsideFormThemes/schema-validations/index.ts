import { z } from 'zod';
import { THEMES } from '../../../_utils/themes';
import { Resume } from '@/types';

export type FormThemesValues = z.infer<typeof asideFormThemesSchema>;

export interface FormThemesDefaultValues {
	theme: Resume.theme;
}

export const asideFormThemesSchema = z.object({
	theme: z.enum([Resume.theme.DEFAULT, Resume.theme.VERTICAL]),
});

export const THEMES_CONTROLLER = [
	{
		label: 'Default',
		image: 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Theme-default.png',
		kind: THEMES.DEFAULT,
	},
	{
		label: 'Vertical',
		image: 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/Theme-default.png',
		kind: THEMES.VERTICAL,
	},
];
