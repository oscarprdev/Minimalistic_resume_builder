import { UploadImageInput, uploadImage } from '@/app/actions/resume/sections/header/upload-image';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, startTransition, useEffect, useState } from 'react';
import { UseResumeImageInput } from './useResumeImage.types';
import { FieldValues } from 'react-hook-form';
import { useToastError } from '../useToastError/useToastError';

export const useResumeImage = <S extends FieldValues>({ imageUrl, name, form, params, inputRef, handleChange }: UseResumeImageInput<S>) => {
	const [imageFile, setImageFile] = useState<File>();
	const [previewImage, setPreviewImage] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mutate, error, isPending, data } = useMutation({
		mutationFn: (input: UploadImageInput) => uploadImage(input),
		onSuccess: (data) => {
			handleChange(form, name, data);
		},
	});

	useToastError({ error, errorMessage: 'Error uploading image' });

	const clearImageState = () => {
		setPreviewImage(undefined);
		setImageFile(undefined);
	};

	const clearInputValue = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const handleAddImageBoxClick = () => {
		inputRef.current?.click();
	};

	const handleInputChange = (e: ChangeEvent) => {
		const target = e.target;
		if (target instanceof HTMLInputElement) {
			const [file] = Array.from(target.files!);
			const imageUrl = URL.createObjectURL(file);

			startTransition(() => {
				setPreviewImage(imageUrl);
				setImageFile(file);
			});
		}
	};

	const handleConfirmClick = async () => {
		const user = params.get('user');

		if (imageFile && user) {
			const formData = new FormData();
			formData.append(name, imageFile, imageFile?.type);

			setIsLoading(true);
			mutate({ formData, userId: user || '' });
		}
	};

	const handleRemovePreviewClick = () => {
		startTransition(() => {
			clearImageState();
			clearInputValue();
		});
	};

	const handleRemoveClick = () => {
		startTransition(() => {
			setIsLoading(true);
			handleChange(form, name, 'empty');
			clearImageState();
		});
	};

	useEffect(() => {
		clearImageState();
		clearInputValue();
		setIsLoading(false);
	}, [imageUrl]);

	return {
		previewImage,
		isLoading,
		error,
		handleAddImageBoxClick,
		handleInputChange,
		handleConfirmClick,
		handleRemovePreviewClick,
		handleRemoveClick,
	};
};
