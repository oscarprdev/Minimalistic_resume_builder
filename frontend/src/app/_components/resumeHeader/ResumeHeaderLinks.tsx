'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, UseFormRegister, useFieldArray, Controller } from 'react-hook-form';
import { HeaderFormState } from './utils';
import { IconPlus } from '@tabler/icons-react';
import RemoveLinkButton from '../buttons/RemoveLinkButton';
import { IconBrandLinkedin, IconBrandGithub, IconLink } from '@tabler/icons-react';
import ResumeHeaderLinksIcons from './ResumeHeaderLinksIcons';

interface ResumeHeaderLinksProps {
	control: Control<HeaderFormState, any>;
	errors: string[];
	register: UseFormRegister<HeaderFormState>;
}

const LINKS_ICONS = {
	default: (
		<IconLink
			stroke={2}
			className='mt-[0.3rem] text-gray-500'
		/>
	),
	linkedin: (
		<IconBrandLinkedin
			stroke={2}
			className='mt-[0.3rem] text-gray-500'
		/>
	),
	github: (
		<IconBrandGithub
			stroke={2}
			className='mt-[0.3rem] text-gray-500'
		/>
	),
};

const ResumeHeaderLinks = ({ control, errors, register }: ResumeHeaderLinksProps) => {
	const { fields, remove, append } = useFieldArray({ control, name: 'links' as never });

	return (
		<section className='flex flex-col gap-1'>
			{fields.map((_, index) => (
				<Controller
					key={_.id}
					name={`links.${index}`}
					control={control}
					render={({ field }) => (
						<>
							<FormItem className='flex items-center -ml-6 -mb-5'>
								<RemoveLinkButton
									index={index}
									onRemove={() => remove(index)}
								/>
								<ResumeHeaderLinksIcons value={field.value} />
								<FormControl>
									<Input
										kind={'label'}
										{...register(`links.${index}`)}
									/>
								</FormControl>
								<FormMessage>{errors[index] && errors[index]}</FormMessage>
							</FormItem>
						</>
					)}></Controller>
			))}
			<Button
				type='button'
				variant={'outline'}
				size={'sm'}
				className='ml-3 mt-8 opacity-0 group-hover:opacity-100 transition duration-300 mr-auto'
				onClick={() => append('Your awesome link')}>
				<IconPlus
					stroke={1}
					width={20}
				/>
				Add new link
			</Button>
		</section>
	);
};

export default ResumeHeaderLinks;
