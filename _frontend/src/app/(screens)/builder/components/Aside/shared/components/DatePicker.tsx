import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '../../../../../../../components/ui/form';
import { Button } from '../../../../../../../components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../../../../../../../components/ui/calendar';
import { formatDateToValidFormat } from '@/lib/dates';
import { cn } from '@/lib/utils';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';

type StartDateField = ControllerRenderProps<any, `jobList.${number}.startDate` | `educationList.${number}.startDate`>;
type EndDateField = ControllerRenderProps<any, `jobList.${number}.endDate` | `educationList.${number}.endDate`>;

interface DatePickerProps {
	label: string;
	index: number;
	form: UseFormReturn<any, any, undefined>;
	field: StartDateField | EndDateField;
}

const DatePicker = ({ label, index, form, field }: DatePickerProps) => {
	const [popoverOpened, setPopoverOpened] = useState(false);

	const key = useMemo(() => {
		const arr = field.name.split('.');

		return arr[arr.length - 1];
	}, [field]);

	const dateIsDisabled = useCallback(
		(date: Date) => {
			const minDate = new Date('1950-01-01');
			const maxDate = new Date();

			const previousStartDate = key === 'endDate' ? form.getValues(`${label}.${index}.startDate`) : null;

			return date > maxDate || date < minDate || (previousStartDate ? date < new Date(previousStartDate) : false);
		},
		[form, index, label, key]
	);

	return (
		<Popover open={popoverOpened}>
			<PopoverTrigger
				asChild
				className='w-full'
				onClick={() => setPopoverOpened(!popoverOpened)}>
				<FormControl>
					<Button
						variant={'outline'}
						className={cn(
							'w-full flex justify-between gap-5 font-normal px-8 border border-input bg-transparent text-gray-600',
							!field.value && 'text-muted-foreground text-gray-500'
						)}>
						{field.value || <span>Select date</span>}
						<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'>
				<Calendar
					mode='single'
					selected={field.value}
					onSelect={(a) => {
						console.log(!a);
						if (!a) return;

						a.setUTCDate(a.getUTCDate() + 1);
						field.onChange(formatDateToValidFormat(a));
						setPopoverOpened(false);
					}}
					disabled={dateIsDisabled}
					initialFocus
					{...field}
					{...form.register(`${label}.${index}.${key}`)}
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DatePicker;
