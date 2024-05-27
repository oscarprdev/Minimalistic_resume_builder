'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconLoader2 } from '@tabler/icons-react';

interface ResumeHeaderImageProps {
	imageUrl?: string;
	previewImage?: string;
	isPending: boolean;
	isImageUrlValid: boolean;
	handleConfirmClick: () => void;
	handleRemovePreviewClick: () => void;
	handleRemoveClick: () => void;
}

const ResumeImage = ({ url }: { url: string }) => {
	return (
		<picture className='size-[128px] rounded-lg'>
			<Image
				src={url}
				alt='Resume image'
				width={800}
				height={800}
			/>
		</picture>
	);
};

const ResumeHeaderImage = ({
	imageUrl,
	previewImage,
	isPending,
	isImageUrlValid,
	handleConfirmClick,
	handleRemovePreviewClick,
	handleRemoveClick,
}: ResumeHeaderImageProps) => {
	return (
		<figure className='group/preview relative'>
			{isPending && (
				<div className='absolute size-[128px] rounded-lg opacity-60 bg-black grid place-items-center'>
					<span className='text-purple_100 animate-spin'>
						<IconLoader2 size={20} />
					</span>
				</div>
			)}
			{imageUrl && isImageUrlValid ? (
				<>
					<ResumeImage url={imageUrl} />
					<div className='absolute top-0 left-[100%] flex flex-col gap-1 p-2 opacity-0 group-hover/preview:opacity-100 duration-300'>
						<Button
							type='button'
							size={'sm'}
							variant={'outline'}
							disabled={isPending}
							onClick={handleRemoveClick}>
							Remove
						</Button>
					</div>
				</>
			) : (
				previewImage && (
					<>
						<ResumeImage url={previewImage} />
						<div className='absolute top-0 left-[100%] flex flex-col gap-1 p-2 opacity-0 group-hover/preview:opacity-100 duration-300'>
							<Button
								type='button'
								size={'sm'}
								disabled={isPending}
								onClick={handleConfirmClick}>
								Confim
							</Button>
							<Button
								type='button'
								size={'sm'}
								variant={'outline'}
								disabled={isPending}
								onClick={handleRemovePreviewClick}>
								Remove
							</Button>
						</div>
					</>
				)
			)}
		</figure>
	);
};

export default ResumeHeaderImage;
