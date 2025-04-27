# reminders/views.py
# Matthew Kruse
# Views for Event, Reminder, with date plus start_date and end_date filtering
# 16 April 2025

from rest_framework import generics, serializers, status, viewsets
from rest_framework.response import Response
from reminders.models import Reminder, Event
from reminders.serializers import ReminderSerializer, EventSerializer

from django.utils.dateparse import parse_datetime
from django.utils.timezone import is_naive, make_aware
import pytz


class EventListCreate(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = super().get_queryset().order_by("event_time")
        date = self.request.query_params.get("date")
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        # filter by specific date if date param is provided by the client
        if date:
            try:
                parsed_date = parse_datetime(date)
                if parsed_date is None:
                    raise ValueError("Invalid datetime format.")

                # handle time zones
                if is_naive(parsed_date):
                    parsed_date = make_aware(parsed_date, pytz.UTC)
                queryset = queryset.filter(event_time__date=parsed_date.date())

            except ValueError:
                pass
            return queryset

        # filter by range if start_date and end_date params are provided by the client
        if start_date and end_date:
            try:
                # handle time zones e.g. (2025-04-11 and 2025-04-11T12:00:00-05:00)
                start_datetime = parse_datetime(start_date)
                end_datetime = parse_datetime(end_date)

                if start_datetime and start_datetime.tzinfo is None:
                    start_datetime = make_aware(start_datetime, pytz.UTC)

                if end_datetime and end_datetime.tzinfo is None:
                    end_datetime = make_aware(end_datetime, pytz.UTC)

                # filter reminders
                queryset = queryset.filter(
                    event_time__gte=start_datetime, event_time__lte=end_datetime
                )

            except ValueError:
                pass
        return queryset

    def perform_create(self, serializer):
        try:
            serializer.save()
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": "An error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ReminderListCreate(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer

    def get_queryset(self):
        queryset = super().get_queryset().order_by("remind_time")
        date = self.request.query_params.get("date")
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        # filter by specific date if date param is provided by the client
        if date:
            try:
                parsed_date = parse_datetime(date)
                if parsed_date is None:
                    raise ValueError("Invalid datetime format.")

                # handle time zones e.g. (2025-04-11 and 2025-04-11T12:00:00-05:00)
                if is_naive(parsed_date):
                    parsed_date = make_aware(parsed_date, pytz.UTC)
                queryset = queryset.filter(remind_time__date=parsed_date.date())

            except ValueError:
                pass
            return queryset

        if start_date and end_date:
            try:
                start_datetime = parse_datetime(start_date)
                end_datetime = parse_datetime(end_date)

                # handle time zones
                if start_datetime and start_datetime.tzinfo is None:
                    start_datetime = make_aware(start_datetime, pytz.UTC)

                if end_datetime and end_datetime.tzinfo is None:
                    end_datetime = make_aware(end_datetime, pytz.UTC)

                # filter reminders
                queryset = queryset.filter(
                    remind_time__gte=start_datetime, remind_time__lte=end_datetime
                )

            except ValueError:
                pass

        return queryset
