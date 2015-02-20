
# Django settings for StarCellBio project.

import auth.settings
import os.path
import os
import yaml


SITE_ROOT = os.path.dirname(os.path.realpath(__file__))
YAML_CONFIG = os.path.join(SITE_ROOT, "settings.yml")

rel = lambda p: os.path.join(SITE_ROOT, p)

DEBUG = True
TEMPLATE_DEBUG = DEBUG

import platform
if platform.node() == 'starapp':
    # Production Platform
    DEBUG = False
    TEMPLATE_DEBUG = DEBUG
    MEDIA_ROOT = '/scratch/starcellbio/media_root'
else:
    MEDIA_ROOT = '/tmp/static/'
ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DB_ENGINE = 'django.db.backends.mysql'
DB_NAME = 'starcellbio'
DB_USER = 'starcellbio'
DB_PASSWORD = '136a411ed9e8592089444b7164ffaf84'
DB_HOST = ''
DB_PORT = ''


# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
# MEDIA_ROOT = '/tmp/static/'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = ''

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = rel('../static/')

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    rel('../html_app/'),
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'h0cs_$-8^zp8b%hp%kj5fp@9gje@otv9%xi!o0yftm*#qlo%(5'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
)

AUTHENTICATION_BACKENDS = auth.settings.AUTHENTICATION_BACKENDS

TEMPLATE_CONTEXT_PROCESSORS = auth.settings.TEMPLATE_CONTEXT_PROCESSORS

ROOT_URLCONF = 'StarCellBio.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'StarCellBio.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or
    # "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.

) + auth.settings.TEMPLATE_DIRS


INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    'rest_framework',
    'backend',
    'instructor',
) + auth.settings.INSTALLED_APPS

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

# django all-auth config
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_EMAIL_SUBJECT_PREFIX = 'StarCellBio registration'
ACCOUNT_SIGNUP_FORM_CLASS = 'auth.forms.SignupForm'
ACCOUNT_USERNAME_MIN_LENGTH = 6
ACCOUNT_USERNAME_REQUIRED = False
EMAIL_HOST = 'localhost'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'starcellbio@mit.edu'
DEFAULT_FROM_EMAIL = 'starcellbio-admin@mit.edu'

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/var/tmp/django_cache',
    }
}

AUTH_USER_MODEL = 'auth.User'


# Override settings with untracked YAML config
if os.path.isfile(YAML_CONFIG):
    with open(YAML_CONFIG) as f:
        y = yaml.load(f)
        if y is not None:
            globals().update(y)

# Override settings with SCB_ environment variables
scb_env_overrides = {
    key[4:]: value
    for key, value in os.environ.iteritems()
    if key.startswith("SCB_")
}

os.environ['SCB_TEST_ENV'] = "test_env"

globals().update(scb_env_overrides)


DATABASES = {
    'default': {
        # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'ENGINE': DB_ENGINE,

        # Or path to database file if using sqlite3.
        'NAME': DB_NAME,

        # Not used with sqlite3.
        'USER': DB_USER,

        # Not used with sqlite3.
        'PASSWORD': DB_PASSWORD,

        # Set to empty string for localhost. Not used with sqlite3.
        'HOST': DB_HOST,

        # Set to empty string for default. Not used with sqlite3.
        'PORT': DB_PORT,
    }
}
