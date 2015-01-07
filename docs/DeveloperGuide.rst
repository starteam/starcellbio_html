Developer Guide: StarCellBio
============================

The intent of this guide is to:

    * Describe the Architecture of StarCellBio
    * Create a Virtual Environment for developing StarCellBio
    * Setup starcellbio_html
    * Using watch.py to compile .soy and .gss files into .js and .css files
    * Deploy StarCellBio server to localhost
    * Use StarCellBio server on localhost
    * Deploy StarCellBio server to Heroku
    * Use StarCellBio server on Heroku
    * Modify/Deploy/Use StarCellBio html_app
    * Modify/Deploy/Use StarCellBio instructor
    * Create/Modify/Deploy/Use StarCellBio AssignmentBuilder
    * Create/Modify/Deploy/Use StarCellBio Lab Notebook


Describe the Architecture of StarCellBio
----------------------------------------

    :download:`StarCellBio Architecture <StarCellBio.pdf>`

Create a Virtual Environment for developing StarCellBio
-------------------------------------------------------
"A Virtual Environment ... is an isolated working copy of Python which allows
you to work on a specific project without worry of affecting other project."

Reference: `http://docs.python-guide.org/en/latest/dev/vertualenvs/ <http://docs.python-guide.org/en/latest/dev/vertualenvs/>`_

This sample expects the ``PyVENV`` folder to contain the Virtual Environment for the sample.

To ``CREATE`` the PyVENV Virtual Environment::

    $ cd ~
    $ pip install virtualenv
    $ virtualenv PyVENV

To ``ACTIVATE`` it::

    $ source ~/PyVENV/bin/activate

To ``DEACTIVATE`` it::

    (PyVENV) $ deactivate

To ``DESTROY`` it::

    (PyVENV) $ deactivate
    $ rm -Rv ~/PyVENV

You may also want to install Virtualenvwrapper to help manage Virtual Environments although it is not required.
Reference: 'https://vitualenvwrapper.readthedocs.org/ <https://vitualenvwrapper.readthedocs.org/>'

Setup starcellbio_html
----------------------
You may also need to install Homebrew and pip as these are required.

.. note:: this example uses the o

In a terminal window execute the following commands::

    $ source ~/PyVENV/bin/activate
    (PyVENV) $ cd $VIRTUAL_ENV # watch.py needs repo in this location
    (PyVENV) $ git clone git://github.com/starteam/starcellbio_html
    (PyVENV) $ cd starcellbio_html
    (PyVENV) $ sudo pip install -r requirements.txt



Using watch.py to compile .soy and .gss files into .js and .css files
---------------------------------------------------------------------

Deploy StarCellBio server to localhost
--------------------------------------
To ``START`` the starcellbio_html server::

    (PyVENV) $ sudo ./manage.py runserver

Notes from Shloka: mysql may not work due to some error.
To ``FIX this error``::

    (PyVENV) $ ls /usr/local/Cellar/mysql (will give you the mysql ``version #``)
    (PyVENV) $ launchctl load -w /usr/local/Cellar/mysql/``version #``/homebrew.mxcl.mysql.plist

Use StarCellBio server on localhost
-----------------------------------

Deploy StarCellBio server to Heroku
-----------------------------------

Use StarCellBio server on Heroku
--------------------------------

Modify/Deploy/Use StarCellBio html_app
--------------------------------------
    :download:`StarCellBio Notes on Assignment Builder <Evernotes/Combined_Notes_on_the_Assignment_Builder.pdf>`


Modify/Deploy/Use StarCellBio instructor
----------------------------------------

Create/Modify/Deploy/Use StarCellBio AssignmentBuilder
------------------------------------------------------

Create/Modify/Deploy/Use StarCellBio Lab Notebook
-------------------------------------------------





Important places for development (``html_app`` and ``instructor``):

    * login through the starcellbio account
    * auth - contains login/authorization
    * backend` - contains database for front end
    * django-allauth - login/authorization library
    * frontend_test - contains selenium tests
    * ``html_app`` - Front end lives in html app - static web site - javascript
    * ``instructor`` - the assignment builder - work in progress
    * misc - how to make a database
    * scb_rest - ???
    * tools - closure/soy
    * zip-js - probably junk


Other issues:

    * Currently served up from starcellbio.mit.edu
    * Has backend database from starcellbio.mit.edu
    * Stores student state but doesn't let instructor see it.
    * Student writes a report outside of starcellbio.

