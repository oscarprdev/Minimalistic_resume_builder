import { cn } from '@/lib/utils';
import { Resume } from '@/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface LabelWithIconProps {
	icon: React.ReactNode;
	label: string;
	isAside?: boolean;
}

const LabelWithIcon = ({ label, icon, isAside }: LabelWithIconProps) => {
	const theme = useSearchParams().get('theme') || Resume.theme.DEFAULT;
	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	return (
		<div className={cn('w-full flex items-center justify-between', isVerticalTheme && isAside && 'flex-col')}>
			<div
				className={cn('flex space-x-1 items-center relative ml-1', isVerticalTheme && isAside && 'ml-[0.22rem] relative justify-center')}>
				{icon}
				<p
					id={!isAside ? 'li-title' : ''}
					className={cn('uppercase text-sm', isAside && 'text-xs max-w-[75%]')}>
					{label}
				</p>
			</div>
		</div>
	);
};

export default LabelWithIcon;
