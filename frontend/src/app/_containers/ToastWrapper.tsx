'use client';

import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const ToastWrapper = ({ children }: { children: ReactNode }) => {
	const params = useSearchParams();

	useEffect(() => {
		const error = params.get('error');

		if (error) {
			toast({
				variant: 'destructive',
				description: error,
			});
		}
	}, [params]);

	return (
		<>
			{children}
			<Toaster />
		</>
	);
};

export default ToastWrapper;
