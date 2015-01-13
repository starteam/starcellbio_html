Developer Guide: StarCellBio
============================

The intent of this guide is to:

    * Describe the Architecture of StarCellBio
    * Create a Virtual Environment for developing StarCellBio
    * Clone starcellbio_html
    * Setup Development Environment
    * Using watch.py to compile .soy and .gss files into .js and .css files
    * Start the StarCellBio development server on localhost
    * Use StarCellBio server on localhost
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

Clone starcellbio_html
----------------------
You may also need to install Homebrew and pip as these are required.

.. note:: This example uses assumes that PROJECT_HOME is ~/starcellbio/starcellbio_html.
You will need to adjust PROJECT_HOME to the location of your starcellbio_html project.

In a terminal window execute the following commands::

    $ source ~/PyVENV/bin/activate
    (PyVENV) $ git clone git://github.com/starteam/starcellbio_html


Setup Development Environment
-----------------------------

Using PyCharm
    View->Tool Windows->Database + Data Source -> MySQL
    Install the database drivers if prompted


mysqld command starts database

Reference: `Installing MySQL on Mac OS X <https://rtcamp.com/tutorials/mac/osx-brew-php-mysql-nginx/>`_

If you need to install MySQL on Mac OS X, execute the following command::

    $ brew install mysql --enable-debugging

In a terminal window execute the following commands::

    $ source ~/PyVENV/bin/activate
    (PyVENV) $ ls /usr/local/Cellar/mysql # shows foldername (a number) to use in the next command
    (PyVENV) $ sudo cp /usr/local/Cellar/mysql/5.6.22/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/

To Start mysql::

    (PyVENV) $ sudo launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
    (PyVENV) $ sudo launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist

To Stop mysql::

    (PyVENV) $ sudo launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist

To pip install

    (PyVENV) $ cd starcellbio_html
    (PyVENV) $ sudo pip install -r requirements.txt


Using watch.py to compile .soy and .gss files into .js and .css files
---------------------------------------------------------------------
After any changes to .soy or .gss files you need to compile them into .js and .css files for your changes to work.

.. note:: This repo was built before PyCharm was the default project IDE. It is now possible to create a File Watcher
in PyCharm that will automatically run the transpilers as .soy and .gss files are changed.  This will require minor
modifications to watch.py.

In new terminal window execute the following commands::

    $ source ~/PyVENV/bin/activate
    (PyVENV) $ cd starcellbio_html
    (PyVENV) $ sudo pip install -r requirements.txt

    (PyVENV) $ export PROJECT_HOME="/Users/starcellbio/starcellbio_html" # watch.py needs repo at PROJECT_HOME
    (PyVENV) $ cd $PROJECT_HOME/html_app # watch.py needs repo in this location
    (PyVENV) $ python watch.py

Start the StarCellBio development server on localhost
-----------------------------------------------------

To ``START`` the starcellbio_html development server in a new Terminal Window::

    $ source ~/PyVENV/bin/activate

.. note:: Django may not work due to an error starting mysql. The first two lines that follow get mysql up
and running. The second two lines start the StarCellBio Django server. If you don't have mysql installed,
you'll need to do that.


    (PyVENV) $ cd $PROJECT_HOME

    (PyVENV) $ sudo ./manage.py collectstatic
    (PyVENV) $ sudo ./manage.py loaddata backend statuses courses assignments studentassignments
    (PyVENV) $ sudo ./manage.py runserver

./manage.py loaddata backend statuses courses assignments studentassignments

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

