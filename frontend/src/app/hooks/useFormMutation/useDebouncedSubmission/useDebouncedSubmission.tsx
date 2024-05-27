import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { UseDebouncedSubmissionInput, UseDebouncedSubmissionOutput } from './useDebouncedSubmission.types';

export function useDebouncedSubmission<S extends FieldValues>({
	onSubmit,
	delay = 2000,
}: UseDebouncedSubmissionInput<S>): UseDebouncedSubmissionOutput<S> {
	const debouncedOnSubmit = useDebouncedCallback(onSubmit, delay);

	const handleChange = (form: UseFormReturn<S>, name: Path<S>, value: any) => {
		form.setValue(name, value);
		debouncedOnSubmit(form.getValues());
	};

	return { handleChange };
}
