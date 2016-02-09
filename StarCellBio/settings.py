
# Django settings for StarCellBio project.

import auth.settings
import os.path
import os
import yaml


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
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


# Default logging configuration
LOG_LEVEL = 'DEBUG'
DJANGO_LOG_LEVEL = 'DEBUG'
# For logging to a syslog host
LOG_HOST = 'localhost'
LOG_HOST_PORT = 514


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
    rel('../instructor/ui/'),
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
    os.path.join(BASE_DIR, 'StarCellBio', 'templates'),
) + auth.settings.TEMPLATE_DIRS

TEST_RUNNER = 'django.test.runner.DiscoverRunner'

INSTALLED_APPS = (
    # Uncomment the next line to enable admin documentation:
    'django.contrib.admindocs',
    'backend',
    'instructor',
) + auth.settings.INSTALLED_APPS


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

# Filter for environment variables beginning with our prefix (SCB_)
scb_env_overrides = filter(
    lambda x: x[0].startswith("SCB_"),
    os.environ.iteritems()
)

# Cut off the first four characters
scb_env_overrides = map(
    lambda x: (x[0][4:], x[1]),
    scb_env_overrides
)

globals().update(dict(scb_env_overrides))

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


# Ensure that ADMINS is a tuple of tuples. This is necessary because there are
# no tuples in YAML. When ADMINS is defined in YAML, it's imported as a list of
# lists.
ADMINS = tuple(tuple(admin) for admin in ADMINS)


HOSTNAME = platform.node().split('.')[0]
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        }
    },
    'formatters': {
        'verbose': {
            'format': (
                '[%(asctime)s] %(levelname)s %(process)d [%(name)s] '
                '%(filename)s:%(lineno)d - '
                '[{hostname}] - %(message)s'
            ).format(hostname=HOSTNAME),
            'datefmt': '%Y-%m-%d %H:%M:%S'
        }
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'syslog': {
            'level': LOG_LEVEL,
            'class': 'logging.handlers.SysLogHandler',
            'facility': 'local7',
            'formatter': 'verbose',
            'address': (LOG_HOST, LOG_HOST_PORT)
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
    },
    'loggers': {
        'root': {
            'handlers': ['console', 'syslog'],
            'level': LOG_LEVEL,
        },
        'requests': {
            'handlers': ['console', 'syslog'],
            'level': LOG_LEVEL,
        },
        'django': {
            'propagate': True,
            'level': DJANGO_LOG_LEVEL,
            'handlers': ['console', 'syslog', 'mail_admins'],
        },
        'urllib3': {
            'level': 'INFO',
        }
    },
}
