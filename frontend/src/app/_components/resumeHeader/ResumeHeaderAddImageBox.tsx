import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IconPlus } from '@tabler/icons-react';

interface ResumeHeaderAddImageBoxProps {
	onClick: () => void;
}

const ResumeHeaderAddImageBox = ({ onClick }: ResumeHeaderAddImageBoxProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					onClick={onClick}
					type='button'>
					<span className='group-hover/image:bg-gray-100 opacity-0 group-hover:opacity-100 group-hover/image:border-purple_100 group-hover/image:text-purple_200 grid place-items-center size-[128px] rounded-lg border border-dashed border-gray-500 duration-300'>
						<IconPlus
							stroke={1}
							width={20}
						/>
					</span>
				</TooltipTrigger>
				<TooltipContent
					side='bottom'
					className='mb-5'>
					<p>Add image</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ResumeHeaderAddImageBox;
