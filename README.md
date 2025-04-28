# Project Name: Reminders

## Description

This reminders app is a small, easy to use application to save a list of events and to create reminders for them. The events are grouped and sorted by Date/Time, with the ability to edit and attach reminders to them by clicking on the event name.  To retain context, the active event name is always displayed in a non-cluttered way, whether accessing the the Edit Event Modal, or the DateTimePicker modal which comes to the forefront. 

## Features Implemented

- React Query to communicate with the backend
- React-Calendar and React-Time-Picker widgets with automatic Date/Time selection
- Modals are implemented to display the minimal amount of information necessary
- CSS to support both Normal and Dark Mode
- Our team added some backend Django tests for the model
- End-to-end tests with Playwright for Page Validation & Event Creation

---

## Usage Documentation

### First Time Environment Setup

This project requires setting up both a backend with Django and a frontend with Node.js, React, and Vite. Follow these steps after cloning the repository:

#### Backend Setup
1. Open a terminal window dedicated to backend operations
2. Navigate to the backend directory:
   ```bash
   cd Reminders/backend
   ```
3. Set up a virtual environment and activate it. See the following for Mac/Unix like systems
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
4. Apply migrations and start the Django development server:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

#### Frontend Setup
1. Open a separate terminal for frontend operations
2. Navigate to the frontend directory:
   ```bash
   cd Reminders/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

### Testing

#### Backend Testing
1. Navigate to the backend directory:
   ```bash
   cd Reminders/backend/backend
   ```
2. Run unit tests for the reminders app:
   ```bash
   python manage.py test reminders
   ```
3. Check the console output for test results and resolve any issues

#### Frontend Testing with Playwright
1. Ensure both backend and frontend services are running
2. Initialize Playwright & Browsers (only if it is not already set up):
   ```bash
   cd reminders/frontend
   npm init playwright@latest
   npx playwright install
   ```
3. Run the tests:
   ```bash
   npx playwright test
   ```
4. For any failures, open the HTML report automatically generated:
   ```bash
   npx playwright show-report
   ```

---

### Application Launch
1. Start the backend server:
   ```bash
   python manage.py runserver
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```
3. Access the application at [http://localhost:5173](http://localhost:5173)

---

### Usage Instructions

1. **Create a New Event**:
   - Click the `+` symbol next to the **Events** heading
   - Enter a name (required)
   - Select the event date and time using the Date/Time widgets
   - Click **Save** to confirm the date and time
   - Click **Create Event** to save the new event

2. **Add Reminders**:
   - Click on an event to view its details
   - Click the `+` symbol next to **Reminders**
   - Set the reminder date and time, then save
   - Multiple reminders can be added for the same event

---

### Known Issues & Future Enhancements
1. Display reminder information on the homepage in a 3rd column (time remaining or timestamp)
2. Auto-save new events when clicking on the Reminders `+` button from within the modal
3. Add confirmation and validation messages for invalid data entry
4. Enable filtering or querying events by date or date range as supported by the API
5. Support assigning reminders as tasks to family members
6. Add configurable timezone settings

---

## Contacts
 
- Aaron Cumming
 
- Matthew Kruse
 
- Brodie Rogers
 
To suggest a feature or submit an issue, [use this link](https://github.com/AaronCumming/Reminders/issues)
