'use client';

import { useToastError } from '@/hooks/useRouterError';
import { OptionalLanguage } from '@/store/useResumeLanguagesStore';
import Link from 'next/link';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { Resume } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL } from '../../_utils/sections';

interface ViewerLanguagesProps {
	title: string;
	languageList: OptionalLanguage[];
	error?: string;
	isSectionHidden?: boolean;
	userId?: string;
}

const ViewerLanguages = ({ title, languageList, error, isSectionHidden = false, userId }: ViewerLanguagesProps) => {
	useToastError(error);

	const theme = useSearchParams().get('theme') || Resume.theme.DEFAULT;
	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					title={title}
					isAside={isVerticalTheme}
					kind={SECTION_CONTROL.LANGUAGES}
					userId={userId}>
					{languageList.length > 0 ? (
						<ul className={cn('flex items-center gap-4 flex-wrap -mt-1', isVerticalTheme && 'flex-col')}>
							{languageList.map((lang) => (
								<li
									key={lang.name}
									className='flex flex-col'>
									<p className='text-sm text-gray-700'>{lang.name}</p>
									<p className='text-xs text-gray-600'>{lang.level}</p>
									{lang.certificateLink && (
										<Link
											href={lang.certificateLink}
											target='_blank'
											className='text-xs text-gray-700 underline'>
											{lang.certificateLink}
										</Link>
									)}
								</li>
							))}
						</ul>
					) : (
						<p className='text-xs text-gray-500'>No languages</p>
					)}
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerLanguages;
