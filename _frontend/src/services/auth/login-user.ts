import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { UserAuthResponse, UserCredentials } from '@/types';

export interface LoginUserServiceInput {
	payload: UserCredentials;
	postCallback: (path: string, payload: UserCredentials) => Promise<Either<string, UserAuthResponse>>;
}

export const loginUserService = async ({ payload, postCallback }: LoginUserServiceInput) => {
	const path = `${API_URL}/user/login`;

	return await postCallback(path, payload);
};
