import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows hero content', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Pizza Galleria/i);

    const heading = page.getByRole('heading', { level: 1, name: /Delicious Pizza/i });
    await expect(heading).toBeVisible();

    const cta = page.getByRole('button', { name: /Get your pizza now/i });
    await expect(cta).toBeVisible();
  });
});


