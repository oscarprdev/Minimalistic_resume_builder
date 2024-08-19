import { HeaderSectionPage } from '../pages/header-section.page';
import { test as base } from './resume.fixture';

interface HeaderSectionFixture {
	headerSectionPage: HeaderSectionPage;
}

export const test = base.extend<HeaderSectionFixture>({
	headerSectionPage: async ({ page }, use) => {
		await use(new HeaderSectionPage(page));
	},
});
