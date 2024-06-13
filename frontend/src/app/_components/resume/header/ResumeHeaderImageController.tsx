'use client';

import { useRef } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import ResumeHeaderImagePresentation from './ResumeHeaderImagePresentation';
import { useSearchParams } from 'next/navigation';
import { useResumeImage } from '@/hooks/useResumeImage/useResumeImage';
import { useToastError } from '@/hooks/useToastError/useToastError';

interface ResumeHeaderImageControllerProps<S extends FieldValues> {
	imageUrl?: string;
	form: UseFormReturn<S, any, undefined>;
	name: Path<S>;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}

const ResumeHeaderImageController = <S extends FieldValues>({
	imageUrl,
	form,
	name,
	handleChange,
}: ResumeHeaderImageControllerProps<S>) => {
	const params = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	const {
		previewImage,
		isLoading,
		handleConfirmClick,
		handleRemovePreviewClick,
		handleRemoveClick,
		handleAddImageBoxClick,
		handleInputChange,
	} = useResumeImage({ imageUrl, name, form, params, inputRef, handleChange });

	return (
		<ResumeHeaderImagePresentation
			imageUrl={imageUrl}
			previewImage={previewImage}
			inputRef={inputRef}
			isPending={isLoading}
			handleConfirmClick={handleConfirmClick}
			handleRemovePreviewClick={handleRemovePreviewClick}
			handleRemoveClick={handleRemoveClick}
			handleAddImageBoxClick={handleAddImageBoxClick}
			handleInputChange={handleInputChange}
		/>
	);
};

export default ResumeHeaderImageController;
