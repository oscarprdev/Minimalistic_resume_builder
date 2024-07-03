import { cn } from '@/lib/utils';
import { Resume } from '@/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SectionControl } from '../_utils/sections';

interface ViewerResumeContainerProps {
	title?: string;
	children: React.ReactNode;
	isAside?: boolean;
	kind: SectionControl;
	userId?: string;
}

const ViewerResumeContainer = ({ children, title, isAside, kind, userId }: ViewerResumeContainerProps) => {
	const params = useSearchParams();
	const resume = params.get('resume');
	const theme = params.get('theme') || Resume.theme.DEFAULT;
	const isDefaultTheme = useMemo(() => theme === Resume.theme.DEFAULT, [theme]);

	const link = useMemo(
		() =>
			userId && resume
				? `/builder?resume=${resume}&theme=${theme}&selected=${kind}`
				: userId && !resume
					? `/builder?theme=${theme}&selected=info`
					: `/builder?theme=${theme}&selected=${kind}`,
		[userId, resume, theme, kind]
	);

	return (
		<section className={cn('relative px-5 py-3', isAside && 'px-0 flex flex-col items-center')}>
			<Link href={link}>
				{title && (
					<div className='mb-3'>
						<h3 className={cn('text-lg uppercase', isAside && 'text-md')}>{title}</h3>
						{isDefaultTheme && <span className='block w-10 h-[1px] bg-gray-800' />}
					</div>
				)}
				{children}
				{isAside && (
					<span
						aria-hidden
						className='bg-gray-200 h-[1px] w-[65%] block mt-5'></span>
				)}
			</Link>
		</section>
	);
};

export default ViewerResumeContainer;
