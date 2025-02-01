const { test, expect } = require('@playwright/test')

test("Calendar Handling", async function ({ page }) {
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    const year = "2025"
    const month = "July"
    const date = "28"
    await page.locator("button[class*='date-picker']").last().click()
    await page.locator("button[class='react-calendar__navigation__label']").click()
    await page.locator("button[class='react-calendar__navigation__label']").click()
    await page.locator(".react-calendar__tile").filter({ hasText: year }).click()
    await page.getByText(month).click()
    await page.locator(".react-calendar__tile").filter({ hasText: date }).click()
})

test("Calendar validations", async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < inputs.length; index++) {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
})
