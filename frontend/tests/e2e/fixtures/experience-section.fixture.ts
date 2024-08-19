import { ExperienceSectionPage } from '../pages/experience-section.page';
import { test as base } from './resume.fixture';

interface ExperienceSectionFixture {
	experienceSectionPage: ExperienceSectionPage;
}

export const test = base.extend<ExperienceSectionFixture>({
	experienceSectionPage: async ({ page }, use) => {
		await use(new ExperienceSectionPage(page));
	},
});
