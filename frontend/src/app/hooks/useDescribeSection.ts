import { toast } from '../components/ui/use-toast';
import { Either, isError } from '@/lib/types';
import { useEffect, useState } from 'react';

type useDescribeSectionInput<T> = {
	resumeId: string;
	queryFn(): Promise<Either<string, T>>;
};

export const useDescribeSection = <T>({ resumeId, queryFn }: useDescribeSectionInput<T>) => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		const handleQuery = async () => {
			setIsPending(true);
			const response = await queryFn();
			if (isError(response)) {
				setIsPending(false);
				toast({
					variant: 'destructive',
					description: response.error,
				});
				return setError(response.error);
			}

			setData(response.success);
			setIsPending(false);
		};

		handleQuery();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resumeId]);

	return {
		isPending,
		data,
		error,
	};
};
