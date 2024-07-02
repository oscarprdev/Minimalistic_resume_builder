'use client';

import { useDynamicForm } from '@/hooks/useDynamicForm';
import FormContainer from '../shared/components/FormContainer';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FormThemesDefaultValues, FormThemesValues, THEMES_CONTROLLER, asideFormThemesSchema } from './schema-validations';
import { IconLoader2 } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

interface AsideFormThemesPresentationProps {
	defaultValues: FormThemesDefaultValues;
	onSubmit: (values: FormThemesValues) => Promise<void>;
}

const AsideFormThemesPresentation = ({ defaultValues, onSubmit }: AsideFormThemesPresentationProps) => {
	const form = useDynamicForm<FormThemesDefaultValues>({ schema: asideFormThemesSchema, defaultValues });

	return (
		<FormContainer
			form={form}
			isUserLogged={true}
			onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='theme'
				render={({ field }) => (
					<div className='w-full flex items-start gap-2 flex-wrap'>
						{THEMES_CONTROLLER.map((theme) => (
							<FormItem
								key={theme.label}
								className='relative flex flex-col w-[170px] h-fit items-start gap-2 p-2 hover:bg-gray_light duration-150 cursor-pointer'>
								<picture
									onClick={() => field.onChange(theme.kind)}
									className='w-full border shadow h-[200px]'>
									<Image
										src={theme.image}
										alt='Theme image'
										width={300}
										height={300}
										className='object-cover'
									/>
								</picture>
								<div className='flex w-full items-center gap-2'>
									<FormControl>
										<Checkbox
											className='rounded-md text-purple_100'
											checked={field.value === theme.kind}
											onCheckedChange={(value: boolean) => {
												if (value) {
													field.onChange(theme.kind);
												}
											}}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>{theme.label}</FormLabel>
									</div>
								</div>
							</FormItem>
						))}
					</div>
				)}
			/>
			<Button
				type='submit'
				className='w-full'
				disabled={form.formState.isSubmitting}>
				{form.formState.isSubmitting ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}
			</Button>
		</FormContainer>
	);
};

export default AsideFormThemesPresentation;
