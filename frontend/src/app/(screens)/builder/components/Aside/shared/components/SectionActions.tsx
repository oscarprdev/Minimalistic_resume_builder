import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';

interface SectionActionsProps {
	loading: boolean;
	destructiveLabel?: string;
	isDestructiveCtaDisabled?: boolean;
	isDeleteCtaPending?: boolean;
	onDestructiveClick?: () => void;
}

const SectionActions = ({
	loading,
	destructiveLabel = 'Remove section',
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onDestructiveClick,
}: SectionActionsProps) => {
	return (
		<div className='flex flex-col items-center space-y-3 h-[150px]'>
			<Button
				type='submit'
				className='w-full'
				disabled={loading || isDeleteCtaPending}>
				{loading ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}
			</Button>
			<Button
				type='button'
				variant={'clean'}
				disabled={loading || isDestructiveCtaDisabled}
				onClick={onDestructiveClick}
				className='w-full'>
				{isDeleteCtaPending ? <IconLoader2 className='animate-spin text-purple_200' /> : destructiveLabel}
			</Button>
		</div>
	);
};

export default SectionActions;
