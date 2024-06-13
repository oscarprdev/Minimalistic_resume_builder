import { toast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { UseToastErrorInput } from './useToastError.types';

export const useToastError = ({ error, errorMessage }: UseToastErrorInput) => {
	useEffect(() => {
		if (error) {
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		}
	}, [error]);
};
