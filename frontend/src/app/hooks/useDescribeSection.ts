import { toast } from '../components/ui/use-toast';
import { Either, isError } from '@/lib/types';
import { useEffect, useState } from 'react';

type useDescribeSectionInput<T> = {
	resumeId: string;
	queryFn(): Promise<Either<string, T>>;
};

export const useDescribeSection = <T>({ resumeId, queryFn }: useDescribeSectionInput<T>) => {
	const [isPending, setIsPending] = useState(false);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const handleQuery = async () => {
			setIsPending(true);
			const response = await queryFn();
			if (isError(response)) {
				setIsPending(false);
				return toast({
					variant: 'destructive',
					description: response.error,
				});
			}

			setData(response.success);
			setIsPending(false);
		};

		handleQuery();
	}, [resumeId]);

	return {
		isPending,
		data,
	};
};
