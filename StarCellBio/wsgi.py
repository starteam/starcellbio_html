#!/home/starcellbio/Python/py27/bin/python
"""
WSGI config for StarCellBio project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os

#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "StarCellBio.settings")
os.environ["DJANGO_SETTINGS_MODULE"] = 'StarCellBio.settings'
import os
import sys
import site
site.addsitedir('/home/starcellbio/Python/py27/lib/python2.7/site-packages')

STARCELLBIO_PATH = '/home/starcellbio/StarCellBio/'
STARCELLBIO_PATH = os.path.normpath(STARCELLBIO_PATH)
STARCELLBIO_PARENT_FOLDER = os.path.dirname(STARCELLBIO_PATH)
PATH = os.environ['PATH'] + ':/usr/local/bin'
sys.path.append(STARCELLBIO_PARENT_FOLDER)
sys.path.append(STARCELLBIO_PATH)


# This application object is used by any WSGI server configured to use this
# file. This includes Django's development server, if the WSGI_APPLICATION
# setting points here.
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Apply WSGI middleware here.
# from helloworld.wsgi import HelloWorldApplication
# application = HelloWorldApplication(application)
