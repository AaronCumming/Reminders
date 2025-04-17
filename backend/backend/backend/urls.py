#reminders/urls.py
# Matthew Kruse
# URLs for Event, Reminder
# 16 April 2025
 
from django.contrib import admin
from django.urls import path, include
 
# Base urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('reminders.urls')),
]
 