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
		<ViewerResumeContainer>
			<h3 className='font-bold text-lg'>{title}</h3>
			{skillList.length > 0 ? (
				<ul className='flex gap-2 items-center mt-2 flex-wrap'>
					{skillList.map((skill) => (
						<li className='flex items-center space-x-1'>
							<ViewerSkillIcon value={skill.name} />
							<p className='text-sm text-gray-700'>{skill.name}</p>
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
