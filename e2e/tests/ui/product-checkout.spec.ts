import { expect, test } from '@playwright/test';
import { buildDemoblazeUser } from '../../support/fixture/test-data';
import { openCart, expectProductInCart, completePurchase } from '../../support/pages/cart-page';
import { openHome, signUp, logIn, addProductToCart } from '../../support/pages/home-page';

test.describe('SignUp and add product to the cart', () => {
  test('A new customer can register and log in', async ({ page }) => {
    const user = buildDemoblazeUser();

    await openHome(page);
    await signUp(page, user.username, user.password);

    await logIn(page, user.username, user.password);
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  });

  test('A shopper can add a product and complete checkout', async ({
    page
  }) => {
    const productName = 'Samsung galaxy s6';

    await openHome(page);
    await addProductToCart(page, productName);

    await openCart(page);
    await expectProductInCart(page, productName);

    const receipt = await completePurchase(page, {
      name: 'QA Candidate',
      country: 'Canada',
      city: 'Vancouver',
      card: '4111111111111111',
      month: '12',
      year: '2030'
    });

    expect(receipt.id).toMatch(/^\d+$/);
    expect(receipt.amount).toBe('360 USD');
  });
});
