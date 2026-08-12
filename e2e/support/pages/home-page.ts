import { expect, Page } from '@playwright/test';

export const openHome = async (page: Page)=> {
  await page.goto('https://www.demoblaze.com');
  await expect(page.locator('#nava')).toBeVisible();
};

export const signUp = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.locator('#signInModal')).toBeVisible();
  await page.locator('#sign-username').fill(username);
  await page.locator('#sign-password').fill(password);

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const dialog = await dialogPromise;

  expect(dialog.message()).toBe('Sign up successful.');
  await dialog.accept();
};

export const logIn = async (
  page: Page,
  username: string,
  password: string
) => {
  await page.getByRole('link', { name: 'Log in' }).click();
  await expect(page.locator('#logInModal')).toBeVisible();
  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
};

export const addProductToCart = async (
  page: Page,
  productName: string
) => {
  await page.getByRole('link', { name: productName, exact: true }).click();
  await expect(page.locator('.name')).toHaveText(productName);

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('link', { name: 'Add to cart' }).click();
  const dialog = await dialogPromise;

  expect(dialog.message()).toMatch(/^Product added\.?$/);
  await dialog.accept();
};
