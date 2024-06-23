'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalSkill } from '@/store/useResumeSkillsStore';
import { useRouter } from 'next/navigation';
import ViewerSkillIcon from './ViewerSkillIcon';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerSkillsProps {
	title: string;
	skillList: OptionalSkill[];
	error?: string;
}

const ViewerSkills = ({ title, skillList, error }: ViewerSkillsProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
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
				<p>No skills</p>
			)}
		</ViewerResumeContainer>
	);
};

export default ViewerSkills;
