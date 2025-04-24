from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone 

from reminders.models import Event, Reminder


# Create your tests here.

class TestEventModel(TestCase):
    def test_name_validation(self):
        name = "i" * 257
        event_time =  timezone.now()
        event = Event(name=name, event_time=event_time)

        with self.assertRaises(ValidationError):
            event.full_clean()

    def test_str(self):
        event = Event(name="My Event", event_time =  timezone.now())

        result = str(event)

        self.assertEqual(result, "My Event")


class TestReminderModel(TestCase):
    def test_reminder_time(self):
        time = timezone.now()
        event = Event(name="My Event", event_time =  timezone.now())
        reminder = Reminder(event = event, remind_time = time)

        self.assertEqual(reminder.remind_time, time)