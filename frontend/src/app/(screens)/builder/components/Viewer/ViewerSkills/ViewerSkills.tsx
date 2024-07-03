'use client';

import { useToastError } from '@/hooks/useRouterError';
import { OptionalSkill } from '@/store/useResumeSkillsStore';
import ViewerSkillIcon from './ViewerSkillIcon';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { Resume } from '@/types';
import { useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SECTION_CONTROL } from '../../_utils/sections';
import { paramsContext } from '@/providers/ParamsProvider';

interface ViewerSkillsProps {
	title: string;
	skillList: OptionalSkill[];
	error?: string;
	isSectionHidden?: boolean;
	userId?: string;
}

const ViewerSkills = ({ title, skillList, error, isSectionHidden = false, userId }: ViewerSkillsProps) => {
	useToastError(error);
	const { theme } = useContext(paramsContext);

	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					title={title}
					isAside={isVerticalTheme}
					kind={SECTION_CONTROL.SKILLS}
					userId={userId}>
					{skillList.length > 0 ? (
						<ul className={cn('flex gap-2 items-center flex-wrap', isVerticalTheme && 'justify-center w-[80%]')}>
							{skillList.map((skill) => (
								<li
									key={skill.name}
									className='flex space-x-1 items-center relative w-fit'>
									<ViewerSkillIcon value={skill.name} />
									<p
										id='li-text'
										className='text-xs text-gray-700'>
										{skill.name}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className='text-xs text-gray-500'>No skills</p>
					)}
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerSkills;
