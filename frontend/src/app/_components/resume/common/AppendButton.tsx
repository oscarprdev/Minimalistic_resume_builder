import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';

interface AppendButtonProps {
	handleClick: () => void;
	label: string;
}

const AppendButton = ({ handleClick, label }: AppendButtonProps) => {
	return (
		<Button
			type='button'
			variant={'outline'}
			size={'sm'}
			className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300'
			onClick={handleClick}>
			<IconPlus
				stroke={1}
				width={20}
			/>
			{label}
		</Button>
	);
};

export default AppendButton;
