'use client';

import ViewerHeaderLinksIcons from './ViewerHeaderLinksIcons';
import { useRouterError } from '@/hooks/use-router-error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ViewerHeaderIcons from './ViewerHeaderIcons';

interface ViewerHeaderProps {
	name: string;
	job: string;
	location: string;
	phone: string;
	email: string;
	links: string[];
	image?: string;
	error?: string;
}

const ViewerHeader = ({ name, job, location, phone, links, email, image, error }: ViewerHeaderProps) => {
	const router = useRouter();
	useRouterError(router, error);

	return (
		<section className='p-5'>
			<h3 className='text-2xl'>{name}</h3>
			<p className='text-lg text-gray-900'>{job}</p>
			<div className='flex flex-col space-y-2 mt-2'>
				<ul className='flex flex-col space-y-2 items-start'>
					<li className='flex items-center space-x-1'>
						<ViewerHeaderIcons value='location' />
						<p className='text-sm text-gray-700'>{location}</p>
					</li>
					<div className='flex items-center space-x-2 '>
						<li className='flex items-center space-x-1'>
							<ViewerHeaderIcons value='phone' />
							<p className='text-sm text-gray-700'>{phone}</p>
						</li>
						<li className='flex items-center space-x-1'>
							<ViewerHeaderIcons value='email' />
							<p className='text-sm text-gray-700'>{email}</p>
						</li>
					</div>
				</ul>
				{Array.isArray(links) &&
					links.length > 0 &&
					links.map((link) => (
						<ul className='flex flex-col space-y-2'>
							<li className='text-sm text-gray-700 flex items-center space-x-2'>
								<ViewerHeaderLinksIcons value={link} />
								<Link
									href={link}
									target='_blank'>
									{link}
								</Link>
							</li>
						</ul>
					))}
			</div>
		</section>
	);
};

export default ViewerHeader;
