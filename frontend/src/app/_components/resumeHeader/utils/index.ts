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
	links: z.array(z.string().url()),
	image: z.string().optional(),
});

export type HeaderFormState = Omit<Header, 'id'>;

interface FORM_FIELDS_TYPE {
	name: Path<HeaderFormState>;
	kind: InputKind;
}

export const FORM_FIELDS: FORM_FIELDS_TYPE[] = [
	{
		name: 'name',
		kind: 'title',
	},
	{
		name: 'job',
		kind: 'subtitle',
	},
	{
		name: 'location',
		kind: 'text',
	},
	{
		name: 'phone',
		kind: 'label',
	},
	{
		name: 'email',
		kind: 'label',
	},
];
