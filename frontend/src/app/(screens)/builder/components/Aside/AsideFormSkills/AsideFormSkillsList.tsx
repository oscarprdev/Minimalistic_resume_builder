'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { SkillsFormState } from './AsideFormSkills';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { OptionalSkill } from '@/store/useResumeSkillsStore';
import { useMemo } from 'react';
import { useFieldArrayAnimations } from '@/hooks/useFieldArrayAnimations';
import RemoveListItemCta from '../shared/components/RemoveListItemCta';
import { IconPlus } from '@tabler/icons-react';

interface AsideFormSkillsListProps {
	form: UseFormReturn<SkillsFormState, any, undefined>;
}

const SKILL_LIST_NAME = 'skillList';

const DEFAULT_SKILL: OptionalSkill = {
	name: '',
	svgUrl: '',
};

const AsideFormSkillsList = ({ form }: AsideFormSkillsListProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: SKILL_LIST_NAME,
	});

	const formSkillsListFieldsError = useMemo(() => form.formState.errors.skillList, [form.formState.errors.skillList]);

	const { onRemoveListElement, asignRef } = useFieldArrayAnimations(remove);

	return (
		<section className='flex flex-col gap-5 w-full'>
			{fields.map((_, index) => (
				<article
					key={_.id}
					ref={(el) => asignRef(el, _.id)}
					className='relative flex flex-col items-center w-full space-y-4 animate-fade-up'>
					<span
						aria-hidden
						className='absolute top-1 bg-gray-100 w-52 h-[0.1rem]'
					/>
					<FormField
						control={form.control}
						name={`skillList.${index}.name`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Skill</FormLabel>
								<FormControl>
									<Input
										placeholder='Your skill'
										required
										{...field}
										{...form.register(`skillList.${index}.name`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<RemoveListItemCta
						onClick={() => onRemoveListElement(index, _.id)}
						label='Remove skill'
					/>
				</article>
			))}
			{formSkillsListFieldsError && <FormMessage className='text-xs'>{formSkillsListFieldsError.root?.message}</FormMessage>}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => append(DEFAULT_SKILL)}>
				Add skill
			</Button>
		</section>
	);
};

export default AsideFormSkillsList;
