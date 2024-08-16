'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
	'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/woman.png',
	'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/man.png',
];

const getRandomImage = () => {
	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
};

const ResumeLandingSection = () => {
	const [randomImage, setRandomImage] = useState(getRandomImage());

	useEffect(() => {
		setRandomImage(getRandomImage());
	}, []);

	return (
		<div className='flex flex-col items-center text-center gap-2 h-[300px] w-full max-w-[600px]'>
			<Image
				src={randomImage}
				alt='Random landing image'
				width={500}
				height={500}
				className='object-contain h-[230px]'
			/>
			<p
				data-testid='landing-text'
				className='uppercase text-2xl'>
				Relax & start building your minimalistic resume now!
			</p>
		</div>
	);
};

export default ResumeLandingSection;
