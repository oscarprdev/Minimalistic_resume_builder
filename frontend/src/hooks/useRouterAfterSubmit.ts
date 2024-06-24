import { Either, isLeft } from '@/lib/either';
import { addParamToPath } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useRouterAfterSubmit =
	(router: AppRouterInstance, params: ReadonlyURLSearchParams) =>
	<E, A>(response: Either<E, A>) => {
		if (isLeft(response)) {
			const path = addParamToPath(`error=${response.left}`);
			router.push(path);
			return;
		}

		if (!params.has('resume') && typeof response.right === 'string' && response.right.length > 0) {
			const path = addParamToPath(`resume=${response.right}`);
			router.push(path);
			return;
		}
	};
