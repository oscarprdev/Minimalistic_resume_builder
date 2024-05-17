import { useMutation } from '@tanstack/react-query';
import { startTransition } from 'react';
import { FieldValues } from 'react-hook-form';
import { ActionInput } from '../useFormMutation/useFormMutation.types';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UseFormSubmissionInput, UseFormSubmissionOutput } from './useFormSubmission.types';

export function useFormSubmission<S extends FieldValues>({
	action,
	info,
	updateFormValues,
	errorMessage,
}: UseFormSubmissionInput<S>): UseFormSubmissionOutput<S> {
	const { mutate, error, isPending } = useMutation({
		mutationFn: (input: ActionInput<S>) => action(input),
	});

	const onSubmit = async (values: S) => {
		startTransition(() => {
			updateFormValues(values);
		});
		const mutationInput = { ...info, values };
		mutate(mutationInput);
	};

	useEffect(() => {
		if (error) {
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		}
	}, [error]);

	return { onSubmit, isPending };
}
