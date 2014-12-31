Developer Guide: StarCellBio
============================

The intent of this guide is to:

    * Describe the Architecture of StarCellBio
    * Create a Virtual Environment for developing StarCellBio
    * Setup starcellbio_html
    * Deploy StarCellBio server to localhost
    * Use StarCellBio server on localhost
    * Deploy StarCellBio server to Heroku
    * Use StarCellBio server on Heroku
    * Modify/Deploy/Use StarCellBio html_app
    * Modify/Deploy/Use StarCellBio instructor
    * Create/Modify/Deploy/Use StarCellBio AssignmentBuilder
    * Create/Modify/Deploy/Use StarCellBio Lab Notebook


Describe the Architecture of StarCellBio
---------------------------

    :download:`StarCellBio Architecture <StarCellBio.pdf>`

Create a Virtual Environment for developing StarCellBio
-------------------------------------------------------

Setup starcellbio_html
----------------------

Deploy StarCellBio server to localhost
--------------------------------------

Use StarCellBio server on localhost
-----------------------------------

Deploy StarCellBio server to Heroku
-----------------------------------

Use StarCellBio server on Heroku
--------------------------------

Modify/Deploy/Use StarCellBio html_app
--------------------------------------

Modify/Deploy/Use StarCellBio instructor
----------------------------------------

Create/Modify/Deploy/Use StarCellBio AssignmentBuilder
------------------------------------------------------

Create/Modify/Deploy/Use StarCellBio Lab Notebook
-------------------------------------------------




see: docs/Evernotes/Combined_Notes_on_the_Assignment_Builder.pdf

pip install -r requirements.txt (found in starcellbio_html folder)

install homebrew

copy to virtual environment

install pip, virtualenv, and virtualwrapper

to start the server run:

./manage.py runserver

mysql may not work at first due to some error, to fix this error, issue the following command and it should be fixed

    launchctl load -w /usr/local/Cellar/mysql/5.6.13/homebrew.mxcl.mysql.plist

    (may be some variation with number following /mysql/)

    run watch.py in the background during development because it recompiles the .gss and .soy into css and js files

    .soy - like html templates with fields where you can insert model data Go to https://developers.google.com/closure/templates/docs/commands (Print Directives page too) and look at code to get an idea

    .gss exactly like css but causes errors if there is incorrect syntax

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

