# reminders/urls.py
# Matthew Kruse
# URLs for Event, Reminder
# 11 April 2025

from django.contrib import admin
from django.urls import path
from reminders.views import EventListCreate, EventRetrieveUpdateDestroy, ReminderListCreate, ReminderRetrieveUpdateDestroy

# Base urls
urlpatterns = [
    path('admin/', admin.site.urls),
]

# Appended list of api endpoints
urlpatterns += [
    path('api/events', EventListCreate.as_view(), name='event-list-create'),
    path('api/events/<int:pk>/', EventRetrieveUpdateDestroy.as_view(), name='event-retrieve-update-destroy'),
    path('api/reminders', ReminderListCreate.as_view(), name='reminder-list-create'),
    path('api/reminders/<int:pk>/', ReminderRetrieveUpdateDestroy.as_view(), name='reminder-retrieve-update-destroy'),
]
