"""
urls.py
Aaron Cumming, Matthew Kruse
2025-04-16

Reminders Urls
"""

from rest_framework import routers
from reminders import views


# DRF has custom routing defined to handle the
# viewsets.
# We take advantage of it here.
router = routers.DefaultRouter()
router.register(r"reminders", views.ReminderListCreate, "reminders")
router.register(r"events", views.EventListCreate, "events")

# Make sure to spell urlpatterns correctly,
# otherwise Django cannot find your routes.
urlpatterns = router.urls
