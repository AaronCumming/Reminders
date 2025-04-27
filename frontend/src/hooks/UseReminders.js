/**------------------------------------------------------------
 * UseReminders.js
 * Matthew Kruse
 *
 * A hook to manage reminders using React Query
 *------------------------------------------------------------**/

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants";

// Fetch reminders using React Query
export function useReminderList() {
  const fetchReminders = async () => {
    const response = await fetch(`${API_URL}/reminders/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reminders");
    }
    return response.json();
  };

  const {
    data: reminders,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["reminders"], queryFn: fetchReminders });

  return { reminders, isLoading, isError, error };
}

// Mutations for creating, editing, and deleting reminders
export function useReminderMutations() {
  const queryClient = useQueryClient();

  // Create a new reminder
  const createReminder = useMutation({
    mutationFn: async (newReminder) => {
      const response = await fetch(`${API_URL}/reminders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReminder),
      });
      if (!response.ok) {
        throw new Error("Failed to create reminder");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (error) => {
      console.error("Error creating reminder:", error.message);
    },
  });

  // Edit an existing reminder
  const editReminder = useMutation({
    mutationFn: async (updatedReminder) => {
      const response = await fetch(`${API_URL}/reminders/${updatedReminder.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReminder),
      });
      if (!response.ok) {
        throw new Error("Failed to update reminder");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (error) => {
      console.error("Error updating reminder:", error.message);
    },
  });

  // Delete a reminder
  const deleteReminder = useMutation({
    mutationFn: async (reminderId) => {
      const response = await fetch(`${API_URL}/reminders/${reminderId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete reminder");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
    onError: (error) => {
      console.error("Error deleting reminder:", error.message);
    },
  });

  return {
    createReminder,
    editReminder,
    deleteReminder,
  };
}
