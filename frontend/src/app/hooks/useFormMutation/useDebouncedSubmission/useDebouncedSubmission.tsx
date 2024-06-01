import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { UseDebouncedSubmissionInput, UseDebouncedSubmissionOutput } from './useDebouncedSubmission.types';

export function useDebouncedSubmission<S extends FieldValues>({
	onSubmit,
	delay = 700,
}: UseDebouncedSubmissionInput<S>): UseDebouncedSubmissionOutput<S> {
	const debouncedOnSubmit = useDebouncedCallback((val) => onSubmit(val), delay);

	const mapNestedValues = (form: UseFormReturn<S>, originalName: Path<S>, value: any) => {
		if (!originalName.includes('.')) {
			return { name: originalName, value };
		}

		const [name, index, subname] = originalName.split('.');

		const currentFormValues = form.getValues(name as Path<S>);

		if (Array.isArray(currentFormValues)) {
			if (subname) {
				currentFormValues[index][subname] = value;
			} else {
				currentFormValues[index] = value;
			}
		}

		return { name: name as Path<S>, value: currentFormValues };
	};

	const handleChange = async (form: UseFormReturn<S>, name: Path<S>, value: any) => {
		const mapped = mapNestedValues(form, name, value);
		form.setValue(mapped.name, mapped.value);
		const isValueValid = await form.trigger(mapped.name);

		if (isValueValid) {
			debouncedOnSubmit(form.getValues());
		}
	};

	return { handleChange };
}
