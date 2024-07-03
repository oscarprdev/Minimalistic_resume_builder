'use server';

import Link from 'next/link';
import { getCallback } from '@/services';
import { isLeft } from '@/lib/either';
import { useUserLogged } from '@/hooks/useUserLogged';
import ResumeListError from './ResumeListError';
import ResumeListContainer from './ResumeListContainer';
import { listResumeAction } from '@/app/actions/resume/list-resume.action';
import Image from 'next/image';
import { IconCircleTriangle } from '@tabler/icons-react';

const ResumeList = async () => {
	const user = await useUserLogged();
	const response = await listResumeAction({
		userId: user?.id || '',
		getCallback,
	});
	if (isLeft(response)) {
		return (
			<ResumeListContainer>
				<ResumeListError error={response.left} />
			</ResumeListContainer>
		);
	}

	return (
		<ResumeListContainer>
			{!isLeft(response) && (
				<ul className='w-full flex flex-wrap'>
					{response.right.map((resume) => (
						<li key={resume.id}>
							<Link
								key={resume.id}
								href={`/builder?resume=${resume.id}&theme=${resume.theme}`}
								className='hover:bg-gray-100 duration-200 flex flex-col gap-2 items-center w-[300px] text-center first-of-type:border-t-transparent p-4 capitalize border border-transparent border-t-gray-100'>
								{resume.image ? (
									<picture className='w-full h-[350px] border border-1 border-gray-100 shadow-md'>
										<Image
											src={resume.image}
											alt='Resume image'
											width={500}
											height={500}
										/>
									</picture>
								) : (
									<div className='w-full h-[350px] grid place-items-center'>
										<div className='flex flex-col items-center gap-2'>
											<IconCircleTriangle
												size={30}
												stroke={1}
												className='text-gray-500'
											/>
											<p className='text-sm'>Resume image not generated yet.</p>
										</div>
									</div>
								)}

								<p className='text-sm text-purple_200'>{resume.title}</p>
							</Link>
						</li>
					))}
				</ul>
			)}
		</ResumeListContainer>
	);
};

export default ResumeList;
