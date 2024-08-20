import { test } from './fixtures/summary-section.fixture';
import { expect } from '@playwright/test';

test.describe('Summary section', () => {
	test.beforeEach(async ({ navigateToApp, resumePage, summarySectionPage }) => {
		await navigateToApp();

		await expect(resumePage.addSectionBtn).toBeVisible();

		await resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();
		const sectionBtn = resumePage.getSectionButton('summary');

		await sectionBtn.click();

		await expect(summarySectionPage.section).toBeVisible();
	});

	test('Summary section should be successfully removed', async ({ summarySectionPage }) => {
		await summarySectionPage.section.hover();
		await expect(summarySectionPage.removeSectionBtn).toBeVisible();
		await summarySectionPage.removeSectionBtn.click();

		await expect(summarySectionPage.section).not.toBeVisible();
	});
});
