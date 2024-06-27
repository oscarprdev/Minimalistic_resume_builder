import { toast } from '@/components/ui/use-toast';

export const useToastError = (error?: string) => {
	if (error) {
		toast({
			variant: 'destructive',
			description: error,
		});
	}
};
