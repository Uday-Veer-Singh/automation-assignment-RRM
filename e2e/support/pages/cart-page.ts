import { expect, Page } from '@playwright/test';

export type OrderDetails = {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
};

export type OrderReceipt = {
  id: string;
  amount: string;
  rawText: string;
};

export const openCart = async (page: Page) => {
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page).toHaveURL(/cart\.html/);
};

export const expectProductInCart = async (
  page: Page,
  productName: string
) => {
  await expect(page.locator('#tbodyid')).toContainText(productName);
  await expect(page.locator('#totalp')).not.toBeEmpty();
};

export const completePurchase = async (
  page: Page,
  details: OrderDetails
) => {
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.locator('#orderModal')).toBeVisible();

  await page.locator('#name').fill(details.name);
  await page.locator('#country').fill(details.country);
  await page.locator('#city').fill(details.city);
  await page.locator('#card').fill(details.card);
  await page.locator('#month').fill(details.month);
  await page.locator('#year').fill(details.year);
  await page.getByRole('button', { name: 'Purchase' }).click();

  const confirmation = page.locator('.sweet-alert');
  await expect(confirmation).toBeVisible();
  await expect(confirmation.locator('h2')).toHaveText(
    'Thank you for your purchase!'
  );

  const rawText = await confirmation.locator('p').innerText();
  const id = rawText.match(/Id:\s*(\d+)/)?.[1];
  const amount = rawText.match(/Amount:\s*([^\n]+)/)?.[1];

  expect(id, `Order ID was absent from receipt: ${rawText}`).toBeTruthy();
  expect(
    amount,
    `Order amount was absent from receipt: ${rawText}`
  ).toBeTruthy();

  return {
    id: id!,
    amount: amount!,
    rawText
  };
};
