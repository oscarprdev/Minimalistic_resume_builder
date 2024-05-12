export interface VerifyPasswordInput {
	password: string;
	hashedPassword: string;
	hexSalt: string;
}

export interface HashPasswordInput {
	password: string;
	hexSalt: string;
}
