// e2e/example.spec.mjs
import { test, expect } from '@playwright/test';
import {EventsPage} from './EventsPage';
import {EventsModal} from './EventsModal'

const baseURL = './';

test('can navigate to the add event page', async ({ page}) => {
  const eventsPage = new EventsPage(page);
  const eventsModal = new EventsModal(page);

  await page.goto(baseURL);
  await eventsPage.clickAddEventButton();
  await eventsModal.verifyTitle("Add New Event");
  await eventsModal.verifyModelAttributes();
});

test('can add/mutate event with reminder', async ({ page}) => {
  const eventsPage = new EventsPage(page);
  const eventsModal = new EventsModal(page);

  // test adding event named Foo Bar
  await page.goto(baseURL);
  await eventsPage.clickAddEventButton();
  await eventsModal.verifyTitle("Add New Event");
  await eventsModal.nameInput.fill("Foo Bar");
  await eventsModal.addDate("04/30/2025", page);

  await eventsModal.eventSaveButton.click();
  await eventsPage.isEventVisible("Foo Bar");

});

test('verifies add event modal attributes', async ({ page, baseURL }) => {

    const eventsPage = new EventsPage(page);
    await page.goto(baseURL);
  // You can also combine visibility and other properties if needed
  await eventsPage.verifyElements();
});