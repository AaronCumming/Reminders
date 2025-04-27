/**------------------------------------------------------------
 * DateTimePickerModal.jsx
 * Matthew Kruse
 *
 * Modal for selecting date/time for events and reminders via the
 *  react-calendar and react-time-picker widgets
 *------------------------------------------------------------**/
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

const DateTimePickerModal = ({ dateTime, onClose, onSave, event, isReminder }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

  useEffect(() => {

    // Use provided dateTime if provided
    if (dateTime) {
      const localDate = new Date(dateTime);
      setSelectedDate(new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));

      // build time string - must be in 24 hour format for AM/PM to appear correctly
      const timeStr = localDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      setSelectedTime(timeStr);

    } else {
      setSelectedDate(new Date());
      setSelectedTime(new Date().toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit', hour12: false }));
    }
  }, [dateTime]);


  // Handler to save the selected date and time
  const handleSave = () => {
    if (!selectedDate || !selectedTime) {
      console.error('Date or time is missing!');
      return;
    }

    const [hours, minutes] = selectedTime.split(':');
    const result = new Date(selectedDate);
    result.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    onSave(result);
  };

  // Utilize modal to display date/time pickers
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Dynamic heading based on isReminder */}
        <h3>
          {isReminder
            ? `Reminder for ${event?.name || 'Untitled Event'}`
            : `Setting Event Time for "${event?.name || 'Untitled Event'}"`}
        </h3>
        {/* Always show the event's current scheduled time */}
        <p>Event Date: {event?.event_time ? new Date(event.event_time).toLocaleString() : 'None'}</p>

        {/* Calendar widget */}
        <Calendar
          value={selectedDate}
          defaultView="month"
          selectRange={false}
          onChange={setSelectedDate}
        />

        {/* TimePicker widget */}
        <TimePicker
          value={selectedTime}
          onChange={setSelectedTime}
          disableClock
        />

        {/* Save and Cancel buttons */}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DateTimePickerModal;