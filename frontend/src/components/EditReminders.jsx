/**------------------------------------------------------------
 * EditReminders.jsx
 * Brodie Rogers
 *
 * Edit existing reminders
 *------------------------------------------------------------**/

import React, { useState } from "react";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { getEvents, getReminders } from "../data/reminders";

export const EditReminders = ({ reminder, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [reminderTime, setReminderTime] = useState(reminder?.remind_time || '');
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        await SendEditReminder({
          ...reminder,
          remind_time: reminderTime,
        });
        
        setIsEditing(false);
        if (onSave) onSave();
      } catch (error) {
        console.error('Error saving reminder:', error);
      }
    };
  
    if (!isEditing) {
      return (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      );
    }
  
    return (
      <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
        <input
          type="datetime-local"
          value={reminderTime.slice(0, 16)} // Format for datetime-local input
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    );
  };


async function SendEditReminder(reminder) {
    try {
      const response = await fetch(`${'http://localhost:8000/api'}/reminders/${reminder.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: reminder.event.id,
          remind_time: reminder.remind_time,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update reminder');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating reminder:', error);
      throw error;
    }
  }