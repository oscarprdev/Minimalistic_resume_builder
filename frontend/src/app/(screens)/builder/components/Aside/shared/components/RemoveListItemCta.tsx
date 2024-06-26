import { Button } from '@/components/ui/button';
import { IconPlaylistX } from '@tabler/icons-react';

interface RemoveListItemCtaProps {
	onClick: () => void;
	label: string;
}

const RemoveListItemCta = ({ onClick, label }: RemoveListItemCtaProps) => {
	return (
		<Button
			type='button'
			className='w-fit self-start pl-0'
			variant={'clean'}
			onClick={onClick}>
			<IconPlaylistX
				stroke={1}
				size={20}
			/>
			{label}
		</Button>
	);
};

export default RemoveListItemCta;
