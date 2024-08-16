import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { formatDateToValidFormat } from '@/lib/dates';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import DatePicker from './DatePicker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FormDatesProps {
	form: UseFormReturn<any, any, undefined>;
	index: number;
	label: 'jobList' | 'educationList';
}
export const FORMAT_TIME_VALUES = {
	YEAR: 'year',
	CURRENTLY: 'currently',
	DURATION: 'duration',
};

const FormDates = ({ form, index, label }: FormDatesProps) => {
	const generateValue = useCallback((checked: boolean, currentValue: string, key: string) => {
		return checked ? currentValue + (currentValue !== '' ? `,${key}` : key) : currentValue.replace(key, '');
	}, []);

	return (
		<div className='flex items-start w-full gap-2'>
			<div className='flex flex-col items-start gap-2 w-full'>
				<FormField
					control={form.control}
					name={`${label}.${index}.startDate`}
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel className='text-sm text-gray-500'>Start date</FormLabel>
							<DatePicker
								form={form}
								field={field}
								label={label}
								index={index}
							/>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>
				<Accordion
					type='single'
					className='w-full'
					collapsible>
					<AccordionItem
						value='item-1'
						className='w-full border border-none'>
						<AccordionTrigger className='w-full p-0 min-w-[150px] text-purple_100 hover:text-purple_200'>More details</AccordionTrigger>
						<AccordionContent className='flex flex-col w-full gap-2 py-2 '>
							<FormField
								control={form.control}
								name={`${label}.${index}.formatTime`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex items-center gap-2 animate-fade-down'>
												<p className='text-sm text-purple_200 w-full '>Show year only?</p>
												<Switch
													checked={field.value.includes(FORMAT_TIME_VALUES.YEAR)}
													onCheckedChange={(checked) => {
														field.onChange(generateValue(checked, field.value, FORMAT_TIME_VALUES.YEAR));
													}}
													aria-readonly
												/>
											</div>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`${label}.${index}.formatTime`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className='flex items-center gap-2 animate-fade-down'>
												<p className='text-sm text-purple_200 w-full'>Show duration?</p>
												<Switch
													checked={field.value.includes(FORMAT_TIME_VALUES.DURATION)}
													onCheckedChange={(checked) => {
														field.onChange(generateValue(checked, field.value, FORMAT_TIME_VALUES.DURATION));
													}}
													aria-readonly
												/>
											</div>
										</FormControl>
										<FormMessage className='text-xs' />
									</FormItem>
								)}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>

			<div className='flex flex-col gap-2 items-end'>
				<FormField
					control={form.control}
					name={`${label}.${index}.endDate`}
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>End date</FormLabel>
							<DatePicker
								form={form}
								field={field}
								label={label}
								index={index}
							/>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={`${label}.${index}.formatTime`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center gap-2'>
									<p className='text-sm text-purple_200'>Currently?</p>
									<Switch
										checked={field.value.includes(FORMAT_TIME_VALUES.CURRENTLY)}
										onCheckedChange={(checked) => {
											field.onChange(generateValue(checked, field.value, FORMAT_TIME_VALUES.CURRENTLY));
 
											if (checked) {
												form.setValue(`${label}.${index}.endDate`, formatDateToValidFormat(new Date()));
											}
										}}
										aria-readonly
									/>
								</div>
							</FormControl>
							<FormMessage className='text-xs' />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};

export default FormDates;
