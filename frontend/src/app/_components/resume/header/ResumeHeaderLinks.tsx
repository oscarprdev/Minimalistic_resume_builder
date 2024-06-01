'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn, Path } from 'react-hook-form';
import { HeaderFormState } from './utils';
import { IconPlus } from '@tabler/icons-react';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import ResumeHeaderLinksIcons from './ResumeHeaderLinksIcons';
import { useState } from 'react';

interface ResumeHeaderLinksProps {
	form: UseFormReturn<HeaderFormState, any, undefined>;
	errors: string[];
	handleChange: (form: UseFormReturn<HeaderFormState>, name: Path<HeaderFormState>, value: any) => void;
}

interface LinksState {
	id: string;
	link: string;
}

const LINKS_NAME = 'links';

const ResumeHeaderLinks = ({ form, errors, handleChange }: ResumeHeaderLinksProps) => {
	const [links, setLinks] = useState<LinksState[]>(
		form.getValues(LINKS_NAME).map((link) => ({ link, id: crypto.randomUUID().toString() }))
	);

	const isDisabled = links.length !== form.watch(LINKS_NAME).length;

	const appendLink = (newLink: LinksState) => {
		const updatedLinks = [...form.getValues(LINKS_NAME), newLink.link];
		setLinks((prev) => [...prev, newLink]);
		handleChange(form, LINKS_NAME, updatedLinks);
	};

	const removeLink = (index: number) => {
		const updatedLinks = links.filter((_, i) => i !== index);
		setLinks(updatedLinks);
		handleChange(
			form,
			LINKS_NAME,
			updatedLinks.map((link) => link.link)
		);
	};

	const handleInputChange = (index: number, value: string) => {
		handleChange(
			form,
			LINKS_NAME,
			form.getValues(LINKS_NAME).map((link, i) => (i === index ? value : link))
		);
	};

	return (
		<section className='flex items-start justify-between w-full'>
			<div className='flex flex-col gap-1 w-full'>
				{links.map((link, index) => (
					<FormField
						key={link.id}
						name={`links.${index}`}
						render={({ field }) => (
							<FormItem className='relative flex items-center -mb-2 '>
								<span className='absolute top-[0.53rem] -left-6'>
									<RemoveItemButton
										index={index}
										text={'Remove link'}
										onRemove={removeLink}
									/>
								</span>

								<ResumeHeaderLinksIcons value={form.getValues(LINKS_NAME)[index]} />
								<FormControl>
									<Input
										{...field}
										disabled={isDisabled}
										kind={'label'}
										className='w-full'
										value={form.getValues(LINKS_NAME)[index]}
										onChange={(e) => handleInputChange(index, e.target.value)}
									/>
								</FormControl>
								<FormMessage>{errors[index] && errors[index]}</FormMessage>
							</FormItem>
						)}
					/>
				))}
			</div>
			<Button
				type='button'
				variant={'outline'}
				size={'sm'}
				disabled={isDisabled}
				className='opacity-0 group-hover:opacity-100 transition duration-300 mt-auto'
				onClick={() => appendLink({ link: 'https://www.your_awesome_link.com', id: crypto.randomUUID().toString() })}>
				<IconPlus
					stroke={1}
					width={20}
				/>
				Add link
			</Button>
		</section>
	);
};

export default ResumeHeaderLinks;
