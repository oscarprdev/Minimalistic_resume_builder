import { Button } from '@/components/ui/button';
import { IconX } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RemoveItemButtonProps {
	index: number;
	text: string;
	onRemove: (index: number) => void;
}

const RemoveItemButton = ({ index, text, onRemove }: RemoveItemButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button
						asChild
						type='button'
						variant={'outline'}
						size={'icon'}
						className='opacity-0 group-hover:opacity-100 transition duration-300 '
						onClick={() => onRemove(index)}>
						<IconX
							stroke={1}
							width={18}
							height={18}
						/>
					</Button>
				</TooltipTrigger>
				<TooltipContent side='left'>
					<p>{text}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default RemoveItemButton;
