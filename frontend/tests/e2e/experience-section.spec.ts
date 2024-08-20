import { test } from './fixtures/experience-section.fixture';
import { expect } from '@playwright/test';

test.describe('Experience section', () => {
	test.beforeEach(async ({ navigateToApp, resumePage, experienceSectionPage }) => {
		await navigateToApp();

		await expect(resumePage.addSectionBtn).toBeVisible();

		await resumePage.addSectionBtn.click();
		await expect(resumePage.addSectionModalContent).toBeVisible();
		const sectionBtn = resumePage.getSectionButton('experience');

		await sectionBtn.click();

		await expect(experienceSectionPage.section).toBeVisible();
	});

	test('Experience section should be successfully removed', async ({ experienceSectionPage }) => {
		await experienceSectionPage.section.hover();
		await expect(experienceSectionPage.removeSectionBtn).toBeVisible();
		await experienceSectionPage.removeSectionBtn.click();

		await expect(experienceSectionPage.section).not.toBeVisible();
	});

	test('Experience should be successfully added', async ({ experienceSectionPage }) => {
		await experienceSectionPage.section.hover();
		await expect(experienceSectionPage.addExperienceBtn).toBeVisible();

		const experience = experienceSectionPage.getExperience(0);
		await expect(experience).toBeVisible();

		await experienceSectionPage.addExperienceBtn.click();

		const experience2 = experienceSectionPage.getExperience(1);
		await expect(experience2).toBeVisible();
	});

	test('Experience should be successfully removed', async ({ experienceSectionPage }) => {
		await experienceSectionPage.section.hover();

		const experience = experienceSectionPage.getExperience(0);
		await expect(experience).toBeVisible();

		const removeExperienceBtn = experienceSectionPage.getRemoveExperienceBtn(0);
		await removeExperienceBtn.click();

		await expect(experience).not.toBeVisible();
	});
});
