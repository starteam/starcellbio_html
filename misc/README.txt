README.txt

Understanding how to construct a master model of StarCellBio

Assignment data is passed to the back end as members of a list in the following structure:

master_model_data = {
    app_title: 'StarCellBio',
    app_description: 'StarCellBio Placeholder',
    assignments: {
        list: [ 
        INSERT LIST OF ASSIGNMENTS HERE
        ]
    },
    ui: {}
};

The assignment data is parsed and saved to the database. (see other README for Backend for description of models)

*difference between parsers, and static and delta in western_blot model

id - identifying id for the assignment
name - the name of the Assignment that will be Displayed to the user in the List of assignments
course - Header Course Name of the assignment (also the course_code)
course_name - Name of the course (not displayed on screen)
description - for our own reference, string of information about this problem set
experiments - {} starts out empty, filled with experiment data as student works on assignment
template - contains information to setup entire experiment, ui and all
**random_choose - sets flag if user wants to randomize the choosing of some subset of strains from a list of strains for problem set, randomized by participant
** randomize_all - sets flag if user wants to randomize all of the shown strains into some new order (i.e. randomize relabeling of the strains for a problem set)
ui - contains all the information for the user interface 