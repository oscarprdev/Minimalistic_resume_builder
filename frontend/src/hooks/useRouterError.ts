import { addParamToPath } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const useRouterError = (router: AppRouterInstance, error?: string) => {
	if (error) {
		const path = addParamToPath(`error=${error}`);
		router.push(path);
	}
};
