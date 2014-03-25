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
insturctions - list of lists, each sublist contains the title of the second and the HTML for the section, added after the object is retrieved from server

ui - contains all the information for the user interface setup for the problem set
	experiment_design
		techniques
	experiment_setup
		table
			{ kind, title, editable}
			except treatments
			children[
				{kind, title, editable}
			]
		actions []
	western_blot
	add_multiple_dialog	
		strain_id
			title
				headings
					rows
						cells
							{kind, text}
							{kind, name}
						treatment_id
						cell_treatments
							treat_id
								cell_line
								treatment_list
									list
										drug_list
											list
												{drug_id, concentration_id}
								temperature
									
add_new_row_instructions
concentrations
drugs
experiment_temperatures
cell_lines
time_unit
primary_anti_body
secondary_anti_body
lysate_kinds
facs_kinds
model	
	western_blot
		cyto
			parser_fixed
	facs
		dna
			parser_simple
		
