'use client';

import { useToastError } from '@/hooks/useRouterError';
import Link from 'next/link';
import ViewerHeaderIcons from './ViewerHeaderIcons';
import { DEFAULT_IMAGE } from '../../Aside/AsideFormHeader/AsideFormHeaderImage';
import ViewerResumeContainer from '../ViewerResumeContainer';
import ViewerHeaderLinksIcons from './ViewerHeaderLinksIcons';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Resume } from '@/types';
import { SECTION_CONTROL } from '../../_utils/sections';

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
	userId?: string;
}

const ViewerHeader = ({ name, job, location, phone, links, email, image, error, isSectionHidden = false, userId }: ViewerHeaderProps) => {
	useToastError(error);

	const params = useSearchParams();
	const isSelected = params.get('selected');
	const theme = params.get('theme') || Resume.theme.DEFAULT;
	const isDefaultTheme = useMemo(() => theme === Resume.theme.DEFAULT, [theme]);
	const isVerticalTheme = useMemo(() => theme === Resume.theme.VERTICAL, [theme]);

	const imageUrl = useMemo(() => image, [image]);

	return (
		<>
			{!isSectionHidden && (
				<ViewerResumeContainer
					kind={SECTION_CONTROL.HEADER}
					userId={userId}>
					{isVerticalTheme && (
						<span
							aria-hidden
							className='block w-[60%] h-[1px] bg-gray-300 my-3'
						/>
					)}
					<h3 className='text-2xl font-light uppercase'>{name}</h3>
					<p className={cn('text-md font-light uppercase', isVerticalTheme && 'max-w-[65%]')}>{job}</p>
					{image && image !== DEFAULT_IMAGE && (
						<picture
							id='image-container'
							className={cn(
								'w-[100px] h-[100px] absolute top-8 right-8',
								isVerticalTheme && isSelected ? 'top-16 right-[55px]' : isVerticalTheme && 'top-16 right-[80px]'
							)}>
							<img
								src={imageUrl}
								alt='Viewer resume image'
								className='rounded-md'
								crossOrigin='anonymous'
							/>
						</picture>
					)}
					{isDefaultTheme && (
						<span
							aria-hidden
							className='block w-16 h-[1px] bg-gray-800 my-3'
						/>
					)}
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
						className={cn('block h-[1px] bg-gray-300 mt-3', isDefaultTheme && 'w-full', isVerticalTheme && 'w-[60%]')}
					/>
				</ViewerResumeContainer>
			)}
		</>
	);
};

export default ViewerHeader;
