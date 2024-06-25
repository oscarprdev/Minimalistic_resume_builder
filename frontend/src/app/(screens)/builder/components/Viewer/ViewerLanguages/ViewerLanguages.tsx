'use client';

import { useRouterError } from '@/hooks/useRouterError';
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
		<ViewerResumeContainer title={title}>
			{languageList.length > 0 ? (
				<ul className='flex items-center gap-4 flex-wrap -mt-1'>
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
	);
};

export default ViewerLanguages;
