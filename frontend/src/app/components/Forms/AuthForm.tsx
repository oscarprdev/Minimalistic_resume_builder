import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Error, Success, isError } from '@/lib/types';
import { UserCredentials } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type AuthFormValues = UserCredentials & { error: string | null };
type AuthFormProps = {
	handleSubmit(values: AuthFormValues): Promise<void>;
	afterAuthFormSubmit(): void;
	submitResponse: Success<string> | Error<string> | undefined;
	children: ReactNode;
};

const authFormSchema = z.object({
	username: z.string().min(4, {
		message: 'Username must be at least 4 characters.',
	}),
	password: z.string().min(4, {
		message: 'Password must be at least 4 characters.',
	}),
});

const defaultValues: AuthFormValues = {
	username: '',
	password: '',
	error: null,
};

const AuthForm = ({ handleSubmit, afterAuthFormSubmit, submitResponse, children }: AuthFormProps) => {
	const form = useForm<AuthFormValues>({
		resolver: zodResolver(authFormSchema),
		defaultValues,
	});

	useEffect(() => {
		if (submitResponse) {
			if (isError(submitResponse)) {
				return form.setValue('error', submitResponse.error);
			} else {
				afterAuthFormSubmit();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResponse]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-3 w-full">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-normal">Username</FormLabel>
							<FormControl>
								<Input placeholder="Username" autoComplete="username" required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="animate-fade-up">
							<FormLabel className="text-zinc-700 font-normal">Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Password"
									autoComplete="current-password"
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="relative flex flex-col items-center w-full gap-2 mt-6">
					{form.watch('error') && (
						<FormMessage className="absolute -top-5 w-[200%] text-center">
							{form.getValues('error')}
						</FormMessage>
					)}
					{children}
				</div>
			</form>
		</Form>
	);
};

export default AuthForm;
