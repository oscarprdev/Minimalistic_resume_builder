import { ReadonlyURLSearchParams } from 'next/navigation';
import { RefObject } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface UseResumeImageInput<S extends FieldValues> {
	imageUrl?: string;
	name: Path<S>;
	form: UseFormReturn<S, any, undefined>;
	params: ReadonlyURLSearchParams;
	inputRef: RefObject<HTMLInputElement>;
	handleChange: (form: UseFormReturn<S>, name: Path<S>, value: any) => void;
}
