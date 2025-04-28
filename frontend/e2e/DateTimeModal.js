// e2e/pages/EventsPage.mjs
import { expect } from '@playwright/test';

export class DateTimeModal {
  constructor(page) {

    // define locators in modal structure
    this.modalHeading = page.locator('id=modal-heading');
    this.subHeading = page.locator('id=date-subheading');
    this.calendarWidget = page.locator('class=react-calendar')
    this.timeWidget = page.locator('id=time-widget');
    this.saveButton = page.locator('id=date-save');
    this.cancelButton = page.locator('id=date-cancel');

    this.page = page;
  }

  async selectDate(date) {
    const targetDate = new Date(date);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    const targetDay = targetDate.getDate();

    // Navigate to the correct month and year
    while (true) {

      const currentMonth = await this.page.locator('.react-calendar__navigation__label').textContent();
      const [monthName, year] = currentMonth.split(' ');
      const currentMonthIndex = new Date(monthName + ' 1, ' + year).getMonth();
      const currentYear = parseInt(year, 10);

      if (currentYear === targetYear && currentMonthIndex === targetMonth) {
        break;
      }

      if (targetYear < currentYear || (targetYear === currentYear && targetMonth < currentMonthIndex)) {
        await this.page.locator('.react-calendar__navigation__prev-button').click();
      } else {
        await this.page.locator('.react-calendar__navigation__next-button').click();
      }
    }

    // Select the day
    await this.page.locator(`.react-calendar__month-view__days button:nth-child(${targetDay})`).click();
  }


  async isReminderVisible(eventName) {
        const eventItem = this.page.locator('.event a', { hasText: eventName });
        await expect(eventItem).toBeVisible();
  }

  async saveDate() {
    await this.saveButton.click();
  }

  async verifyTitle(title) {
    const headingTitles = await this.modalHeading.allTextContents();
    await expect(headingTitles[0]).toEqual(title);
  }

  async verifyModelAttributes() {
    await this.modalHeading.allTextContents();
    await expect(this.modalHeading).toBeVisible();
    await expect(this.subHeading).toBeVisible();
    await expect(this.calendarWidget).toBeVisible();
    await expect(this.timeWidget).toBeVisible();
    await expect(this.timeStamp).toBeVisible();
    await expect(this.saveButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
  }

}
