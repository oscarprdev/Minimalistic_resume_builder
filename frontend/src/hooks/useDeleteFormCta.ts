import { toast } from '@/components/ui/use-toast';
import { Either, isLeft, left } from '@/lib/either';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface useDeleteFormCtaInput {
	deleteCallback: (path: string) => Promise<Either<string, string>>;
	afterDeleteCallback: () => void;
	path: string | null;
}

export const useDeleteFormCta = ({ deleteCallback, afterDeleteCallback, path }: useDeleteFormCtaInput) => {
	const { mutate, isPending, data } = useMutation({
		mutationFn: async () => {
			if (!path) {
				return left('Delete resume action is not available');
			}
			return await deleteCallback(path);
		},
	});

	useEffect(() => {
		if (data && isLeft(data)) {
			toast({
				description: data.left,
				variant: 'destructive',
			});
		}

		if (data && !isLeft(data)) {
			afterDeleteCallback();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return {
		deleteInfo: mutate,
		isDeleteCtaPending: isPending,
	};
};
