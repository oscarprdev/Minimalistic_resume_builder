import { cn } from '@/lib/utils';
import { Resume } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface ViewerResumeContainerProps {
	title?: string;
	children: React.ReactNode;
	isAside?: boolean;
}

const ViewerResumeContainer = ({ children, title, isAside }: ViewerResumeContainerProps) => {
	const params = useSearchParams();
	const theme = params.get('theme') || Resume.theme.DEFAULT;
	const isDefaultTheme = useMemo(() => theme === Resume.theme.DEFAULT, [theme]);

	return (
		<section className={cn('relative px-5 py-3', isAside && 'px-0 flex flex-col items-center')}>
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
		</section>
	);
};

export default ViewerResumeContainer;
