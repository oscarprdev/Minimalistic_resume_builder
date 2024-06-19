import { Button } from '@/components/ui/button';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface AsideFormHeaderLinksProps {
	form: UseFormReturn<ResumeHeaderDefaultValues, any, undefined>;
}

const LINK_LIST_NAME = 'links';

const DEFAULT_LINK: string = 'your-link';

const AsideFormHeaderLinks = ({ form }: AsideFormHeaderLinksProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: LINK_LIST_NAME as never,
	});

	return (
		<section className='flex flex-col gap-5 w-full'>
			{fields.map((_, index) => (
				<div
					key={_.id}
					className='flex flex-col items-center w-full space-y-4'>
					<FormField
						control={form.control}
						name={`links.${index}`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Link {index + 1}</FormLabel>
								<FormControl>
									<Input
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
						onClick={() => remove(index)}>
						Remove link
					</Button>
				</div>
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
