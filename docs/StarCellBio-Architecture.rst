.. contents::
   :depth: 3.0
..

StarCellBio

1. Architecture

2. Code organization

3. Django Server

4. StarCellBio Student’s view

5. StarCellBio Course Instructor’s view

6. StarCellBio Labnotebook

Architecture
============

StarCellBio is split in following components:

-  Authentication, authorization and data storage on server

-  Student’s view is a SPA (Single Page Application) that resides in the
   browser and communicates with the server only to serialize or
   de-serialize user session.

-  (WIP) Assignment Builder is a SPA that resides in the browser where all
   interaction happen, including running Student’s view in preview mode.

Authentication, authorization and data storage are implemented as Django
application with minimal API exposed to the SPA’s.

Student SPA loads including all the code it is necessary to perform all
experiments. Code is that driven using JSON data structure. JSON is fed
to the business logic encapsulated within /model folder. Business logic
exposes underlying data while allowing for intercepting (analytics) or
overriding behaviors (allows for relational querying without leaking
implementation details to user interface). User interface is implemented
in /ui folder as mix of .soy (google closure templates) and .js
(javascript) objects.

Student SPA uses simple MVC, event driven architecture. All events are
registered upon initialization. Event handlers interact with model and
request page to be re-rendered by changing URL hash or by invoking
.repaint() method.

User interface is build in such fashion that each HTML element carries
sufficient information to determine which handler to call and which part
of the model it impacts. Event handler is determined by class associated
with the HTML element. “scb\_f\_” classes represent handlers to be
invoked, while “scb\_s\_” classes represent element styling. This allows
for very clean and DRY code that allows event handlers to be reused at
different locations in the application as needed.

StarCellBio uses RESTful URL’s to represents its state in the browser,
and browser URL fully defines which view will be rendered. URL contains
parameter view. As a matter of coding standard this name is the same as
name of the file that renders this view in /ui folder. And name of
template is the same name as view with .soy extension. All the view’s
methods are in the scb namespace with the view name, and scb name space
contains class that implements at least one methods ‘show’ that is
invoked to render this view. Namespace also contains static method
register with registers all required handlers for the view (scb\_f\_
classes). This structure allows for easy code navigation and any new
code should follow these convetions.

Data structure on the client (browser)
======================================

The top level object is a list of assignments, represented by 
:code:`AssignmentList`, which is defined in Assignments.js. AssignmentList is 
defined by common list code (described later). Each element of the list is 
represented by Assignment object as described in Assignments.js.

Assignment
----------

An Assignment represents acomplete assignment, including owning all of the
experiments in the assignment, the student notebook, and it has metadata that 
allows it to render its UI.

Assignment uses Common Entry Code template, and adds following fields:

-  Notebook (scb.Notebook)

-  Experiments (scb.ExperimentList)

-  Template ( JSON map representing assignment)

-  Course (string - key)

-  Course\_Name (string – descriptive name)

-  last\_instruction

-  operation

-  permission

-  template\_id

-  students

-  sort

-  is\_new\_assignment

-  is\_new\_course

-  has\_background\_bands

-  background\_band\_list

-  course\_prepared

-  assignment\_prepared

-  has\_temperature

-  has\_start\_time

-  has\_duration

-  has\_collection\_time

ExperimentList
--------------

ExperimentList uses Common List template, and adds following two
methods:

-  Start – return new experiment and register it with Assignment

-  Next\_name(to\_increment) – returns name of next experiment

Experiment
----------

Experiment represents single experiment in an assignment. Assignment can
have many experiments. In UI it is represented by second tab, and
individual one can be selected from the pulldown.

Experiment uses Common Entry Code and adds following fields:

-  hypothesis (string)

-  objective (string)

-  technique (string)

-  cell\_treatment\_list (scb.CellTreatmentList)

-  western\_blot\_list (scb.WesternBlotList)

-  facs\_list (scb.FacsList)

-  microscopy\_list (scb.MicroscopyList)

-  last\_view (defaults to experiment\_design)

-  prev\_step

-  last\_step

-  last\_scroll

-  last\_technique

-  last\_id

-  last\_technique\_view

-  last\_param

-  setup\_finished (bool)

-  setup\_visible (bool)

-  new\_row (current state of new row)

-  design\_wb\_cb

-  design\_fc\_cb

-  design\_mi\_cb

-  

CellTreatmentList
-----------------

CellTreatmentList is part of an experiment, uses Common List template,
and adds following two methods:

-  start

-  duplicate

CellTreatment
-------------

CellTreatment is instance of cell treatment, and uses Common Entry Code
and adds following fields:

-  cell line

-  treatment\_list (scb.TreatmentList)

-  stimulation time

-  collection schedule list (scb.CollectionScheduleList)

TreatmentList
-------------

TreatmentList is part of CellTreatment, it uses Common List template and
wrapper for Treatment. It also adds following fields:

-  first

-  start

Treatment
---------

Treatment and uses Common Entry Code and adds following fields:

-  drug\_list (scb.DrugList)

-  temperature (string)

-  collection\_id

-  microscope

-  facs

-  schedule\_value

-  duration\_value

-  schedule

-  duration

DrugList
--------

DrugList is part of Treatment, it uses Common List template. It also
adds following methods:

-  start\_default

-  start

-  set\_list

Drug
----

Drug uses Comon Entry Code and adds the following fields:

-  drug_id

-  concentration_id

-  collection_id

-  drug_name (derives data from template and drug_id)

-  drug_concentration (derives data from template and
   concentration_id)

CollectionScheduleList
----------------------

CollectionSheduleList uses CommonList code without extensions.

CollectionSchedule
------------------

CollectionSchedule uses Common Code template and adds only two fields:

-  schedule\_value (in seconds)

-  schedule (string)

WesternBlotList
---------------

WesternBlotList uses Common List Code and adds the following functionality:

-  start\_tabs\_index (used by WB UI)

-  start

-  new\_using\_making\_lysates

-  duplicate

WesternBlot
-----------

WesternBlot uses Common Code template and adds:

-  lysate\_prepared

-  marker\_loaded

-  wells\_loaded

-  gel\_type

-  is\_transfered

-  lanes\_list (scb.WesternBlotLaneList)

-  gel\_list (scb. WesternBlotGelList)

-  last\_gel

-  canvas\_metadata

-  prep\_scroll

-  is\_cell\_treatment\_enabled

-  samples\_show\_state

-  measure\_show\_state

-  rows\_state

-  rows\_state\_count

WesternBlotExposureList
-----------------------

WesternBlotExpoureList uses Common List code.

WesternBlotExposure
-------------------

WesternBlotExposure uses Common Code template and adds:

-  canvas\_data

-  schedule\_value

-  schedule

WesternBlotGelList
------------------

WesternBlotGelList uses Common List code.

WesternBlotGel
--------------

WesternBlotGel uses Common Code template and adds:

-  primary\_anti\_body

-  secondary\_anti\_body

-  exposure\_time

-  is\_developed

-  canvas\_data

-  canvas\_metadata

-  marks

WesternBlotLaneList
-------------------

WesternBlotLaneList uses Common List code, and adds:

-  start

-  duplicate

-  reorder

-  cell\_treatment\_id (as grouped list)

WesternBlotLane
---------------

WesternBlotLane uses Common Code template and adds:

-  kind

-  ip

-  marks

-  cell\_treatment\_id

-  collection\_schedule\_id

-  order\_id

-  experiment\_id

-  making\_lysate\_id

-  experiment

-  cell\_treatment

-  collection\_schedule

-  kinds

FacsList
--------

FacsList uses Common List code, and adds:

-  start\_tabs\_index

-  start

-  new\_using\_making\_lysates

-  duplicate

Facs
----

Facs uses Common Code template and adds:

-  lanes\_list (scb.FacsLaneList)

-  samples\_finished

-  sample\_prepared

-  sample\_analysis

-  double\_analysis

-  gate\_count

-  midpoint

-  prep\_scroll

-  show\_analysis

-  apply\_dna\_analysis\_to\_all

-  instructions\_show\_state

-  samples\_show\_state

-  lane\_selected

-  selected\_lane

-  is\_cell\_treatment\_enabled

-  rows\_state

FacsLaneList
------------

FacsLaneList defined:

-  list

-  ensure\_experiment\_lanes\_for\_experiment

-  duplicate

-  reorder

-  filter

-  reset

-  length

-  cell\_treatment\_id

FacsLane
--------

FacsLine uses Common Code template and adds:

-  kind

-  conditions

-  cell\_treatment\_id

-  gates\_id

-  exp\_id

-  bisector\_gate\_created

-  canvas\_metadata

-  canvas\_metadata\_analysis

-  gate\_selected

-  experiment\_id

-  selected\_gate

-  experiment

-  cell\_treatment

-  collection\_schedule

-  kinds

-  display\_text

FacsLanePreparationList
-----------------------

FacsLanePreparationList uses Common List template and adds:

-  start

-  duplicate

-  reorder

-  filter

-  reset

FacsLanePreparation
-------------------

FacsLanePreparation uses Common Code template and adds:

-  kind

-  treatment

-  sub\_treatment

-  chart\_data

MakingLysateList
----------------

MakingLysateList uses Common List template and adds:

-  start

-  new\_using\_experiment

MakingLysate
------------

MakingLysate uses Common Code template and adds:

-  finished

-  lysate\_kind\_list

MicroscopyList
--------------

MicroscopyList uses Common List template and adds:

-  start\_tabs\_index

-  start

-  new\_using\_making\_lysates

-  duplicate

Microscopy
----------

Microscopy uses Common Code template and adds:

-  slide\_prepared

-  lanes\_list

-  samples\_finished

-  lane\_selected

-  is\_cell\_treatment\_enabled

-  warning\_fired

-  laser\_on

-  red\_enabled

-  blue\_enabled

-  green\_enabled

-  merge\_enabled

-  scroll

-  prep\_scroll

-  samples\_show\_state

-  navigation\_show\_state

-  enable\_samples

-  disable\_blur

-  disable\_brightness

-  light\_on

-  selected\_lane

-  rows\_state

**MicroscopyLaneList**

MicroscopyLaneList defines:

-  list

-  start

-  ensure\_experiment\_lanes\_for\_experiment

-  duplicate

-  remove

-  get

-  reorder

-  filter

-  reset

-  length

-  cell\_treatment\_id

-  

**MicroscopyLane**

MicroscopyLane uses Common Code template and adds:

-  kind

-  lens\_map

-  slide\_conditions

-  cell\_treatment\_id

-  current\_slides

-  mag

-  experiment\_id

-  experiment

-  cell\_treatment

-  collection\_schedule

-  kinds

-  display\_text

Notebook
--------

Notebook uses Common Code template and defines:

-  scroll

-  edit\_text

-  edit\_image

-  sections (scb.NotebookSectionList)

-  image\_experiment\_id

-  image\_western\_blot\_id

-  image\_western\_blot\_gel\_id

-  image\_facs\_id

-  image\_facs\_lane\_id

-  image\_microscopy\_id

-  image\_microscopy\_lane\_id

-  section\_selected

-  selected\_section

-  selected\_experiment

-  selected\_western\_blot

-  selected\_western\_blot\_gel

-  selected\_facs

-  selected\_facs\_lane

-  selected\_microscopy

-  selected\_microscopy\_lane

NotebookElementList
-------------------

NotebookElementList uses Common List code.

NotebookElement
---------------

NotebookElement uses Common Code template and defines:

-  type

-  data

-  view

-  experiment\_id

-  headings

-  rows

-  western\_blot\_id

-  gel\_id

-  exposure\_time

-  facs\_id

-  facs\_lane\_id

-  microscopy\_id

-  microscopy\_lane\_id

-  selected\_experiment

-  selected\_western\_blot

-  selected\_western\_blot\_gel

-  selected\_facs

-  selected\_facs\_lane

-  selected\_microscopy

-  selected\_microscopy\_lane

NotebookSectionList
-------------------

NotebookSectionList uses Common List template.

NotebookSection
---------------

NotebookSection uses Common Code template and adds:

-  hypothesis

-  objective

-  technique

-  order\_id

-  elements (scb.NotebookElementList)

Common List
-----------

Common list code is implemented as a common template for business logic.
It is defined in ModelHelpers.js and is used by all ``List`` objects in
model/ folder. It defines following fields:

-  List – as an array

-  Selected\_id – last selected element of the list

-  Selected – object instantiated from the prototype representing
   element of the list

-  Get(id) – get element by ID (search list for it)

-  Remove(id) – remove element from the list by ID

-  Length – size of the list

Common Entry Code
-----------------

Common Entry Code represents what each object in the model is guaranteed
to have. It is defined in ModelHelper.js and is used by all non-list
objects in the model. It defines following fields:

-  Id – unique ID

-  Name – display name

-  Description – description as needed

-  Created\_at – timestamp when object was first created

Template
--------

Template is free-form JSON template that is utilized to drive
StarCellBio application and to contain all information that course
instructors customize per assignment.

Following fields are part of template:

-  instructions

-  ui

-  experiment\_setup

-  cell\_lines

-  drugs

-  lysate\_kinds

-  primary\_anti\_body

-  secondary\_anti\_body

-  concentrations

-  micro\_kinds

-  slides

-  slide\_parser

-  model

Template (InstructionsList)
---------------------------

InstructionList is an array of objects that contain title and text

Template (UI)
-------------

Is parent element has sub-documents:

-  experimental\_design

-  experiment\_setup

-  microscopy

-  add\_multiple\_dialog

-  western\_blot

Template (ui experiment\_design)
--------------------------------

Has following elements:

-  array of techniques

-  array of gel\_types

Template (ui experiment\_design)
--------------------------------

Has following elements:

-  table

-  actions

Template (ui microscopy)
------------------------

Has following elements:

-  disable\_brightness

-  disable\_blur

Template (ui westernblot)
-------------------------

Has following elements:

-  format

-  keys

Template (cell\_lines)
----------------------

CellLines is dictionary consisting of CellLine objects referenced by id.

CellLine object has name.

Template (drugs)
----------------

Drugs is dictionary consisting of Drug objects referenced by id.

Drug object has name and array of applicable concentrations.

Template (LysateKinds)
----------------------

LysateKinds is dictionary consisting of LysateKind objects referenced by
id.

Template (PrimaryAntiBodies)
----------------------------

PrimaryAntiBodies is dictionary consisting of PrimaryAntiBody objects
referenced by id.

PrimaryAntiBody object has:

-  name

-  secondary

-  marks

-  gel\_name

Template (SecondaryAntiBodies)
------------------------------

SecondaryAntiBodies is dictionary consisting of SecondaryAntiBody
objects referenced by id.

SecondaryAntiBody object has name

Template (Concentrations)
-------------------------

Concentrations is dictionary consisting of Concentration objects
referenced by id.

Concentration object has name and value.

Template (MicroscopyKinds)
--------------------------

MicroscopyKinds is a dictionary consisting of MicroscopyKind objects
referenced by id.

MicroscopyKind object has name and conditions (MicroscopyKindConditions)

Template (MicroscopyKindConditions)
-----------------------------------

MicroscopyKindConditions is a dictionary consisting of
MicroscopyKindConditionobjects referenced by id.

MicroscopyKindCondition object has name and short\_name

Template (Slides)
-----------------

Slides is a dictionary that is used by Microscopy model to determine
which image to display in microscopy UI.

Template (Model)
----------------

Model contains models that apply rules to the data provided. There are
models for all techniques. Usually there is a default model and possibly
few specialized models. These models are yet to be documented.

Data structure on the server (django/mysql)
===========================================

Structures to support StarCellBio runtime and that will be used by
Assignment builder are:

-  Course

-  Assigment

-  Student Assignment

-  UserCourse

Assignment
----------

Assignment is a central concept in StarCellBio. This is expressed as a
database model with the following characteristics:

-  courseID – foreign key linking it to Course

-  assignmentID – primary key

-  assignmentName – name of the assignment (same as value in JSON
   object)

-  data – this is JSON dump of the assignment object, used by assignment
   builder and by runtime

-  ownerID – owner of this course

-  access – is this course public, private, archived,…

Course
------

Course is naming concept in StarCellBio, it is used to group courses for
easy navigation. It’s model only has \`code\` used to register for
course and \`course\_name\` used to display course in UI (same as value
in JSON object)

StudentAssignment
-----------------

StudentAssignment is realization of the assignment with embedded student
data in it. The model has:

-  student – owner of the student assignment

-  course – course this assignment is associated with

-  assignmentID, assignmentName – assignmentID to which this assignment
   relates

-  token – token of currently active client (browser) to ensure that
   there are no data collisions in running data from multiple browsers
   on the same time

-  data – JSON dump of the assignment object from student’s browser

UserCourse
----------

UserCourse is mapping between logged in user and the course they are
enrolled in.

Other tables
------------

On top of above mentioned tables StarCellBio uses standard Django user
management. It also allows logging in with other oauth providers using
allauth module.

Server side URLS
----------------

StarCellBio exposes set of views to the user these URLs are:

-  index.html main page to load all the SCB runtime

-  scb/contact – views.contact – sends email to starcellbio@mit.edu
   email

-  scb/get\_model.js – views.get\_model – returns model from the server
   that is appropriate for the user (authenticated and guest)

-  scb/ get\_student\_courses.js - views.get\_student\_courses - This
   view gets the courses for a student for their account. For the
   instructor, it gets the courses it can view

-  scb/get\_instructor\_assignments.js -
   views.get\_instructor\_assignments – get list of assignments
   instructor can view

-  scb/edit\_assignment.js – views.edit\_assignment

-  scb/create\_course.js – views.create\_course

-  scb/create\_new\_assignment.js – views.create\_new\_assignment

-  scb/get\_user.js – views.get\_user

-  scb/post\_state.js – views.post\_state – save student state

Assignment builder uses tastypie
(https://django-tastypie.readthedocs.org/en/latest/) to create rest
interface for resources it needs to access. Resources are defined in
backend/services.py.

At this time following resources are defined:

-  UserResource

-  CourseResource

-  AssignmentResource

-  StudentAssignmentResource

These resources expose REST API towards above mentioned data models.

Course Instructor View
======================

As Course Instructor View is not yet written, list of use cases will be
provided here.

Use case 1: Instructor login
----------------------------

Upon logging in instructor is presented with a dashboard screen listing
instructor’s assignments. From dashboard instructor can choose to:

1. Edit existing assignment

2. Edit courses

3. Preview existing assignment

4. Create new assignment

Use case 2: Edit Courses
------------------------

When instructor chooses to edit courses, instructor can:

1. Edit existing course

2. Add new course

3. Delete course if no assignments that are using it

Use case 3: Add new course or edit course
-----------------------------------------

Course consists of:

-  name

-  course code

Course edit updates live version. Course code should not change after it
is assigned during creation and if students are using the course.

Updates to “course” and “course\_name” fields

Use case 4: Preview existing assignment
---------------------------------------

Previewing existing assignment should display assignment, as it would
appear to student. This is done by creating *scb.MainFrame* with
*master\_model* containing only assignment that needs to be previewed.

Use case 5: Create new assignment
---------------------------------

Creating assignment is same as editing assignment. The user needs to
provide minimal metadata before assignment can be saved.

Minimal metadata is:

-  course

-  assignment name

-  assignment code

Updates: “course”, “name”, “id” fields

Use case 6: Edit assignment
---------------------------

Editing assignment is complex process as data stored in
backend.models.Assignment.data should be kept in sync with the user
interface.

Assignment editing allows user to select to edit:

-  Experiment setup

-  Western blot

-  Flow cytometery

-  Microscopy

Updates:

“template.ui.techniques”

Use case 7: Edit experiment setup
---------------------------------

Setting up experiment setup consists of selecting to edit:

-  Experiment setup text

-  Strains

-  Protocols

-  Which strain/protocol combinations are enabled

This updates various elements of the template in particular:

“template.instructions”,

“template.strains”,

    “template.ui.experiment\_setup.table”,
    “template.ui.experiment\_setup.add\_multiple\_dialog”,
    “template.concentrations”,

    “template.drugs”,

    “template.experiment\_temperatures”,

    “template.cell\_lines”,

    “template.time\_unit”

Use case 8: Edit experiment setup - strains
-------------------------------------------

Strains editing is CRUD process.

Strains contain key and name that are stored in “template.strains” and used by various other portions of template.
------------------------------------------------------------------------------------------------------------------

Use case 9: Edit experiment setup - protocols
---------------------------------------------

Each protocol is an array of:

-  treatment

-  concentration

-  concentration unit

-  temperature

-  start time

-  duration

This updates various elements of the template in particular:

    “template.ui.experiment\_setup.add\_multiple\_dialog”,
    “template.concentrations”,

    “template.drugs”,

    “template.experiment\_temperatures”,

    “template.cell\_lines”,

    “template.time\_unit”

Use case 10: Edit experiment setup – strain protocol map
--------------------------------------------------------

Strain protocol map describes which combination of strains work with
which protocol. Thus it is many-to-many relationship between protocols
and strains.

This is done so that it is easier to instructor to create larger
assignments without need to repeat information

This updates:

“template.ui.experiment\_setup.add\_multiple\_dialog”,

Use case 11: Edit western blot
------------------------------

Western blot editor consists of setting western blot metadata which
include:

-  lysate kinds

-  gel types

Also, western blot has list of primary and secondary anti-body
combination.

This updates:

“template.lytate\_kinds”

“template.ui.experimental\_design.gel\_types”

Use case 12: Edit western blot – antibody / strain-protocol
-----------------------------------------------------------

For each strain-protocol that was enabled in experiment setup user is
presented with antibody combinations and depending on lysate kinds
enabled should specify weights and intensities, as they will appear on
western blot.

This updates:

“template.model.western\_blot”

Use case 13: Edit Flow Cytometery 
----------------------------------

Flow cytometery editor starts by allowing instructor to specify
treatment, analysis and condition that apply for sample preparation.

Use case 14: Edit Flow Cytometery – preparation / strain-protocol 
------------------------------------------------------------------

For each preparation / strain-protocol combination instructor will be
able to specify graph that will appear. This can be from the list of
templates that can be customized or by drawing histogram.

This updates:

“template.model.facs”

Use case 15: Edit histogram
---------------------------

Histogram tool should allow instructor to add point and smooth curve.
This can be used to create new templates or to adjust how histogram
appears to the student.

This will need to be developed as new model of model FACS to support
arbitrary date, right now 7 types are supported:

Normal

s-block'),

g1-block'),

g2-block'),

alpha-block'),

2-peak-normal-400

peak-100-normal-400

2-peak-uneven-normal-400

peak-50-normal-400

4-peak-normal-400

s-block-normal-400

Use case 16: Edit Microscopy
----------------------------

In preparing microscopy instructor creates an array, a table, of sample
preparation techniques. Instructor selects if sample preparation is from
fixed or live cells, which analysis to use, dye/stain or anti-body
labeling, and finally which conditions to apply to the sample.

Use case 16: Edit Microscopy – preparation / strain-protocol
------------------------------------------------------------

After that instructor selects for each combination of treatment
preparation and enabled strain-protocol combination a slides to be
displayed and parameters used to configure microscopy treatment.

Example assignment template
===========================

This is an example of template that assignment builder will produce.
Below are described elements and how they match to use cases above.

.. code:: javascript

	{
		id: 'usability_test',  // assignmentID
		name: 'SCB Usability Test', // assignmentName
		course: 'StarX', // courseID
		course_name: 'Prototypes', // course name
		description: "Placeholder", // course description
		notebook: {},  // other initial data elements, normally empty
		experiments: {}, // other data elements, normally empty 
		template: { // template dictionary
			instructions: [ // instructions array, each element is a tab
				['Placeholder', 'Usability test'] // 1st subelement is title, 2nd is content
			],
			ui: {
				experimental_design: {
					techniques: [ 'wb' , 'facs' ] // enabled techniques
				},
				experiment_setup: {table: [ // describes experiment setup table
					{kind: "cell_plate",
						title: " ",
						editable: false},
					{kind: "cell_line",
						title: "Strain",
						editable: false
					},
					{kind: "treatments",
						children: [
							{kind: "drug", title: "Treatment", editable: true},
							{kind: "concentration", title: "Concentration", editable: true},
							{kind: "start", title: "Start", editable: false},
							{kind: "duration", title: "Duration", editable: false}
						]
					},
					{kind: "actions",
						title: "Actions"
					}
				], actions: [
				]
				},
				western_blot: {format: "%CELL_LINE%, %TREATMENT%, %CONCENTRATION%", // describes formatting in western blot, reused in facs
					keys: {
						'%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
						'%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
						'%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']}
					}
				}
			},

			experiment_setup_actions: { // describes list of protocols
				cell_lines: [
					{
						id: 'wt',
						title: 'Wild Type',
						cell_line: 'wt'
					}
				],
				treatment_protocol_list: [
					{
						id: 'P1',
						title: 'Buffer Only',
						treatment_list: {list: [
							{schedule_value: 0, schedule: 'immediately', // start
								duration_value: 3600 * 24 * 3, duration: '3 d', // end
								drug_list: {list: [
									{drug_id: 'nc', concentration_id: 0}
								]}}
						]}
					},
					{
						id: 'P2',
						title: 'V1 low conc',
						treatment_list: {list: [
							{schedule_value: 0, schedule: 'immediately', // start
								duration_value: 3600 * 24 * 3, duration: '3 d', // end
								drug_list: {list: [
									{drug_id: 'nc', concentration_id: '0'},
									{drug_id: '1', concentration_id: '1'}
								]}}
						]}
					},
					{
						id: 'P3',
						title: 'V1 high conc',
						treatment_list: {list: [
							{schedule_value: 0, schedule: 'immediately', // start
								duration_value: 3600 * 24 * 3, duration: '3 d', // end
								drug_list: {list: [
									{drug_id: 'nc', concentration_id: '0'},
									{drug_id: '1', concentration_id: '125'}
								]}}
						]}
					},
					{
						id: 'P4',
						title: 'V2 low conc',
						treatment_list: {list: [
							{schedule_value: 0, schedule: 'immediately', // start
								duration_value: 3600 * 24 * 3, duration: '3 d', // end
								drug_list: {list: [
									{drug_id: 'nc', concentration_id: '0'},
									{drug_id: '1', concentration_id: '50'}
								]}}
						]}
					},
					{
						id: 'P5',
						title: 'Many drugs',
						treatment_list: {list: [
							{schedule_value: 0, schedule: 'immediately', // start
								duration_value: 3600 * 24 * 3, duration: '3 d', // end
								drug_list: {list: [
									{drug_id: 'nc', concentration_id: '0'},
									{drug_id: '1', concentration_id: '0'},
									{drug_id: '2', concentration_id: '5'},
									{drug_id: '3', concentration_id: '10'}
								]}}
						]}
					},
					{
						id: 'P6',
						title: 'Many drugs, Many times',
						treatment_list: {
							list: [
								{schedule_value: 0, schedule: 'immediately', // start
									duration_value: 3600 * 24 * 3, duration: '3 d', // end
									drug_list: {list: [
										{drug_id: 'nc', concentration_id: '0'},
										{drug_id: '1', concentration_id: '0'},
										{drug_id: '2', concentration_id: '5'},
										{drug_id: '3', concentration_id: '10'}
									]}}
							]}
					}
				],
				collection_schedule_list: [
					{id: '3 d', title: '3 days'}
				]
			},

			add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs, Vulvarines 1-4, identified in your chemical screen. <ul><li>To get started, click <b>Add Treatment Protocol.</b></li><li>For each treatment protocol, select the <i>C. elegans</i> strain, treatment(s), and treatment dose.</li><li> For all of your treatments, treat the <i>C. elegans</i> immediately (time = 0 minutes) and collect after 3 days.</li><li>Once you finish setting up your experiment, select <b>Finish setup & run experiment.</b> After you run your experiment, you will be unable to change your treatment protocols.</li></ul>', // text for add_new_row 

			concentrations: { // defined concentrations
				'1': { // ‘1’ is key
					name: '1 ' + microEntity + 'M', // display tag
					value: 1000 // value used by models
				},
				'5': {
					name: '5 ' + microEntity + 'M',
					value: 5000
				},
				'10': {
					name: '10 ' + microEntity + 'M',
					value: 10000
				},
				'20': {
					name: '20 ' + microEntity + 'M',
					value: 20000
				},
				'25': {
					name: '25 ' + microEntity + 'M',
					value: 25000
				},
				'40': {
					name: '40 ' + microEntity + 'M',
					value: 40000
				},
				'80': {
					name: '80 ' + microEntity + 'M',
					value: 80000
				},
				'125': {
					name: '125 ' + microEntity + 'M',
					value: 125000
				},
				'10n': {
					name: '10 nM',
					value: 10
				},
				'50': {
					name: '50 nM',
					value: 50
				},
				'100': {
					name: '100 nM',
					value: 100
				},
				'200': {
					name: '200 nM',
					value: 200
				},
				'400': {
					name: '400 nM',
					value: 400
				},
				'0': {
					name: '0 nM',
					value: 0
				}
			},
			drugs: { // list of drugs used in protocols
				'nc': { // ‘nc’ is key
					name: 'Buffer only', // display label
					concentrations: [0] // valid concentrations
				},
				'1': {
					name: 'Vulvarine 1',
					concentrations: [5, 10, 20, 40, 80]
				},
				'2': {
					name: 'Vulvarine 2',
					concentrations: [50, 100, 200, 400]
				},
				'3': {
					name: 'Vulvarine 3',
					concentrations: [1, 5, 25, 125]
				},
				'4': {
					name: 'Vulvarine 4',
					concentrations: ['10n', 50, 100, 200, 400]
				}
			},
			experiment_temperatures: { // list of temperatures
				'25': { // ‘25’ is key used by protocols
					name: "25" + degreeEntity + "C" // label
				}
			},
			cell_lines: { // list of cell lines
				'wt': { // cell line key
					name: 'Wild Type' // cell line display label
				}
			},
			time_unit: { // time unit used
				kind: 'minutes'
			},
			primary_anti_body: { // primary anti-body list used by western_blot
				order: [1, 2, 3, 9, 4, 5, 6, 7, 8, 9], // display order in pull-downs
				1: { // primary anti-body key
					name: 'rabbit anti-let-23', // primary anti-body label
					secondary: [1], // secondary anti-body list that matches primary anti-body
					marks: [ // list of default marks for western blot
						{weight: 24, intensity: .11},
						{weight: 36, intensity: .4},
						{weight: 48, intensity: .04}
					],
					gel_name: 'let-23' // title for gel for this anti-body in western blot
				},
				2: {
					name: 'mouse anti-let-60',
					secondary: [3],
					marks: [
						{weight: 48, intensity: .04}
					],
					gel_name: 'let-60'
				},
				3: {
					name: 'goat anti-lin15A',
					secondary: [2],
					marks: [
						{weight: 12, intensity: .02}
					],
					gel_name: 'lin15A'
				},
			   4: {
					name: 'goat anti-lin-1',
					secondary: [2],
					gel_name: 'lin-1'
				},
				5: {
					name: 'mouse anti-Dpy-5',
					secondary: [3],
					gel_name: 'Dpy-5'
				},
				6: {
					name: 'rabbit anti-Lon-2',
					secondary: [1],
					gel_name: 'Lon-2'
				},
				7: {
					name: 'mouse anti-Sma-4',
					secondary: [3],
					gel_name: 'Sma-4'
				},
				8: {
					name: 'goat anti-Unc-22',
					secondary: [2],
					gel_name: 'Unc-22'
				},
				9: {
					name: 'rabbit anti-tubulin',
					secondary: [1],
					gel_name: 'anti-tubulin',
					marks: [
						{weight: 50, intensity: 25.1}
					]
				}
			},
			secondary_anti_body: { // list of secondary anti-bodies
				1: { // anti-body key
					name: 'donkey anti-rabbit' //display label
				},
				2: {
					name: 'rabbit anti-goat'
				},
				3: {
					name: 'goat anti-mouse'
				}
			},
			lysate_kinds: { // list of lysate kinds
				'whole': { // key
					name: 'Whole Cell' // display label
				}, 
				 'cyto':{
				 name:'Cytoplasm'
				 },
				 'nuclear':{
				 name:'Nuclear'
				 }
			},
			model: {// model
				western_blot: {// this applies to western blot
					'cyto': {// it acts on cytoplasm (thus on whole cell lysate as well)
						'parser_fixed': [ 
							{
								'cell_line': 'wt', // matching cell line
								'transfer_function': 'delta', // matching transfer functoin
								'drug': 1, // Vul 1
								'cutoff': 10000, // delta cut-off
								'above_marks': [ // if drug concentration above & matches
									{
										name: 'let-23',
										weight: 150,
										intensity: -40,
										primary_anti_body: [1]
									}
								],
								'below_marks': [] // if drug concentration below & matches
							},
							{
								'cell_line': 'wt',
								'transfer_function': 'delta',
								'drug': 2, // Vul 2
								'cutoff': 200,
								'above_marks': [
									{
										name: 'let-60',
										weight: 21,
										intensity: -100,
										primary_anti_body: [2]
									}
								],
								'below_marks': []
							},
							{
								'cell_line': 'wt',
								'transfer_function': 'delta',
								'drug': 3, // Vul 3
								'cutoff': 25000,
								'above_marks': [
									{
										name: 'let-15A',
										weight: 79,
										intensity: -100,
										primary_anti_body: [3]
									},
									{
										name: 'let-15B',
										weight: 163,
										intensity: -100,
										primary_anti_body: [9]

									}
								],
								'below_marks': []
							},
							{
								'cell_line': 'wt',
								'transfer_function': 'delta',
								'drug': 4, // Vul 3
								'cutoff': 400,
								'above_marks': [
									{
										name: 'let-1',
										weight: 48,
										intensity: -100,
										primary_anti_body: [4]
									}
								],
								'below_marks': []
							},
							{
								'cell_line': 'wt',
								'transfer_function': 'static',
								'marks': [
									{
										name: 'let-23',
										weight: 150,
										intensity: 40,
										primary_anti_body: [1]
									},
									{
										name: 'let-60',
										weight: 21,
										intensity: 100,
										primary_anti_body: [2]
									},
									{
										name: 'let-15A',
										weight: 79,
										intensity: 100,
										primary_anti_body: [3]
									},
									{
										name: 'let-15B',
										weight: 163,
										intensity: 100,
										primary_anti_body: [9]
									},
									{
										name: 'let-1',
										weight: 48,
										intensity: 100,
										primary_anti_body: [4]
									},
									{
										name: 'Dpy-5',
										weight: 20,
										intensity: 60,
										primary_anti_body: [5]
									},
									{
										name: 'Lan-2',
										weight: 100,
										intensity: 40,
										primary_anti_body: [6]
									},
									{
										name: 'Sma-4',
										weight: 75,
										intensity: 25,
										primary_anti_body: [7]
									},
									{
										name: 'Unc-22',
										weight: 40,
										intensity: 10,
										primary_anti_body: [8]
									}
								]
							}
						]
					}
				}
			}
		}
	};

UI Sketches
-----------

User interface sketches supporting use cases are available in `dropbox`_
and in `trello`_.

.. _dropbox: https://www.dropbox.com/sh/ipmg5dfksyrjxeb/AAAh7CpAxLd5TEAH9zTpxikAa?dl=0
.. _trello: https://trello.com/b/NjXYoSHQ/starx


