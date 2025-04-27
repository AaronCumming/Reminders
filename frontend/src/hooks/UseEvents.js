/**------------------------------------------------------------
 * UseEvents.js
 * Matthew Kruse
 *
 * A hook to manage events using React Query
 *------------------------------------------------------------**/

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../constants";

export function useEventList() {
  const fetchEvents = async () => {
    const response = await fetch(`${API_URL}/events/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    return response.json();
  };

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["events"], queryFn: fetchEvents});

  return { events, isLoading, isError, error };
}

// Mutations for creating, editing, and deleting events
export function useEventMutations() {
  const queryClient = useQueryClient();

  // Create a new event
  const createEvent = useMutation({
    mutationFn: async (newEvent) => {
      const response = await fetch(`${API_URL}/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error("Error creating event:", error.message);
    },
  });

  // Edit an existing event
  const editEvent = useMutation({
    mutationFn: async (updatedEvent) => {
      const response = await fetch(`${API_URL}/events/${updatedEvent.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error("Error updating event:", error.message);
    },
  });

  // Delete an event
  const deleteEvent = useMutation({
    mutationFn: async (eventId) => {
      const response = await fetch(`${API_URL}/events/${eventId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error("Error deleting event:", error.message);
    },
  });

  return {
    createEvent,
    editEvent,
    deleteEvent,
  };
}
