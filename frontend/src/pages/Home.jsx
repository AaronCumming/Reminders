/**------------------------------------------------------------
 * Home.jsx
 * Aaron Cumming, Matthew Kruse
 *
 * Displays all events (POC with React Portal for Modals)
 *------------------------------------------------------------**/

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../App.css";

import { useEventList, useEventMutations } from "../hooks/UseEvents";
import { useReminderList } from "../hooks/UseReminders";
import EventModal from "./EventModal";

// Dynamically create the modal root if it doesn't already exist
const createModalRoot = () => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
};

// Returns a list of events by key/value pairs by date
const eventsByDate = (events) => {
  return events.reduce((acc, event) => {
    const date = new Date(event.event_time).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});
};

export function Home_Events() {

  useEffect(() => {
    // Ensure modal root exists in DOM
    const existingModalRoot = document.getElementById("modal-root");
    if (!existingModalRoot) {
      createModalRoot();
    }
  }, []);

  const { events = [], isLoading: isEventsLoading, isError: isEventsError, error: eventsError } = useEventList();
  const { reminders, isLoading: isRemindersLoading, isError: isRemindersError, error: remindersError } = useReminderList();
  const { createEvent, editEvent, deleteEvent } = useEventMutations();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventReminders, setEventReminders] = useState([]);
  const [isInsertMode, setIsInsertMode] = useState(false);

  // save event handler
  const handleSaveEvent = (eventData) => {
    if (isInsertMode) {
      createEvent.mutate(eventData, {
        onSuccess: () => {
          console.log("New event created successfully");
          closeModal();
        },
        onError: (error) => {
          console.error("Failed to create event:", error.message);
        },
      });
    } else {
      editEvent.mutate(eventData, {
        onSuccess: () => {
          console.log("Event updated successfully");
          closeModal();
        },
        onError: (error) => {
          console.error("Failed to update event:", error.message);
        },
      });
    }
  };

  // delete event handler
  const handleDeleteEvent = (eventId) => {
    deleteEvent.mutate(eventId, {
      onSuccess: () => {
        console.log("Event deleted successfully");
        closeModal();
      },
      onError: (error) => {
        console.error("Failed to delete event:", error.message);
      },
    });
  };

  // close modal handler
  const closeModal = () => {
    setSelectedEvent(null);
    setIsInsertMode(false);
    setEventReminders([]);
  };


  useEffect(() => {
    if (selectedEvent && reminders) {
      const remindersForEvent = reminders.filter(
          (reminder) => reminder.event?.id === selectedEvent.id
      );
      setEventReminders(remindersForEvent);
    } else {
      setEventReminders([]);
    }
  }, [selectedEvent, reminders]);

  if (isEventsLoading || isRemindersLoading) {
    return <h1>Loading...</h1>;
  }

  if (isEventsError || isRemindersError) {
    return (
        <>
          <h1>Error!</h1>
          <p>{eventsError?.message || remindersError?.message}</p>
        </>
    );
  }

  const groupedEvents = eventsByDate(events);

  return (
      <>
        <div>
          <h1>
            Events
            <span className="plus-button"
                  onClick={() => {
                    setIsInsertMode(true);
                    setSelectedEvent({name: "", event_time: new Date().toISOString()});
                  }}
            >
            +
            </span>
          </h1>
        </div>
        <ul className="event-list">
        {Object.keys(groupedEvents).map((date) => (
            <li>
              <div key={date}>
                <h2>{date}</h2>
                <hr/>
                {groupedEvents[date].map((event) => (

                    <div className="event"
                         key={event.id}
                    >
                      <div className="event" key={event.id}>
                      <span>
                        {new Date(event.event_time).toLocaleTimeString()}
                      </span>
                        <span>
                        <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedEvent(event);
                              setIsInsertMode(false);
                            }}
                        >
                          {event.name}
                        </a>
                      </span>
                      </div>
                    </div>
                  ))}
              </div>
            </li>
              ))}
            </ul>
        {selectedEvent &&
            ReactDOM.createPortal(
                <EventModal
                    event={selectedEvent}
                    reminders={eventReminders}
                    onClose={closeModal}
                    onSaveEvent={handleSaveEvent}
                    onDeleteEvent={handleDeleteEvent}
                />,
                document.getElementById("modal-root")
            )}
      </>
  );
}