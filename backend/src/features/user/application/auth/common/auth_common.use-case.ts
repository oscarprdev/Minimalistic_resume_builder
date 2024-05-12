import { HashPasswordInput, VerifyPasswordInput } from './auth_common.types';

export class DefaultAuthUsecases {
	constructor() {}

	private hexStringToUint8Array(hexString?: string): Uint8Array {
		const hex = hexString || crypto.randomUUID().toString();

		const length = hex.length / 2;
		const uint8Array = new Uint8Array(length);

		for (let i = 0; i < length; i++) {
			const byte = parseInt(hex.substring(i * 2, 2), 16);
			uint8Array[i] = byte;
		}

		return uint8Array;
	}

	protected async hashPassword({ password, hexSalt }: HashPasswordInput): Promise<string> {
		const encoder = new TextEncoder();

		const passwordBuffer = encoder.encode(password);

		const salt = this.hexStringToUint8Array(hexSalt);

		const saltedPassword = new Uint8Array(salt.length + passwordBuffer.length);
		saltedPassword.set(salt, 0);
		saltedPassword.set(passwordBuffer, salt.length);

		const hashedBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);

		const hashedPassword = Array.from(new Uint8Array(hashedBuffer))
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		return hashedPassword;
	}

	protected async verifyPassword({ password, hashedPassword, hexSalt }: VerifyPasswordInput): Promise<boolean> {
		const encoder = new TextEncoder();

		const inputPasswordBuffer = encoder.encode(password);

		const salt = this.hexStringToUint8Array(hexSalt);

		const saltedInputPassword = new Uint8Array(salt.length + inputPasswordBuffer.length);
		saltedInputPassword.set(salt, 0);
		saltedInputPassword.set(inputPasswordBuffer, salt.length);

		const hashedBuffer = await crypto.subtle.digest('SHA-256', saltedInputPassword);

		const hashedInputPassword = Array.from(new Uint8Array(hashedBuffer))
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		return hashedInputPassword === hashedPassword;
	}
}
