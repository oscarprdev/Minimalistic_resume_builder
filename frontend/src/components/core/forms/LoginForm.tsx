'use client';

import { loginUser } from '@/app/actions/auth/login-user';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginFormState {
	username: string;
	password: string;
	error: string | null;
}

const LoginFormSchema = z.object({
	username: z.string().max(10, {
		message: 'Exceeded limit of 10 characters',
	}),
	password: z.string().min(2, {
		message: 'Password must be at least 6 characters',
	}),
});

const LoginForm = () => {
	const router = useRouter();

	const form = useForm<LoginFormState>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			username: '',
			password: '',
			error: null,
		},
	});

	const onSubmitLoginForm = async ({ username, password }: LoginFormState) => {
		const response = await loginUser({ username, password });

		if (!response) {
			router.refresh();
			return;
		}

		form.setValue('error', response);
	};

	return (
		<Form {...form}>
			<form
				className='flex flex-col items-start gap-4 w-full'
				onSubmit={form.handleSubmit(onSubmitLoginForm)}>
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
					{form.formState.isSubmitting ? <IconLoader2 className='text-white animate-spin' /> : 'Log In'}
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
