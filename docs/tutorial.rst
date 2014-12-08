Tutorial: StarCellBio Tutorial
==============================================

The starcellbio_html is .

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

(*** important places to work)
login through the starcellbio account
auth - contains login/authorization
backend - contains database for front end
django-allauth - login/authorization library
frontend_test - contains selenium tests
*** html_app - Front end lives in html app - static web site - javascript
*** instructor - the assignment builder - work in progress
misc - how to make a database
scb_rest - ???
tools - closure/soy
zip-js - probably junk

currently served up from starcellbio.mit.edu
has backend database from starcellbio.mit.edu

stores student state but doesn't let instructor see it.
student writes a report outside of starcellbio.

have lourdes give me access to dropbox specifications (pdf form)
move pdfs to docs folder - maybe subfolder of specifications.