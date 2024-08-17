import { Button } from '../components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ButtonTooltipProps = {
	onClick: () => void;

	label: string;
	side: 'right' | 'bottom' | 'left';
	children: ReactNode;
	className?: string;
};

const ButtonTooltip = ({ onClick, label, side, children, className }: ButtonTooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						size={'sm'}
						className={cn(
							className,
							'group bg-zinc-100/50 hover:bg-zinc-200/50 p-2 border shadow-sm w-fit'
						)}
						onClick={onClick}>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side={side}>
					<p className="text-xs">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ButtonTooltip;
