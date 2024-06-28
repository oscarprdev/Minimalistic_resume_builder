'use client';

import ViewerHeaderLinksIcons from './ViewerHeaderLinksIcons';
import { useToastError } from '@/hooks/useRouterError';
import Link from 'next/link';
import ViewerHeaderIcons from './ViewerHeaderIcons';
import { DEFAULT_IMAGE } from '../../Aside/AsideFormHeader/AsideFormHeaderImage';
import ViewerResumeContainer from '../ViewerResumeContainer';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface ViewerHeaderProps {
	name: string;
	job: string;
	location: string;
	phone: string;
	email: string;
	links: string[];
	image?: string;
	error?: string;
	isSectionHidden?: boolean;
}

const ViewerHeader = ({ name, job, location, phone, links, email, image, error, isSectionHidden = false }: ViewerHeaderProps) => {
	useToastError(error);

	const imageUrl = useMemo(() => image, [image]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer>
					<h3 className='text-2xl font-light uppercase'>{name}</h3>
					<p className='text-md font-light uppercase'>{job}</p>
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
					<span
						aria-hidden
						className='block w-16 h-[1px] bg-gray-800 my-3'
					/>
					<div className='flex flex-col space-y-2'>
						<ul
							className={cn(
								'flex gap-4 items-center mt-2',
								`${Array.isArray(links) && links.length === 0 && 'flex-col items-start gap-2'}`
							)}>
							<li className='flex space-x-1 items-center relative'>
								<ViewerHeaderIcons value='location' />
								<p
									id='li-text'
									className='text-xs text-gray-600'>
									{location}
								</p>
							</li>
							<li className='flex space-x-1 items-center relative'>
								<ViewerHeaderIcons value='phone' />
								<p
									id='li-text'
									className='text-xs text-gray-600'>
									{phone}
								</p>
							</li>
							<li className='flex space-x-1 items-center relative'>
								<ViewerHeaderIcons value='email' />
								<p
									id='li-text'
									className='text-xs text-gray-600'>
									{email}
								</p>
							</li>
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
											className='text-xs text-gray-600'>
											{link}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					<span
						aria-hidden
						className='block w-full h-[1px] bg-gray-300 mt-3'
					/>
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerHeader;
