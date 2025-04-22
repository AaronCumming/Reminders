/**------------------------------------------------------------
 * reminders.js
 * Aaron Cumming
 *
 * Reminders Data Fetching
 *------------------------------------------------------------**/

import { API_URL } from "../constants";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`, {
    headers: {
      "Content-Type": "applicatio/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");

  return await response.json();
}


export async function getReminders() {
  const response = await fetch(`${API_URL}/reminders`, {
    headers: {
      "Content-Type": "applicatio/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");

  return await response.json();
}