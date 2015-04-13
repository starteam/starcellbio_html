============================
Developer Guide: StarCellBio
============================

* `Running StarCellBio with Vagrant`_

* `Creating a "Hello World" assignment`_

* `Architecture of StarCellBio`_

  - `URL routes`_

  - `Page Templates`_
  
  - `Experiment model`_


Running StarCellBio with Vagrant
================================
There is a convenient ``Vagrantfile`` and ansible playbook for
building and setting up a development environment inside an Ubuntu
virtual machine.  To do this, you will need to install `Virtual
Box <https://www.virtualbox.org/wiki/Downloads>`_,
`Vagrant <https://www.vagrantup.com/downloads.html>`_, and
`Ansible <http://docs.ansible.com/intro_installation.html>`_. on your
local machine.  After that is done, clone the repository using the
earlier instructions, and while in the repository directory just run
``vagrant up``.

.. code-block:: bash

	git clone git://github.com/starteam/starcellbio_html
	cd starcellbio_html/html_app
	vagrant up
	vagrant ssh
	
And then within the Vagrant VM

	cd /vagrant
	./manage.py runserver 0.0.0.0:8100

If that all works, you should be able to open a browser to
http://localhost:8100 and be greeted with the Star Cell Bio home
screen.


Creating a "hello world" assignment
===================================
Assignment configuration and content are currently stored in ``html/master_model.js``, 
until a web-based assignment builder can be implemented. 

To create a minimal new assignment in master_model.js,

1. create a global javascript object with the following attributes

.. code-block:: javascript

	id: "usability_test", // assignmentID
	name: "SCB Usability Test", // assignmentName
	course: "scb_sampleexercises", // courseID
	course_name: "Hello World", // course name
	description: "Placeholder Description", // course description
	template: { // template dictionary
		instructions: [] // instructions array, each element is a tab
	}

(For your convenience, there is a ``blank_model`` object that can be used as a 
template.)
		
2. Add your object to ``master_model_data.assignments.list`` in the same 
   javascript file.
		
3. If you set ``course`` (courseID) to ``scb_sampleexercises`` your assignment 
   will be available to unauthenticated users. If you set a different value for 
   ``course`` you will also have to add it to ``code_values`` on line 150 of the 
   ``signup.html`` template.

4. For the instructions to render, you will need a .soy template in sub-folder 
   of /ui that corresponds to you assignmentID. 

A complete assignment will have additional dictionaries, to configure the
experimental setup and the available experiment types (western_blot, flots or 
microscopy)


Architecture of StarCellBio
===========================

Page templates
--------------
Templates used to build the user interface are in the html_app/ui folder. They 
use the `Google Closure template language (.soy)`_

.. _Google Closure template language (.soy): https://developers.google.com/closure/templates/docs/concepts

To compile templates, run the ``build.py`` script located in ``html_app`` 
folder:: 

    cd html_app
    python build.py 

This script can also be run as a watcher that will automatically recompile any 
templates when they are changed. ``build.py`` includes a ``--prod`` option for 
concatenating and minifying the javascript and css files. This makes browser 
access more efficient, but may slow down the developer. 

URL routes
----------
StarCellBio uses RESTful URLs to represent state in the browser, and the 
browser URL fully defines which view will be rendered, including  parameters. 
As a matter of coding standard this name is the same as name of the file that 
renders this view in ``html_app/ui`` folder. Templates are named similarly, with 
a ``.soy`` extension. 

All the views' methods are in the scb namespace with the view name, and the scb 
name space contains a class that implements at least a `show` method that is
invoked to render this view. Namespace also contains static method register with 
registers all required handlers for the view (scb_f_classes). 

Server side URLS
~~~~~~~~~~~~~~~~
Views are exposed at the following URLs:

-  index.html main page to load all the SCB runtime
-  scb/contact – views.contact – sends email to starcellbio@mit.edu
   email
-  scb/get_model.js – views.get_model – returns model from the server
   that is appropriate for the user (authenticated and guest)
-  scb/ get_student_courses.js - views.get_student_courses - This
   view gets the courses for a student for their account. For the
   instructor, it gets the courses it can view
-  scb/get_instructor_assignments.js -
   views.get_instructor_assignments – get list of assignments
   instructor can view
-  scb/edit_assignment.js – views.edit_assignment
-  scb/create_course.js – views.create_course
-  scb/create_new_assignment.js – views.create_new_assignment
-  scb/get_user.js – views.get_user
-  scb/post_state.js – views.post_state – save student state

This structure allows for easy code navigation and any new
code should follow these conventions.

Experiment model
----------------

For more on the JavaScript data model, see the `StarCellBio-Architecture 
documentation <StarCellBio-Architecture.rst>`_

