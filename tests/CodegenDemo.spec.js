import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('Flipkart');
  await page.goto('https://www.google.com/search?q=Flipkart&sca_esv=a6aa35ce50530f7c&source=hp&ei=G-NjZ_KfIf3m1sQPvZW-mQM&iflsig=AL9hbdgAAAAAZ2PxKyDnDvHmuyLhwFK3yWBVeB7T0T1e&ved=0ahUKEwiymYzBvrOKAxV9s5UCHb2KLzMQ4dUDCBA&uact=5&oq=Flipkart&gs_lp=Egdnd3Mtd2l6IghGbGlwa2FydDIOEC4YgAQYsQMY0QMYxwEyCBAAGIAEGMkDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzILEAAYgAQYsQMYgwEyCxAAGIAEGJIDGIoFMggQABiABBixAzIIEAAYgAQYsQNI5x9QqAVYnhhwAngAkAEAmAGxAaAB3AqqAQMwLjm4AQPIAQD4AQGYAgugAvgKqAIKwgIKEAAYAxjqAhiPAcICChAuGAMY6gIYjwHCAhEQLhiABBixAxjRAxiDARjHAcICCxAuGIAEGLEDGNQCwgIFEAAYgASYAwbxBY3_5yrr2S71kgcDMi45oAelQQ&sclient=gws-wiz');
  await page.getByRole('link', { name: 'Flipkart Flipkart https://www' }).click();
  await page.getByPlaceholder('Search for Products, Brands').click();
  await page.getByPlaceholder('Search for Products, Brands').fill('iphone 15 pro max');
  await page.getByPlaceholder('Search for Products, Brands').press('Enter');
  await page.getByPlaceholder('Search for Products, Brands').click();
  await page.getByPlaceholder('Search for Products, Brands').press('Enter');
  // await page.getByRole('link', { name: 'iphone 15 pro max 256 gb in' }).click();
});