import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';

interface FormSectionHiddenSwitchProps {
	form: UseFormReturn<any, any, undefined>;
}

const FormSectionHiddenSwitch = ({ form }: FormSectionHiddenSwitchProps) => {
	return (
		<FormField
			control={form.control}
			name='isHidden'
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<div className='absolute right-0 flex items-center gap-2 -mt-8'>
							<p className='text-sm text-purple_200'>Hide section?</p>
							<Switch
								checked={field.value}
								onCheckedChange={field.onChange}
								aria-readonly
							/>
						</div>
					</FormControl>
					<FormMessage className='text-xs' />
				</FormItem>
			)}
		/>
	);
};

export default FormSectionHiddenSwitch;
