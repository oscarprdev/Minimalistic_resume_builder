'use client';

import ResumeHeaderAddImageBox from './ResumeHeaderAddImageBox';
import { ChangeEvent, RefObject } from 'react';
import { FieldValues } from 'react-hook-form';
import ResumeHeaderImage from './ResumeHeaderImage';

interface ResumeHeaderImagePresentationProps<S extends FieldValues> {
	imageUrl?: string;
	previewImage?: string;
	inputRef: RefObject<HTMLInputElement>;
	isPending: boolean;
	handleConfirmClick: () => void;
	handleRemovePreviewClick: () => void;
	handleRemoveClick: () => void;
	handleAddImageBoxClick: () => void;
	handleInputChange: (e: ChangeEvent) => void;
}

const ResumeHeaderImagePresentation = <S extends FieldValues>({
	imageUrl,
	previewImage,
	inputRef,
	isPending,
	handleConfirmClick,
	handleRemovePreviewClick,
	handleRemoveClick,
	handleAddImageBoxClick,
	handleInputChange,
}: ResumeHeaderImagePresentationProps<S>) => {
	const isImageUrlValid = !imageUrl?.includes('empty');

	return (
		<label className='group/image absolute top-10 right-10 cursor-pointer'>
			{isImageUrlValid || previewImage ? (
				<ResumeHeaderImage
					imageUrl={imageUrl}
					previewImage={previewImage}
					isPending={isPending}
					isImageUrlValid={isImageUrlValid}
					handleConfirmClick={handleConfirmClick}
					handleRemovePreviewClick={handleRemovePreviewClick}
					handleRemoveClick={handleRemoveClick}
				/>
			) : (
				<ResumeHeaderAddImageBox onClick={handleAddImageBoxClick} />
			)}
			<input
				ref={inputRef}
				type='file'
				onChange={handleInputChange}
				hidden
			/>
		</label>
	);
};

export default ResumeHeaderImagePresentation;
