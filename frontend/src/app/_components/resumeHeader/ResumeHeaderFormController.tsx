'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { startTransition, useOptimistic } from 'react';
import { HeaderFormState, HeaderFormValues, headerFormSchema } from './utils';
import ResumeHeaderFormPresentation from './ResumeHeaderFormPresentation';
import { useMutation } from '@tanstack/react-query';
import { UpdateHeaderInput, updateHeader } from '@/app/actions/resume/sections/header/update-header';
import { Header } from '@/types';

export interface ResumeHeaderFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Header;
}

const ResumeHeaderFormController = ({ userId, resumeId, defaultValues }: ResumeHeaderFormProps) => {
	const [optimisticFormValues, updateFormValues] = useOptimistic<HeaderFormState, HeaderFormState>(defaultValues, (_, optimistic) => ({
		...optimistic,
	}));

	const form = useForm<HeaderFormValues>({
		resolver: zodResolver(headerFormSchema),
		defaultValues: optimisticFormValues,
	});

	const { mutate, error, isPending } = useMutation({
		mutationFn: (input: UpdateHeaderInput) => updateHeader(input),
	});

	const onSubmit = async (values: HeaderFormState) => {
		startTransition(() => {
			updateFormValues(values);
		});
		mutate({ userId, resumeId, values });
	};

	return (
		<ResumeHeaderFormPresentation
			onSubmit={onSubmit}
			form={form}
			formErrors={form.formState.errors}
			loading={isPending}
		/>
	);
};

export default ResumeHeaderFormController;
