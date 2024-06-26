import { Button } from '@/components/ui/button';
import { IconEdit, IconLoader2 } from '@tabler/icons-react';

interface SectionActionsProps {
	loading: boolean;
}

const SectionActions = ({ loading }: SectionActionsProps) => {
	return (
		<div className='flex flex-col items-center space-y-3 h-[150px]'>
			<Button
				type='submit'
				className='w-full'
				disabled={loading}>
				{loading ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}
			</Button>
			<Button
				type='button'
				variant={'clean'}
				disabled={loading}
				className='w-full'>
				{loading ? <IconLoader2 className='animate-spin text-white' /> : 'Remove section'}
			</Button>
		</div>
	);
};

export default SectionActions;
