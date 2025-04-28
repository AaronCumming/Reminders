// e2e/pages/EventsPage.mjs
import { expect } from '@playwright/test';

export class EventsPage {
  constructor(page) {
    this.page = page;
    this.eventsHeading = page.locator('h1:has-text("Events")');
    this.addEventButton = page.locator('span.plus-button');
    this.eventItems = page.locator('.event');
  }

  async goto() {
    await this.page.goto('/events'); // Or your homepage if that's where the Events section is
  }

  async clickAddEventButton() {
    await this.addEventButton.click();
  }

  async isEventVisible(eventName) {

    let eventFound = false;
    const count = await this.eventItems.count();

    for (let i = 0; i < count; i++) {
      const eventLink = this.eventItems.nth(i).locator('a'); // Get the <a> within the item
      const eventText = await eventLink.textContent();

      if (eventText === eventName) {
        eventFound = true;
        break;
      }
    }
    expect(eventFound).toBe(true);
  }

  async verifyElements() {
    await expect(this.eventsHeading).toBeVisible();
    await expect(this.addEventButton).toBeVisible();
  }
}
