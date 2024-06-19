import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import { IconLoader2 } from '@tabler/icons-react';
import Image from 'next/image';
import { ChangeEvent, startTransition, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface AsideFormHeaderImageProps {
	form: UseFormReturn<ResumeHeaderDefaultValues, any, undefined>;
	updateFormImageValue: (e: ChangeEvent) => Promise<void>;
	removeFormImageValue: () => Promise<void>;
}

export const DEFAULT_IMAGE = 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/default-image.jpeg';
export const MAX_FILE_SIZE_MB = 2;

const AsideFormHeaderImage = ({ form, updateFormImageValue, removeFormImageValue }: AsideFormHeaderImageProps) => {
	const [loading, setLoading] = useState(false);
	const fileInput = useRef<HTMLInputElement>(null);
	const currentImage = form.watch('image');

	const handleBrowseImageClick = () => {
		fileInput.current?.click();
	};

	const handleInputFileChange = async (e: ChangeEvent) => {
		setLoading(true);
		await updateFormImageValue(e);

		startTransition(() => {
			if (fileInput.current) {
				fileInput.current.value = '';
			}
			setLoading(false);
		});
	};

	const handleRemoveImageClick = async () => await removeFormImageValue();

	return (
		<div className='flex flex-col space-y-2 w-[140px]'>
			<picture className='relative rounded-md w-full h-[140px]'>
				{loading && (
					<div className={cn('absolute size-[140px] rounded-full opacity-60 bg-black grid place-items-center')}>
						<span className='text-purple_100 animate-spin'>
							<IconLoader2 size={20} />
						</span>
					</div>
				)}
				<Image
					src={currentImage || DEFAULT_IMAGE}
					alt='Resume image'
					width={600}
					height={600}
					className='rounded-full w-full h-full object-cover '
				/>
			</picture>

			<input
				ref={fileInput}
				type='file'
				accept='image/png, image/jpeg, image/webp'
				hidden
				onChange={handleInputFileChange}
			/>
			<Button
				type='button'
				variant={'outline'}
				onClick={() => handleBrowseImageClick()}>
				Browse image
			</Button>
			<Button
				type='button'
				variant={'clean'}
				onClick={() => handleRemoveImageClick()}>
				Remove image
			</Button>
		</div>
	);
};

export default AsideFormHeaderImage;
