import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';

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
