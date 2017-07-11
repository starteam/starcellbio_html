from django.conf import settings


# Switch on debug mode for LTI requests
DEBUG_LTI = getattr(settings, 'DEBUG_LTI', True)

# Uncoment to switch off LTI ssl requirements (only for development mode)
LTI_SSL = getattr(settings, 'LTI_SSL', False)
