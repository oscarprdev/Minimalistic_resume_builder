import { Button } from '@/components/ui/button';
import { IconX } from '@tabler/icons-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RemoveLinkButtonProps {
	index: number;
	onRemove: (index: number) => void;
}

const RemoveLinkButton = ({ index, onRemove }: RemoveLinkButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='mt-[0.9rem] -mr-1'>
					<Button
						type='button'
						variant={'outline'}
						size={'icon'}
						className='opacity-0 group-hover:opacity-100 transition duration-300 '
						onClick={() => onRemove(index)}>
						<IconX
							stroke={1}
							width={20}
						/>
					</Button>
				</TooltipTrigger>
				<TooltipContent
					side='left'
					className='mb-5'>
					<p>Remove link</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default RemoveLinkButton;
