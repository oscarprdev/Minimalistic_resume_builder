'use client';

import { registerUser } from '@/app/actions/auth/register-user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { isLeft } from '@/lib/either';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface RegisterFormProps {
	onRegisterSuccessful: () => void;
}

interface RegisterFormState {
	username: string;
	password: string;
	error: string | null;
}

const RegisterFormSchema = z.object({
	username: z.string().max(10, {
		message: 'Exceeded limit of 10 characters',
	}),
	password: z.string().min(2, {
		message: 'Password must be at least 6 characters',
	}),
});

const RegisterForm = ({ onRegisterSuccessful }: RegisterFormProps) => {
	const router = useRouter();

	const form = useForm<RegisterFormState>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			username: '',
			password: '',
			error: null,
		},
	});

	const onSubmitRegisterForm = async ({ username, password }: RegisterFormState) => {
		const response = await registerUser({ username, password });

		if (!isLeft(response)) {
			onRegisterSuccessful();
		}

		console.log(response);

		form.setValue('error', 'User already exists.');
	};

	return (
		<Form {...form}>
			<form
				className='flex flex-col items-start gap-4 w-full'
				onSubmit={form.handleSubmit(onSubmitRegisterForm)}>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel className='text-sm text-gray-500'>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Username'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormLabel className='text-sm text-gray-500'>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									placeholder='Password'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{form.getValues('error') && <FormMessage>{form.getValues('error')}</FormMessage>}
				<Button
					disabled={form.formState.isSubmitting || !form.formState.isValid}
					type='submit'>
					{form.formState.isSubmitting ? <IconLoader2 className='text-white animate-spin' /> : 'Sign up'}
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
