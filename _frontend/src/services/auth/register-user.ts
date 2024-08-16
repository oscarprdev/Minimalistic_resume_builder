import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { UserAuthResponse, UserCredentials } from '@/types';

export interface RegisterUserServiceInput {
	payload: UserCredentials;
	postCallback: (path: string, payload: UserCredentials) => Promise<Either<string, UserAuthResponse>>;
}

export const registerUserService = async ({ payload, postCallback }: RegisterUserServiceInput) => {
	const path = `${API_URL}/user/register`;

	return await postCallback(path, payload);
};
