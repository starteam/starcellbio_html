from django.conf import settings


# Switch on debug mode for LTI requests
DEBUG_LTI = getattr(settings, 'DEBUG_LTI', True)
