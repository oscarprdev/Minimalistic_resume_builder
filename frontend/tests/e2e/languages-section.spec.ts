import { test } from './fixtures/languages-section.fixture';
import { expect } from '@playwright/test';

test.describe('Languages section', () => {
	test.beforeEach(async ({ navigateToApp, resumePage, languagesSectionPage }) => {
		await navigateToApp();

		await expect(resumePage.addSectionBtn).toBeVisible();

		await resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();
		const sectionBtn = resumePage.getSectionButton('languages');

		await sectionBtn.click();

		await expect(languagesSectionPage.section).toBeVisible();
	});

	test('Languages section should be successfully removed', async ({ languagesSectionPage }) => {
		await languagesSectionPage.section.hover();
		await expect(languagesSectionPage.removeSectionBtn).toBeVisible();
		await languagesSectionPage.removeSectionBtn.click();

		await expect(languagesSectionPage.section).not.toBeVisible();
	});

	test('Languages should be successfully added', async ({ languagesSectionPage }) => {
		await languagesSectionPage.section.hover();
		await expect(languagesSectionPage.addLanguagesBtn).toBeVisible();

		const languages = languagesSectionPage.getLanguages(0);
		await expect(languages).toBeVisible();

		await languagesSectionPage.addLanguagesBtn.click();

		const languages2 = languagesSectionPage.getLanguages(1);
		await expect(languages2).toBeVisible();
	});

	test('Languages should be successfully removed', async ({ languagesSectionPage }) => {
		await languagesSectionPage.section.hover();

		const languages = languagesSectionPage.getLanguages(0);
		await expect(languages).toBeVisible();

		const removeLanguagesBtn = languagesSectionPage.getRemoveLanguagesBtn(0);
		await removeLanguagesBtn.click();

		await expect(languages).not.toBeVisible();
	});
});
