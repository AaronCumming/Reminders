// e2e/pages/EventsPage.mjs
import { expect } from '@playwright/test';
import {DateTimeModal} from './DateTimeModal'


export class EventsModal {
  constructor(page) {
    this.page = page;

    // define locators in modal structure
    this.modalHeading = page.locator('h2.modalHeading');
    this.nameLabel = page.locator('text=Name:');
    this.timeLabel = page.locator('text=Date and Time:');
    this.nameInput = page.locator('id=name-input');
    this.timeStamp = page.locator('id=date-link');

    this.reminderHeading = page.locator('text=Reminders+');
    this.addRemindersButton = page.locator('id=add-reminder-span');
    this.eventSaveButton = page.locator('id=event-save-button');
    this.eventDeleteButton = page.locator('id=event-delete-button');
    this.eventCancelButton = page.locator('id=event-cancel-button');

    this.reminderItems = page.locator('.reminder');
  }

  async addDate(date, page) {
    const dateTimeModal = new DateTimeModal(page);
    await this.timeStamp.click();
    await dateTimeModal.selectDate(date)

    // Save
    await dateTimeModal.saveDate();
  }

  async addReminder(date, page) {
    const dateTimeModal = new DateTimeModal(page);
    await this.addRemindersButton.click();
    await dateTimeModal.selectDate(date)

    // Save
    await dateTimeModal.saveDate();
  }

  async isReminderVisible(date, page) {
    await page.screenshot({ path: 'reminder-sCWS-screenshot1.png' });
    let reminderFound = false;
    const count = await this.reminderItems.count();

    await page.screenshot({ path: 'reminder-saved-screenshot2.png' });
    for (let i = 0; i < count; i++) {
      const reminderText = await this.reminderItems.nth(i).textContent();

      if (reminderText.includes(date)) {
        reminderFound = true;
        break;
      }
    }
    expect(reminderFound).toBe(true);
  }


  async verifyTitle(title) {
    const headingTitles = await this.modalHeading.allTextContents();
    await expect(headingTitles[0]).toEqual(title);
  }

  async verifyModelAttributes() {
    await this.modalHeading.allTextContents();
    await expect(this.modalHeading).toBeVisible();
    await expect(this.nameLabel).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.timeLabel).toBeVisible();
    await expect(this.timeStamp).toBeVisible();
    await expect(this.reminderHeading).toBeVisible();
    await expect(this.addRemindersButton).toBeVisible();
    await expect(this.eventSaveButton).toBeVisible();
    await expect(this.eventDeleteButton).toBeVisible();
    await expect(this.eventCancelButton).toBeVisible();
  }

}
