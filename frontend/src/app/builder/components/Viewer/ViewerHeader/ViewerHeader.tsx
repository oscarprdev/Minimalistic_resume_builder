'use client';

import ViewerHeaderLinksIcons from './ViewerHeaderLinksIcons';
import { useRouterError } from '@/hooks/use-router-error';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ViewerHeaderIcons from './ViewerHeaderIcons';
import Image from 'next/image';
import { DEFAULT_IMAGE } from '../../Aside/AsideFormHeader/AsideFormHeaderImage';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { IconMapPin } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef } from 'react';

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

	const hardcodedURL =
		'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/9ec614ac-7984-40d9-983d-158d58e93ee1/5560497d-5b31-4e02-9e55-2e7723c34dc3/312f30d7-bb0e-42e2-b83d-efbd5c9b6215';

	const imageUrl = useMemo(() => image, [image]);

	console.log(imageUrl);

	return (
		<ViewerResumeContainer>
			<h3 className='text-2xl'>{name}</h3>
			<p className='text-lg text-gray-900'>{job}</p>
			{image && image !== DEFAULT_IMAGE && (
				<picture className={cn('w-[100px] h-[100px] absolute top-8 right-8')}>
					<img
						id='image'
						src={imageUrl}
						alt='Viewer resume image'
						className='rounded-md'
						crossOrigin='anonymous'
					/>
				</picture>
			)}
			<div className='flex flex-col space-y-2 mt-2'>
				<ul className='flex flex-col space-y-2 items-start'>
					<li className='flex space-x-1 items-center relative'>
						<ViewerHeaderIcons value='location' />
						<p
							id='li-text'
							className='text-xs text-gray-700'>
							{location}
						</p>
					</li>
					<div className='flex space-x-2 '>
						<li className='flex space-x-1 items-center relative'>
							<ViewerHeaderIcons value='phone' />
							<p
								id='li-text'
								className='text-xs text-gray-700'>
								{phone}
							</p>
						</li>
						<li className='flex space-x-1 items-center relative'>
							<ViewerHeaderIcons value='email' />
							<p
								id='li-text'
								className='text-xs text-gray-700'>
								{email}
							</p>
						</li>
					</div>
				</ul>
				{Array.isArray(links) && links.length > 0 && (
					<ul className='flex flex-col space-y-2'>
						{links.map((link) => (
							<li
								key={link}
								className='flex space-x-1 items-center relative'>
								<ViewerHeaderLinksIcons value={link} />
								<Link
									href={link}
									id='li-text'
									target='_blank'
									className='text-xs text-gray-700'>
									{link}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</ViewerResumeContainer>
	);
};

export default ViewerHeader;
