/**------------------------------------------------------------
 * Home.jsx
 * Aaron Cumming, Matthew Kruse
 *
 * Displays all reminders
 *------------------------------------------------------------**/

import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getEvents, getReminders } from "../data/reminders";
import { EditReminders } from "../components/EditReminders";

// Returns a list of events by key/value pairs by date: e.g. 4/12/25: [Event A, Event B]
const eventsByDate = (events) => {
 return events.reduce((acc, event) => {
  const date = new Date(event.event_time).toLocaleDateString();

  // set accumulator if missing
  if (!acc[date]) {
   acc[date] = [];
  }
  // append event to accumulator
  acc[date].push(event);
  return acc;
 }, {});
};

// Returns a list of reminders by key/value pairs by date: e.g. 4/12/25: [Reminder A, Reminder B]
const remindersByDate = (reminders) => {
 return reminders.reduce((acc, reminder) => {
  const date = new Date(reminder.remind_time).toLocaleDateString();

  // set accumulator if missing
  if (!acc[date]) {
   acc[date] = [];
  }
  // append reminder to accumulator
  acc[date].push(reminder);
  return acc;
 }, {});
};

// This page makes use of the conditional rendering pattern
// to handle different data fetching states, such as:
// - Loading
// - Error
// - Success
export function Home_Events() {
 const { isLoading, isError, data, error } = useQuery({
  queryKey: ["events"],
  queryFn: getEvents,
 });


 if (isLoading) {
  return (
   <>
    <h1>Loading...</h1>
   </>
  );
 }

 if (isError) {
  return (
   <>
    <h1>Uh Oh!</h1>
    <p>{error.message}</p>
   </>
  );
 }

 // Group events by date
 const groupedEvents = eventsByDate(data);

 return (
  <>
   <h1>Events</h1>
   {Object.keys(groupedEvents).map((date) => (
    <div key={date}>
     <h2>{date}</h2>
     <hr/>
     {groupedEvents[date].map((event) => (
      <div
       key={event.id}
       style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
       }}
      >
       <span>{new Date(event.event_time).toLocaleTimeString()}</span>
       <span>    </span>
       <span>{event.name}</span>
      </div>
     ))}
    </div>
   ))}
  </>
 );
}

export function Home_Reminders() {
 const { isLoading, isError, data, error, refetch } = useQuery({
  queryKey: ["reminders"],
  queryFn: getReminders,
 });


 if (isLoading) {
  return (
   <>
    <h1>Loading...</h1>
   </>
  );
 }

 if (isError) {
  return (
   <>
    <h1>Uh Oh!</h1>
    <p>{error.message}</p>
   </>
  );
 }

 // Group events by date
 const groupedReminders = remindersByDate(data);

 return (
  <>
   <h1>Reminders</h1>
   {Object.keys(groupedReminders).map((date) => (
    <div key={date}>
     <h2>{date}</h2>
     <hr/>
     {groupedReminders[date].map((reminder) => (
      <div
       key={reminder.id}
       style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
       }}
      >
       <span>{new Date(reminder.remind_time).toLocaleTimeString()}</span>
       <span>{reminder.event.name}</span>
       <span>{new Date(reminder.remind_time).toLocaleTimeString()}</span>
        <EditReminders 
        reminder={reminder} 
        onSave={() => refetch()} 
        />
      </div>
     ))}
    </div>
   ))}
  </>
 );
}

export function Home() {
 return<>
  <Home_Events/>
  <Home_Reminders/>
 </>
}