'use client';

import ViewerHeaderLinksIcons from './ViewerHeaderLinksIcons';
import { useRouterError } from '@/hooks/use-router-error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ViewerHeaderIcons from './ViewerHeaderIcons';
import Image from 'next/image';
import { DEFAULT_IMAGE } from '../../Aside/AsideFormHeader/AsideFormHeaderImage';
import ViewerResumeContainer from '../ViewerResumeContainer';

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
		<ViewerResumeContainer>
			<h3 className='text-2xl'>{name}</h3>
			<p className='text-lg text-gray-900'>{job}</p>
			{image && image !== DEFAULT_IMAGE && (
				<picture className='w-[100px] h-[100px] absolute top-8 right-8'>
					<Image
						src={image}
						alt='Viewer resume image'
						width={500}
						height={500}
						className='rounded-md object-cover w-full h-full'
					/>
				</picture>
			)}
			<div className='flex flex-col space-y-2 mt-2'>
				<ul className='flex flex-col space-y-2 items-start'>
					<li className='flex items-center space-x-1'>
						<ViewerHeaderIcons value='location' />
						<p className='text-xs text-gray-700'>{location}</p>
					</li>
					<div className='flex items-center space-x-2 '>
						<li className='flex items-center space-x-1'>
							<ViewerHeaderIcons value='phone' />
							<p className='text-xs text-gray-700'>{phone}</p>
						</li>
						<li className='flex items-center space-x-1'>
							<ViewerHeaderIcons value='email' />
							<p className='text-xs text-gray-700'>{email}</p>
						</li>
					</div>
				</ul>
				{Array.isArray(links) &&
					links.length > 0 &&
					links.map((link) => (
						<ul className='flex flex-col space-y-2'>
							<li className='text-xs text-gray-700 flex items-center space-x-2'>
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
		</ViewerResumeContainer>
	);
};

export default ViewerHeader;
