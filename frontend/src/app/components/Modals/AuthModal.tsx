'use client';

import AuthForm, { AuthFormValues } from '../Forms/AuthForm';
import { Button } from '../ui/button';
import { logInUser } from '@/app/actions/auth/login';
import { registerUser } from '@/app/actions/auth/register';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog';
import { IconLoader2 } from '@tabler/icons-react';
import { IconLogin } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthModal = () => {
	const [isLogin, setIsLogin] = useState(true);

	const router = useRouter();

	const { mutate, isPending, data } = useMutation({
		mutationFn: async (values: AuthFormValues) => {
			return isLogin ? await logInUser(values) : await registerUser(values);
		},
	});

	const toggleIsLogin = () => setIsLogin(!isLogin);

	const handleSubmit = async (values: AuthFormValues) => mutate(values);

	const handleAfterSubmit = () => {
		router.refresh();
	};

	return (
		<Dialog>
			<DialogTrigger className="text-zinc-600 group w-full" data-testid="open-auth-modal-button">
				<div className="w-full flex items-center gap-1 relative cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors group-hover:bg-zinc-100 group-hover:text-zinc-900 ">
					<IconLogin size={18} />
					<p className="text-xs">Sign in</p>
				</div>
			</DialogTrigger>
			<DialogContent data-testid="auth-modal-content">
				<DialogHeader>
					<DialogTitle>{isLogin ? 'Sign in' : 'Get started'}</DialogTitle>
					<DialogDescription className="text-zinc-600">
						{isLogin ? 'Sign in to your account' : 'Create new account'}
					</DialogDescription>
				</DialogHeader>
				<AuthForm handleSubmit={handleSubmit} afterAuthFormSubmit={handleAfterSubmit} submitResponse={data}>
					<Button className="w-full grid place-items-center" type="submit">
						{isPending ? (
							<IconLoader2 className="animate-spin" size={20} />
						) : isLogin ? (
							'Sign in'
						) : (
							'Sign up'
						)}
					</Button>
				</AuthForm>
				<div className="flex w-full gap-2 text-sm text-zinc-800">
					<p>{isLogin ? "Don't have an account?" : 'Have an account?'}</p>
					<span
						className="underline cursor-pointer text-zinc-500  hover:text-zinc-800"
						onClick={toggleIsLogin}>
						{isLogin ? 'Sign Up Now' : 'Sign In Now'}
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModal;
