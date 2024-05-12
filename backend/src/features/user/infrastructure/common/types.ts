export type ErrorActions = 'getUserByUsername' | 'insertUser';

export interface GetUserByUsernameInfrastructureInput {
	username: string;
}

export interface InsertUserInfrastructureInput {
	id: string;
	username: string;
	password: string;
}
