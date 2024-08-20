import { test } from './fixtures/header-section.fixture';
import { expect } from '@playwright/test';

test.describe('Header section', () => {
	test.beforeEach(async ({ navigateToApp, headerSectionPage }) => {
		await navigateToApp();
		await expect(headerSectionPage.section).toBeVisible();
	});

	test.skip('User should be able to add new links', async ({ headerSectionPage }) => {
		await headerSectionPage.section.hover({ force: true });
		await expect(headerSectionPage.addNewLinkBtn).toBeVisible({ timeout: 10000 });

		const link = headerSectionPage.getLink(0);
		await expect(link).toBeVisible();

		headerSectionPage.addNewLinkBtn.click();
		const link2 = headerSectionPage.getLink(1);
		await expect(link2).toBeVisible();
	});

	test.skip('Image should be successfully uploaded', async ({ resumePage, headerSectionPage }) => {
		await expect(headerSectionPage.image).not.toBeVisible();

		await headerSectionPage.section.hover();
		await expect(headerSectionPage.uploadImageBtn).toBeVisible();

		await headerSectionPage.uploadImage();

		await resumePage.header.hover();

		await expect(headerSectionPage.image).toBeVisible();
	});

	test.skip('Image should be successfully removed', async ({ resumePage, headerSectionPage }) => {
		await expect(headerSectionPage.image).not.toBeVisible();

		await headerSectionPage.section.hover();
		await expect(headerSectionPage.uploadImageBtn).toBeVisible();

		await headerSectionPage.uploadImage();

		await expect(headerSectionPage.image).toBeVisible();

		await expect(headerSectionPage.removeImageBtn).toBeVisible();
		headerSectionPage.removeImageBtn.click();

		await resumePage.header.hover();

		await expect(headerSectionPage.image).not.toBeVisible();
	});
});
