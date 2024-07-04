import { Locator, Page } from '@playwright/test';

export class HomePage {
	readonly createNewResumeButton: Locator;
	readonly signInButton: Locator;
	readonly modalLogInButton: Locator;
	readonly modalSignUpButton: Locator;

	readonly landingText: Locator;

	readonly authModal: Locator;
	readonly titleAuthModal: Locator;

	constructor(private readonly page: Page) {
		this.createNewResumeButton = this.page.getByRole('link', { name: 'Create new resume' });
		this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
		this.modalLogInButton = this.page.getByRole('button', { name: 'Log In' });
		this.modalSignUpButton = this.page.getByRole('button', { name: 'Sign Up' });

		this.landingText = this.page.getByTestId('landing-text');

		this.authModal = this.page.getByTestId('auth-modal');
		this.titleAuthModal = this.page.getByTestId('modal-title');
	}

	async initializeApp() {
		await this.page.goto('/');
	}

	async openAuthModal() {
		await this.signInButton.click();
	}

	async swapModalStateToRegister() {
		const btn = this.page.getByRole('button', { name: 'Register new account.' });
		await btn.click();
	}

	async swapModalStateToLogin() {
		const btn = this.page.getByRole('button', { name: 'Are you already registered?' });
		await btn.click();
	}
}
