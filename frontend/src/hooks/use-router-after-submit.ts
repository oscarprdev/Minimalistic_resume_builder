import { Either, isLeft } from '@/lib/either';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useRouterAfterSubmit =
	(router: AppRouterInstance, params: ReadonlyURLSearchParams) =>
	<E, A>(response: Either<E, A>) => {
		const currentUrl = new URL(window.location.href);
		const pathWithQuery = `${currentUrl.pathname}${currentUrl.search}`;

		if (isLeft(response)) {
			router.push(`${pathWithQuery}?error=${response.left}`);
			return;
		}

		if (!params.has('resume') && typeof response.right === 'string' && response.right.length > 0) {
			router.push(`${pathWithQuery}${pathWithQuery.includes('?') ? '&' : '?'}resume=${response.right}`);
			return;
		}
	};
