import { IconLoader2 } from '@tabler/icons-react';

interface SectionHeaderProps {
	isLoading: boolean;
	title: string;
}

const SectionHeader = ({ isLoading, title }: SectionHeaderProps) => {
	return (
		<>
			{isLoading && (
				<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
					<IconLoader2 size={20} />
				</span>
			)}
			<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
				{title}
			</p>
		</>
	);
};

export default SectionHeader;
