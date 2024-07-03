import { test, Locator, expect, Page } from '@playwright/test';

class HomePage {
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

test.describe('Home page', () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.initializeApp();
	});

	test('Landing text should be visible', async ({ page }) => {
		await expect(homePage.landingText).toBeVisible();
	});

	test('Create new resume button should be visible', async () => {
		await expect(homePage.createNewResumeButton).toBeVisible();
	});

	test.describe('Auth modal', () => {
		test.beforeEach(async () => {
			await expect(homePage.signInButton).toBeVisible();
			await homePage.openAuthModal();
			await expect(homePage.authModal).toBeVisible();
		});

		test('Auth modal should show logIn content or register content as expected', async () => {
			await expect(homePage.titleAuthModal).toBeVisible();
			await expect(homePage.titleAuthModal).toHaveText('Log in');
			await expect(homePage.modalLogInButton).toBeVisible();

			await homePage.swapModalStateToRegister();

			await expect(homePage.titleAuthModal).toHaveText('Sign up');
			await expect(homePage.modalSignUpButton).toBeVisible();

			await homePage.swapModalStateToLogin();

			await expect(homePage.titleAuthModal).toHaveText('Log in');
			await expect(homePage.modalLogInButton).toBeVisible();
		});
	});
});
