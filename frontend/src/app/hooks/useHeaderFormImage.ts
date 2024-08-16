import { deleteImageAction } from '../actions/resume/delete-header-image';
import { updateHeaderImageAction } from '../actions/resume/update-header-image';
import { DELETE_IMAGE_INPUT_KEYWORD } from '../actions/shared/types';
import { toast } from '../components/ui/use-toast';
import { isError } from '@/lib/types';
import { useResumeHeaderStore } from '@/store/useResumeHeaderStore';
import { useSession } from 'next-auth/react';
import { ChangeEvent, startTransition, useRef, useState } from 'react';

export const DEFAULT_IMAGE = 'https://pub-0e9cd559fbf645019c4e68f378549dc6.r2.dev/default-image.jpeg';
export const MAX_FILE_SIZE_MB = 2;

export const useHeaderFormImage = (resumeId: string, cb: (imgUrl: string) => void) => {
	const { resumeHeader, updateHeader } = useResumeHeaderStore();
	const session = useSession();

	const [imageLoading, setImageLoading] = useState(false);

	const fileInput = useRef<HTMLInputElement>(null);

	const handleBrowseImageClick = () => {
		fileInput.current?.click();
	};

	const updateFormImageValue = async (e: ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const [file] = Array.from(e.target.files!);
			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				return toast({
					description: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
					variant: 'destructive',
				});
			}

			if (!session.data?.user?.id) {
				updateHeader({ ...resumeHeader, image: URL.createObjectURL(file) });
				return cb(URL.createObjectURL(file));
			}

			const formData = new FormData();
			formData.append('image', file, file?.type);

			const response = await updateHeaderImageAction(formData, resumeId);
			if (isError(response)) {
				return toast({
					description: response.error,
					variant: 'destructive',
				});
			}

			return cb(response.success);
		}
	};

	const removeFormImageValue = async () => {
		const response = await deleteImageAction(DELETE_IMAGE_INPUT_KEYWORD.HEADER, resumeId);
		if (isError(response)) {
			return toast({
				description: response.error,
				variant: 'destructive',
			});
		}

		return cb(DEFAULT_IMAGE);
	};

	const handleInputFileChange = async (e: ChangeEvent) => {
		setImageLoading(true);
		await updateFormImageValue(e);

		startTransition(() => {
			if (fileInput.current) {
				fileInput.current.value = '';
			}
			setImageLoading(false);
		});
	};

	const handleRemoveImageClick = async () => await removeFormImageValue();

	return {
		imageLoading,
		fileInput,
		handleInputFileChange,
		handleBrowseImageClick,
		handleRemoveImageClick,
	};
};
