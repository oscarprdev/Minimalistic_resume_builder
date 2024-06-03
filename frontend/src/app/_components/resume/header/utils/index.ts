import { InputKind } from '@/components/ui/input';
import { Header } from '@/types';
import { Path } from 'react-hook-form';
import { z } from 'zod';

export const headerFormSchema = z.object({
	name: z.string(),
	job: z.string(),
	location: z.string(),
	email: z.string().email(),
	phone: z.string().min(1).max(9),
	links: z.array(z.string().url()).refine(
		(values) => {
			const newItem = values[values.length - 1];

			values.pop();

			return !values.includes(newItem);
		},
		{ message: 'Links must be unique' }
	),
	image: z.string().optional(),
});

export type HeaderFormState = Omit<Header, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';

interface FORM_FIELDS_TYPE {
	name: Path<HeaderFormState>;
	kind: InputKind;
	container: FormFieldContainer;
}

export const FORM_FIELDS: FORM_FIELDS_TYPE[] = [
	{
		name: 'name',
		kind: 'title',
		container: 'input',
	},
	{
		name: 'job',
		kind: 'subtitle',
		container: 'textarea',
	},
	{
		name: 'location',
		kind: 'text',
		container: 'input',
	},
	{
		name: 'phone',
		kind: 'label',
		container: 'input',
	},
	{
		name: 'email',
		kind: 'label',
		container: 'input',
	},
];
