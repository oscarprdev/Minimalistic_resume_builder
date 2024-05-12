export interface VerifyPasswordInput {
	password: string;
	hashedPassword: string;
	hexSalt: string;
}
