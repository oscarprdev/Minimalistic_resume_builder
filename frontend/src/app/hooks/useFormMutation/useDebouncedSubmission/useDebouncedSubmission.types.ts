import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface UseDebouncedSubmissionInput<S> {
	onSubmit: (values: S) => void;
	delay?: number;
}

export interface UseDebouncedSubmissionOutput<S extends FieldValues> {
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}
