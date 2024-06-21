'use client';

import { useRouterError } from '@/hooks/use-router-error';
import { OptionalLanguage } from '@/store/useResumeLanguagesStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ViewerResumeContainer from '../ViewerResumeContainer';

interface ViewerLanguagesProps {
	title: string;
	languageList: OptionalLanguage[];
	error?: string;
}

const ViewerLanguages = ({ title, languageList, error }: ViewerLanguagesProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<ViewerResumeContainer>
			<h3 className='font-bold text-lg'>{title}</h3>
			{languageList.length > 0 ? (
				<ul className='flex items-center gap-2 mt-2 flex-wrap'>
					{languageList.map((lang) => (
						<li
							key={lang.name}
							className='flex flex-col'>
							<p className='text-sm text-gray-700'>{lang.name}</p>
							<p className='text-sm text-gray-700'>{lang.level}</p>
							{lang.certificateLink && (
								<Link
									href={lang.certificateLink}
									target='_blank'
									className='text-sm text-gray-700 underline'>
									{lang.certificateLink}
								</Link>
							)}
						</li>
					))}
				</ul>
			) : (
				<p>No languages</p>
			)}
		</ViewerResumeContainer>
	);
};

export default ViewerLanguages;
