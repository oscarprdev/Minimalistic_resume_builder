import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ override: true });
const frontendEnv = { ...process.env } as { [key: string]: string };

export default defineConfig({
	testDir: './tests/e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: true,
	/* Retry on CI only */
	retries: 1,
	/* Opt out of parallel tests on CI. */
	workers: undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'list',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:3000',
		timeout: 120 * 1000 * 5,
		reuseExistingServer: false,
		env: frontendEnv,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
});
