import { postCallback } from '@/services';
import { Form } from '@/components/ui/form';
import FormSectionHiddenSwitch from './FormSectionHiddenSwitch';
import { UseFormReturn } from 'react-hook-form';
import { FormEvent, ReactNode, useContext } from 'react';
import { useCaptureResumeImage } from '@/hooks/useCaptureResumeImage';
import { Resume } from '@/types';
import { updateResumeImageAction } from '@/app/actions/resume/update-resume-image.action';
import { paramsContext } from '@/providers/ParamsProvider';

interface FormContainerProps<T> {
	form: UseFormReturn<any, any, undefined>;
	userId?: string;
	onSubmit: (values: T) => Promise<void>;
	children: ReactNode;
}

const FormContainer = ({ form, userId, onSubmit, children }: FormContainerProps<any>) => {
	const { theme, resumeId } = useContext(paramsContext);

	const { captureResumeImage } = useCaptureResumeImage({
		theme: theme || Resume.theme.DEFAULT,
		onCanvasGeneratedCallback: async (_: HTMLCanvasElement, imgData: string) => {
			if (resumeId && userId) {
				await updateResumeImageAction({ resumeId, userId, payload: { image: imgData }, postCallback });
			}
		},
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		form.handleSubmit(onSubmit)(event);
		captureResumeImage();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit}
				className='relative space-y-6 animate-fade-up'>
				{userId && !theme && <FormSectionHiddenSwitch form={form} />}
				{children}
			</form>
		</Form>
	);
};

export default FormContainer;
