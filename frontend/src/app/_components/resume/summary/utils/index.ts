import { InputKind } from '@/components/ui/input';
import { Summary } from '@/types';
import { Path } from 'react-hook-form';
import { z } from 'zod';

export const summaryFormSchema = z.object({
	title: z.string(),
	summary: z.string(),
});

export type SummaryFormState = Omit<Summary, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';

interface FORM_FIELDS_TYPE {
	name: Path<SummaryFormState>;
	kind: InputKind;
	container: FormFieldContainer;
}

export const FORM_FIELDS: FORM_FIELDS_TYPE[] = [
	{
		name: 'title',
		kind: 'sectionTitle',
		container: 'input',
	},
	{
		name: 'summary',
		kind: 'subtitle',
		container: 'textarea',
	},
];
