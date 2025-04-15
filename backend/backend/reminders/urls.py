"""
urls.py
Aaron Cumming
2025-04-15

Reminders Urls
"""

from rest_framework import routers

from reminders import views

# DRF has custom routing defined to handle the
# viewsets.
# We take advantage of it here.
router = routers.DefaultRouter()
router.register(r"reminders", views.ReminderRetrieveUpdateDestroy)

# Make sure to spell urlpatterns correctly,
# otherwise Django cannot find your routes.
urlpatterns = router.urls