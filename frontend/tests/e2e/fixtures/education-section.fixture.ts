import { EducationSectionPage } from '../pages/education-section.page';
import { test as base } from './resume.fixture';

interface EducationSectionFixture {
	educationSectionPage: EducationSectionPage;
}

export const test = base.extend<EducationSectionFixture>({
	educationSectionPage: async ({ page }, use) => {
		await use(new EducationSectionPage(page));
	},
});
