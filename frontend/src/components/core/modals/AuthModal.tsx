'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import RegisterForm from '../forms/RegisterForm';
import LoginForm from '../forms/LoginForm';

const AuthModal = () => {
	const [isUserRegistered, setIsUserRegistered] = useState(true);

	const onIsUserAlreadyRegisteredClick = () => {
		setIsUserRegistered(!isUserRegistered);
	};

	const onRegisterSuccessful = () => setIsUserRegistered(true);

	return (
		<div>
			<Dialog>
				<DialogTrigger className='bg-white shadow-sm border border-purple_200 text-purple_200 hover:bg-gray-100 duration-300 inline-flex gap-1 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-10 py-4'>
					Sign in
				</DialogTrigger>
				<DialogContent className='w-[90%] md:lg-[50%] lg:w-[45%] max-w-[500px] min-w-[350px]'>
					<DialogHeader>
						<DialogTitle>{isUserRegistered ? 'Log in' : 'Sign up'}</DialogTitle>
					</DialogHeader>
					<DialogDescription>
						{isUserRegistered ? <LoginForm /> : <RegisterForm onRegisterSuccessful={onRegisterSuccessful} />}
					</DialogDescription>
					<DialogFooter>
						<Button
							onClick={onIsUserAlreadyRegisteredClick}
							variant={'clean'}>
							{isUserRegistered ? 'Register new account.' : 'Are you already registered?'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AuthModal;
