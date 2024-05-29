import { useMutation } from '@tanstack/react-query';
import { startTransition } from 'react';
import { FieldValues } from 'react-hook-form';
import { ActionInput } from '../useFormMutation.types';
import { UseFormSubmissionInput, UseFormSubmissionOutput } from './useFormSubmission.types';
import { useToastError } from '../../useToastError/useToastError';

export function useFormSubmission<S extends FieldValues>({
	action,
	info,
	updateFormValues,
	errorMessage,
}: UseFormSubmissionInput<S>): UseFormSubmissionOutput<S> {
	const { mutate, error, isPending } = useMutation({
		mutationFn: (input: ActionInput<S>) => action(input),
	});

	useToastError({ error, errorMessage });

	const onSubmit = async (values: S) => {
		startTransition(() => {
			updateFormValues(values);
		});
		const mutationInput = { ...info, values };
		mutate(mutationInput);
	};

	return { onSubmit, loading: isPending };
}
