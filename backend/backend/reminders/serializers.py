# reminders/forms.py
# Matthew Kruse
# Serializers for Event, Reminder
# 26 April 2025

from rest_framework import serializers
from .models import Event, Reminder

# set event fields displayed to client
class EventSerializer(serializers.ModelSerializer):
    event_time = serializers.DateTimeField()

    class Meta:
        model = Event
        fields = ('id', 'name', 'event_time')
        read_only_fields = ()

# set reminder fields displayed to client
class ReminderSerializer(serializers.ModelSerializer):
    remind_time = serializers.DateTimeField()

    # Make event read_only while event id is write-only
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(), source='event', write_only=True
    )
    class Meta:
        model = Reminder
        fields = ('id', 'event', 'event_id', 'remind_time')
        read_only_fields = ()
