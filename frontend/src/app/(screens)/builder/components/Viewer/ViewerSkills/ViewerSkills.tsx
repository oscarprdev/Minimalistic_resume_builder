'use client';

import { useToastError } from '@/hooks/useRouterError';
import { OptionalSkill } from '@/store/useResumeSkillsStore';
import ViewerSkillIcon from './ViewerSkillIcon';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerSkillsProps {
	title: string;
	skillList: OptionalSkill[];
	error?: string;
	isSectionHidden?: boolean;
}

const ViewerSkills = ({ title, skillList, error, isSectionHidden = false }: ViewerSkillsProps) => {
	useToastError(error);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer title={title}>
					{skillList.length > 0 ? (
						<ul className='flex gap-2 items-center flex-wrap'>
							{skillList.map((skill) => (
								<li
									key={skill.name}
									className='flex space-x-1 items-center relative'>
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
