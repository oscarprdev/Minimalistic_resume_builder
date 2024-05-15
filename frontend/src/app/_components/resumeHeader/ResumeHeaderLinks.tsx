import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, UseFormRegister, useFieldArray, Controller } from 'react-hook-form';
import { HeaderFormState } from './utils';

interface ResumeHeaderLinksProps {
	control: Control<HeaderFormState, any>;
	errors: string[];
	register: UseFormRegister<HeaderFormState>;
}

const ResumeHeaderLinks = ({ control, errors, register }: ResumeHeaderLinksProps) => {
	const { fields, remove, append } = useFieldArray({ control, name: 'links' as never });

	return (
		<>
			<Button
				type='button'
				onClick={() => append('')}>
				Add
			</Button>
			{fields.map((_, index) => (
				<Controller
					key={_.id}
					name={`links.${index}`}
					control={control}
					render={({ field }) => (
						<>
							<FormItem>
								<FormControl>
									<Input
										defaultValue={field.value}
										{...register(`links.${index}`)}
									/>
								</FormControl>
								<Button
									type='button'
									onClick={() => remove(index)}>
									Remove
								</Button>
								<FormMessage>{errors[index] && errors[index]}</FormMessage>
							</FormItem>
						</>
					)}></Controller>
			))}
		</>
	);
};

export default ResumeHeaderLinks;
