import { IconBrandGithub, IconBrandX } from '@tabler/icons-react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='w-[750px] mx-auto pt-4 pb-10 flex items-center justify-between text-gray-400'>
			<p className='text-sm '>Developed by Oscar Perez Romero</p>
			<div className='flex items-center gap-2'>
				<Link
					href={'https://github.com/oscarprdev'}
					target='blank'
					className='hover:text-gray-600 duration-200'>
					<IconBrandGithub size={20} />
				</Link>
				<Link
					href={'https://github.com/oscarprdev'}
					target='blank'
					className='hover:text-gray-600 duration-200'>
					<IconBrandX size={20} />
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
