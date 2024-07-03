'use client';

import { SectionControl } from '@/app/(screens)/builder/components/_utils/sections';
import { THEMES } from '@/app/(screens)/builder/components/_utils/themes';
import { Resume } from '@/types';
import { useSearchParams } from 'next/navigation';
import { ReactNode, createContext } from 'react';

type ParamsContext = {
	resumeId?: string;
	theme: Resume.theme;
	selected?: SectionControl;
};

export const paramsContext = createContext<ParamsContext>({
	theme: THEMES.DEFAULT,
});

export const ParamsProvider = ({ children }: { children: ReactNode }) => {
	const params = useSearchParams();

	const resumeId = params.get('resume') || undefined;
	const theme = (params.get('theme') as Resume.theme) || THEMES.DEFAULT;
	const selected = (params.get('selected') as SectionControl) || undefined;

	return <paramsContext.Provider value={{ resumeId, theme, selected }}>{children}</paramsContext.Provider>;
};
