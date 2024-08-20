import { test } from './fixtures/education-section.fixture';
import { expect } from '@playwright/test';

test.describe('Education section', () => {
	test.beforeEach(async ({ navigateToApp, resumePage, educationSectionPage }) => {
		await navigateToApp();

		await expect(resumePage.addSectionBtn).toBeVisible();
		await resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();
		const sectionBtn = resumePage.getSectionButton('education');

		await sectionBtn.click();

		await expect(educationSectionPage.section).toBeVisible();
	});

	test('Education section should be successfully removed', async ({ educationSectionPage }) => {
		await educationSectionPage.section.hover();
		await expect(educationSectionPage.removeSectionBtn).toBeVisible();
		await educationSectionPage.removeSectionBtn.click();

		await expect(educationSectionPage.section).not.toBeVisible();
	});

	test('Education should be successfully added', async ({ educationSectionPage }) => {
		await educationSectionPage.section.hover();
		await expect(educationSectionPage.addEducationBtn).toBeVisible();

		const education = educationSectionPage.getEducation(0);
		await expect(education).toBeVisible();

		await educationSectionPage.addEducationBtn.click();

		const education2 = educationSectionPage.getEducation(1);
		await expect(education2).toBeVisible();
	});

	test('Education should be successfully removed', async ({ educationSectionPage }) => {
		await educationSectionPage.section.hover();

		const education = educationSectionPage.getEducation(0);
		await expect(education).toBeVisible();

		const removeEducationBtn = educationSectionPage.getRemoveEducationBtn(0);
		await removeEducationBtn.click();

		await expect(education).not.toBeVisible();
	});
});
