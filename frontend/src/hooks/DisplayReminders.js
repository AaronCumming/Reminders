/**------------------------------------------------------------
 * DisplayReminders.js
 * Aaron Cumming
 *
 * A hook to display reminders
 *------------------------------------------------------------**/

import { API_URL } from "../constants";
import { useState, useEffect } from "react";

// This first hook gives the rough design for
// data fetching, not mutation.
//
// Notably, there are 3 different useState calls
// in this application.
// Each is used internally to cause updates for react.
export function useTaskList() {
  const [tasks, setTasks] = useState([]);
  // We use a state to track possible errors and the current
  // loading state.
  // This enables the conditional rendering visible on the `pages/TaskList.jsx`.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(
    // The use of an arrow function here is for simplicity and to avoid any issues
    // with things not being available inside of the function due to scoping.
    () => {
      // We immediately set loading to true so that the UI can show an indicator
      // while waiting for the call to resolve.
      setLoading(true);
      fetch(`${API_URL}/tasks/`, {
        headers: {
          // Make sure to set this header, otherwise you won't get back
          // JSON data.
          // Other Content Types you can use are:
          // - text/html for HTML data
          // - application/xml for XML Data
          "Content-Type": "application/json", // text/html ; application/xml
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          // We only stop loading if the response is not okay,
          // since at this point we have resolved to an error.
          setLoading(false);

          // We don't immediately setError however,
          // instead we take advantage of how promises work
          // and throw an error to use in .catch later on.
          throw new Error("Error getting data");
        })
        .then((json) => {
          setLoading(false);
          setTasks(json);
        })
        .catch((err) => {
          setError(err);
        });
    },
    [
      /* Empty Dependency Array so the effect only runs once */
    ]
  );

  // We do not provide the data setters, only the getters.
  // This is intentional design, since we are the only ones to manipulate
  // the data.
  return { tasks, loading, error };
  // The above is just a shorthand for
  // { tasks: tasks, loading: loading, error: error }
}