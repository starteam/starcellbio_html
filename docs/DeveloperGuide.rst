Developer Guide: StarCellBio
============================

The intent of this guide is to:

    * Describe the Architecture of StarCellBio
    * Create a Virtual Environment for developing StarCellBio
    * Setup starcellbio_html
    * Configure PyCharm Preferences for Closure Templates
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

In a terminal window execute the following commands::

    $ cd ``starcellbio_html folder``
    $ source ~/PyVENV/bin/activate
    (PyVENV) $ sudo pip install -r requirements.txt


Configure PyCharm Preferences for Closure Templates
---------------------------------------------------
StarCellBio uses .soy files to generate html for the StarCellBio UI. The .soy files are compiled by the Google Closure Compiler.
Reference: 'https://developers.google.com/closure/ <https://developers.google.com/closure/>'

To ``CONFIGURE PyCharm`` for compiling .soy files::

    Open the starcellbio_html project in PyCharm.
    Click-on ``PyCharm->Preferences->Plugins`` and check for the ``Non-Dairy Soy Plugin``.  If missing,
        click ``Browse Repositories``, find the ``Non-Dairy Soy Plugin``, click ``Install plugin``
    Click-on ``PyCharm->Preferences->File Types`` and confirm ``Closure template file`` has ``*.soy`` as a ``Registered Pattern`` If missing,
        add ``Closure template file`` and ``*.soy`` to its ``Registered Patterns``.
    Click-on ``PyCharm->Preferences->File Watchers`` and confirm ``Soy2RequireJS`` exists.  If missing,
        add (+) "Soy2RequireJS":
            Description:
                Watches for .soy file changes
                Invokes StarX Closure compiler to create .js files
            File type:
                Closure template File
            Program:
            <path_to_your_starx_location>/soy2js.py
        Arguments:
            $FileDir$/$FileName$
        Working directory:
            $ProjectFileDir$
        Output paths:
            $FileDir$/$FileName$.js



StarCellBio uses .gss to generate correct .css files or errors describing syntax flaws.

    Need to document setting up file watcher in PyCharm to handle this

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

