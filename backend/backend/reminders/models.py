from django.db import models

class Event(models.Model):
    """ An Event can have multiple or no reminders.
        An Event has a name and an event_time (which is not a reminder).
    """

    name = models.CharField(max_length=255)
    event_time = models.DateTimeField()

    def __str__(self):
        return self.name


class Reminder(models.Model):
    """ A Reminder can only be associated with one event.
        Remind_time is when the reminder "goes off" or reminds the user.
    """

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    remind_time = models.DateTimeField()