/**------------------------------------------------------------
 * EventModal.jsx
 * Matthew Kruse (refactored version)
 *
 * Modal for updating events and reminders
 *------------------------------------------------------------**/

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useQueryClient } from "@tanstack/react-query";
import DateTimePickerModal from './DateTimePickerModal';
import 'react-time-picker/dist/TimePicker.css';
import { useReminderMutations } from "../hooks/UseReminders";

const EventModal = ({ event, reminders, onClose, onSaveEvent, onDeleteEvent }) => {
  const [eventName, setEventName] = useState(event.name || "");
  const [eventTime, setEventTime] = useState(event.event_time || new Date().toISOString());
  const [editReminder, setEditReminder] = useState(null);
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);

  const { createReminder, deleteReminder, editReminder: mutateEditReminder } = useReminderMutations();
  const queryClient = useQueryClient();

  // event handler
  const handleSaveEventDetails = () => {
    const updatedEvent = { ...event, name: eventName, event_time: eventTime };
    onSaveEvent(updatedEvent);
  };

  // reminder handlers
  const handleAddReminderClick = () => {
    setIsAddingReminder(true);
    setEditReminder(null);
    setShowDateTimeModal(true);
    setEditing('reminder');
  };

  const handleCreateReminder = (updatedDateTime) => {
    const newReminder = {
      event_id: event.id,
      remind_time: updatedDateTime.toISOString().slice(0, -1),
    };
    createReminder.mutate(newReminder, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reminders"] }),
      onError: (error) => console.error('Failed to add reminder:', error.message),
      onSettled: handleCloseDateTimeModal,
    });
  };

  const handleUpdateReminder = (updatedDateTime) => {
    const updatedReminderData = {
      id: editReminder.id,
      remind_time: updatedDateTime.toISOString(),
      eventId: editReminder.event.id,
    };
    mutateEditReminder.mutate(updatedReminderData, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reminders"] }),
      onError: (error) => console.error('Failed to update reminder:', error.message),
      onSettled: handleCloseDateTimeModal,
    });
  };

  const handleDeleteReminder = (id) => {
    deleteReminder.mutate(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reminders"] }),
      onError: (error) => console.error('Failed to delete reminder:', error.message),
    });
  };


  // date & time handler
  const handleSaveDateTime = (updatedDateTime) => {
    if (editing === 'reminder' && editReminder) {
      handleUpdateReminder(updatedDateTime);
    } else if (editing === 'event') {
      setEventTime(updatedDateTime.toISOString());
      handleCloseDateTimeModal();
    } else if (editing === 'reminder' && isAddingReminder) {
      handleCreateReminder(updatedDateTime);
    }
  };

  // close modal handler
  const handleCloseDateTimeModal = () => {
    setEditReminder(null);
    setShowDateTimeModal(false);
    setEditing(null);
    setIsAddingReminder(false);
  };

  if (!event) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{event.id ? "Edit Event" : "Add New Event"}</h2>

        {/* Form Container */}
        <div className="form-container">
          <div className="form-row">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">Date and Time:</label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEditReminder(null);
                setIsAddingReminder(false);
                setShowDateTimeModal(true);
                setEditing('event');
              }}
              className="form-link"
            >
              {new Date(eventTime).toLocaleString()}
            </a>
          </div>
        </div>

        {/* Reminder Section */}
        <div>
          <h3>
            Reminders
            <span
              className="plus-button"
              onClick={handleAddReminderClick}
              onMouseEnter={(e) => (e.target.style.color = 'blue')}
              onMouseLeave={(e) => (e.target.style.color = 'black')}
            >
            +
            </span>
          </h3>
        </div>

        <div>
          {reminders && reminders.length > 0 ? (
            <ul>
              {reminders.map((reminder) => (
                <li key={reminder.id}>
                  {new Date(reminder.remind_time).toLocaleString()}
                  <button
                    onClick={() => {
                      setEditReminder(reminder);
                      setIsAddingReminder(false);
                      setShowDateTimeModal(true);
                      setEditing('reminder');
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteReminder(reminder.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reminders yet</p>
          )}
        </div>

        {/* Save, Delete & Cancel Buttons */}
        <button onClick={handleSaveEventDetails}>
          {event.id ? "Save Event" : "Create Event"}
        </button>
        {onDeleteEvent && (
          <button onClick={() => onDeleteEvent(event.id)}>Delete Event</button>
        )}
        <div>
          <button onClick={onClose}>Cancel</button>
        </div>

        {/* DateTimePicker Modal */}
        {showDateTimeModal && (
          <DateTimePickerModal
            dateTime={editing === 'reminder' && editReminder ? editReminder.remind_time : eventTime}
            event={event}
            isReminder={editing === 'reminder' || isAddingReminder}
            onClose={handleCloseDateTimeModal}
            onSave={handleSaveDateTime}
          />
        )}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default EventModal;
