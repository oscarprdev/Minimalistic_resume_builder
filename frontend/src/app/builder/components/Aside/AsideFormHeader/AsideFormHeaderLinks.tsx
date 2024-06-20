'use client';

import { Button } from '@/components/ui/button';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArrayAnimations } from '@/hooks/use-field-array-animations';

interface AsideFormHeaderLinksProps {
	form: UseFormReturn<ResumeHeaderDefaultValues, any, undefined>;
}

const LINK_LIST_NAME = 'links';
const DEFAULT_LINK: string = '';

const AsideFormHeaderLinks = ({ form }: AsideFormHeaderLinksProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: LINK_LIST_NAME as never,
	});

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
						name={`links.${index}`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Link {index + 1}</FormLabel>
								<FormControl>
									<Input
										placeholder='Link'
										{...field}
										{...form.register(`links.${index}`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						className='w-full'
						variant={'clean'}
						onClick={() => onRemoveListElement(index, _.id)}>
						Remove link
					</Button>
				</article>
			))}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => append(DEFAULT_LINK)}>
				Add link
			</Button>
		</section>
	);
};

export default AsideFormHeaderLinks;
