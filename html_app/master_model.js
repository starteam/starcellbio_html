microEntity = $('<div />').html('&#181;').text();
degreeEntity = $('<div />').html('&deg;').text();

///OLD ASSIGNMENTS//////////
var __assigment_facs = {
    id: 'assignment_3',
    name: 'FACS prototype',
    course: 'StarX',    
    course_name: 'Prototypes',
    description: 'FACS prototype assignment.',
    experiments: {
    },
    template: {
    	instructions:[
    		['Goal & Introduction','FACS prototype assignment.']
    	],
        ui_configuration: {
            experiment_steps_setup: true, // this is not even checked...
            experiment_steps_western_blot: false,
            experiment_steps_facs: true,
            experiment_steps_microscopy: false,
            treatment_options_display_temperature: false,
            lysate_display_ip: false,
            amount_of_protein_loaded: 50,
            experiment_setup_duration: 3600, // seconds
            experiment_setup_resolution_height: 3600,
            experiment_setup_physical_height: 600,
            facs_cell_cycle_length: 24 * 3600, //24h cell cycle
            facs_cell_cycle_step: 300 // 5 minutes
        },
        drug_template: {
            name: 'Negative Control',
            drug_id: 'nc',
            concentration_id: 0
        },
        experiment_templates: {
            'default': {
                collection_schedule_list: {list: [
                    {schedule: "10 min", schedule_value: 600, id: '10'},
                    {schedule: "30 min", schedule_value: 1800, id: '30'},
                    {schedule: "60 min", schedule_value: 3600, id: '60'}
                ]}
            },
            treatment_protocol_template: {
                'default': {
                    collection_schedule_list: {list: [
                        {schedule: "10 min", schedule_value: 600, id: '10'},
                        {schedule: "30 min", schedule_value: 1800, id: '30'},
                        {schedule: "60 min", schedule_value: 3600, id: '60'}
                    ]}
                }
            }
        },
        name: 'TUFTS CellBio Prototype Assignment',
        concentrations: {
            1: {
                name: '1ug/ml',
                value: 1
            },
            0: {
                name: '0ug/ml',
                value: 0
            }
        },
        drugs: {
            1: {
                name: 'Nocodazole', // G2 prometaphase drug
                concentrations: [1]
            },
            'nc': {
                name: 'Negative Control',
                concentrations: [0]
            }
        },
        experiment_temperatures: {
            '25': { name: "25" + degreeEntity + "C"    }
        },
        cell_lines: {
            'strain 1': {
                name: 'Strain 1'
            }
        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
        	order:[1,2,3],
            1: {
                name: 'rabbit anti-goat beta-actin',
                secondary: [2],
                marks: [
                    {weight: 100, intensity: .01},
                    {weight: 129, intensity: .11}
                ]
            },
            2: {
                name: 'mouse anti-mouse phosphotyrosine',
                secondary: [3],
                marks: [
                    {weight: 120, intensity: .01},
                    {weight: 129, intensity: .11}
                ]
            },
            3: {
                name: 'mouse anti-mouse cdk2',
                secondary: [3],
                marks: [
                    {weight: 140, intensity: .01},
                    {weight: 129, intensity: .11}
                ]
            }
        },
        secondary_anti_body: {
            1: {
                name: 'donkey anti-rabbit'
            },
            2: {
                name: 'rabbit anti-goat'
            },
            3: {
                name: 'goat anti-mouse'
            }
        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            },
            'cyto': {
                name: 'Cytoplasm'
            },
            'nuclear': {
                name: 'Nuclear'
            }
        },
        model: { // model
            facs: {
                'dna': {
                    'parser_1': [
                        {
                            'cell_line': 'strain 1',
                            'drug': 1,
                            'action': 'block_cycle'
                        }
                    ]
                }
            },
            western_blot: { // this applies to western blot
                'cyto': { // it acts on cytoplasm (thus on whole cell lysate as well)
                    'parser_1': [
                        // simple models as documented
                        {
                            'cell_line': 'strain 1', // as defined in cell_lines
                            'drug': 1, // these are required preconditions
                            'transfer_function': 'linear_concentration_duration_with_max', // this is transfer function
                            'marks': [
                                // these are the marks that will appear
                                {
                                    weight: 50,
                                    intensity_slope: -0.01,
                                    intensity_intercept: 300,
                                    intensity_max: 1000,
                                    intensity_min: 5
                                },
                                {
                                    weight: 75,
                                    intensity_slope: 0.02,
                                    intensity_intercept: .3,
                                    intensity_max: 1000,
                                    intensity_min: 5
                                },
                                {
                                    weight: 35,
                                    intensity_slope: 0.001,
                                    intensity_intercept: 4,
                                    intensity_max: 1000,
                                    intensity_min: 5
                                }
                            ]
                        }
                    ],
                    'parser_fixed': [
                        {'cell_line': 'wt',
                            'transfer_function': 'static', // this is transfer function
                            'marks': [
                                // these are the marks that will appear
                                {
                                    weight: 60,
                                    intensity: 300
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
};

var __basic_tests = {
    id: 'basic_tests',
    name: 'SCB Basic Tests',
    course: 'StarX',
    course_name: 'Prototypes',
    description: 'Biochemical approach to analyzing vulva development in <i>C. elegans.</i>',
    experiments: {},
    template: {
        instructions: [
        	['Goal & Introduction', '$DISPLAY_ASSIGNMENT_INSTRUCTIONS$']

        ],

        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs' ]
            },
            experiment_setup: {table: [
                {kind: "cell_line",
                    title: "Strain",
                    editable: false
                },
                {kind: "treatments",
                    children: [
                        {kind: "drug", title: "Treatments", editable: false},
                        {kind: "concentration", title: "Concentration", editable: false},
                        {kind: "start", title: "Start", editable: false},
                        {kind: "duration", title: "Duration", editable: false}
                    ]
                },
                {kind: "custom",
                    title: "Stimulation Time",
                    editable: false,
                    key: "stimulation_time"},
                {kind: "actions",
                    title: "Actions"
                }
            ], actions: [
                {kind: "add_protocol", title: "Add Treatment Protocol"}
            ], new_row: {
                title: 'New row',
                cell_line: 'wt',
                treatment_list: {list: [
                    {schedule_value: 0, duration_value: 3600 * 24 * 3, duration: '3 d', drug_list: {list: [
                        {drug_id: 'nc', concentration_id: '0'}
                    ]}
                    }
                ]},
                collection_schedule_list: {list: [
                    {schedule: "18h", schedule_value: 18 * 3600, id: '3'}
                ]}
            }
            },
            western_blot: {format: "%CELL_LINE%, %TREATMENT%, %CONCENTRATION%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                    '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']}
                }
            }
        },

        experiment_setup_actions: {
            cell_lines: [
                {
                    id: 'wt',
                    title: 'Wild Type',
                    cell_line: 'wt'
                },
                {
                    id: 'm1',
                    title: 'Mutant 1',
                    cell_line: 'm1'
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

        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs, Vulvarines 1-4, identified in your chemical screen. <ul><li>To get started, click <b>Add Treatment Protocol.</b></li><li>For each treatment protocol, select the <i>C. elegans</i> strain, treatment(s), and treatment dose.</li><li> For all of your treatments, treat the <i>C. elegans</i> immediately (time = 0 minutes) and collect after 3 days.</li><li>Once you finish setting up your experiment, select <b>Finish setup & run experiment.</b> After you run your experiment, you will be unable to change your treatment protocols.</li></ul>',

        concentrations: {
            '1': {
                name: '1 ' + microEntity + 'M',
                value: 1000
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
        drugs: {
            'nc': {
                name: 'Buffer only',
                concentrations: [0]
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
        experiment_temperatures: {
            '25': {
                name: "25" + degreeEntity + "C"
            }
        },
        cell_lines: {
            'wt': {
                name: 'Wild Type'
            },
            'm1': {
                name: 'Mutant 1'
            }

        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
        	order:[1,2,3,9,4,5,6,7,8],
            1: {
                name: 'rabbit anti-let-23',
                secondary: [1],
                marks: [
                    {weight: 24, intensity: .11},
                    {weight: 36, intensity: .4},
                    {weight: 48, intensity: .04}
                ],
                gel_name: 'anti-let-23'
            },
            2: {
                name: 'mouse anti-let-60',
                secondary: [3],
                marks: [
                    {weight: 48, intensity: .04}
                ],
                gel_name: 'anti-let-60'
            },
            3: {
                name: 'goat anti-lin15A',
                secondary: [2],
                marks: [
                    {weight: 12, intensity: .02}
                ],
                gel_name: 'anti-lin15A'
            },
            9: {
                name: 'goat anti-lin15B',
                secondary: [2],
                marks: [
                    {weight: 100, intensity: .01},
                    {weight: 129, intensity: .11}
                ],
                gel_name: 'anti-lin15B'
            },
            4: {
                name: 'goat anti-lin-1',
                secondary: [2],
                gel_name: 'anti-lin-1'
            },
            5: {
                name: 'mouse anti-Dpy-5',
                secondary: [3],
                gel_name: 'anti-Dpy-5'
            },
            6: {
                name: 'rabbit anti-Lon-2',
                secondary: [1],
                gel_name: 'anti-Lon-2'
            },
            7: {
                name: 'mouse anti-Sma-4',
                secondary: [3],
                gel_name: 'anti-Sma-4'
            },
            8: {
                name: 'goat anti-Unc-22',
                secondary: [2],
                gel_name: 'anti-Unc-22'
            }
        },
        secondary_anti_body: {
            1: {
                name: 'donkey anti-rabbit'
            },
            2: {
                name: 'rabbit anti-goat'
            },
            3: {
                name: 'goat anti-mouse'
            }
        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            },
            'cyto': {
                name: 'Cytoplasm'
            },
            'nuclear': {
                name: 'Nuclear'
            }
        },
        facs_kinds: {
            'whole': {
                name: 'Whole Cell'
            },
            'cyto': {
                name: 'Cytoplasm'
            },
            'nuclear': {
                name: 'Nuclear'
            }
        },
        model: {// model
            western_blot: {// this applies to western blot
                'cyto': {// it acts on cytoplasm (thus on whole cell lysate as well)
                    'parser_fixed': [
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 1, // Vul 1
                            'cutoff': 10000,
                            'above_marks': [
                                {
                                    name: 'let-23',
                                    weight: 150,
                                    intensity: -40,
                                    primary_anti_body: [1]
                                }
                            ],
                            'below_marks': []
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

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///NEW ASSIGNMENTS//////////
var __assignment2 = {
    id: 'assignment_2',
    course:'7.02',
    course_name: 'MIT Course 7.02',
    name: 'StarCellBio Prototype Assignment',
    description: 'Biochemical approach to analyzing vulva development in <i>C. elegans.</i>',
    experiments: {},
    template: {
        instructions: [
           ['Goal & Introduction','Your new lab is studying vulva development in <i>C. elegans</i>. You screen a chemical library and identify four new drugs, which all affect vulva development, and you name them Vulvarine 1, 2, 3 and 4.<br><br>Increasing amounts of Vulvarines 1 and 2 result in a vulvaless phenotype in the wild-type worms whereas treatment of wild-type worms with Vulvarines 3 and 4 results in a multivulva phenotype. Your advisor tells you that some proteins involved in the vulva development pathway are already known and she advises you to do western blots to test if some of these proteins are affected by these treatments.<br><br>i) Use the StarCellBio software to analyze the western blots from worms treated with increasing doses of Vulvarines. Choose the gene products whose expression you would like to check. <br>ii) Which proteins are affected by Vulvarine treatment? What is the critical Vulvarine concentration for each treatment?<br> iii) Look up the biological function of each protein whose expression is affected by the drug and speculate as to how the change in its levels may have a role in vulva development.<br>']

        ],
        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs, Vulvarines 1-4, identified in your chemical screen. <ul><li>To get started, click <b>Add Treatment Protocol.</b></li><li>For each treatment protocol, select the <i>C. elegans</i> strain, treatment(s), and treatment dose.</li><li> For all of your treatments, treat the <i>C. elegans</i> immediately (time = 0 minutes) and collect after 3 days.</li><li>Once you finish setting up your experiment, select <b>Finish setup & run experiment.</b> After you run your experiment, you will be unable to change your treatment protocols.</li></ul>',
        ui_configuration: {
            experiment_steps_setup: true, // this is not even checked...
            experiment_steps_western_blot: true,
            experiment_steps_facs: false,
            experiment_steps_microscopy: false,
            treatment_options_display_temperature: false,
            treatment_options_edit_schedule: false,
            lysate_display_ip: false,
            amount_of_protein_loaded: 50,
            experiment_setup_duration: 3600, // seconds
            experiment_setup_resolution_height: 3600,
            experiment_setup_physical_height: 600,
            collection_times_fixed: true,
            maximum_number_of_treatments_per_protocol: 1,
            show_add_new_experiment_rows: true
        },
        drug_template: {
            name: 'Buffer only',
            drug_id: 'nc',
            concentration_id: 0
        },
        experiment_templates: {
            'default': {
                collection_schedule_list: {
                    list: [
                        {
                            schedule: "3 d",
                            schedule_value: 3600 * 24 * 3,
                            id: '3 d'
                        }
                    ]
                },
                treatment: {
                    schedule_value: 0,
                    schedule: 'immediately',
                    duration_value: 3600 * 24 * 3,
                    duration: '3 d'
                }
            },
            'treatment_protocol_template': {
                'P1': {
                    title: 'Basic protocol',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: 'immediately', duration_value: 3600 * 24 * 3, duration: '3 d', drug_list: {list: [
                            {drug_id: 'nc', concentration_id: 0}
                        ]}}
                    ]},
                    collection_schedule_list: {
                        list: [
                            {
                                schedule: "3 d",
                                schedule_value: 3600 * 24 * 3,
                                id: '3 d'
                            }
                        ]
                    }
                }
            }
        },
        name: '7.02 StarCellBio Prototype Assignment',
        concentrations: {
            1: {
                name: '1 ' + microEntity + 'M',
                value: 1000
            },
            5: {
                name: '5 ' + microEntity + 'M',
                value: 5000
            },
            10: {
                name: '10 ' + microEntity + 'M',
                value: 10000
            },
            20: {
                name: '20 ' + microEntity + 'M',
                value: 20000
            },
            25: {
                name: '25 ' + microEntity + 'M',
                value: 25000
            },
            40: {
                name: '40 ' + microEntity + 'M',
                value: 40000
            },
            80: {
                name: '80 ' + microEntity + 'M',
                value: 80000
            },
            125: {
                name: '125 ' + microEntity + 'M',
                value: 125000
            },
            '10n': {
                name: '10 nM',
                value: 10
            },
            50: {
                name: '50 nM',
                value: 50
            },
            100: {
                name: '100 nM',
                value: 100
            },
            200: {
                name: '200 nM',
                value: 200
            },
            400: {
                name: '400 nM',
                value: 400
            },
            0: {
                name: '0 nM',
                value: 0
            }
        },
        drugs: {
            'nc': {
                name: 'Buffer only',
                concentrations: [0]
            },
            1: {
                name: 'Vulvarine 1',
                concentrations: [5, 10, 20, 40, 80]
            },
            2: {
                name: 'Vulvarine 2',
                concentrations: [50, 100, 200, 400]
            },
            3: {
                name: 'Vulvarine 3',
                concentrations: [1, 5, 25, 125]
            },
            4: {
                name: 'Vulvarine 4',
                concentrations: ['10n', 50, 100, 200, 400]
            }
        },
        experiment_temperatures: {
            '25': {
                name: "25" + degreeEntity + "C"
            }
        },
        cell_lines: {
            'wt': {
                name: 'Wild Type'
            }

        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
        	order:[1,2,3,9,4,5,6,7,8],
            1: {
                name: 'rabbit anti-let-23',
                secondary: [1],
                marks: [
                    {weight: 24, intensity: .11},
                    {weight: 36, intensity: .4},
                    {weight: 48, intensity: .04}
                ]
            },
            2: {
                name: 'mouse anti-let-60',
                secondary: [3],
                marks: [
                    {weight: 48, intensity: .04}
                ]
            },
            3: {
                name: 'goat anti-lin15A',
                secondary: [2],
                marks: [
                    {weight: 12, intensity: .02}
                ]
            },
            9: {
                name: 'goat anti-lin15B',
                secondary: [2],
                marks: [
                    {weight: 100, intensity: .01},
                    {weight: 129, intensity: .11}
                ]
            },
            4: {
                name: 'goat anti-lin-1',
                secondary: [2]
            },
            5: {
                name: 'mouse anti-Dpy-5',
                secondary: [3]
            },
            6: {
                name: 'rabbit anti-Lon-2',
                secondary: [1]
            },
            7: {
                name: 'mouse anti-Sma-4',
                secondary: [3]
            },
            8: {
                name: 'goat anti-Unc-22',
                secondary: [2]
            }
        },
        secondary_anti_body: {
            1: {
                name: 'donkey anti-rabbit'
            },
            2: {
                name: 'rabbit anti-goat'
            },
            3: {
                name: 'goat anti-mouse'
            }
        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            },
            'cyto': {
                name: 'Cytoplasm'
            },
            'nuclear': {
                name: 'Nuclear'
            }
        },
        model: {// model
            western_blot: {// this applies to western blot
                'cyto': {// it acts on cytoplasm (thus on whole cell lysate as well)
                    'parser_fixed': [
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 1, // Vul 1
                            'cutoff': 10000,
                            'above_marks': [
                                {
                                    name: 'let-23',
                                    weight: 150,
                                    intensity: -40,
                                    primary_anti_body: [1]
                                }
                            ],
                            'below_marks': []
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

var __assigment_tufts = {
    id: 'assignment_tufts',
    name: 'Bio52 Assignment',
    course:'Bio52',
    course_name: 'Tufts Bio52',
    description: 'Bio52 Homework Assignment.',
    experiments: {
    },
    template: {
        instructions: [
        	['Goal & Introduction',"Here come instructions"]
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' ]
            },
            experiment_setup: {
                table: [ //
                    {kind: "cell_plate", title: " ", editable: false},
                    {kind: 'cell_line', title: 'Strain', editable: false}, //
                    {kind: 'treatments',
                        children: [//
                            {kind: 'drug', title: 'Treatment', editable: false},//
                            {kind: 'concentration', title: 'Concentration', editable: false},//
                            {kind: 'duration', title: 'Time', editable: false},//

                        ]
                    },//
                    {kind: 'actions', title: 'Actions'}//
                ],//
                actions: [],//

            },

            western_blot: {},
            add_multiple_dialog: {
                'wt': {
                    title: '<b>Strain:</b> Wild Type',
                    headings: [
                        'Select', 'Treatment Protocol'
                    ],
                    rows: [
                        {
                            cells: [
                                {kind: 'checkbox', name: 'SEL'},
                                {kind: 'text', text: '0.1% FBS'}
                            ],
                            treatment_id: 'P1',
                            cell_treatments: {
                                'SEL': [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {schedule_value: 0, schedule: '0 min', duration_value: -1, duration: '18h', drug_list: {list: [
                                                {drug_id: 1, concentration_id: 0}
                                            ]}}
                                        ]},
                                        collection_schedule_list: {list: [
                                            {schedule: "18h", schedule_value: 3600 * 18, id: '3'}
                                        ]},
                                        stimulation_time: '0 minutes',
                                        name: '0.1% FBS'
                                    }
                                ]
                            }
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: 'SEL'},
                                {kind: 'text', text: '0.1% FBS & EGF'}
                            ],
                            treatment_id: 'P2',
                            cell_treatments: {
                                'SEL': [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {schedule_value: 0, schedule: '0 min', duration_value: -1, duration: '18h', drug_list: {list: [
                                                {drug_id: 1, concentration_id: 0}
                                            ]}},
                                            {schedule_value: 3600 * 18, schedule: '18h', duration_value: 600, duration: '10 min', drug_list: {list: [
                                                {drug_id: 2, concentration_id: 1}
                                            ]}}
                                        ]},
                                        collection_schedule_list: {list: [
                                            {schedule: "3h 10 min", schedule_value: 3600 * 18 + 600, id: '31'}
                                        ]},
                                        stimulation_time: '10 minutes',
                                        name: '0.1% FBS & EGF'
                                    }
                                ]
                            }
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: 'SEL'},
                                {kind: 'text', text: '0.1% FBS & Erlotinib & EGF'}
                            ],
                            treatment_id: 'P3',
                            cell_treatments: {
                                'SEL': [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {schedule_value: 0, schedule: '0 min', duration_value: -1, duration: '18h', drug_list: {list: [
                                                {drug_id: 1, concentration_id: 0}
                                            ]}},
                                            {schedule_value: 3600 * 18, schedule: '18h', duration_value: -1, duration: '15 min', drug_list: {list: [
                                                {drug_id: 3, concentration_id: 20}
                                            ]}},
                                            {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                                                {drug_id: 2, concentration_id: 1}
                                            ]}}
                                        ]},
                                        collection_schedule_list: {list: [
                                            {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                                        ]},
                                        stimulation_time: '10 minutes',
                                        name: '0.1% FBS & Erlotinib & EGF'
                                    }
                                ]}
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: 'SEL'},
                                {kind: 'text', text: '0.1% FBS & U0126 & EGF'}
                            ],
                            treatment_id: 'P4',
                            cell_treatments: {
                                'SEL': [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {schedule_value: 0, schedule: '0 min', duration_value: -1, duration: '18h', drug_list: {list: [
                                                {drug_id: 1, concentration_id: 0}
                                            ]}},
                                            {schedule_value: 3600 * 18, schedule: '18h', duration_value: -1, duration: '15 min', drug_list: {list: [
                                                {drug_id: 4, concentration_id: 10}
                                            ]}},
                                            {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                                                {drug_id: 2, concentration_id: 1}
                                            ]}}
                                        ]},
                                        collection_schedule_list: {list: [
                                            {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                                        ]},
                                        stimulation_time: '10 minutes',
                                        name: '0.1% FBS & U0126 & EGF'
                                    }
                                ]}
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: 'SEL'},
                                {kind: 'text', text: '0.1% FBS & Erlotinib & U0126 & EGF'}
                            ],
                            treatment_id: 'P5',
                            cell_treatments: {
                                'SEL': [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {schedule_value: 0, schedule: '0 min', duration_value: -1, duration: '18h', drug_list: {list: [
                                                {drug_id: 1, concentration_id: 0}
                                            ]}},
                                            {schedule_value: 3600 * 18, schedule: '18h', duration_value: -1, duration: '15 min', drug_list: {list: [
                                                {drug_id: 3, concentration_id: 20},
                                                {drug_id: 4, concentration_id: 10}
                                            ]}},
                                            {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                                                {drug_id: 2, concentration_id: 1}
                                            ]}}
                                        ]},
                                        collection_schedule_list: {list: [
                                            {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                                        ]},
                                        stimulation_time: '10 minutes',
                                        name: '0.1% FBS & Erlotinib & U0126 & EGF'
                                    }
                                ]}
                        }

                    ]

                }
            }
        },
        drug_template: {
            name: 'Serum Starvation',
            drug_id: 1,
            concentration_id: 0
        },

        experiment_templates: {
            'default': {
                collection_schedule_list: {list: [
                    {schedule: "10 min", schedule_value: 600, id: '10'}
                ]}
            },
            'treatment_protocol_template': {
                'P1': {
                    title: 'Serum starvation alone',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: '0 min', duration_value: 3600 * 18, duration: '18h', drug_list: {list: [
                            {drug_id: 1, concentration_id: 0}
                        ]}}
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "18h", schedule_value: 3600 * 18, id: '3'}
                    ]},
                    stimulation_time: '0 minutes'
                },
                'P2': {
                    title: 'Serum starvation + agonist treatment',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: '0 min', duration_value: 3600 * 18, duration: '18h', drug_list: {list: [
                            {drug_id: 1, concentration_id: 0}
                        ]}},
                        {schedule_value: 3600 * 18, schedule: '18h', duration_value: 600, duration: '10 min', drug_list: {list: [
                            {drug_id: 2, concentration_id: 1}
                        ]}}
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "3h 10 min", schedule_value: 3600 * 18 + 600, id: '31'}
                    ]},
                    stimulation_time: '10 minutes'
                },
                'P3': {
                    title: 'Serum starvation + EGFR inhibitor + agonist',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: '0 min', duration_value: 3600 * 18, duration: '18h', drug_list: {list: [
                            {drug_id: 1, concentration_id: 0}
                        ]}},
                        {schedule_value: 3600 * 18, schedule: '18h', duration_value: 900, duration: '15 min', drug_list: {list: [
                            {drug_id: 3, concentration_id: 20}
                        ]}},
                        {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                            {drug_id: 2, concentration_id: 1}
                        ]}}
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                    ]},
                    stimulation_time: '10 minutes'
                },
                'P4': {
                    title: 'Serum starvation + MEK inhibitor + agonist',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: '0 min', duration_value: 3600 * 18, duration: '18h', drug_list: {list: [
                            {drug_id: 1, concentration_id: 0}
                        ]}},
                        {schedule_value: 3600 * 18, schedule: '18h', duration_value: 900, duration: '15 min', drug_list: {list: [
                            {drug_id: 4, concentration_id: 10}
                        ]}},
                        {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                            {drug_id: 2, concentration_id: 1}
                        ]}}
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                    ]},
                    stimulation_time: '10 minutes'
                },
                'P5': {
                    title: 'Serum starvation + EGFR inhibitor & MEK inhibitor + agonist',
                    treatment_list: {list: [
                        {schedule_value: 0, schedule: '0 min', duration_value: 3600 * 18, duration: '18h', drug_list: {list: [
                            {drug_id: 1, concentration_id: 0}
                        ]}},
                        {schedule_value: 3600 * 18, schedule: '18h', duration_value: 900, duration: '15 min', drug_list: {list: [
                            {drug_id: 3, concentration_id: 20},
                            {drug_id: 4, concentration_id: 10}
                        ]}},
                        {schedule_value: 3600 * 18 + 15 * 60, schedule: '18h 15min', duration_value: 600, duration: '10 min', drug_list: {list: [
                            {drug_id: 2, concentration_id: 1}
                        ]}}
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "18h 25 min", schedule_value: 3600 * 18 + 25 * 60, id: '325'}
                    ]},
                    stimulation_time: '10 minutes'
                }
            }
        },
        name: 'TUFTS CellBio Prototype Assignment',
        concentrations: {
            0: {
                name: '0.1%',
                value: 0
            },
            1: {
                name: '100ng/mL',
                value: 100
            },
            20: {
                name: '20'+microEntity+'M',
                value: 20
            },
            10: {
                name: '10'+microEntity+'M',
                value: 10
            }

        },

        drugs: {

            1: {name: 'FBS',
                concentrations: [0]
            },
            2: {
                name: 'EGF',
                concentrations: [1]
            },
            3: {
                name: 'Erlotinib',
                concentrations: [20]
            },
            4: {
                name: 'U0126',
                concentrations: [10]
            }
        },
        experiment_temperatures: {
            '25': { name: "25" + degreeEntity + "C"    }
        },
        cell_lines: {
            'wt': {
                name: 'Wild Type'
            }
        },
        time_unit: {
            kind: 'minutes' 
        },
        primary_anti_body: {
        	order: [1,2,3,4,5],
            1: {
                name: 'rabbit anti P-ERK1/2',
                secondary: [1],
                marks: [
                    {weight: 44, intensity: .1},
                    {weight: 42, intensity: .1}
                ],
                gel_name: 'P-ERK1/2'
            },
            2: {
                name: 'rabbit anti ERK1/2',
                secondary: [1],
                marks: [
                    {weight: 44, intensity: 1},
                    {weight: 42, intensity: 1}
                ],
                gel_name: 'ERK1/2'
            },
            3: {
                name: 'rabbit anti P-EGFR',
                secondary: [1],
                marks: [
                    {weight: 175, intensity: 0}
                ],
                gel_name: 'P-EGFR'
            },
            4: {
                name: 'rabbit anti EGFR',
                secondary: [1],
                marks: [
                    {weight: 134, intensity: 1}
                ],
                gel_name: 'EGFR'
            },
            5: {
                name: 'rabbit anti tubulin',
                secondary: [1],
                marks: [
                    {weight: 50, intensity: 20}
                ],
                gel_name: 'tubulin'
            }
        },
        secondary_anti_body: {
            1: {
                name: 'goat anti rabbit HRP'
            },
            2: {
                name: 'goat anti mouse HRP'
            }
        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            }
        },
        model: { // model
            western_blot: { // this applies to western blot
                'cyto': { // it acts on cytoplasm (thus on whole cell lysate as well)
                    'parser_fixed': [
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 2, // FBS
                            'cutoff': 50,
                            'above_marks': [
                                {
                                    name: 'P-ERK',
                                    weight: 44,
                                    intensity: .1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-ERK',
                                    weight: 42,
                                    intensity: .1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-EGFR',
                                    weight: 175,
                                    intensity: .2,
                                    primary_anti_body: [3]
                                }
                            ],
                            'below_marks': [
                                {
                                    name: 'P-ERK',
                                    weight: 44,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-ERK',
                                    weight: 42,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                            ]
                        },
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 3, // Erlotinib
                            'cutoff': 10,
                            'above_marks': [
                                {
                                    name: 'P-ERK',
                                    weight: 44,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-ERK',
                                    weight: 42,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-EGFR',
                                    weight: 175,
                                    intensity: -.2,
                                    primary_anti_body: [3]
                                }
                            ]
                        },
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 4, // U0126
                            'cutoff': 10,
                            'above_marks': [
                                {
                                    name: 'P-ERK',
                                    weight: 44,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-ERK',
                                    weight: 42,
                                    intensity: -.1,
                                    primary_anti_body: [1]
                                },
                                {
                                    name: 'P-EGFR',
                                    weight: 175,
                                    intensity: 0,
                                    primary_anti_body: [3]
                                }
                            ],
                            'below_marks': []
                        }
                    ]
                }
            }
        }
    }
};



var __usability_test = {
    id: 'usability_test',
    name: 'SCB Usability Test',
    course: 'StarX',
    course_name: 'Prototypes',
    description: "Placeholder",
    experiments: {},
    template: {
        instructions: [['Placeholder', 'Usability test']],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs' ]
            },
            experiment_setup: {table: [
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
            ],
                new_row: {
                    title: 'New row',
                    cell_line: 'wt',
                    treatment_list: {list: [
                        {schedule_value: 0, duration_value: 3600 * 24 * 3, duration: '3 d', drug_list: {list: [
                            {drug_id: 'nc', concentration_id: '0'}
                        ]}
                        }
                    ]},
                    collection_schedule_list: {list: [
                        {schedule: "18h", schedule_value: 18 * 3600, id: '3'}
                    ]}
                }
            },
            western_blot: {format: "%CELL_LINE%, %TREATMENT%, %CONCENTRATION%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                    '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']}
                }
            }
        },

        experiment_setup_actions: {
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

        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs, Vulvarines 1-4, identified in your chemical screen. <ul><li>To get started, click <b>Add Treatment Protocol.</b></li><li>For each treatment protocol, select the <i>C. elegans</i> strain, treatment(s), and treatment dose.</li><li> For all of your treatments, treat the <i>C. elegans</i> immediately (time = 0 minutes) and collect after 3 days.</li><li>Once you finish setting up your experiment, select <b>Finish setup & run experiment.</b> After you run your experiment, you will be unable to change your treatment protocols.</li></ul>',

        concentrations: {
            '1': {
                name: '1 ' + microEntity + 'M',
                value: 1000
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
        drugs: {
            'nc': {
                name: 'Buffer only',
                concentrations: [0]
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
        experiment_temperatures: {
            '25': {
                name: "25" + degreeEntity + "C"
            }
        },
        cell_lines: {
            'wt': {
                name: 'Wild Type'
            }
        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
        	order:[1,2,3,9,4,5,6,7,8,9],
            1: {
                name: 'rabbit anti-let-23',
                secondary: [1],
                marks: [
                    {weight: 24, intensity: .11},
                    {weight: 36, intensity: .4},
                    {weight: 48, intensity: .04}
                ],
                gel_name: 'let-23'
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
            9: {
                name: 'goat anti-lin15B',
                secondary: [2],
                marks: [
                    {weight: 100, intensity: .01},
                    {weight: 129, intensity: .11}
                ],
                gel_name: 'lin15B'
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
        secondary_anti_body: {
            1: {
                name: 'donkey anti-rabbit'
            },
            2: {
                name: 'rabbit anti-goat'
            },
            3: {
                name: 'goat anti-mouse'
            }
        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            }, /*
             'cyto':{
             name:'Cytoplasm'
             },
             'nuclear':{
             name:'Nuclear'
             }*/
        },
        model: {// model
            western_blot: {// this applies to western blot
                'cyto': {// it acts on cytoplasm (thus on whole cell lysate as well)
                    'parser_fixed': [
                        {
                            'cell_line': 'wt',
                            'transfer_function': 'delta',
                            'drug': 1, // Vul 1
                            'cutoff': 10000,
                            'above_marks': [
                                {
                                    name: 'let-23',
                                    weight: 150,
                                    intensity: -40,
                                    primary_anti_body: [1]
                                }
                            ],
                            'below_marks': []
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

var __assigment_706 = {
        id: 'mit_7_06_0313',
        name: '7.06 Spring 2013',
        course: '7.06',
    	course_name: 'MIT Course 7.06',
        description: 'FACS and Western Blot for temperature sensitive mutants',
        experiments: {},
        template: {
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' , 'facs' ]
                },
                experiment_setup: {
                    table: [ //
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: false}, //
                        {kind: 'treatments',
                            children: [//
                                {kind: 'drug', title: 'Treatment', editable: false},//
                                {kind: 'concentration', title: 'Concentration', editable: false}//
                            ]
                        },//
                        {kind: 'temperature', title: 'Temperature', editable: false},//
                        {kind: 'actions', title: 'Actions'}//
                    ],//
                    actions: [

                    ]
                },
                western_blot: {format: "%CELL_LINE%, %TREATMENT%, %PP1% %TEMPERATURE%",
                    keys: {
                        '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                        '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                        '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']},
                        '%TEMPERATURE%': {attr: ['treatment_list', 'list', '0', 'temperature'], map: ['experiment_temperatures', '%KEY%', 'name']},
                        '%PP1%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '1', 'drug_id'], map: ['drugs', '%KEY%', 'short_name'], default: ''}
                    }
                },
                add_multiple_dialog: {
                    'wt': {
                        title: '<b>Strain:</b> Wild Type',
                        headings: [
                            'Treatment', 'Temperature', '- PP1', '+ PP1'
                        ],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Nocodazole'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'nocodazole,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'Nocodazole'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'nocodazole,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,

                            {
                                cells: [
                                    {kind: 'text', text: 'Hydroxyurea'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'hydroxyurea,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'Hydroxyurea'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'hydroxyurea,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'Alpha Factor'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'alpha_factor,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'Alpha Factor'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'alpha_factor,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }

                        ]
                    },
                    'm1': {
                        title: '<b>Strain:</b> Mutant 1',

                        headings: [
                            'Treatment', 'Temperature', '- PP1', '+ PP1'
                        ],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    },
                    'm2': {
                        title: '<b>Strain:</b> Mutant 2',

                        headings: [
                            'Treatment', 'Temperature', '- PP1', '+ PP1'
                        ],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'},
                                    {kind: 'checkbox', name: 'PP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    }
                }
            },
            add_new_row_instructions: 'add new row instructions',

            concentrations: {
                '0': {
                    name: '',
                    value: 0
                },
                '2': {
                    name: '2 ' + microEntity + 'g/mL',
                    value: 5
                },
                '15': {
                    name: '15 ' + microEntity + 'g/mL',
                    value: 5
                },
                '200': {
                    name: '200 mM',
                    value: 5
                },
                '1u': {
                    name: '1 unit',
                    value: 1000
                }
            },
            drugs: {
                'nc': {
                    name: 'Growth Media',
                    concentrations: [0]
                },
                'Nocodazole': {
                    name: 'Nocodazole',
                    concentrations: [15]
                },
                'Alpha': {
                    name: 'Alpha Factor',
                    concentrations: [2]
                },
                'Hydroxyurea': {
                    name: 'Hydroxyurea',
                    concentrations: [200]
                },
                'pp1': {
                    name: 'Protein Phosphatase 1',
                    concentrations: ['1u'],
                    short_name: 'PP1'
                }

            },
            experiment_temperatures: {
                '25': {
                    name: "30" + degreeEntity + "C"
                },
                '40': {
                    name: "37" + degreeEntity + "C"
                }
            },

            cell_lines: {
                'wt': {
                    name: 'Wild Type'
                },
                'm1': {
                    name: 'Mutant 1'
                },
                'm2': {
                    name: 'Mutant 2'
                }

            },
            time_unit: {
                kind: 'minutes'
            },
            primary_anti_body: {
            	order: ['cdk1', 'cdk2', 'cdt1', 'cyclin', 'cyclinE', 'pgk1', 'rad21', 'securin'],
                'cdk1': {
                    name: 'rabbit anti-cdk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 34, intensity: 0},
                        {weight: 35, intensity: 0},
                        {weight: 36, intensity: 0}
                    ],
                    gel_name: 'cdk1'
                },
                'cdk2': {
                    name: 'rabbit anti-cdk2',
                    secondary: ['r'],
                    marks: [
                        {weight: 33, intensity: 0},
                        {weight: 34, intensity: 0},
                        {weight: 35, intensity: 0}
                    ],
                    gel_name: 'cdk2'
                },
                'cdt1': {
                    name: 'rabbit anti-cdt1',
                    secondary: ['r'],
                    marks: [
                        {weight: 65, intensity: 0},
                    ],
                    gel_name: 'cdt1'
                },
                'cyclin': {
                    name: 'mouse anti-cyclin B',
                    secondary: ['m'],
                    marks: [
                        {weight: 58, intensity: 0},
                    ],
                    gel_name: 'cyclin B'
                },
                'cyclinE': {
                    name: 'mouse anti-cyclin E',
                    secondary: ['m'],
                    marks: [
                        {weight: 48, intensity: 0},
                    ],
                    gel_name: 'cyclin E'
                },
                'pgk1': {
                    name: 'rabbit anti-pgk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 45, intensity: 0},
                    ],
                    gel_name: 'pgk1'
                },
                'rad21': {
                    name: 'rabbit anti-rad21',
                    secondary: ['r'],
                    marks: [
                        {weight: 68, intensity: 0},
                    ],
                    gel_name: 'rad21'
                },
                'securin': {
                    name: 'rabbit anti-securin',
                    secondary: ['r'],
                    marks: [
                        {weight: 41.8, intensity: 0},
                    ],
                    gel_name: 'securin'
                }
            },//
            secondary_anti_body: {
                'm': {
                    name: 'rabbit anti-mouse'
                },
                'r': {
                    name: 'goat anti-rabbit'
                }
            },//
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'whole':{
            		name:'PI',
            		conditions: {
            			'whole': {name: 'PI'}
            		}
            	}
            },
            model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '*ANY*',
                                marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: 1,
                                        primary_anti_body: ['cdt1']
                                    },

                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Securin',
                                        weight: 41.8,
                                        intensity: 1,
                                        primary_anti_body: ['securin']
                                    },

                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'rad21',
                                        weight: 68,
                                        intensity: 1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'pp1',
                                cell_line: '*ANY*',
                                above_marks: [
                                    {
                                        name: 'Cdk1',
                                        weight: 34, //35&36
                                        intensity: .5,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 33, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ],
                                below_marks: [
                                    {
                                        name: 'Cdk1',
                                        weight: 35, //35&36
                                        intensity: .5,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 36, //35&36
                                        intensity: .5,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'wt',
                                marks: [
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: .1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: .1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm1',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -1,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 36, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Securin',
                                        weight: 41.8,
                                        intensity: -1,
                                        primary_anti_body: ['securin']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: 1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: 1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm2',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -.8,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 35, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Nocodazole',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -2,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 36, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    ,
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Hydroxyurea',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -.8,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 35, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Alpha',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: 0,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 35, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: 'normal'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm1',
                                temperature: 40,
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm2',
                                temperature: 40,
                                shape: 'S-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Nocodazole',
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Alpha',
                                shape: 'alpha-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Hydroxyurea',
                                shape: 'S-block'
                            }
                        ]

                    }
                }
            }
        }
    };
    
var __microscopy_test = {
        id: 'microscopy_test',
        name: 'StarCellBio Microscopy Test',
        course: 'StarX',
    	course_name: 'Prototypes',
        description: 'Microscopy Test of images',
        experiments: {},
        template: {
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' , 'facs' , 'micro']
                },
                experiment_setup: {
                    table: [ 
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: true}, 
                        {kind: 'treatments',
                            children: [
                                {kind: 'drug', title: 'Treatment', editable: true},
                                {kind: 'concentration', title: 'Treatment Concentration/Dose', editable: false},
                        		{kind: "start", title: "Treatment Start Time", editable: false},
                        		{kind: "collection", title: "Collection Timepoints", editable: true}
                            ]
                        },
                        {kind: 'actions', title: 'Actions'}
                    ],
                    actions: [
                    ], 
                	new_row: {
						title: 'New row',
						cell_line: 'p+',
						treatment_list: {list: [
							{schedule_value: 3600*24*7*7, collection_id: '6 m', drug_list: {list: [
								{drug_id: 'ac', concentration_id: '108'}
							]},  temperature: '22'
							}
						]}
                	}
                },
                microscopy: {
					disable_blur: false,
					disable_brightness: false
				},
            western_blot: {
            	format: "%CELL_LINE%, %TREATMENT%, %COLLECTION%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                    '%COLLECTION%': {attr: ['treatment_list', 'list', '0', 'collection_id'], map:['collections', '%KEY%', 'name']}
                }
            }
                
                },
                

				experiment_setup_actions: {
					cell_lines: [
						{
							id: 'p+',
							title: 'p53+/+;Rb+/+',
							cell_line: 'p+'
						},
						{
							id: 'pfl',
							title: 'p53fl/fl;Rbfl/fl',
							cell_line: 'pfl'
						}
					],
					treatment_protocol_list: [
						{
							id: 'ADC',
							title: 'Adenovirus-Cre',
							treatment_list: {list: [
								{schedule_value: 5000, collection_id: '6 m', schedule: 'immediately', // start
									drug_list: {list: [
										{drug_id: 'ac', concentration_id: 108}
									]}}
							]}
						},
						{
							id: 'ADE',
							title: 'Adenovirus-Empty',
							treatment_list: {list: [
								{schedule_value: 5000, collection_id: '6 m',schedule: 'immediately', // start
									drug_list: {list: [
										{drug_id: 'ae', concentration_id: '108'}
									]}}
							]}
						}
					],
					collection_schedule_list: [
					]
				},
       			
       			add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs',
       		collections:{
       			'3 m': {
						name: '3 months'
       			},
       			'6 m': {
						name: '6 months'
       			},
       			'1 yr': {
						name: '1 year'
       			}
       		},

                
            concentrations: {

				'108': {
					name: '10^8 PFU',
					value: 1000
				}
            },
            drugs: {
				'ac': {
					name: 'Adenovirus-Cre',
					concentrations: ['108']
				},
				'ae': {
					name: 'Adenovirus-Empty',
					concentrations: ['108']
				}
            },
            experiment_temperatures: {
                '22': {
                    name: "22" + degreeEntity + "C"
                }
            },

            cell_lines: {
				'p+': {
					name: 'p53+/+;Rb+/+'
				},
				'pfl': {
					name: 'p53fl/fl;Rbfl/fl'
				}

            },
            time_unit: {
                kind: 'minutes'
            },
            primary_anti_body: {
            	order: ['cdk2', 'cyclin', 'cyclinE', 'pgk1'],
                'cdk2': {
                    name: 'rabbit anti-cdk2',
                    secondary: ['r'],
                    marks: [
                        {weight: 33, intensity: 0},
                        {weight: 34, intensity: 0},
                        {weight: 35, intensity: 0}
                    ],
                    gel_name: 'cdk2'
                },
                'cyclin': {
                    name: 'mouse anti-cyclin B',
                    secondary: ['m'],
                    marks: [
                        {weight: 58, intensity: 0},
                    ],
                    gel_name: 'cyclin B'
                },
                'cyclinE': {
                    name: 'mouse anti-cyclin E',
                    secondary: ['m'],
                    marks: [
                        {weight: 48, intensity: 0},
                    ],
                    gel_name: 'cyclin E'
                },
                'pgk1': {
                    name: 'rabbit anti-pgk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 45, intensity: 0},
                    ],
                    gel_name: 'pgk1'
                }
            },//
            secondary_anti_body: {
                'm': {
                    name: 'rabbit anti-mouse'
                },
                'r': {
                    name: 'goat anti-rabbit'
                }
            },//
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'whole':{
            		name:'PI',
            		conditions: {
            			'whole': {name: 'PI'}
            		}
            	}
            },
            micro_kinds: {
            	'IF':{
            		name:'Antibody-labeling IF',
            		conditions: {
            			'rgb': {name: 'NFIB (red), DAPI (blue), control (green)',
            			short_name: 'IF: RGB'} 
            		}
            	},
            	'IHC':{
            		name:'Antibody-labeling IHC',
            		conditions: {
            			'NFIB': {name: 'NFIB',
            			short_name: 'IHC: NFIB'},
            			'ki67': {name: 'Ki-67',
            			short_name: 'IHC: Ki-67'},
            			'secondary': {name: 'Secondary only control',
            			short_name: 'IHC: Secondary'}   
            		}
            	},
            	'Dye':{
            		name: 'Dye/Stain',
            		conditions: {
            			'HnE': {name: 'H&E',
            			short_name: 'Dye: H&E'} 
            		}

            	}
        	},
        	slides:{
        		'img1': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_1/AD20E1_20x.jpg',
        		'img2': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_2/AD20E2_20x.jpg',
        		'img3': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_3/AD22E1_20x.jpg',
        		'img4': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_3/AD22E1_40x.jpg',
        		'img5': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_4/AD27E2_20x.jpg',
        		'img6': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_5/AD1024E_3_20x.jpg',
        		'img7': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_6/AD901_8_4x.jpg',
        		'img8': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_7/AD901_50_4x.jpg',
        		'img9': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_8/AD901_52_4x.jpg',
        		'img10': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_9/AD1021E_20x.jpg',
        		
        		'img11': 'images/microscopy/microscopy_test/lung_3m/HnE/Sample_1/AD1024E_2_20x.jpg',
        		'img12': 'images/microscopy/microscopy_test/lung_3m/HnE/Sample_2/AD1024E_10x.jpeg',
        		'img13': 'images/microscopy/microscopy_test/lung_3m/HnE/Sample_2/AD1024E_20x.jpeg',

        		'img14': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_1/AD900E1_40x.jpg',
        		'img15': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_2/AD900E3_20x.jpg',
        		'img16': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_2/AD900E3_40x.jpg',
        		'img17': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_3/AD987E1_40x-3.jpg',
        		'img18': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_4m/AD901E25-1_he_20x.jpg',
        		'img19': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_4m/AD901E25-1_he_40x.jpg',
        		'img20': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_5m/AD901E25-2_he_40x-2.jpg',
        		'img21': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_6m/AD901E25-3_he_20x.jpg',
        		'img22': 'images/microscopy/microscopy_test/lung_6m/HnE/Sample_6m/AD901E25-3_he_40x.jpg',
        		'img23': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_1/AD901E25-1_2only_20x.jpeg',
        		'img24': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_1/AD901E25-1_2only_40x.jpeg',
        		'img25': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_1/AD901E25-1_ki-67_20x.jpeg',
        		'img26': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_1/AD901E25-1_ki-67_40xadj.jpg',
        		'img27': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_2/AD901E25-2_2only_40x.jpg',
        		'img28': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_2/AD901E25-2_ki-67_40xadj.jpg',
        		'img29': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_3/AD901E25-3_2only_20x-2.jpeg',
        		'img30': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_3/AD901E25-3_2only_40x-2.jpeg',
        		'img31': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_3/AD901E25-3_ki-67_20x-2.jpeg',
        		'img32': 'images/microscopy/microscopy_test/lung_6m/matching/Sample_3/AD901E25-3_ki-67_40x-2.jpeg',
        		
        		'img33': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_1/AD985E-1_20x-2.jpg',
        		'img34': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_2/AD985E-1_20x.jpg',
        		'img35': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_3/ad985T1_4X-2.jpg',
        		'img36': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_3/ad985T1_10X.jpg',
        		'img37': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_3/ad985T1_20X.jpg',
        		'img38': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_4/AD990E-1_20x.jpg',
        		'img39': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_5m/AD1017_HE_20X.jpg',
        		'img40': 'images/microscopy/microscopy_test/lung_1yr/HnE/Sample_6m/AD3587E_HE_20X-1-2.jpg',
        		'img41': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_1/AD3172EAD3172E_60X_blue_advanced4.jpeg',
        		'img42': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_1/AD3172EAD3172E_60X_green_advanced4.jpeg',
        		'img43': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_1/AD3172EAD3172E_60X_merge_advanced4.jpeg',
        		'img44': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_1/AD3172EAD3172E_60X_red_advanced4.jpeg',
        		'img45': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_2/AD3172E-02_60X_merge.jpg',
        		'img46': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_3/AD984E2-01_R3D_D3D_PRJ_617_528_457_60X_merge.jpg',
        		'img47': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_4/G5G5_60X_blue.jpeg',
        		'img48': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_4/G5G5_60X_green.jpeg',
        		'img49': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_4/G5G5_60X_merge.jpeg',
        		'img50': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_4/G5G5_60X_red.jpeg',
        		'img51': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_5/J5J5_60X_blue.jpeg',
        		'img52': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_5/J5J5_60X_green.jpeg',
        		'img53': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_5/J5J5_60X_merge.jpeg',
        		'img54': 'images/microscopy/microscopy_test/lung_1yr/IF/Sample_5/J5J5_60X_red.jpeg',
        		'img55': 'images/microscopy/microscopy_test/lung_1yr/match/Sample_1/AD1017_NFIB_20X.jpg',
        		'img56': 'images/microscopy/microscopy_test/lung_1yr/match/Sample_2/AD3587E_NFIB_20X-1.jpg'
        	},
            slide_parser:{
                	'default':{
                		'Dye':{
							'HnE':{
							'1': [{
									hash: 'img1',
									mag: '20x'
								}],
							'2': [{
									hash: 'img2',
									mag: '20x'
								}],
							'3': [{
									hash: 'img3',
									mag: '20x'
								}],
							'4': [{
									hash: 'img5',
									mag: '20x'
								}],
							'5': [{
									hash: 'img6',
									mag: '20x'
								}],
							'6': [{
									hash: 'img7',
									mag: '4x'
								}],
							'7': [{
									hash: 'img8',
									mag: '4x'
								}],
							'8': [{
									hash: 'img9',
									mag: '4x'
								}],
							'9': [{
									hash: 'img10',
									mag: '20x'
								}],
							'10':[{
									hash: 'img4',
									mag: '40x'
								}]
							}
                		}
                	},
                	'3 m':{
                		'Dye':{
                			'HnE':{
								'1':[{
										hash: 'img11',
										mag: '20x'
									}],
								'2':[{
										hash: 'img12',
										mag:'10x'
									}],
								'3':[{
										hash: 'img13',
										mag: '20x'
									}]
                				}
                			}
                	},
                	'6 m':{
                		'Dye':{
                			'HnE':{
								'1':[{
									hash: 'img14',
									mag: '40x'
									}],
								'2':[{
									hash: 'img15',
									mag:'20x'
									}],
								'3':[{
									hash: 'img17',
									mag:'40x'
									}],
								'4':[{
									hash: 'img18',
									mag:'20x'
									}],
								'5':[{
									hash: 'img20',
									mag: '40x'
									}],
								'6':[{
									hash: 'img21',
									mag:'20x'
									}],
								'7':[{
									hash: 'img16',	
									mag: '40x'
									}],
								'8':[{
									hash: 'img22',
									mag: '40x'
									}],
								'9':[{
									hash: 'img19',
									mag: '40x'
									}]
                			}
                		},
                		'IHC':{
                			'secondary':{
								'1':[{
									hash: 'img23',
									mag:'20x'
									}],
								'2':[{
									hash: 'img27',
									mag: '40x'
									}],
								'3':[{
									hash: 'img29',
									mag:'20x'
									}],
								'4':[{
									hash: 'img30',
									mag: '40x'
									}],
								'5': [{
									hash: 'img24',
									mag: '40x'
									}]
                			},
                			'ki67':{
								'1':[{
									hash: 'img25',
									mag:'20x'
									}],
								'2':[{
									hash: 'img28',
									mag: '40x'
									}],
								'3':[{
									hash: 'img31',
									mag:'20x'
									}],
								'4':[{
									hash: 'img26',
									mag: '40x'
									}],
								'5':[{
									hash: 'img32',
									mag: '40x'
									}]
                			}
                		}
                	},
                	'1 yr':{
                		'Dye':{
                			'HnE':{
								'1':[{
									hash: 'img33',
									mag:'20x'
								}],
								'2': [{
									hash: 'img34',
									mag:'20x'
								}],
								'3':[{
									hash: 'img35',
									mag:'4x'
								}],
								'4':[{
									hash: 'img38',
									mag:'20x'
								}],
								'5':[{
									hash: 'img39',
									mag:'20x'
								}],
								'6':[{
									hash: 'img40',
									mag:'20x'
								}],
								'7': [{
									hash: 'img36',
									mag:'10x'
								}],
								'8': [{
									hash: 'img37',
									mag:'20x'
								}]
                			}
                		},
                		'IF': {
                			'rgb':{
								'1':[{
									hash: 'img44',
									if_type: 'red', 
									mag:'60x'
								},
								{
									hash: 'img41',
									if_type: 'blue', 
									mag:'60x'
								},
								{
									hash: 'img42',
									if_type: 'green', 
									mag:'60x'
								},
								{
									hash: 'img43',
									if_type: 'merge', 
									mag:'60x'
								}],
								'2':[{
									hash: 'img45',
									if_type: 'merge', 
									mag:'60x'
								}],
								'3':[{
									hash: 'img46',
									if_type: 'merge', 
									mag:'60x'
								}],
								'4':[{
									hash: 'img50',
									if_type: 'red', 
									mag:'60x'
								},
								{
									hash: 'img47',
									if_type: 'blue', 
									mag:'60x'
								},
								{
									hash: 'img48',
									if_type: 'green', 
									mag:'60x'
								},
								{	
									hash: 'img49',
									if_type: 'merge', 
									mag:'60x'
								}],
								'5':[{
									hash: 'img54',
									if_type: 'red', 
									mag:'60x'
								},
								{
									hash: 'img51',
									if_type: 'blue', 
									mag:'60x'
								},
								{
									hash: 'img52',
									if_type: 'green', 
									mag:'60x'
								},
								{
									hash: 'img53',
									if_type: 'merge', 
									mag:'60x'
								}]
                			}
                		},
                		'IHC': {
                			'NFIB':{
								'1':[{
									hash: 'img55',
									mag:'20x'
								}],
								'2':[{
									hash: 'img56',
									mag:'20x'
								}]
                			}
                		}
                	
                	}
			},
            model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '*ANY*',
                                marks: [
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'pp1',
                                cell_line: '*ANY*',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 33, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ],
                                below_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'wt',
                                marks: [
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm1',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm2',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Nocodazole',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Hydroxyurea',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Alpha',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: 'normal'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm1',
                                temperature: 40,
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm2',
                                temperature: 40,
                                shape: 'S-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Nocodazole',
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Alpha',
                                shape: 'alpha-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Hydroxyurea',
                                shape: 'S-block'
                            }
                        ]

                    }
                },
                microscopy: {
                	'valid': ['pfl', 'ac'],
                	'slide': {
                	
                		'parser_simple':[
                		{
                			match: [],
                			
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '3 m',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'IHC',
                			conditions: 'secondary'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'IHC',
                			conditions: 'ki67'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '1 yr',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '1 yr',
                			kind: 'IF',
                			conditions: 'rgb'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'pfl',
                			drug_id: 'ac',
                			collection_id: '1 yr',
                			kind: 'IHC',
                			conditions: 'NFIB'
                		}
                			
                		]
                		
                	}
                }
                
		}
		}
		};		

var __decusability = {
        id: 'decusability',
        name: 'StarCellBio Usability Test',
        course: 'usability',
    	course_name: 'December 2013 Usability Testing',
        description: 'FACS and Western Blot for temperature sensitive mutants',
        experiments: {},
        template: {
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' , 'facs']
                },
                experiment_setup: {
                    table: [ //
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: false}, //
                        {kind: 'treatments',
                            children: [//
                                {kind: 'drug', title: 'Treatment', editable: false},//
                            ]
                        },//
                        {kind: 'temperature', title: 'Temperature', editable: false},//
                        {kind: 'actions', title: 'Actions'}//
                    ],//
                    actions: [

                    ]
                },
                western_blot: {format: "%CELL_LINE%, %TREATMENT%, %PP1% %TEMPERATURE%",
                    keys: {
                        '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                        '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                        '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']},
                        '%TEMPERATURE%': {attr: ['treatment_list', 'list', '0', 'temperature'], map: ['experiment_temperatures', '%KEY%', 'name']},
                        '%PP1%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '1', 'drug_id'], map: ['drugs', '%KEY%', 'short_name'], default: ''}
                    }
                },
                add_multiple_dialog: {
                    'wt': {
                        title: '<b>Strain:</b> Wild Type',
                        headings: ['Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }

                        ]
                    },
                    'm1': {
                        title: '<b>Strain:</b> Mutant 1',

                        headings: ['Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    },
                    'm2': {
                        title: '<b>Strain:</b> Mutant 2',

                        headings: [ 'Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    }
                }
            },
            add_new_row_instructions: 'add new row instructions',

            concentrations: {
                '0': {
                    name: '',
                    value: 0
                },
                '2': {
                    name: '2 ' + microEntity + 'g/mL',
                    value: 5
                },
                '15': {
                    name: '15 ' + microEntity + 'g/mL',
                    value: 5
                },
                '200': {
                    name: '200 mM',
                    value: 5
                },
                '1u': {
                    name: '1 unit',
                    value: 1000
                }
            },
            drugs: {
                'nc': {
                    name: 'Growth Media',
                    concentrations: [0]
                },
                'Nocodazole': {
                    name: 'Nocodazole',
                    concentrations: [15]
                },
                'Alpha': {
                    name: 'Alpha Factor',
                    concentrations: [2]
                },
                'Hydroxyurea': {
                    name: 'Hydroxyurea',
                    concentrations: [200]
                },
                'pp1': {
                    name: 'Protein Phosphatase 1',
                    concentrations: ['1u'],
                    short_name: 'PP1'
                }

            },
            experiment_temperatures: {
                '25': {
                    name: "30" + degreeEntity + "C"
                },
                '40': {
                    name: "37" + degreeEntity + "C"
                }
            },

            cell_lines: {
                'wt': {
                    name: 'Wild Type'
                },
                'm1': {
                    name: 'Mutant 1'
                },
                'm2': {
                    name: 'Mutant 2'
                }

            },
            time_unit: {
                kind: 'minutes'
            },
            primary_anti_body: {
            	order: ['cdk2', 'cyclin', 'cyclinE', 'pgk1'],
                'cdk2': {
                    name: 'rabbit anti-cdk2',
                    secondary: ['r'],
                    marks: [
                        {weight: 33, intensity: 0},
                        {weight: 34, intensity: 0},
                        {weight: 35, intensity: 0}
                    ],
                    gel_name: 'cdk2'
                },
                'cyclin': {
                    name: 'mouse anti-cyclin B',
                    secondary: ['m'],
                    marks: [
                        {weight: 58, intensity: 0},
                    ],
                    gel_name: 'cyclin B'
                },
                'cyclinE': {
                    name: 'mouse anti-cyclin E',
                    secondary: ['m'],
                    marks: [
                        {weight: 48, intensity: 0},
                    ],
                    gel_name: 'cyclin E'
                },
                'pgk1': {
                    name: 'rabbit anti-pgk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 45, intensity: 0},
                    ],
                    gel_name: 'pgk1'
                }
            },//
            secondary_anti_body: {
                'm': {
                    name: 'rabbit anti-mouse'
                },
                'r': {
                    name: 'goat anti-rabbit'
                }
            },//
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'whole':{
            		name:'PI',
            		conditions: {
            			'whole': {name: 'PI'}
            		}
            	}
            },
            model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '*ANY*',
                                marks: [
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'pp1',
                                cell_line: '*ANY*',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 33, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ],
                                below_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'wt',
                                marks: [
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm1',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm2',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Nocodazole',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Hydroxyurea',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Alpha',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: 'normal'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm1',
                                temperature: 40,
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm2',
                                temperature: 40,
                                shape: 'S-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Nocodazole',
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Alpha',
                                shape: 'alpha-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Hydroxyurea',
                                shape: 'S-block'
                            }
                        ]

                    }
                }
            }
        }
    };

var __assignment_706_2014 = {
        id: 'assignment_706_2014',
        name: 'StarCellBio Problem 1',
        course: '7.06_Spring_2014',
    	course_name: 'Class',
        description: 'Microscopy Test of images',
        experiments: {},
        template: {
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' ,  'micro']
                },
                experiment_setup: {
                    table: [ 
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: true}, 
                        {kind: 'treatments',
                            children: [
                                {kind: 'drug', title: 'Treatment', editable: true}
                            ]
                        },
                        {kind: 'actions', title: 'Actions'}
                    ],
                    actions: [
                    ]
                },
				western_blot: {
					format: "%CELL_LINE%, %TREATMENT%",
					keys: {
						'%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
						'%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']}
					}
				},
				microscopy: {
					disable_blur: true,
					disable_brightness: true
				},
				add_multiple_dialog: {
					order: ['gfp', 'gfp1', 'gfp2', 'gfp3', 'gfp4', 'gfp5', 'gfpH', 'gfp100', 'gfpTD'],
					headings: [
						'Strain', 'Growth media only', 'Growth media + ligand', 'Growth media + inhibitor', 'Growth media + ligand + inhibitor'
							],
					'gfp':{
							rows: [
								{
									cells: [
										{kind: 'text', text: 'GFP'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
							]
						},
					'gfp1':{
						rows: [
						{
									cells: [
										{kind: 'text', text: 'GFP-Protein A'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp1',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp1',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp1',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp1',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
					},
					'gfp2':{
						rows: [ {
									cells: [
										{kind: 'text', text: 'GFP-Protein B'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp2',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp2',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp2',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp2',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
					},
					'gfp3':{
						rows: [
						{
									cells: [
										{kind: 'text', text: 'GFP-Protein C'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp3',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp3',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp3',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp3',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
					},
					'gfp4':{
						rows: [{
									cells: [
										{kind: 'text', text: 'GFP-Protein D'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp4',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp4',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp4',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp4',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
					},
					'gfp5':{				
						rows: [{
									cells: [
										{kind: 'text', text: 'GFP-Protein E'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp5',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp5',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp5',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp5',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
					},
					'gfpH':{					
						rows: [{
									cells: [
										{kind: 'text', text: 'GFP-Histone H2B'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfpH',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfpH',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfpH',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfpH',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
				
					},
					'gfp100':{
						rows: [
						 {
									cells: [
										{kind: 'text', text: 'GFP-p100'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfp100',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfp100',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfp100',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfp100',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}
						]
				
					},
					'gfpTD':{
						rows: [{
									cells: [
										{kind: 'text', text: 'GFP-pTD'},
										{kind: 'checkbox', name: "G", treatment_id: 'media_only'},
										{kind: 'checkbox', name: 'L', treatment_id: 'ligand_media' },
										{kind: 'checkbox', name: 'I', treatment_id: 'inhibitor_media'},
										{kind: 'checkbox', name: 'A', treatment_id: 'ligand_media_inhibitor'}
									],
							   
									cell_treatments: {
										G: [
											{cell_line: 'gfpTD',
												treatment_id: 'media_only',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gm', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], L: [
											{cell_line: 'gfpTD',
												treatment_id: 'ligand_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gml', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], I: [
											{cell_line: 'gfpTD',
												treatment_id: 'inhibitor_media',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmi', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										], A: [
											{cell_line: 'gfpTD',
												treatment_id: 'ligand_media_inhibitor',
												treatment_list: {list: [
													{collection_id: 'default',
														drug_list: {list: [
															{drug_id: 'gmil', concentration_id: '100'}
														]}, temperature: '22'}
												]}}
										]
									}
								}

						]
				
					}
					
				}
                
        },
       			
        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs',
		collections:{
			'': {
				name: ''
			}
		},
		concentrations: {
			100: {
				name: '',
				value: 100
			}
		},
		drugs: {
			'gm': {
				name: 'Growth media only',
				concentrations: ['100']
			},
			'gml': {
				name:'Growth media + ligand',
				concentrations: ['100']
			},
			'gmi': {
				name: 'Growth media + inhibitor',
				concentrations: ['100']
			},
			'gmil': {
				name: 'Growth media + ligand + inhibitor',
				concentrations: ['100']
			}
		},
		experiment_temperatures: {
			'22': {
				name: "22" + degreeEntity + "C"
			}
		},
		cell_lines: {
			'gfp': {
				name: 'GFP'
			},
			'gfp1': {
				name: 'GFP-Protein A'
			},
			'gfp2': {
				name: 'GFP-Protein B'
			},
			'gfp3': {
				name: 'GFP-Protein C'
			},
			'gfp4': {
				name: 'GFP-Protein D'
			},
			'gfp5': {
				name: 'GFP-Protein E'
			},
			'gfpH': {
				name: 'GFP-Histone H2B'
			},
			'gfp100': {
				name: 'GFP-p100'
			},
			'gfpTD': {
				name: 'GFP-pTD'
			}

		},
		time_unit: {
			kind: 'minutes'
		},
		primary_anti_body: {
			order:['mp1', 'mp2', 'mp3', 'mp4', 'mp5', 'mpAG'],
			'mp1': {
				name: 'mouse anti-phospho-protein A',
				secondary: ['m'],
				marks: [
					{weight: 46, intensity: 0}
				],
				gel_name: 'P-Protein A'
			},
			'mp2': {
				name: 'mouse anti-phospho-protein B',
				secondary: ['m'],
				marks: [
					{weight: 134, intensity: 0},
				],
				gel_name: 'P-Protein B'
			},
			'mp3': {
				name: 'mouse anti-phospho-protein C',
				secondary: ['m'],
				marks: [
					{weight: 44, intensity: 0},
				],
				gel_name: 'P-Protein C'
			},
			'mp4': {
				name: 'mouse anti-phospho-protein D',
				secondary: ['m'],
				marks: [
					{weight: 67, intensity: 0},
				],
				gel_name: 'P-Protein D'
			},
			'mp5': {
				name: 'mouse anti-phospho-protein E',
				secondary: ['m'],
				marks: [
					{weight: 74, intensity: 0},
				],
				gel_name: 'P-Protein E'
			},
			'mpAG': {
				name: 'rabbit anti-GAPDH',
				secondary: ['r'],
				marks: [
					{weight: 37, intensity: 0},
				],
				gel_name: 'GAPDH'
			}
		},//
		secondary_anti_body: {
			'm': {
				name: 'rabbit anti-mouse'
			},
			'r': {
				name: 'goat anti-rabbit'
			}
		},//
		lysate_kinds: {
			'whole': {
				name: 'Whole Cell'
			}
		},            
		micro_kinds: {
			'IF':{
				name:'Fluorescence',
				conditions: {
					'rgb': {name: 'GFP (green)',
					short_name: 'Fluorescence: GFP'} 
				}
			}
		},
		slides:{
			'img1': 'images/microscopy/assignment_706_2014/c1.jpg',
			'img2': 'images/microscopy/assignment_706_2014/c4.jpg',
			'img3': 'images/microscopy/assignment_706_2014/c7.jpg',
			'img4': 'images/microscopy/assignment_706_2014/c10.jpg',
			'img40': 'images/microscopy/assignment_706_2014/c15-1.jpg',
			'img41': 'images/microscopy/assignment_706_2014/c15-2.jpg',
			'img6': 'images/microscopy/assignment_706_2014/c17.jpg',
			'img42': 'images/microscopy/assignment_706_2014/c25.jpg',
			'img7': 'images/microscopy/assignment_706_2014/c26.jpg',
			'img8': 'images/microscopy/assignment_706_2014/c29.jpg',
			
			
			'img9': 'images/microscopy/assignment_706_2014/cn2.jpg',
			'img10': 'images/microscopy/assignment_706_2014/cn3.jpg',
			'img11': 'images/microscopy/assignment_706_2014/cn5.jpg',
			'img12': 'images/microscopy/assignment_706_2014/cn6.jpg',
			'img13': 'images/microscopy/assignment_706_2014/cn7.jpg',
			'img14': 'images/microscopy/assignment_706_2014/cn8.jpg',
			'img16': 'images/microscopy/assignment_706_2014/cn11.jpg',
			'img17': 'images/microscopy/assignment_706_2014/cn12.jpg',
			'img18': 'images/microscopy/assignment_706_2014/cn15.jpg',
			'img19': 'images/microscopy/assignment_706_2014/cn17.jpg',
			'img20': 'images/microscopy/assignment_706_2014/cn20.jpg',
			
			'img21': 'images/microscopy/assignment_706_2014/n1.jpg',
			'img22': 'images/microscopy/assignment_706_2014/n2.jpg',
			'img23': 'images/microscopy/assignment_706_2014/n8.jpg',
			'img24': 'images/microscopy/assignment_706_2014/n9.jpg',
			'img26': 'images/microscopy/assignment_706_2014/n18.jpg',
			'img29': 'images/microscopy/assignment_706_2014/n34.jpg',
			'img30': 'images/microscopy/assignment_706_2014/n43.jpg',
			'img31': 'images/microscopy/assignment_706_2014/n47.jpg',
			'img32': 'images/microscopy/assignment_706_2014/n60.jpg',
			'img46': 'images/microscopy/assignment_706_2014/n64.jpg',
			
			
			'img36': 'images/microscopy/assignment_706_2014/pm2.jpg',
			'img37': 'images/microscopy/assignment_706_2014/pm3.jpg',
			'img44': 'images/microscopy/assignment_706_2014/pm34-1.jpg',
			'img45': 'images/microscopy/assignment_706_2014/pm34-2.jpg'
		},
		slide_parser:{
				'default':{
					'IF':{
						'rgb':{ 
							'cytoplasm':{
								'1': [{
									hash: 'img1',
									mag: 'N/A',
									if_type: 'green'
								}],
								'2': [{
									hash: 'img2',
									mag: 'N/A',
									if_type: 'green'
								}],
								'3': [{
									hash: 'img3',
									mag: 'N/A',
									if_type: 'green'
								}],
								'4': [{
									hash: 'img4',
									mag: 'N/A',
									if_type: 'green'
								}],
								'5': [{
									hash: 'img40',
									mag: 'N/A',
									if_type: 'green'
								}],
								'6': [{
									hash: 'img41',
									mag: 'N/A',
									if_type: 'green'
								}],
								'7': [{
									hash: 'img6',
									mag: 'N/A',
									if_type: 'green'
								}],
								'8': [{
									hash: 'img42',
									mag: 'N/A',
									if_type: 'green'
								}],
								'9': [{
									hash: 'img7',
									mag: 'N/A',
									if_type: 'green'
								}],
								'10': [{
									hash: 'img8',
									mag: 'N/A',
									if_type: 'green'
								}]
							},
							'plasma_membrane': {
								'1': [{
									hash: 'img36',
									mag: 'N/A',
									if_type: 'green'
								}],
								'2': [{
									hash: 'img37',
									mag: 'N/A',
									if_type: 'green'
								}],
								'3': [{
									hash: 'img44',
									mag: 'N/A',
									if_type: 'green'
								}],
								'4': [{
									hash: 'img45',
									mag: 'N/A',
									if_type: 'green'
								}]
							
							},
							'nucleus': {
								'1': [{
									hash: 'img21',
									mag: 'N/A',
									if_type: 'green'
								}],
								'2': [{
									hash: 'img22',
									mag: 'N/A',
									if_type: 'green'
								}],
								'3': [{
									hash: 'img23',
									mag: 'N/A',
									if_type: 'green'
								}],
								'4': [{
									hash: 'img24',
									mag: 'N/A',
									if_type: 'green'
								}],
								'5': [{
									hash: 'img26',
									mag: 'N/A',
									if_type: 'green'
								}],
								'6': [{
									hash: 'img29',
									mag: 'N/A',
									if_type: 'green'
								}],
								'7': [{
									hash: 'img30',
									mag: 'N/A',
									if_type: 'green'
								}],
								'8': [{
									hash: 'img31',
									mag: 'N/A',
									if_type: 'green'
								}],
								'9': [{
									hash: 'img32',
									mag: 'N/A',
									if_type: 'green'
								}],
								'10': [{
									hash: 'img46',
									mag: 'N/A',
									if_type: 'green'
								}]
							
							
							},
							'cytoplasm_nucleus': {									
								'1': [{
									hash: 'img9',
									mag: 'N/A',
									if_type: 'green'
								}],
								'2': [{
									hash: 'img10',
									mag: 'N/A',
									if_type: 'green'
								}],
								'3': [{
									hash: 'img11',
									mag: 'N/A',
									if_type: 'green'
								}],
								'4': [{
									hash: 'img12',
									mag: 'N/A',
									if_type: 'green'
								}],
								'5': [{
									hash: 'img13',
									mag: 'N/A',
									if_type: 'green'
								}],
								'6': [{
									hash: 'img14',
									mag: 'N/A',
									if_type: 'green'
								}],
								'7': [{
									hash: 'img16',
									mag: 'N/A',
									if_type: 'green'
								}],
								'8': [{
									hash: 'img17',
									mag: 'N/A',
									if_type: 'green'
								}],
								'9': [{
									hash: 'img18',
									mag: 'N/A',
									if_type: 'green'
								}],
								'10': [{
									hash: 'img19',
									mag: 'N/A',
									if_type: 'green'
								}],									
								'11': [{
									hash: 'img20',
									mag: 'N/A',
									if_type: 'green'
								}]
							
							}
						}
					}
				}
		},
        model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                        //CELL GFP
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFP H
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfpH',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfpH',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfpH',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfpH',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFP p100
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp100',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp100',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp100',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp100',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            }, 
                        	//CELL GFP TD
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfpTD',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfpTD',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfpTD',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfpTD',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFP A
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp1',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp1',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp1',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp1',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        //CELL LINE GFPB
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp2',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp2',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein B',
                                        weight: 161, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp2',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp2',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein B',
                                        weight: 161, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFPC
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp3',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein C',
                                        weight: 71, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp3',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein C',
                                        weight: 71, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp3',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein C',
                                        weight: 71, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp3',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein C',
                                        weight: 71, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFP D
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp4',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp4',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein D',
                                        weight: 94, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp4',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp4',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                            //CELL GFP E
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gm',
                                cell_line: 'gfp5',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gml',
                                cell_line: 'gfp5',
                                above_marks: [
                                	{
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                	{
                                        name: 'protein D',
                                        weight: 67, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp4']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 101, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmi',
                                cell_line: 'gfp5',
                                above_marks: [
                                    {
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            },
                        	{
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'gmil',
                                cell_line: 'gfp5',
                                above_marks: [
                                    {
                                        name: 'protein B',
                                        weight: 134, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp2']
                                    },
                                	{
                                        name: 'protein C',
                                        weight: 44, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp3']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 74, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'protein E',
                                        weight: 101, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mp5']
                                    },
                                    {
                                        name: 'anti-GAPDH',
                                        weight: 37, // 34&35
                                        intensity: 2,
                                        primary_anti_body: ['mpAG']
                                    }
                                ],
                                below_marks: []
                            }
                            
                            
                            
                            
                            
                            
                        ]
                    }
                },
                microscopy: {
                	'valid': ['pfl', 'ac'],
                	'slide': {
                	
                		'complex_parser':[
                		{
                			match: [],
                			
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'cytoplasm_nucleus'
                		},             		
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfpH',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'nucleus'
                		},             		
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp100',
                			drug_id:['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'cytoplasm'
                		},               		
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfpTD',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp1',
                			drug_id: ['gm', 'gmi'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp1',
                			drug_id: ['gml',  'gmil'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp2',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp3',
                			drug_id: ['gm',  'gmi', 'gmil'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp3',
                			drug_id: ['gml'],
                			phenotype: 'nucleus'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp4',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id'],
                			cell_line: 'gfp5',
                			drug_id: ['gm', 'gml', 'gmi', 'gmil'],
                			phenotype: 'cytoplasm'
                		}
                			
                		]
                		
                	}
                }
                
		}
		}
		};

    
var __assignment_706_2014_ps2 = {
        id: 'assignment_706_2014_ps2',
        name: 'StarCellBio Problem 2',
        course: '7.06_Spring_2014',
    	course_name: 'Class2',
        description: 'FACS and Western Blot for temperature sensitive mutants',
        experiments: {},
        template: {
        	random_choose: true,
        	randomize_all: false,
        	random_order: [],
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' , 'facs', 'micro' ]
                },
                experiment_setup: {
                    table: [ //
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: false}, //
                        {kind: 'treatments',
                            children: [//
                                {kind: 'drug', title: 'Treatment', editable: false},//
                                {kind: 'duration', title: 'Time', editable: false},
                            ]
                        },//
                        {kind: 'actions', title: 'Actions'}//
                    ],//
                    actions: [

                    ]
                },
                western_blot: {format: "%CELL_LINE%, %TREATMENT%",
                    keys: {
                        '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                        '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                    }
                },
                microscopy: {
					disable_blur: true,
					disable_brightness: true
				},
                add_multiple_dialog: {	
                	order: ['S2'],
					headings: [
							'','Strain', 'Treatment', 'Treatment Duration'
							],
                    'S2': {
                        rows: [
                            {
                                cells: [
                                	{kind: 'checkbox', name: "B", treatment_id: 'buffer'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'Control siRNA'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'buffer',
                                cell_treatments: {
                                    B: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default', microscope: {'rgb': 1, 'rb': 1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "R1", treatment_id: 'rna1'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'siRNA #1'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'rna1',
                                cell_treatments: {
                                    R1: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'g': 1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna1', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "R2", treatment_id: 'rna2'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'siRNA #2'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'rna2',
                                cell_treatments: {
                                    R2: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'gr':1, 'rb': 1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna2', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "R3", treatment_id: 'rna3'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'siRNA #3'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'rna3',
                                cell_treatments: {
                                    R3: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'rgb':1, 'rb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna3', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "R4", treatment_id: 'rna4'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'siRNA #4'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'rna4',
                                cell_treatments: {
                                    R4: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'rgb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna4', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "R5", treatment_id: 'rna5'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'siRNA #5'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'rna5',
                                cell_treatments: {
                                    R5: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'rgb':1, 'rb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna5', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "GM", treatment_id: 'serum_growth_media'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'Serum-free media'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'serum_growth_media',
                                cell_treatments: {
                                    GM: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default',microscope: {'rgb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Serum', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "H", treatment_id: 'hydroxyurea'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'Hydroxyurea'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'hydroxyurea',
                                cell_treatments: {
                                    H: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default', microscope: {'rgb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                	{kind: 'checkbox', name: "N", treatment_id: 'nocodazole'},
                                    {kind: 'text', text: 'S2'},
                                    {kind: 'text', text: 'Nocodazole'},
                                    {kind: 'text', text: "3 days"}
                                ],
                                treatment_id: 'nocodazole',
                                cell_treatments: {
                                    N: [
                                        {cell_line: 'S2',
                                            treatment_list: {list: [
                                                {collection_id: 'default', microscope: {'rgb':1, 'rb':1},
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '100'},
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            }

                        ]
                    }
                }
            },
            add_new_row_instructions: 'add new row instructions',
            collections:{
				'': {
					name: ''
				}
			},
            concentrations: {
                100: {
                    name: '',
                    value: 100
                }
            },
            drugs: {
                'nc': {
                    name: 'Control siRNA',
                    concentrations: [100]
                },
                'rna1': {
                    name: 'siRNA #1',
                    concentrations: [100]
                },
                'rna2': {
                    name: 'siRNA #2',
                    concentrations: [100]
                },
                'rna3': {
                    name: 'siRNA #3',
                    concentrations: [100]
                },
                'rna4': {
                    name: 'siRNA #4',
                    concentrations: [100]
                },
                'rna5': {
                    name: 'siRNA #5',
                    concentrations: [100]
                },
                'Nocodazole': {
                    name: 'Nocodazole',
                    concentrations: [100]
                },
                'Serum': {
                    name: 'Serum-free media',
                    concentrations: [100]
                },
                'Hydroxyurea': {
                    name: 'Hydroxyurea',
                    concentrations: [100]
                }

            },
            experiment_temperatures: {
                '25': {
                    name: "30" + degreeEntity + "C"
                }
            },
            cell_lines: {
                'S2': {
                    name: 'S2'
                }

            },
            time_unit: {
                kind: 'minutes'
            },
            primary_anti_body: {
            	order: ['chk1', 'rad21', 'cyclin', 'cyclinE', 'pgk1'],
            	'chk1': {
                    name: 'rabbit anti-chk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 54, intensity: 0},
                        {weight: 55, intensity: 0},
                        {weight: 58, intensity: 0}
                    ],
                    gel_name: 'chk1'
                },
                'cyclin': {
                    name: 'mouse anti-cyclin B',
                    secondary: ['m'],
                    marks: [
                        {weight: 58, intensity: 0},
                    ],
                    gel_name: 'cyclin B'
                },
                'cyclinE': {
                    name: 'mouse anti-cyclin E',
                    secondary: ['m'],
                    marks: [
                        {weight: 48, intensity: 0},
                    ],
                    gel_name: 'cyclin E'
                },
                'pgk1': {
                    name: 'rabbit anti-pgk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 45, intensity: 0},
                    ],
                    gel_name: 'pgk1'
                },
                'rad21': {
                    name: 'rabbit anti-rad21/scc1',
                    secondary: ['r'],
                    marks: [
                        {weight: 68, intensity: 0},
                        {weight: 29.5, intensity: 0},
                        {weight: 19.9, intensity: 0}
                    ],
                    gel_name: 'rad21'
                }
            },//
            secondary_anti_body: {
                'm': {
                    name: 'rabbit anti-mouse'
                },
                'r': {
                    name: 'goat anti-rabbit'
                }
            },//
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'whole':{
            		name:'PI',
            		conditions: {
            			'whole': {name: 'PI'}
            		}
            	}
            },
            micro_kinds: {
            	'IF':{
            		name:'Antibody-labeling IF',
            		conditions: {
            			'rgb': {name: 'γ-tubulin (red), α-tubulin (green), DAPI (blue)',
            			short_name: 'R:γ-tub, G:α-tub, B:DAPI'},
            			'g': {name: 'H2B (green)',
            			short_name: 'G:H2B'},
            			'gr': {name: 'H2B (green), α-tubulin(red)',
            			short_name: 'G:H2B, R:α-tub'},
            			'rb': {name: 'Mad2 (red), DAPI (blue)',
            			short_name: 'R:Mad2, B:DAPI'}
            		}
            	}
        	},
        	slides: {
        		'img100': 'images/microscopy/black.jpg',
        	
        		'img9': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_off_kinetochores/Mad2_Cytoplasm_cropped.jpg',
        		'img11': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_on_kinetochore/Mad2_kinetochore_cropped.jpg', 
        		'img10': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_on_kinetochore/Mad2_kinetochore_2_cropped.jpg', 
        		
        		'img8': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Unequal_Chromosome_Distribution/Unequal_chromosome_distribution_2.jpg', 
        		'img3': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Anaphase/Normal_Anaphase.jpg', 
        		'img7': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Metaphase/Normal_Metaphase_2.jpg', 
        		'img6': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Interphase/Normal_Interphase_Color.jpg', 
        		'img5': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Interphase/Normal_Interphase_2_Color.jpg', 
        		'img4': 'images/microscopy/assignment_706_2014_ps2/Antibody Labeling_IF_H2B-green_tubulin-red/Chromosome_Bridges/Chromosome_Bridges_Color.jpg', 
        		
        		'img22': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_5.jpg', 
        		'img23': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_6.jpg', 
        		'img20': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_3.jpg', 
        		'img21': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_4.jpg',
        		'img19': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_2.jpg', 
        		'img18': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_1.jpg', 
        		 
        		'img26': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_5.jpg', 
        		'img27': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_6.jpg', 
        		'img24': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_10.jpg', 
        		'img25': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_4.jpg', 
        		'img28': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_7.jpg', 
        		'img29': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_8.jpg', 
        		'img30': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_9.jpg', 
        		
        		'img31': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution.jpg', 
        		'img33': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution_3.jpg', 
        		'img32': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution_2.jpg', 
        		'img34': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution_4.jpg', 
        		
        		'img17': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_3.jpg', 
        		'img16': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_2.jpg', 
        		'img15': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_1.jpg', 
        		'img14': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_13.jpg', 
        		'img13': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_12.jpg', 
        		'img12': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_10.jpg', 
        		
        		'img35': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Premature_Sister_Chromatid_Separation/Premature_Sister_Chromatid_Separation_1.jpg', 
        		'img37': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Premature_Sister_Chromatid_Separation/Premature_Sister_Chromatid_Separation_4.jpg', 
        		'img36': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Premature_Sister_Chromatid_Separation/Premature_Sister_Chromatid_Separation_3.jpg',
        		
        		'img0041': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0042': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0043': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0044': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0045': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0046': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0047': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0048': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0049': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0050': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0051': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0052': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0053': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0054': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0055': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0056': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0057': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0058': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0059': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0060': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0061': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0062': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0063': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0064': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0065': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0066': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0067': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0068': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0069': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0070': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0071': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0072': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0073': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0074': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0075': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0076': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0077': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0078': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0079': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0080': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0081': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0082': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_10Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 'img0083': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0084': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0085': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0086': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0087': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0088': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0089': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0090': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0091': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0092': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0093': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0094': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0095': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0096': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0097': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0098': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0099': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0100': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0101': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0102': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0103': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0104': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0105': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0106': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0107': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0108': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0109': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0110': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0111': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0112': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0113': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0114': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0115': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0116': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0117': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0118': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0119': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0120': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0121': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0122': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0123': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0124': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_12Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 'img0125': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0126': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0127': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0128': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0129': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0130': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0131': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0132': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0133': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0134': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0135': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0136': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0137': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0138': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0139': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0140': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0141': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0142': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0143': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0144': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0145': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0146': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0147': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0148': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0149': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0150': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0151': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0152': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0153': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0154': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0155': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0156': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0157': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0158': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0159': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0160': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0161': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0162': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0163': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0164': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0165': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0166': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Interphase_13Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 'img0167': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0168': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0169': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0170': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0171': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0172': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0173': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0174': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0175': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0176': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0177': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0178': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0179': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0180': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0181': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0182': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0183': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0184': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0185': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0186': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0187': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0188': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0189': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0190': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0191': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0192': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0193': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0194': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0195': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0196': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0197': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0198': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0199': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0200': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0201': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0202': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0203': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0204': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0205': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0206': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0207': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0208': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_1Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 'img0209': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0210': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0211': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0212': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0213': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0214': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0215': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0216': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0217': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0218': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0219': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0220': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0221': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0222': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0223': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0224': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0225': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0226': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0227': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0228': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0229': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0230': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0231': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0232': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0233': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0234': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0235': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0236': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0237': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0238': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0239': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0240': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0241': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0242': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0243': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0244': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0245': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0246': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0247': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0248': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0249': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0250': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_2Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 'img0251': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
				 'img0252': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
				 'img0253': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
				 'img0254': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
				 'img0255': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
				 'img0256': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',
				 'img0257': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
				 'img0258': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
				 'img0259': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
				 'img0260': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
				 'img0261': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
				 'img0262': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
				 'img0263': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
				 'img0264': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
				 'img0265': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
				 'img0266': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
				 'img0267': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
				 'img0268': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
				 'img0269': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
				 'img0270': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
				 'img0271': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
				 'img0272': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
				 'img0273': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
				 'img0274': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
				 'img0275': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
				 'img0276': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
				 'img0277': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
				 'img0278': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
				 'img0279': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
				 'img0280': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
				 'img0281': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
				 'img0282': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
				 'img0283': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
				 'img0284': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
				 'img0285': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
				 'img0286': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
				 'img0287': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
				 'img0288': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
				 'img0289': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
				 'img0290': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
				 'img0291': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
				 'img0292': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_Metaphase_Anaphase-control/Maybe_Interphase_3Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
				 
				 'img0293': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_chromosome_anaphase-sirna2/Normal_Interphase_2_ColorNormal_Metaphase_2Chromosome_Bridges_ColorNormal_Anaphase_composite.jpg',
				 'img0294': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_chromosome_anaphase-sirna2/Normal_Interphase_ColorNormal_Metaphase_2Chromosome_Bridges_ColorNormal_Anaphase_composite.jpg',
				 
				 'img0295': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0296': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0297': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0298': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0299': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0300': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0301': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0302': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0303': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0304': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0305': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0306': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0307': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0308': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0309': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0310': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0311': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0312': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0313': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0314': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0315': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0316': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0317': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0318': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0319': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0320': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0321': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0322': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0323': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0324': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0325': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0326': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0327': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0328': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0329': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0330': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0331': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0332': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0333': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0334': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0335': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0336': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0337': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0338': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0339': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0340': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0341': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0342': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0343': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0344': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0345': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0346': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0347': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0348': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0349': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0350': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0351': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0352': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0353': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0354': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0355': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0356': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0357': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0358': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0359': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0360': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0361': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0362': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0363': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0364': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0365': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0366': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0367': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0368': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0369': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0370': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0371': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0372': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0373': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0374': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0375': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0376': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0377': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0378': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0379': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0380': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0381': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0382': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0383': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0384': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0385': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0386': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0387': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0388': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0389': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0390': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0391': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0392': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0393': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0394': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0395': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0396': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0397': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0398': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0399': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0400': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0401': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0402': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0403': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0404': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0405': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0406': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0407': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0408': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0409': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0410': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0411': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0412': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0413': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0414': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0415': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0416': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0417': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0418': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0419': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0420': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0421': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0422': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0423': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0424': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0425': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0426': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0427': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0428': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0429': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0430': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0431': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0432': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0433': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0434': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0435': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0436': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0437': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0438': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0439': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0440': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0441': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0442': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0443': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0444': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0445': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0446': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0447': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0448': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0449': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0450': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0451': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0452': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0453': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0454': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0455': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0456': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0457': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0458': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0459': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0460': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0461': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0462': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_10Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0463': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0464': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0465': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0466': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0467': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0468': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0469': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0470': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0471': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0472': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0473': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0474': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0475': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0476': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0477': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0478': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0479': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0480': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0481': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0482': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0483': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0484': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0485': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0486': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0487': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0488': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0489': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0490': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0491': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0492': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0493': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0494': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0495': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0496': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0497': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0498': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0499': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0500': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0501': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0502': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0503': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0504': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0505': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0506': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0507': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0508': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0509': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0510': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0511': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0512': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0513': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0514': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0515': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0516': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0517': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0518': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0519': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0520': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0521': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0522': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0523': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0524': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0525': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0526': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0527': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0528': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0529': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0530': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0531': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0532': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0533': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0534': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0535': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0536': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0537': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0538': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0539': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0540': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0541': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0542': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0543': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0544': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0545': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0546': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0547': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0548': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0549': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0550': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0551': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0552': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0553': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0554': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0555': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0556': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0557': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0558': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0559': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0560': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0561': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0562': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0563': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0564': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0565': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0566': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0567': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0568': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0569': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0570': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0571': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0572': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0573': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0574': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0575': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0576': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0577': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0578': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0579': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0580': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0581': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0582': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0583': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0584': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0585': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0586': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0587': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0588': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0589': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0590': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0591': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0592': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0593': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0594': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0595': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0596': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0597': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0598': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0599': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0600': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0601': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0602': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0603': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0604': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0605': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0606': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0607': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0608': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0609': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0610': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0611': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0612': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0613': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0614': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0615': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0616': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0617': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0618': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0619': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0620': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0621': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0622': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0623': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0624': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0625': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0626': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0627': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0628': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0629': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0630': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_12Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0631': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0632': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0633': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0634': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0635': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0636': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0637': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0638': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0639': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0640': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0641': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0642': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0643': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0644': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0645': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0646': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0647': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0648': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0649': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0650': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0651': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0652': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0653': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0654': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0655': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0656': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0657': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0658': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0659': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0660': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0661': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0662': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0663': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0664': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0665': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0666': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0667': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0668': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0669': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0670': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0671': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0672': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0673': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0674': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0675': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0676': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0677': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0678': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0679': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0680': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0681': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0682': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0683': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0684': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0685': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0686': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0687': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0688': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0689': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0690': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0691': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0692': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0693': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0694': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0695': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0696': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0697': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0698': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0699': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0700': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0701': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0702': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0703': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0704': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0705': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0706': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0707': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0708': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0709': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0710': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0711': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0712': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0713': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0714': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0715': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0716': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0717': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0718': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0719': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0720': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0721': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0722': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0723': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0724': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0725': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0726': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0727': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0728': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0729': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0730': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0731': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0732': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0733': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0734': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0735': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0736': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0737': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0738': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0739': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0740': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0741': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0742': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0743': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0744': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0745': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0746': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0747': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0748': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0749': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0750': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0751': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0752': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0753': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0754': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0755': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0756': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0757': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0758': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0759': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0760': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0761': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0762': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0763': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0764': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0765': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0766': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0767': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0768': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0769': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0770': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0771': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0772': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0773': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0774': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0775': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0776': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0777': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0778': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0779': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0780': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0781': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0782': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0783': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0784': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0785': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0786': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0787': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0788': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0789': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0790': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0791': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0792': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0793': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0794': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0795': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0796': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0797': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0798': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Interphase_13Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0799': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0800': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0801': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0802': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0803': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0804': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0805': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0806': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0807': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0808': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0809': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0810': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0811': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0812': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0813': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0814': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0815': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0816': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0817': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0818': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0819': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0820': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0821': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0822': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0823': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0824': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0825': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0826': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0827': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0828': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0829': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0830': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0831': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0832': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0833': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0834': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0835': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0836': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0837': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0838': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0839': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0840': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0841': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0842': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0843': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0844': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0845': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0846': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0847': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0848': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0849': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0850': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0851': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0852': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0853': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0854': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0855': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0856': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0857': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0858': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0859': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0860': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0861': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0862': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0863': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0864': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0865': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0866': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0867': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0868': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0869': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0870': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0871': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0872': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0873': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0874': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0875': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0876': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0877': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0878': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0879': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0880': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0881': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0882': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0883': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0884': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0885': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0886': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0887': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0888': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0889': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0890': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0891': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0892': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0893': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0894': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0895': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0896': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0897': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0898': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0899': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0900': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0901': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0902': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0903': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0904': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0905': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0906': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0907': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0908': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0909': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0910': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0911': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0912': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0913': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0914': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0915': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0916': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0917': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0918': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0919': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0920': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0921': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0922': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0923': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0924': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0925': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0926': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0927': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0928': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0929': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0930': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0931': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0932': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0933': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0934': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0935': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0936': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0937': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0938': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0939': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0940': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0941': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0942': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0943': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0944': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0945': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0946': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0947': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0948': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0949': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0950': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0951': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0952': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0953': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0954': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0955': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0956': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0957': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0958': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0959': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0960': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0961': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0962': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0963': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0964': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0965': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0966': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_1Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0967': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0968': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0969': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0970': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0971': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0972': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0973': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0974': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0975': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img0976': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img0977': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img0978': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img0979': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img0980': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img0981': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img0982': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img0983': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img0984': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img0985': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img0986': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img0987': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img0988': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img0989': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img0990': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img0991': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img0992': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img0993': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img0994': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img0995': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img0996': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img0997': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img0998': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img0999': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1000': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1001': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1002': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1003': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1004': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1005': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1006': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1007': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1008': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1009': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1010': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1011': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1012': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1013': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1014': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1015': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1016': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1017': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1018': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1019': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1020': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1021': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1022': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1023': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1024': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1025': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1026': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1027': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1028': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1029': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1030': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1031': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1032': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1033': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1034': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1035': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1036': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1037': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1038': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1039': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1040': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1041': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1042': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1043': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1044': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1045': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1046': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1047': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1048': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1049': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1050': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1051': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1052': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1053': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1054': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1055': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1056': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1057': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1058': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1059': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1060': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1061': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1062': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1063': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1064': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1065': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1066': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1067': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1068': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1069': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1070': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1071': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1072': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1073': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1074': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1075': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1076': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1077': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1078': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1079': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1080': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1081': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1082': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1083': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1084': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1085': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1086': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1087': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1088': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1089': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1090': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1091': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1092': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1093': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1094': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1095': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1096': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1097': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1098': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1099': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1100': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1101': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1102': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1103': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1104': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1105': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1106': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1107': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1108': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1109': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1110': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1111': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1112': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1113': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1114': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1115': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1116': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1117': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1118': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1119': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1120': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1121': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1122': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1123': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1124': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1125': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1126': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1127': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1128': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1129': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1130': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1131': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1132': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1133': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1134': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_2Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1135': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1136': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1137': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1138': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1139': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1140': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1141': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1142': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1143': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1144': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1145': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1146': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1147': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1148': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1149': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1150': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1151': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1152': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1153': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1154': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1155': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1156': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1157': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1158': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_10Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1159': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1160': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1161': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1162': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1163': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1164': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1165': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1166': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1167': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1168': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1169': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1170': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1171': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1172': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1173': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1174': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1175': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1176': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1177': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1178': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1179': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1180': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1181': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1182': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_4Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1183': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1184': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1185': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1186': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1187': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1188': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1189': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1190': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1191': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1192': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1193': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1194': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1195': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1196': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1197': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1198': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1199': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1200': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1201': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1202': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1203': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1204': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1205': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1206': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_5Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1207': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1208': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1209': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1210': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1211': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1212': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1213': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1214': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1215': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1216': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1217': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1218': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1219': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1220': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1221': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1222': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1223': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1224': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1225': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1226': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1227': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1228': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1229': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1230': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_6Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1231': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1232': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1233': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1234': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1235': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1236': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1237': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1238': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1239': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1240': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1241': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1242': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1243': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1244': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1245': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1246': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1247': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1248': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1249': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1250': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1251': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1252': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1253': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1254': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_7Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1255': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1256': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1257': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1258': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1259': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1260': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1261': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1262': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1263': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1264': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1265': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1266': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1267': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1268': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1269': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1270': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1271': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1272': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1273': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1274': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1275': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1276': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1277': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1278': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_8Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 'img1279': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_1_composite.jpg',
				 'img1280': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_2_composite.jpg',
				 'img1281': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_3_composite.jpg',
				 'img1282': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_4_composite.jpg',
				 'img1283': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_5_composite.jpg',
				 'img1284': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_2Normal_Anaphase_6_composite.jpg',
				 'img1285': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_1_composite.jpg',
				 'img1286': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_2_composite.jpg',
				 'img1287': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_3_composite.jpg',
				 'img1288': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_4_composite.jpg',
				 'img1289': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_5_composite.jpg',
				 'img1290': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_3Normal_Anaphase_6_composite.jpg',
				 'img1291': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_1_composite.jpg',
				 'img1292': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_2_composite.jpg',
				 'img1293': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_3_composite.jpg',
				 'img1294': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_4_composite.jpg',
				 'img1295': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_5_composite.jpg',
				 'img1296': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_Distribution_4Normal_Anaphase_6_composite.jpg',
				 'img1297': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_1_composite.jpg',
				 'img1298': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_2_composite.jpg',
				 'img1299': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_3_composite.jpg',
				 'img1300': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_4_composite.jpg',
				 'img1301': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_5_composite.jpg',
				 'img1302': 'images/microscopy/assignment_706_2014_ps2/composites/Interphase_metaphase_unequal_anaphase-sirna5/Maybe_Interphase_3Normal_Metaphase_9Unequal_Chromosome_DistributionNormal_Anaphase_6_composite.jpg',
				 
				 'img1303': 'images/microscopy/assignment_706_2014_ps2/composites/Mad2_off_Mad2_on-control,sirna2/Mad2_Cytoplasm_croppedMad2_kinetochore_2_cropped_composite.jpg',
				 'img1304': 'images/microscopy/assignment_706_2014_ps2/composites/Mad2_off_Mad2_on-control,sirna2/Mad2_Cytoplasm_croppedMad2_kinetochore_cropped_composite.jpg'
        		
        		
        	},
        	slide_parser: {
				'default':{
					'IF':{
						'rgb':{ 
							'interphase':{
								'1': [{
									hash: 'img12',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img13',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'3': [{
									hash: 'img14',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'4': [{
									hash: 'img15',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'5': [{
									hash: 'img16',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'6': [{
									hash: 'img17',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'metaphase':{
								'1': [{
									hash: 'img24',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img25',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'3': [{
									hash: 'img26',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'4': [{
									hash: 'img27',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'5': [{
									hash: 'img28',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'6': [{
									hash: 'img29',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'7': [{
									hash: 'img30',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'anaphase':{
								'1': [{
									hash: 'img18',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img19',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'3': [{
									hash: 'img20',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'4': [{
									hash: 'img21',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'5': [{
									hash: 'img22',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'6': [{
									hash: 'img23',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'unequal':{
								'1': [{
									hash: 'img31',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img32',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'3': [{
									hash: 'img33',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'4': [{
									hash: 'img34',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'composite3':{
								 '1': [{hash: 'img0041', if_type: 'merge', mag: 'N/A'}],
								 '10': [{hash: 'img0050', if_type: 'merge', mag: 'N/A'}],
								 '100': [{hash: 'img0140', if_type: 'merge', mag: 'N/A'}],
								 '101': [{hash: 'img0141', if_type: 'merge', mag: 'N/A'}],
								 '102': [{hash: 'img0142', if_type: 'merge', mag: 'N/A'}],
								 '103': [{hash: 'img0143', if_type: 'merge', mag: 'N/A'}],
								 '104': [{hash: 'img0144', if_type: 'merge', mag: 'N/A'}],
								 '105': [{hash: 'img0145', if_type: 'merge', mag: 'N/A'}],
								 '106': [{hash: 'img0146', if_type: 'merge', mag: 'N/A'}],
								 '107': [{hash: 'img0147', if_type: 'merge', mag: 'N/A'}],
								 '108': [{hash: 'img0148', if_type: 'merge', mag: 'N/A'}],
								 '109': [{hash: 'img0149', if_type: 'merge', mag: 'N/A'}],
								 '11': [{hash: 'img0051', if_type: 'merge', mag: 'N/A'}],
								 '110': [{hash: 'img0150', if_type: 'merge', mag: 'N/A'}],
								 '111': [{hash: 'img0151', if_type: 'merge', mag: 'N/A'}],
								 '112': [{hash: 'img0152', if_type: 'merge', mag: 'N/A'}],
								 '113': [{hash: 'img0153', if_type: 'merge', mag: 'N/A'}],
								 '114': [{hash: 'img0154', if_type: 'merge', mag: 'N/A'}],
								 '115': [{hash: 'img0155', if_type: 'merge', mag: 'N/A'}],
								 '116': [{hash: 'img0156', if_type: 'merge', mag: 'N/A'}],
								 '117': [{hash: 'img0157', if_type: 'merge', mag: 'N/A'}],
								 '118': [{hash: 'img0158', if_type: 'merge', mag: 'N/A'}],
								 '119': [{hash: 'img0159', if_type: 'merge', mag: 'N/A'}],
								 '12': [{hash: 'img0052', if_type: 'merge', mag: 'N/A'}],
								 '120': [{hash: 'img0160', if_type: 'merge', mag: 'N/A'}],
								 '121': [{hash: 'img0161', if_type: 'merge', mag: 'N/A'}],
								 '122': [{hash: 'img0162', if_type: 'merge', mag: 'N/A'}],
								 '123': [{hash: 'img0163', if_type: 'merge', mag: 'N/A'}],
								 '124': [{hash: 'img0164', if_type: 'merge', mag: 'N/A'}],
								 '125': [{hash: 'img0165', if_type: 'merge', mag: 'N/A'}],
								 '126': [{hash: 'img0166', if_type: 'merge', mag: 'N/A'}],
								 '127': [{hash: 'img0167', if_type: 'merge', mag: 'N/A'}],
								 '128': [{hash: 'img0168', if_type: 'merge', mag: 'N/A'}],
								 '129': [{hash: 'img0169', if_type: 'merge', mag: 'N/A'}],
								 '13': [{hash: 'img0053', if_type: 'merge', mag: 'N/A'}],
								 '130': [{hash: 'img0170', if_type: 'merge', mag: 'N/A'}],
								 '131': [{hash: 'img0171', if_type: 'merge', mag: 'N/A'}],
								 '132': [{hash: 'img0172', if_type: 'merge', mag: 'N/A'}],
								 '133': [{hash: 'img0173', if_type: 'merge', mag: 'N/A'}],
								 '134': [{hash: 'img0174', if_type: 'merge', mag: 'N/A'}],
								 '135': [{hash: 'img0175', if_type: 'merge', mag: 'N/A'}],
								 '136': [{hash: 'img0176', if_type: 'merge', mag: 'N/A'}],
								 '137': [{hash: 'img0177', if_type: 'merge', mag: 'N/A'}],
								 '138': [{hash: 'img0178', if_type: 'merge', mag: 'N/A'}],
								 '139': [{hash: 'img0179', if_type: 'merge', mag: 'N/A'}],
								 '14': [{hash: 'img0054', if_type: 'merge', mag: 'N/A'}],
								 '140': [{hash: 'img0180', if_type: 'merge', mag: 'N/A'}],
								 '141': [{hash: 'img0181', if_type: 'merge', mag: 'N/A'}],
								 '142': [{hash: 'img0182', if_type: 'merge', mag: 'N/A'}],
								 '143': [{hash: 'img0183', if_type: 'merge', mag: 'N/A'}],
								 '144': [{hash: 'img0184', if_type: 'merge', mag: 'N/A'}],
								 '145': [{hash: 'img0185', if_type: 'merge', mag: 'N/A'}],
								 '146': [{hash: 'img0186', if_type: 'merge', mag: 'N/A'}],
								 '147': [{hash: 'img0187', if_type: 'merge', mag: 'N/A'}],
								 '148': [{hash: 'img0188', if_type: 'merge', mag: 'N/A'}],
								 '149': [{hash: 'img0189', if_type: 'merge', mag: 'N/A'}],
								 '15': [{hash: 'img0055', if_type: 'merge', mag: 'N/A'}],
								 '150': [{hash: 'img0190', if_type: 'merge', mag: 'N/A'}],
								 '151': [{hash: 'img0191', if_type: 'merge', mag: 'N/A'}],
								 '152': [{hash: 'img0192', if_type: 'merge', mag: 'N/A'}],
								 '153': [{hash: 'img0193', if_type: 'merge', mag: 'N/A'}],
								 '154': [{hash: 'img0194', if_type: 'merge', mag: 'N/A'}],
								 '155': [{hash: 'img0195', if_type: 'merge', mag: 'N/A'}],
								 '156': [{hash: 'img0196', if_type: 'merge', mag: 'N/A'}],
								 '157': [{hash: 'img0197', if_type: 'merge', mag: 'N/A'}],
								 '158': [{hash: 'img0198', if_type: 'merge', mag: 'N/A'}],
								 '159': [{hash: 'img0199', if_type: 'merge', mag: 'N/A'}],
								 '16': [{hash: 'img0056', if_type: 'merge', mag: 'N/A'}],
								 '160': [{hash: 'img0200', if_type: 'merge', mag: 'N/A'}],
								 '161': [{hash: 'img0201', if_type: 'merge', mag: 'N/A'}],
								 '162': [{hash: 'img0202', if_type: 'merge', mag: 'N/A'}],
								 '163': [{hash: 'img0203', if_type: 'merge', mag: 'N/A'}],
								 '164': [{hash: 'img0204', if_type: 'merge', mag: 'N/A'}],
								 '165': [{hash: 'img0205', if_type: 'merge', mag: 'N/A'}],
								 '166': [{hash: 'img0206', if_type: 'merge', mag: 'N/A'}],
								 '167': [{hash: 'img0207', if_type: 'merge', mag: 'N/A'}],
								 '168': [{hash: 'img0208', if_type: 'merge', mag: 'N/A'}],
								 '169': [{hash: 'img0209', if_type: 'merge', mag: 'N/A'}],
								 '17': [{hash: 'img0057', if_type: 'merge', mag: 'N/A'}],
								 '170': [{hash: 'img0210', if_type: 'merge', mag: 'N/A'}],
								 '171': [{hash: 'img0211', if_type: 'merge', mag: 'N/A'}],
								 '172': [{hash: 'img0212', if_type: 'merge', mag: 'N/A'}],
								 '173': [{hash: 'img0213', if_type: 'merge', mag: 'N/A'}],
								 '174': [{hash: 'img0214', if_type: 'merge', mag: 'N/A'}],
								 '175': [{hash: 'img0215', if_type: 'merge', mag: 'N/A'}],
								 '176': [{hash: 'img0216', if_type: 'merge', mag: 'N/A'}],
								 '177': [{hash: 'img0217', if_type: 'merge', mag: 'N/A'}],
								 '178': [{hash: 'img0218', if_type: 'merge', mag: 'N/A'}],
								 '179': [{hash: 'img0219', if_type: 'merge', mag: 'N/A'}],
								 '18': [{hash: 'img0058', if_type: 'merge', mag: 'N/A'}],
								 '180': [{hash: 'img0220', if_type: 'merge', mag: 'N/A'}],
								 '181': [{hash: 'img0221', if_type: 'merge', mag: 'N/A'}],
								 '182': [{hash: 'img0222', if_type: 'merge', mag: 'N/A'}],
								 '183': [{hash: 'img0223', if_type: 'merge', mag: 'N/A'}],
								 '184': [{hash: 'img0224', if_type: 'merge', mag: 'N/A'}],
								 '185': [{hash: 'img0225', if_type: 'merge', mag: 'N/A'}],
								 '186': [{hash: 'img0226', if_type: 'merge', mag: 'N/A'}],
								 '187': [{hash: 'img0227', if_type: 'merge', mag: 'N/A'}],
								 '188': [{hash: 'img0228', if_type: 'merge', mag: 'N/A'}],
								 '189': [{hash: 'img0229', if_type: 'merge', mag: 'N/A'}],
								 '19': [{hash: 'img0059', if_type: 'merge', mag: 'N/A'}],
								 '190': [{hash: 'img0230', if_type: 'merge', mag: 'N/A'}],
								 '191': [{hash: 'img0231', if_type: 'merge', mag: 'N/A'}],
								 '192': [{hash: 'img0232', if_type: 'merge', mag: 'N/A'}],
								 '193': [{hash: 'img0233', if_type: 'merge', mag: 'N/A'}],
								 '194': [{hash: 'img0234', if_type: 'merge', mag: 'N/A'}],
								 '195': [{hash: 'img0235', if_type: 'merge', mag: 'N/A'}],
								 '196': [{hash: 'img0236', if_type: 'merge', mag: 'N/A'}],
								 '197': [{hash: 'img0237', if_type: 'merge', mag: 'N/A'}],
								 '198': [{hash: 'img0238', if_type: 'merge', mag: 'N/A'}],
								 '199': [{hash: 'img0239', if_type: 'merge', mag: 'N/A'}],
								 '2': [{hash: 'img0042', if_type: 'merge', mag: 'N/A'}],
								 '20': [{hash: 'img0060', if_type: 'merge', mag: 'N/A'}],
								 '200': [{hash: 'img0240', if_type: 'merge', mag: 'N/A'}],
								 '201': [{hash: 'img0241', if_type: 'merge', mag: 'N/A'}],
								 '202': [{hash: 'img0242', if_type: 'merge', mag: 'N/A'}],
								 '203': [{hash: 'img0243', if_type: 'merge', mag: 'N/A'}],
								 '204': [{hash: 'img0244', if_type: 'merge', mag: 'N/A'}],
								 '205': [{hash: 'img0245', if_type: 'merge', mag: 'N/A'}],
								 '206': [{hash: 'img0246', if_type: 'merge', mag: 'N/A'}],
								 '207': [{hash: 'img0247', if_type: 'merge', mag: 'N/A'}],
								 '208': [{hash: 'img0248', if_type: 'merge', mag: 'N/A'}],
								 '209': [{hash: 'img0249', if_type: 'merge', mag: 'N/A'}],
								 '21': [{hash: 'img0061', if_type: 'merge', mag: 'N/A'}],
								 '210': [{hash: 'img0250', if_type: 'merge', mag: 'N/A'}],
								 '211': [{hash: 'img0251', if_type: 'merge', mag: 'N/A'}],
								 '212': [{hash: 'img0252', if_type: 'merge', mag: 'N/A'}],
								 '213': [{hash: 'img0253', if_type: 'merge', mag: 'N/A'}],
								 '214': [{hash: 'img0254', if_type: 'merge', mag: 'N/A'}],
								 '215': [{hash: 'img0255', if_type: 'merge', mag: 'N/A'}],
								 '216': [{hash: 'img0256', if_type: 'merge', mag: 'N/A'}],
								 '217': [{hash: 'img0257', if_type: 'merge', mag: 'N/A'}],
								 '218': [{hash: 'img0258', if_type: 'merge', mag: 'N/A'}],
								 '219': [{hash: 'img0259', if_type: 'merge', mag: 'N/A'}],
								 '22': [{hash: 'img0062', if_type: 'merge', mag: 'N/A'}],
								 '220': [{hash: 'img0260', if_type: 'merge', mag: 'N/A'}],
								 '221': [{hash: 'img0261', if_type: 'merge', mag: 'N/A'}],
								 '222': [{hash: 'img0262', if_type: 'merge', mag: 'N/A'}],
								 '223': [{hash: 'img0263', if_type: 'merge', mag: 'N/A'}],
								 '224': [{hash: 'img0264', if_type: 'merge', mag: 'N/A'}],
								 '225': [{hash: 'img0265', if_type: 'merge', mag: 'N/A'}],
								 '226': [{hash: 'img0266', if_type: 'merge', mag: 'N/A'}],
								 '227': [{hash: 'img0267', if_type: 'merge', mag: 'N/A'}],
								 '228': [{hash: 'img0268', if_type: 'merge', mag: 'N/A'}],
								 '229': [{hash: 'img0269', if_type: 'merge', mag: 'N/A'}],
								 '23': [{hash: 'img0063', if_type: 'merge', mag: 'N/A'}],
								 '230': [{hash: 'img0270', if_type: 'merge', mag: 'N/A'}],
								 '231': [{hash: 'img0271', if_type: 'merge', mag: 'N/A'}],
								 '232': [{hash: 'img0272', if_type: 'merge', mag: 'N/A'}],
								 '233': [{hash: 'img0273', if_type: 'merge', mag: 'N/A'}],
								 '234': [{hash: 'img0274', if_type: 'merge', mag: 'N/A'}],
								 '235': [{hash: 'img0275', if_type: 'merge', mag: 'N/A'}],
								 '236': [{hash: 'img0276', if_type: 'merge', mag: 'N/A'}],
								 '237': [{hash: 'img0277', if_type: 'merge', mag: 'N/A'}],
								 '238': [{hash: 'img0278', if_type: 'merge', mag: 'N/A'}],
								 '239': [{hash: 'img0279', if_type: 'merge', mag: 'N/A'}],
								 '24': [{hash: 'img0064', if_type: 'merge', mag: 'N/A'}],
								 '240': [{hash: 'img0280', if_type: 'merge', mag: 'N/A'}],
								 '241': [{hash: 'img0281', if_type: 'merge', mag: 'N/A'}],
								 '242': [{hash: 'img0282', if_type: 'merge', mag: 'N/A'}],
								 '243': [{hash: 'img0283', if_type: 'merge', mag: 'N/A'}],
								 '244': [{hash: 'img0284', if_type: 'merge', mag: 'N/A'}],
								 '245': [{hash: 'img0285', if_type: 'merge', mag: 'N/A'}],
								 '246': [{hash: 'img0286', if_type: 'merge', mag: 'N/A'}],
								 '247': [{hash: 'img0287', if_type: 'merge', mag: 'N/A'}],
								 '248': [{hash: 'img0288', if_type: 'merge', mag: 'N/A'}],
								 '249': [{hash: 'img0289', if_type: 'merge', mag: 'N/A'}],
								 '25': [{hash: 'img0065', if_type: 'merge', mag: 'N/A'}],
								 '250': [{hash: 'img0290', if_type: 'merge', mag: 'N/A'}],
								 '251': [{hash: 'img0291', if_type: 'merge', mag: 'N/A'}],
								 '252': [{hash: 'img0292', if_type: 'merge', mag: 'N/A'}],
								 '26': [{hash: 'img0066', if_type: 'merge', mag: 'N/A'}],
								 '27': [{hash: 'img0067', if_type: 'merge', mag: 'N/A'}],
								 '28': [{hash: 'img0068', if_type: 'merge', mag: 'N/A'}],
								 '29': [{hash: 'img0069', if_type: 'merge', mag: 'N/A'}],
								 '3': [{hash: 'img0043', if_type: 'merge', mag: 'N/A'}],
								 '30': [{hash: 'img0070', if_type: 'merge', mag: 'N/A'}],
								 '31': [{hash: 'img0071', if_type: 'merge', mag: 'N/A'}],
								 '32': [{hash: 'img0072', if_type: 'merge', mag: 'N/A'}],
								 '33': [{hash: 'img0073', if_type: 'merge', mag: 'N/A'}],
								 '34': [{hash: 'img0074', if_type: 'merge', mag: 'N/A'}],
								 '35': [{hash: 'img0075', if_type: 'merge', mag: 'N/A'}],
								 '36': [{hash: 'img0076', if_type: 'merge', mag: 'N/A'}],
								 '37': [{hash: 'img0077', if_type: 'merge', mag: 'N/A'}],
								 '38': [{hash: 'img0078', if_type: 'merge', mag: 'N/A'}],
								 '39': [{hash: 'img0079', if_type: 'merge', mag: 'N/A'}],
								 '4': [{hash: 'img0044', if_type: 'merge', mag: 'N/A'}],
								 '40': [{hash: 'img0080', if_type: 'merge', mag: 'N/A'}],
								 '41': [{hash: 'img0081', if_type: 'merge', mag: 'N/A'}],
								 '42': [{hash: 'img0082', if_type: 'merge', mag: 'N/A'}],
								 '43': [{hash: 'img0083', if_type: 'merge', mag: 'N/A'}],
								 '44': [{hash: 'img0084', if_type: 'merge', mag: 'N/A'}],
								 '45': [{hash: 'img0085', if_type: 'merge', mag: 'N/A'}],
								 '46': [{hash: 'img0086', if_type: 'merge', mag: 'N/A'}],
								 '47': [{hash: 'img0087', if_type: 'merge', mag: 'N/A'}],
								 '48': [{hash: 'img0088', if_type: 'merge', mag: 'N/A'}],
								 '49': [{hash: 'img0089', if_type: 'merge', mag: 'N/A'}],
								 '5': [{hash: 'img0045', if_type: 'merge', mag: 'N/A'}],
								 '50': [{hash: 'img0090', if_type: 'merge', mag: 'N/A'}],
								 '51': [{hash: 'img0091', if_type: 'merge', mag: 'N/A'}],
								 '52': [{hash: 'img0092', if_type: 'merge', mag: 'N/A'}],
								 '53': [{hash: 'img0093', if_type: 'merge', mag: 'N/A'}],
								 '54': [{hash: 'img0094', if_type: 'merge', mag: 'N/A'}],
								 '55': [{hash: 'img0095', if_type: 'merge', mag: 'N/A'}],
								 '56': [{hash: 'img0096', if_type: 'merge', mag: 'N/A'}],
								 '57': [{hash: 'img0097', if_type: 'merge', mag: 'N/A'}],
								 '58': [{hash: 'img0098', if_type: 'merge', mag: 'N/A'}],
								 '59': [{hash: 'img0099', if_type: 'merge', mag: 'N/A'}],
								 '6': [{hash: 'img0046', if_type: 'merge', mag: 'N/A'}],
								 '60': [{hash: 'img0100', if_type: 'merge', mag: 'N/A'}],
								 '61': [{hash: 'img0101', if_type: 'merge', mag: 'N/A'}],
								 '62': [{hash: 'img0102', if_type: 'merge', mag: 'N/A'}],
								 '63': [{hash: 'img0103', if_type: 'merge', mag: 'N/A'}],
								 '64': [{hash: 'img0104', if_type: 'merge', mag: 'N/A'}],
								 '65': [{hash: 'img0105', if_type: 'merge', mag: 'N/A'}],
								 '66': [{hash: 'img0106', if_type: 'merge', mag: 'N/A'}],
								 '67': [{hash: 'img0107', if_type: 'merge', mag: 'N/A'}],
								 '68': [{hash: 'img0108', if_type: 'merge', mag: 'N/A'}],
								 '69': [{hash: 'img0109', if_type: 'merge', mag: 'N/A'}],
								 '7': [{hash: 'img0047', if_type: 'merge', mag: 'N/A'}],
								 '70': [{hash: 'img0110', if_type: 'merge', mag: 'N/A'}],
								 '71': [{hash: 'img0111', if_type: 'merge', mag: 'N/A'}],
								 '72': [{hash: 'img0112', if_type: 'merge', mag: 'N/A'}],
								 '73': [{hash: 'img0113', if_type: 'merge', mag: 'N/A'}],
								 '74': [{hash: 'img0114', if_type: 'merge', mag: 'N/A'}],
								 '75': [{hash: 'img0115', if_type: 'merge', mag: 'N/A'}],
								 '76': [{hash: 'img0116', if_type: 'merge', mag: 'N/A'}],
								 '77': [{hash: 'img0117', if_type: 'merge', mag: 'N/A'}],
								 '78': [{hash: 'img0118', if_type: 'merge', mag: 'N/A'}],
								 '79': [{hash: 'img0119', if_type: 'merge', mag: 'N/A'}],
								 '8': [{hash: 'img0048', if_type: 'merge', mag: 'N/A'}],
								 '80': [{hash: 'img0120', if_type: 'merge', mag: 'N/A'}],
								 '81': [{hash: 'img0121', if_type: 'merge', mag: 'N/A'}],
								 '82': [{hash: 'img0122', if_type: 'merge', mag: 'N/A'}],
								 '83': [{hash: 'img0123', if_type: 'merge', mag: 'N/A'}],
								 '84': [{hash: 'img0124', if_type: 'merge', mag: 'N/A'}],
								 '85': [{hash: 'img0125', if_type: 'merge', mag: 'N/A'}],
								 '86': [{hash: 'img0126', if_type: 'merge', mag: 'N/A'}],
								 '87': [{hash: 'img0127', if_type: 'merge', mag: 'N/A'}],
								 '88': [{hash: 'img0128', if_type: 'merge', mag: 'N/A'}],
								 '89': [{hash: 'img0129', if_type: 'merge', mag: 'N/A'}],
								 '9': [{hash: 'img0049', if_type: 'merge', mag: 'N/A'}],
								 '90': [{hash: 'img0130', if_type: 'merge', mag: 'N/A'}],
								 '91': [{hash: 'img0131', if_type: 'merge', mag: 'N/A'}],
								 '92': [{hash: 'img0132', if_type: 'merge', mag: 'N/A'}],
								 '93': [{hash: 'img0133', if_type: 'merge', mag: 'N/A'}],
								 '94': [{hash: 'img0134', if_type: 'merge', mag: 'N/A'}],
								 '95': [{hash: 'img0135', if_type: 'merge', mag: 'N/A'}],
								 '96': [{hash: 'img0136', if_type: 'merge', mag: 'N/A'}],
								 '97': [{hash: 'img0137', if_type: 'merge', mag: 'N/A'}],
								 '98': [{hash: 'img0138', if_type: 'merge', mag: 'N/A'}],
								 '99': [{hash: 'img0139', if_type: 'merge', mag: 'N/A'}]
							},
							'composite4':{
								 '1': [{hash: 'img0295', if_type: 'merge', mag: 'N/A'}],
								 '10': [{hash: 'img0304', if_type: 'merge', mag: 'N/A'}],
								 '100': [{hash: 'img0394', if_type: 'merge', mag: 'N/A'}],
								 '1000': [{hash: 'img1294', if_type: 'merge', mag: 'N/A'}],
								 '1001': [{hash: 'img1295', if_type: 'merge', mag: 'N/A'}],
								 '1002': [{hash: 'img1296', if_type: 'merge', mag: 'N/A'}],
								 '1003': [{hash: 'img1297', if_type: 'merge', mag: 'N/A'}],
								 '1004': [{hash: 'img1298', if_type: 'merge', mag: 'N/A'}],
								 '1005': [{hash: 'img1299', if_type: 'merge', mag: 'N/A'}],
								 '1006': [{hash: 'img1300', if_type: 'merge', mag: 'N/A'}],
								 '1007': [{hash: 'img1301', if_type: 'merge', mag: 'N/A'}],
								 '1008': [{hash: 'img1302', if_type: 'merge', mag: 'N/A'}],
								 '101': [{hash: 'img0395', if_type: 'merge', mag: 'N/A'}],
								 '102': [{hash: 'img0396', if_type: 'merge', mag: 'N/A'}],
								 '103': [{hash: 'img0397', if_type: 'merge', mag: 'N/A'}],
								 '104': [{hash: 'img0398', if_type: 'merge', mag: 'N/A'}],
								 '105': [{hash: 'img0399', if_type: 'merge', mag: 'N/A'}],
								 '106': [{hash: 'img0400', if_type: 'merge', mag: 'N/A'}],
								 '107': [{hash: 'img0401', if_type: 'merge', mag: 'N/A'}],
								 '108': [{hash: 'img0402', if_type: 'merge', mag: 'N/A'}],
								 '109': [{hash: 'img0403', if_type: 'merge', mag: 'N/A'}],
								 '11': [{hash: 'img0305', if_type: 'merge', mag: 'N/A'}],
								 '110': [{hash: 'img0404', if_type: 'merge', mag: 'N/A'}],
								 '111': [{hash: 'img0405', if_type: 'merge', mag: 'N/A'}],
								 '112': [{hash: 'img0406', if_type: 'merge', mag: 'N/A'}],
								 '113': [{hash: 'img0407', if_type: 'merge', mag: 'N/A'}],
								 '114': [{hash: 'img0408', if_type: 'merge', mag: 'N/A'}],
								 '115': [{hash: 'img0409', if_type: 'merge', mag: 'N/A'}],
								 '116': [{hash: 'img0410', if_type: 'merge', mag: 'N/A'}],
								 '117': [{hash: 'img0411', if_type: 'merge', mag: 'N/A'}],
								 '118': [{hash: 'img0412', if_type: 'merge', mag: 'N/A'}],
								 '119': [{hash: 'img0413', if_type: 'merge', mag: 'N/A'}],
								 '12': [{hash: 'img0306', if_type: 'merge', mag: 'N/A'}],
								 '120': [{hash: 'img0414', if_type: 'merge', mag: 'N/A'}],
								 '121': [{hash: 'img0415', if_type: 'merge', mag: 'N/A'}],
								 '122': [{hash: 'img0416', if_type: 'merge', mag: 'N/A'}],
								 '123': [{hash: 'img0417', if_type: 'merge', mag: 'N/A'}],
								 '124': [{hash: 'img0418', if_type: 'merge', mag: 'N/A'}],
								 '125': [{hash: 'img0419', if_type: 'merge', mag: 'N/A'}],
								 '126': [{hash: 'img0420', if_type: 'merge', mag: 'N/A'}],
								 '127': [{hash: 'img0421', if_type: 'merge', mag: 'N/A'}],
								 '128': [{hash: 'img0422', if_type: 'merge', mag: 'N/A'}],
								 '129': [{hash: 'img0423', if_type: 'merge', mag: 'N/A'}],
								 '13': [{hash: 'img0307', if_type: 'merge', mag: 'N/A'}],
								 '130': [{hash: 'img0424', if_type: 'merge', mag: 'N/A'}],
								 '131': [{hash: 'img0425', if_type: 'merge', mag: 'N/A'}],
								 '132': [{hash: 'img0426', if_type: 'merge', mag: 'N/A'}],
								 '133': [{hash: 'img0427', if_type: 'merge', mag: 'N/A'}],
								 '134': [{hash: 'img0428', if_type: 'merge', mag: 'N/A'}],
								 '135': [{hash: 'img0429', if_type: 'merge', mag: 'N/A'}],
								 '136': [{hash: 'img0430', if_type: 'merge', mag: 'N/A'}],
								 '137': [{hash: 'img0431', if_type: 'merge', mag: 'N/A'}],
								 '138': [{hash: 'img0432', if_type: 'merge', mag: 'N/A'}],
								 '139': [{hash: 'img0433', if_type: 'merge', mag: 'N/A'}],
								 '14': [{hash: 'img0308', if_type: 'merge', mag: 'N/A'}],
								 '140': [{hash: 'img0434', if_type: 'merge', mag: 'N/A'}],
								 '141': [{hash: 'img0435', if_type: 'merge', mag: 'N/A'}],
								 '142': [{hash: 'img0436', if_type: 'merge', mag: 'N/A'}],
								 '143': [{hash: 'img0437', if_type: 'merge', mag: 'N/A'}],
								 '144': [{hash: 'img0438', if_type: 'merge', mag: 'N/A'}],
								 '145': [{hash: 'img0439', if_type: 'merge', mag: 'N/A'}],
								 '146': [{hash: 'img0440', if_type: 'merge', mag: 'N/A'}],
								 '147': [{hash: 'img0441', if_type: 'merge', mag: 'N/A'}],
								 '148': [{hash: 'img0442', if_type: 'merge', mag: 'N/A'}],
								 '149': [{hash: 'img0443', if_type: 'merge', mag: 'N/A'}],
								 '15': [{hash: 'img0309', if_type: 'merge', mag: 'N/A'}],
								 '150': [{hash: 'img0444', if_type: 'merge', mag: 'N/A'}],
								 '151': [{hash: 'img0445', if_type: 'merge', mag: 'N/A'}],
								 '152': [{hash: 'img0446', if_type: 'merge', mag: 'N/A'}],
								 '153': [{hash: 'img0447', if_type: 'merge', mag: 'N/A'}],
								 '154': [{hash: 'img0448', if_type: 'merge', mag: 'N/A'}],
								 '155': [{hash: 'img0449', if_type: 'merge', mag: 'N/A'}],
								 '156': [{hash: 'img0450', if_type: 'merge', mag: 'N/A'}],
								 '157': [{hash: 'img0451', if_type: 'merge', mag: 'N/A'}],
								 '158': [{hash: 'img0452', if_type: 'merge', mag: 'N/A'}],
								 '159': [{hash: 'img0453', if_type: 'merge', mag: 'N/A'}],
								 '16': [{hash: 'img0310', if_type: 'merge', mag: 'N/A'}],
								 '160': [{hash: 'img0454', if_type: 'merge', mag: 'N/A'}],
								 '161': [{hash: 'img0455', if_type: 'merge', mag: 'N/A'}],
								 '162': [{hash: 'img0456', if_type: 'merge', mag: 'N/A'}],
								 '163': [{hash: 'img0457', if_type: 'merge', mag: 'N/A'}],
								 '164': [{hash: 'img0458', if_type: 'merge', mag: 'N/A'}],
								 '165': [{hash: 'img0459', if_type: 'merge', mag: 'N/A'}],
								 '166': [{hash: 'img0460', if_type: 'merge', mag: 'N/A'}],
								 '167': [{hash: 'img0461', if_type: 'merge', mag: 'N/A'}],
								 '168': [{hash: 'img0462', if_type: 'merge', mag: 'N/A'}],
								 '169': [{hash: 'img0463', if_type: 'merge', mag: 'N/A'}],
								 '17': [{hash: 'img0311', if_type: 'merge', mag: 'N/A'}],
								 '170': [{hash: 'img0464', if_type: 'merge', mag: 'N/A'}],
								 '171': [{hash: 'img0465', if_type: 'merge', mag: 'N/A'}],
								 '172': [{hash: 'img0466', if_type: 'merge', mag: 'N/A'}],
								 '173': [{hash: 'img0467', if_type: 'merge', mag: 'N/A'}],
								 '174': [{hash: 'img0468', if_type: 'merge', mag: 'N/A'}],
								 '175': [{hash: 'img0469', if_type: 'merge', mag: 'N/A'}],
								 '176': [{hash: 'img0470', if_type: 'merge', mag: 'N/A'}],
								 '177': [{hash: 'img0471', if_type: 'merge', mag: 'N/A'}],
								 '178': [{hash: 'img0472', if_type: 'merge', mag: 'N/A'}],
								 '179': [{hash: 'img0473', if_type: 'merge', mag: 'N/A'}],
								 '18': [{hash: 'img0312', if_type: 'merge', mag: 'N/A'}],
								 '180': [{hash: 'img0474', if_type: 'merge', mag: 'N/A'}],
								 '181': [{hash: 'img0475', if_type: 'merge', mag: 'N/A'}],
								 '182': [{hash: 'img0476', if_type: 'merge', mag: 'N/A'}],
								 '183': [{hash: 'img0477', if_type: 'merge', mag: 'N/A'}],
								 '184': [{hash: 'img0478', if_type: 'merge', mag: 'N/A'}],
								 '185': [{hash: 'img0479', if_type: 'merge', mag: 'N/A'}],
								 '186': [{hash: 'img0480', if_type: 'merge', mag: 'N/A'}],
								 '187': [{hash: 'img0481', if_type: 'merge', mag: 'N/A'}],
								 '188': [{hash: 'img0482', if_type: 'merge', mag: 'N/A'}],
								 '189': [{hash: 'img0483', if_type: 'merge', mag: 'N/A'}],
								 '19': [{hash: 'img0313', if_type: 'merge', mag: 'N/A'}],
								 '190': [{hash: 'img0484', if_type: 'merge', mag: 'N/A'}],
								 '191': [{hash: 'img0485', if_type: 'merge', mag: 'N/A'}],
								 '192': [{hash: 'img0486', if_type: 'merge', mag: 'N/A'}],
								 '193': [{hash: 'img0487', if_type: 'merge', mag: 'N/A'}],
								 '194': [{hash: 'img0488', if_type: 'merge', mag: 'N/A'}],
								 '195': [{hash: 'img0489', if_type: 'merge', mag: 'N/A'}],
								 '196': [{hash: 'img0490', if_type: 'merge', mag: 'N/A'}],
								 '197': [{hash: 'img0491', if_type: 'merge', mag: 'N/A'}],
								 '198': [{hash: 'img0492', if_type: 'merge', mag: 'N/A'}],
								 '199': [{hash: 'img0493', if_type: 'merge', mag: 'N/A'}],
								 '2': [{hash: 'img0296', if_type: 'merge', mag: 'N/A'}],
								 '20': [{hash: 'img0314', if_type: 'merge', mag: 'N/A'}],
								 '200': [{hash: 'img0494', if_type: 'merge', mag: 'N/A'}],
								 '201': [{hash: 'img0495', if_type: 'merge', mag: 'N/A'}],
								 '202': [{hash: 'img0496', if_type: 'merge', mag: 'N/A'}],
								 '203': [{hash: 'img0497', if_type: 'merge', mag: 'N/A'}],
								 '204': [{hash: 'img0498', if_type: 'merge', mag: 'N/A'}],
								 '205': [{hash: 'img0499', if_type: 'merge', mag: 'N/A'}],
								 '206': [{hash: 'img0500', if_type: 'merge', mag: 'N/A'}],
								 '207': [{hash: 'img0501', if_type: 'merge', mag: 'N/A'}],
								 '208': [{hash: 'img0502', if_type: 'merge', mag: 'N/A'}],
								 '209': [{hash: 'img0503', if_type: 'merge', mag: 'N/A'}],
								 '21': [{hash: 'img0315', if_type: 'merge', mag: 'N/A'}],
								 '210': [{hash: 'img0504', if_type: 'merge', mag: 'N/A'}],
								 '211': [{hash: 'img0505', if_type: 'merge', mag: 'N/A'}],
								 '212': [{hash: 'img0506', if_type: 'merge', mag: 'N/A'}],
								 '213': [{hash: 'img0507', if_type: 'merge', mag: 'N/A'}],
								 '214': [{hash: 'img0508', if_type: 'merge', mag: 'N/A'}],
								 '215': [{hash: 'img0509', if_type: 'merge', mag: 'N/A'}],
								 '216': [{hash: 'img0510', if_type: 'merge', mag: 'N/A'}],
								 '217': [{hash: 'img0511', if_type: 'merge', mag: 'N/A'}],
								 '218': [{hash: 'img0512', if_type: 'merge', mag: 'N/A'}],
								 '219': [{hash: 'img0513', if_type: 'merge', mag: 'N/A'}],
								 '22': [{hash: 'img0316', if_type: 'merge', mag: 'N/A'}],
								 '220': [{hash: 'img0514', if_type: 'merge', mag: 'N/A'}],
								 '221': [{hash: 'img0515', if_type: 'merge', mag: 'N/A'}],
								 '222': [{hash: 'img0516', if_type: 'merge', mag: 'N/A'}],
								 '223': [{hash: 'img0517', if_type: 'merge', mag: 'N/A'}],
								 '224': [{hash: 'img0518', if_type: 'merge', mag: 'N/A'}],
								 '225': [{hash: 'img0519', if_type: 'merge', mag: 'N/A'}],
								 '226': [{hash: 'img0520', if_type: 'merge', mag: 'N/A'}],
								 '227': [{hash: 'img0521', if_type: 'merge', mag: 'N/A'}],
								 '228': [{hash: 'img0522', if_type: 'merge', mag: 'N/A'}],
								 '229': [{hash: 'img0523', if_type: 'merge', mag: 'N/A'}],
								 '23': [{hash: 'img0317', if_type: 'merge', mag: 'N/A'}],
								 '230': [{hash: 'img0524', if_type: 'merge', mag: 'N/A'}],
								 '231': [{hash: 'img0525', if_type: 'merge', mag: 'N/A'}],
								 '232': [{hash: 'img0526', if_type: 'merge', mag: 'N/A'}],
								 '233': [{hash: 'img0527', if_type: 'merge', mag: 'N/A'}],
								 '234': [{hash: 'img0528', if_type: 'merge', mag: 'N/A'}],
								 '235': [{hash: 'img0529', if_type: 'merge', mag: 'N/A'}],
								 '236': [{hash: 'img0530', if_type: 'merge', mag: 'N/A'}],
								 '237': [{hash: 'img0531', if_type: 'merge', mag: 'N/A'}],
								 '238': [{hash: 'img0532', if_type: 'merge', mag: 'N/A'}],
								 '239': [{hash: 'img0533', if_type: 'merge', mag: 'N/A'}],
								 '24': [{hash: 'img0318', if_type: 'merge', mag: 'N/A'}],
								 '240': [{hash: 'img0534', if_type: 'merge', mag: 'N/A'}],
								 '241': [{hash: 'img0535', if_type: 'merge', mag: 'N/A'}],
								 '242': [{hash: 'img0536', if_type: 'merge', mag: 'N/A'}],
								 '243': [{hash: 'img0537', if_type: 'merge', mag: 'N/A'}],
								 '244': [{hash: 'img0538', if_type: 'merge', mag: 'N/A'}],
								 '245': [{hash: 'img0539', if_type: 'merge', mag: 'N/A'}],
								 '246': [{hash: 'img0540', if_type: 'merge', mag: 'N/A'}],
								 '247': [{hash: 'img0541', if_type: 'merge', mag: 'N/A'}],
								 '248': [{hash: 'img0542', if_type: 'merge', mag: 'N/A'}],
								 '249': [{hash: 'img0543', if_type: 'merge', mag: 'N/A'}],
								 '25': [{hash: 'img0319', if_type: 'merge', mag: 'N/A'}],
								 '250': [{hash: 'img0544', if_type: 'merge', mag: 'N/A'}],
								 '251': [{hash: 'img0545', if_type: 'merge', mag: 'N/A'}],
								 '252': [{hash: 'img0546', if_type: 'merge', mag: 'N/A'}],
								 '253': [{hash: 'img0547', if_type: 'merge', mag: 'N/A'}],
								 '254': [{hash: 'img0548', if_type: 'merge', mag: 'N/A'}],
								 '255': [{hash: 'img0549', if_type: 'merge', mag: 'N/A'}],
								 '256': [{hash: 'img0550', if_type: 'merge', mag: 'N/A'}],
								 '257': [{hash: 'img0551', if_type: 'merge', mag: 'N/A'}],
								 '258': [{hash: 'img0552', if_type: 'merge', mag: 'N/A'}],
								 '259': [{hash: 'img0553', if_type: 'merge', mag: 'N/A'}],
								 '26': [{hash: 'img0320', if_type: 'merge', mag: 'N/A'}],
								 '260': [{hash: 'img0554', if_type: 'merge', mag: 'N/A'}],
								 '261': [{hash: 'img0555', if_type: 'merge', mag: 'N/A'}],
								 '262': [{hash: 'img0556', if_type: 'merge', mag: 'N/A'}],
								 '263': [{hash: 'img0557', if_type: 'merge', mag: 'N/A'}],
								 '264': [{hash: 'img0558', if_type: 'merge', mag: 'N/A'}],
								 '265': [{hash: 'img0559', if_type: 'merge', mag: 'N/A'}],
								 '266': [{hash: 'img0560', if_type: 'merge', mag: 'N/A'}],
								 '267': [{hash: 'img0561', if_type: 'merge', mag: 'N/A'}],
								 '268': [{hash: 'img0562', if_type: 'merge', mag: 'N/A'}],
								 '269': [{hash: 'img0563', if_type: 'merge', mag: 'N/A'}],
								 '27': [{hash: 'img0321', if_type: 'merge', mag: 'N/A'}],
								 '270': [{hash: 'img0564', if_type: 'merge', mag: 'N/A'}],
								 '271': [{hash: 'img0565', if_type: 'merge', mag: 'N/A'}],
								 '272': [{hash: 'img0566', if_type: 'merge', mag: 'N/A'}],
								 '273': [{hash: 'img0567', if_type: 'merge', mag: 'N/A'}],
								 '274': [{hash: 'img0568', if_type: 'merge', mag: 'N/A'}],
								 '275': [{hash: 'img0569', if_type: 'merge', mag: 'N/A'}],
								 '276': [{hash: 'img0570', if_type: 'merge', mag: 'N/A'}],
								 '277': [{hash: 'img0571', if_type: 'merge', mag: 'N/A'}],
								 '278': [{hash: 'img0572', if_type: 'merge', mag: 'N/A'}],
								 '279': [{hash: 'img0573', if_type: 'merge', mag: 'N/A'}],
								 '28': [{hash: 'img0322', if_type: 'merge', mag: 'N/A'}],
								 '280': [{hash: 'img0574', if_type: 'merge', mag: 'N/A'}],
								 '281': [{hash: 'img0575', if_type: 'merge', mag: 'N/A'}],
								 '282': [{hash: 'img0576', if_type: 'merge', mag: 'N/A'}],
								 '283': [{hash: 'img0577', if_type: 'merge', mag: 'N/A'}],
								 '284': [{hash: 'img0578', if_type: 'merge', mag: 'N/A'}],
								 '285': [{hash: 'img0579', if_type: 'merge', mag: 'N/A'}],
								 '286': [{hash: 'img0580', if_type: 'merge', mag: 'N/A'}],
								 '287': [{hash: 'img0581', if_type: 'merge', mag: 'N/A'}],
								 '288': [{hash: 'img0582', if_type: 'merge', mag: 'N/A'}],
								 '289': [{hash: 'img0583', if_type: 'merge', mag: 'N/A'}],
								 '29': [{hash: 'img0323', if_type: 'merge', mag: 'N/A'}],
								 '290': [{hash: 'img0584', if_type: 'merge', mag: 'N/A'}],
								 '291': [{hash: 'img0585', if_type: 'merge', mag: 'N/A'}],
								 '292': [{hash: 'img0586', if_type: 'merge', mag: 'N/A'}],
								 '293': [{hash: 'img0587', if_type: 'merge', mag: 'N/A'}],
								 '294': [{hash: 'img0588', if_type: 'merge', mag: 'N/A'}],
								 '295': [{hash: 'img0589', if_type: 'merge', mag: 'N/A'}],
								 '296': [{hash: 'img0590', if_type: 'merge', mag: 'N/A'}],
								 '297': [{hash: 'img0591', if_type: 'merge', mag: 'N/A'}],
								 '298': [{hash: 'img0592', if_type: 'merge', mag: 'N/A'}],
								 '299': [{hash: 'img0593', if_type: 'merge', mag: 'N/A'}],
								 '3': [{hash: 'img0297', if_type: 'merge', mag: 'N/A'}],
								 '30': [{hash: 'img0324', if_type: 'merge', mag: 'N/A'}],
								 '300': [{hash: 'img0594', if_type: 'merge', mag: 'N/A'}],
								 '301': [{hash: 'img0595', if_type: 'merge', mag: 'N/A'}],
								 '302': [{hash: 'img0596', if_type: 'merge', mag: 'N/A'}],
								 '303': [{hash: 'img0597', if_type: 'merge', mag: 'N/A'}],
								 '304': [{hash: 'img0598', if_type: 'merge', mag: 'N/A'}],
								 '305': [{hash: 'img0599', if_type: 'merge', mag: 'N/A'}],
								 '306': [{hash: 'img0600', if_type: 'merge', mag: 'N/A'}],
								 '307': [{hash: 'img0601', if_type: 'merge', mag: 'N/A'}],
								 '308': [{hash: 'img0602', if_type: 'merge', mag: 'N/A'}],
								 '309': [{hash: 'img0603', if_type: 'merge', mag: 'N/A'}],
								 '31': [{hash: 'img0325', if_type: 'merge', mag: 'N/A'}],
								 '310': [{hash: 'img0604', if_type: 'merge', mag: 'N/A'}],
								 '311': [{hash: 'img0605', if_type: 'merge', mag: 'N/A'}],
								 '312': [{hash: 'img0606', if_type: 'merge', mag: 'N/A'}],
								 '313': [{hash: 'img0607', if_type: 'merge', mag: 'N/A'}],
								 '314': [{hash: 'img0608', if_type: 'merge', mag: 'N/A'}],
								 '315': [{hash: 'img0609', if_type: 'merge', mag: 'N/A'}],
								 '316': [{hash: 'img0610', if_type: 'merge', mag: 'N/A'}],
								 '317': [{hash: 'img0611', if_type: 'merge', mag: 'N/A'}],
								 '318': [{hash: 'img0612', if_type: 'merge', mag: 'N/A'}],
								 '319': [{hash: 'img0613', if_type: 'merge', mag: 'N/A'}],
								 '32': [{hash: 'img0326', if_type: 'merge', mag: 'N/A'}],
								 '320': [{hash: 'img0614', if_type: 'merge', mag: 'N/A'}],
								 '321': [{hash: 'img0615', if_type: 'merge', mag: 'N/A'}],
								 '322': [{hash: 'img0616', if_type: 'merge', mag: 'N/A'}],
								 '323': [{hash: 'img0617', if_type: 'merge', mag: 'N/A'}],
								 '324': [{hash: 'img0618', if_type: 'merge', mag: 'N/A'}],
								 '325': [{hash: 'img0619', if_type: 'merge', mag: 'N/A'}],
								 '326': [{hash: 'img0620', if_type: 'merge', mag: 'N/A'}],
								 '327': [{hash: 'img0621', if_type: 'merge', mag: 'N/A'}],
								 '328': [{hash: 'img0622', if_type: 'merge', mag: 'N/A'}],
								 '329': [{hash: 'img0623', if_type: 'merge', mag: 'N/A'}],
								 '33': [{hash: 'img0327', if_type: 'merge', mag: 'N/A'}],
								 '330': [{hash: 'img0624', if_type: 'merge', mag: 'N/A'}],
								 '331': [{hash: 'img0625', if_type: 'merge', mag: 'N/A'}],
								 '332': [{hash: 'img0626', if_type: 'merge', mag: 'N/A'}],
								 '333': [{hash: 'img0627', if_type: 'merge', mag: 'N/A'}],
								 '334': [{hash: 'img0628', if_type: 'merge', mag: 'N/A'}],
								 '335': [{hash: 'img0629', if_type: 'merge', mag: 'N/A'}],
								 '336': [{hash: 'img0630', if_type: 'merge', mag: 'N/A'}],
								 '337': [{hash: 'img0631', if_type: 'merge', mag: 'N/A'}],
								 '338': [{hash: 'img0632', if_type: 'merge', mag: 'N/A'}],
								 '339': [{hash: 'img0633', if_type: 'merge', mag: 'N/A'}],
								 '34': [{hash: 'img0328', if_type: 'merge', mag: 'N/A'}],
								 '340': [{hash: 'img0634', if_type: 'merge', mag: 'N/A'}],
								 '341': [{hash: 'img0635', if_type: 'merge', mag: 'N/A'}],
								 '342': [{hash: 'img0636', if_type: 'merge', mag: 'N/A'}],
								 '343': [{hash: 'img0637', if_type: 'merge', mag: 'N/A'}],
								 '344': [{hash: 'img0638', if_type: 'merge', mag: 'N/A'}],
								 '345': [{hash: 'img0639', if_type: 'merge', mag: 'N/A'}],
								 '346': [{hash: 'img0640', if_type: 'merge', mag: 'N/A'}],
								 '347': [{hash: 'img0641', if_type: 'merge', mag: 'N/A'}],
								 '348': [{hash: 'img0642', if_type: 'merge', mag: 'N/A'}],
								 '349': [{hash: 'img0643', if_type: 'merge', mag: 'N/A'}],
								 '35': [{hash: 'img0329', if_type: 'merge', mag: 'N/A'}],
								 '350': [{hash: 'img0644', if_type: 'merge', mag: 'N/A'}],
								 '351': [{hash: 'img0645', if_type: 'merge', mag: 'N/A'}],
								 '352': [{hash: 'img0646', if_type: 'merge', mag: 'N/A'}],
								 '353': [{hash: 'img0647', if_type: 'merge', mag: 'N/A'}],
								 '354': [{hash: 'img0648', if_type: 'merge', mag: 'N/A'}],
								 '355': [{hash: 'img0649', if_type: 'merge', mag: 'N/A'}],
								 '356': [{hash: 'img0650', if_type: 'merge', mag: 'N/A'}],
								 '357': [{hash: 'img0651', if_type: 'merge', mag: 'N/A'}],
								 '358': [{hash: 'img0652', if_type: 'merge', mag: 'N/A'}],
								 '359': [{hash: 'img0653', if_type: 'merge', mag: 'N/A'}],
								 '36': [{hash: 'img0330', if_type: 'merge', mag: 'N/A'}],
								 '360': [{hash: 'img0654', if_type: 'merge', mag: 'N/A'}],
								 '361': [{hash: 'img0655', if_type: 'merge', mag: 'N/A'}],
								 '362': [{hash: 'img0656', if_type: 'merge', mag: 'N/A'}],
								 '363': [{hash: 'img0657', if_type: 'merge', mag: 'N/A'}],
								 '364': [{hash: 'img0658', if_type: 'merge', mag: 'N/A'}],
								 '365': [{hash: 'img0659', if_type: 'merge', mag: 'N/A'}],
								 '366': [{hash: 'img0660', if_type: 'merge', mag: 'N/A'}],
								 '367': [{hash: 'img0661', if_type: 'merge', mag: 'N/A'}],
								 '368': [{hash: 'img0662', if_type: 'merge', mag: 'N/A'}],
								 '369': [{hash: 'img0663', if_type: 'merge', mag: 'N/A'}],
								 '37': [{hash: 'img0331', if_type: 'merge', mag: 'N/A'}],
								 '370': [{hash: 'img0664', if_type: 'merge', mag: 'N/A'}],
								 '371': [{hash: 'img0665', if_type: 'merge', mag: 'N/A'}],
								 '372': [{hash: 'img0666', if_type: 'merge', mag: 'N/A'}],
								 '373': [{hash: 'img0667', if_type: 'merge', mag: 'N/A'}],
								 '374': [{hash: 'img0668', if_type: 'merge', mag: 'N/A'}],
								 '375': [{hash: 'img0669', if_type: 'merge', mag: 'N/A'}],
								 '376': [{hash: 'img0670', if_type: 'merge', mag: 'N/A'}],
								 '377': [{hash: 'img0671', if_type: 'merge', mag: 'N/A'}],
								 '378': [{hash: 'img0672', if_type: 'merge', mag: 'N/A'}],
								 '379': [{hash: 'img0673', if_type: 'merge', mag: 'N/A'}],
								 '38': [{hash: 'img0332', if_type: 'merge', mag: 'N/A'}],
								 '380': [{hash: 'img0674', if_type: 'merge', mag: 'N/A'}],
								 '381': [{hash: 'img0675', if_type: 'merge', mag: 'N/A'}],
								 '382': [{hash: 'img0676', if_type: 'merge', mag: 'N/A'}],
								 '383': [{hash: 'img0677', if_type: 'merge', mag: 'N/A'}],
								 '384': [{hash: 'img0678', if_type: 'merge', mag: 'N/A'}],
								 '385': [{hash: 'img0679', if_type: 'merge', mag: 'N/A'}],
								 '386': [{hash: 'img0680', if_type: 'merge', mag: 'N/A'}],
								 '387': [{hash: 'img0681', if_type: 'merge', mag: 'N/A'}],
								 '388': [{hash: 'img0682', if_type: 'merge', mag: 'N/A'}],
								 '389': [{hash: 'img0683', if_type: 'merge', mag: 'N/A'}],
								 '39': [{hash: 'img0333', if_type: 'merge', mag: 'N/A'}],
								 '390': [{hash: 'img0684', if_type: 'merge', mag: 'N/A'}],
								 '391': [{hash: 'img0685', if_type: 'merge', mag: 'N/A'}],
								 '392': [{hash: 'img0686', if_type: 'merge', mag: 'N/A'}],
								 '393': [{hash: 'img0687', if_type: 'merge', mag: 'N/A'}],
								 '394': [{hash: 'img0688', if_type: 'merge', mag: 'N/A'}],
								 '395': [{hash: 'img0689', if_type: 'merge', mag: 'N/A'}],
								 '396': [{hash: 'img0690', if_type: 'merge', mag: 'N/A'}],
								 '397': [{hash: 'img0691', if_type: 'merge', mag: 'N/A'}],
								 '398': [{hash: 'img0692', if_type: 'merge', mag: 'N/A'}],
								 '399': [{hash: 'img0693', if_type: 'merge', mag: 'N/A'}],
								 '4': [{hash: 'img0298', if_type: 'merge', mag: 'N/A'}],
								 '40': [{hash: 'img0334', if_type: 'merge', mag: 'N/A'}],
								 '400': [{hash: 'img0694', if_type: 'merge', mag: 'N/A'}],
								 '401': [{hash: 'img0695', if_type: 'merge', mag: 'N/A'}],
								 '402': [{hash: 'img0696', if_type: 'merge', mag: 'N/A'}],
								 '403': [{hash: 'img0697', if_type: 'merge', mag: 'N/A'}],
								 '404': [{hash: 'img0698', if_type: 'merge', mag: 'N/A'}],
								 '405': [{hash: 'img0699', if_type: 'merge', mag: 'N/A'}],
								 '406': [{hash: 'img0700', if_type: 'merge', mag: 'N/A'}],
								 '407': [{hash: 'img0701', if_type: 'merge', mag: 'N/A'}],
								 '408': [{hash: 'img0702', if_type: 'merge', mag: 'N/A'}],
								 '409': [{hash: 'img0703', if_type: 'merge', mag: 'N/A'}],
								 '41': [{hash: 'img0335', if_type: 'merge', mag: 'N/A'}],
								 '410': [{hash: 'img0704', if_type: 'merge', mag: 'N/A'}],
								 '411': [{hash: 'img0705', if_type: 'merge', mag: 'N/A'}],
								 '412': [{hash: 'img0706', if_type: 'merge', mag: 'N/A'}],
								 '413': [{hash: 'img0707', if_type: 'merge', mag: 'N/A'}],
								 '414': [{hash: 'img0708', if_type: 'merge', mag: 'N/A'}],
								 '415': [{hash: 'img0709', if_type: 'merge', mag: 'N/A'}],
								 '416': [{hash: 'img0710', if_type: 'merge', mag: 'N/A'}],
								 '417': [{hash: 'img0711', if_type: 'merge', mag: 'N/A'}],
								 '418': [{hash: 'img0712', if_type: 'merge', mag: 'N/A'}],
								 '419': [{hash: 'img0713', if_type: 'merge', mag: 'N/A'}],
								 '42': [{hash: 'img0336', if_type: 'merge', mag: 'N/A'}],
								 '420': [{hash: 'img0714', if_type: 'merge', mag: 'N/A'}],
								 '421': [{hash: 'img0715', if_type: 'merge', mag: 'N/A'}],
								 '422': [{hash: 'img0716', if_type: 'merge', mag: 'N/A'}],
								 '423': [{hash: 'img0717', if_type: 'merge', mag: 'N/A'}],
								 '424': [{hash: 'img0718', if_type: 'merge', mag: 'N/A'}],
								 '425': [{hash: 'img0719', if_type: 'merge', mag: 'N/A'}],
								 '426': [{hash: 'img0720', if_type: 'merge', mag: 'N/A'}],
								 '427': [{hash: 'img0721', if_type: 'merge', mag: 'N/A'}],
								 '428': [{hash: 'img0722', if_type: 'merge', mag: 'N/A'}],
								 '429': [{hash: 'img0723', if_type: 'merge', mag: 'N/A'}],
								 '43': [{hash: 'img0337', if_type: 'merge', mag: 'N/A'}],
								 '430': [{hash: 'img0724', if_type: 'merge', mag: 'N/A'}],
								 '431': [{hash: 'img0725', if_type: 'merge', mag: 'N/A'}],
								 '432': [{hash: 'img0726', if_type: 'merge', mag: 'N/A'}],
								 '433': [{hash: 'img0727', if_type: 'merge', mag: 'N/A'}],
								 '434': [{hash: 'img0728', if_type: 'merge', mag: 'N/A'}],
								 '435': [{hash: 'img0729', if_type: 'merge', mag: 'N/A'}],
								 '436': [{hash: 'img0730', if_type: 'merge', mag: 'N/A'}],
								 '437': [{hash: 'img0731', if_type: 'merge', mag: 'N/A'}],
								 '438': [{hash: 'img0732', if_type: 'merge', mag: 'N/A'}],
								 '439': [{hash: 'img0733', if_type: 'merge', mag: 'N/A'}],
								 '44': [{hash: 'img0338', if_type: 'merge', mag: 'N/A'}],
								 '440': [{hash: 'img0734', if_type: 'merge', mag: 'N/A'}],
								 '441': [{hash: 'img0735', if_type: 'merge', mag: 'N/A'}],
								 '442': [{hash: 'img0736', if_type: 'merge', mag: 'N/A'}],
								 '443': [{hash: 'img0737', if_type: 'merge', mag: 'N/A'}],
								 '444': [{hash: 'img0738', if_type: 'merge', mag: 'N/A'}],
								 '445': [{hash: 'img0739', if_type: 'merge', mag: 'N/A'}],
								 '446': [{hash: 'img0740', if_type: 'merge', mag: 'N/A'}],
								 '447': [{hash: 'img0741', if_type: 'merge', mag: 'N/A'}],
								 '448': [{hash: 'img0742', if_type: 'merge', mag: 'N/A'}],
								 '449': [{hash: 'img0743', if_type: 'merge', mag: 'N/A'}],
								 '45': [{hash: 'img0339', if_type: 'merge', mag: 'N/A'}],
								 '450': [{hash: 'img0744', if_type: 'merge', mag: 'N/A'}],
								 '451': [{hash: 'img0745', if_type: 'merge', mag: 'N/A'}],
								 '452': [{hash: 'img0746', if_type: 'merge', mag: 'N/A'}],
								 '453': [{hash: 'img0747', if_type: 'merge', mag: 'N/A'}],
								 '454': [{hash: 'img0748', if_type: 'merge', mag: 'N/A'}],
								 '455': [{hash: 'img0749', if_type: 'merge', mag: 'N/A'}],
								 '456': [{hash: 'img0750', if_type: 'merge', mag: 'N/A'}],
								 '457': [{hash: 'img0751', if_type: 'merge', mag: 'N/A'}],
								 '458': [{hash: 'img0752', if_type: 'merge', mag: 'N/A'}],
								 '459': [{hash: 'img0753', if_type: 'merge', mag: 'N/A'}],
								 '46': [{hash: 'img0340', if_type: 'merge', mag: 'N/A'}],
								 '460': [{hash: 'img0754', if_type: 'merge', mag: 'N/A'}],
								 '461': [{hash: 'img0755', if_type: 'merge', mag: 'N/A'}],
								 '462': [{hash: 'img0756', if_type: 'merge', mag: 'N/A'}],
								 '463': [{hash: 'img0757', if_type: 'merge', mag: 'N/A'}],
								 '464': [{hash: 'img0758', if_type: 'merge', mag: 'N/A'}],
								 '465': [{hash: 'img0759', if_type: 'merge', mag: 'N/A'}],
								 '466': [{hash: 'img0760', if_type: 'merge', mag: 'N/A'}],
								 '467': [{hash: 'img0761', if_type: 'merge', mag: 'N/A'}],
								 '468': [{hash: 'img0762', if_type: 'merge', mag: 'N/A'}],
								 '469': [{hash: 'img0763', if_type: 'merge', mag: 'N/A'}],
								 '47': [{hash: 'img0341', if_type: 'merge', mag: 'N/A'}],
								 '470': [{hash: 'img0764', if_type: 'merge', mag: 'N/A'}],
								 '471': [{hash: 'img0765', if_type: 'merge', mag: 'N/A'}],
								 '472': [{hash: 'img0766', if_type: 'merge', mag: 'N/A'}],
								 '473': [{hash: 'img0767', if_type: 'merge', mag: 'N/A'}],
								 '474': [{hash: 'img0768', if_type: 'merge', mag: 'N/A'}],
								 '475': [{hash: 'img0769', if_type: 'merge', mag: 'N/A'}],
								 '476': [{hash: 'img0770', if_type: 'merge', mag: 'N/A'}],
								 '477': [{hash: 'img0771', if_type: 'merge', mag: 'N/A'}],
								 '478': [{hash: 'img0772', if_type: 'merge', mag: 'N/A'}],
								 '479': [{hash: 'img0773', if_type: 'merge', mag: 'N/A'}],
								 '48': [{hash: 'img0342', if_type: 'merge', mag: 'N/A'}],
								 '480': [{hash: 'img0774', if_type: 'merge', mag: 'N/A'}],
								 '481': [{hash: 'img0775', if_type: 'merge', mag: 'N/A'}],
								 '482': [{hash: 'img0776', if_type: 'merge', mag: 'N/A'}],
								 '483': [{hash: 'img0777', if_type: 'merge', mag: 'N/A'}],
								 '484': [{hash: 'img0778', if_type: 'merge', mag: 'N/A'}],
								 '485': [{hash: 'img0779', if_type: 'merge', mag: 'N/A'}],
								 '486': [{hash: 'img0780', if_type: 'merge', mag: 'N/A'}],
								 '487': [{hash: 'img0781', if_type: 'merge', mag: 'N/A'}],
								 '488': [{hash: 'img0782', if_type: 'merge', mag: 'N/A'}],
								 '489': [{hash: 'img0783', if_type: 'merge', mag: 'N/A'}],
								 '49': [{hash: 'img0343', if_type: 'merge', mag: 'N/A'}],
								 '490': [{hash: 'img0784', if_type: 'merge', mag: 'N/A'}],
								 '491': [{hash: 'img0785', if_type: 'merge', mag: 'N/A'}],
								 '492': [{hash: 'img0786', if_type: 'merge', mag: 'N/A'}],
								 '493': [{hash: 'img0787', if_type: 'merge', mag: 'N/A'}],
								 '494': [{hash: 'img0788', if_type: 'merge', mag: 'N/A'}],
								 '495': [{hash: 'img0789', if_type: 'merge', mag: 'N/A'}],
								 '496': [{hash: 'img0790', if_type: 'merge', mag: 'N/A'}],
								 '497': [{hash: 'img0791', if_type: 'merge', mag: 'N/A'}],
								 '498': [{hash: 'img0792', if_type: 'merge', mag: 'N/A'}],
								 '499': [{hash: 'img0793', if_type: 'merge', mag: 'N/A'}],
								 '5': [{hash: 'img0299', if_type: 'merge', mag: 'N/A'}],
								 '50': [{hash: 'img0344', if_type: 'merge', mag: 'N/A'}],
								 '500': [{hash: 'img0794', if_type: 'merge', mag: 'N/A'}],
								 '501': [{hash: 'img0795', if_type: 'merge', mag: 'N/A'}],
								 '502': [{hash: 'img0796', if_type: 'merge', mag: 'N/A'}],
								 '503': [{hash: 'img0797', if_type: 'merge', mag: 'N/A'}],
								 '504': [{hash: 'img0798', if_type: 'merge', mag: 'N/A'}],
								 '505': [{hash: 'img0799', if_type: 'merge', mag: 'N/A'}],
								 '506': [{hash: 'img0800', if_type: 'merge', mag: 'N/A'}],
								 '507': [{hash: 'img0801', if_type: 'merge', mag: 'N/A'}],
								 '508': [{hash: 'img0802', if_type: 'merge', mag: 'N/A'}],
								 '509': [{hash: 'img0803', if_type: 'merge', mag: 'N/A'}],
								 '51': [{hash: 'img0345', if_type: 'merge', mag: 'N/A'}],
								 '510': [{hash: 'img0804', if_type: 'merge', mag: 'N/A'}],
								 '511': [{hash: 'img0805', if_type: 'merge', mag: 'N/A'}],
								 '512': [{hash: 'img0806', if_type: 'merge', mag: 'N/A'}],
								 '513': [{hash: 'img0807', if_type: 'merge', mag: 'N/A'}],
								 '514': [{hash: 'img0808', if_type: 'merge', mag: 'N/A'}],
								 '515': [{hash: 'img0809', if_type: 'merge', mag: 'N/A'}],
								 '516': [{hash: 'img0810', if_type: 'merge', mag: 'N/A'}],
								 '517': [{hash: 'img0811', if_type: 'merge', mag: 'N/A'}],
								 '518': [{hash: 'img0812', if_type: 'merge', mag: 'N/A'}],
								 '519': [{hash: 'img0813', if_type: 'merge', mag: 'N/A'}],
								 '52': [{hash: 'img0346', if_type: 'merge', mag: 'N/A'}],
								 '520': [{hash: 'img0814', if_type: 'merge', mag: 'N/A'}],
								 '521': [{hash: 'img0815', if_type: 'merge', mag: 'N/A'}],
								 '522': [{hash: 'img0816', if_type: 'merge', mag: 'N/A'}],
								 '523': [{hash: 'img0817', if_type: 'merge', mag: 'N/A'}],
								 '524': [{hash: 'img0818', if_type: 'merge', mag: 'N/A'}],
								 '525': [{hash: 'img0819', if_type: 'merge', mag: 'N/A'}],
								 '526': [{hash: 'img0820', if_type: 'merge', mag: 'N/A'}],
								 '527': [{hash: 'img0821', if_type: 'merge', mag: 'N/A'}],
								 '528': [{hash: 'img0822', if_type: 'merge', mag: 'N/A'}],
								 '529': [{hash: 'img0823', if_type: 'merge', mag: 'N/A'}],
								 '53': [{hash: 'img0347', if_type: 'merge', mag: 'N/A'}],
								 '530': [{hash: 'img0824', if_type: 'merge', mag: 'N/A'}],
								 '531': [{hash: 'img0825', if_type: 'merge', mag: 'N/A'}],
								 '532': [{hash: 'img0826', if_type: 'merge', mag: 'N/A'}],
								 '533': [{hash: 'img0827', if_type: 'merge', mag: 'N/A'}],
								 '534': [{hash: 'img0828', if_type: 'merge', mag: 'N/A'}],
								 '535': [{hash: 'img0829', if_type: 'merge', mag: 'N/A'}],
								 '536': [{hash: 'img0830', if_type: 'merge', mag: 'N/A'}],
								 '537': [{hash: 'img0831', if_type: 'merge', mag: 'N/A'}],
								 '538': [{hash: 'img0832', if_type: 'merge', mag: 'N/A'}],
								 '539': [{hash: 'img0833', if_type: 'merge', mag: 'N/A'}],
								 '54': [{hash: 'img0348', if_type: 'merge', mag: 'N/A'}],
								 '540': [{hash: 'img0834', if_type: 'merge', mag: 'N/A'}],
								 '541': [{hash: 'img0835', if_type: 'merge', mag: 'N/A'}],
								 '542': [{hash: 'img0836', if_type: 'merge', mag: 'N/A'}],
								 '543': [{hash: 'img0837', if_type: 'merge', mag: 'N/A'}],
								 '544': [{hash: 'img0838', if_type: 'merge', mag: 'N/A'}],
								 '545': [{hash: 'img0839', if_type: 'merge', mag: 'N/A'}],
								 '546': [{hash: 'img0840', if_type: 'merge', mag: 'N/A'}],
								 '547': [{hash: 'img0841', if_type: 'merge', mag: 'N/A'}],
								 '548': [{hash: 'img0842', if_type: 'merge', mag: 'N/A'}],
								 '549': [{hash: 'img0843', if_type: 'merge', mag: 'N/A'}],
								 '55': [{hash: 'img0349', if_type: 'merge', mag: 'N/A'}],
								 '550': [{hash: 'img0844', if_type: 'merge', mag: 'N/A'}],
								 '551': [{hash: 'img0845', if_type: 'merge', mag: 'N/A'}],
								 '552': [{hash: 'img0846', if_type: 'merge', mag: 'N/A'}],
								 '553': [{hash: 'img0847', if_type: 'merge', mag: 'N/A'}],
								 '554': [{hash: 'img0848', if_type: 'merge', mag: 'N/A'}],
								 '555': [{hash: 'img0849', if_type: 'merge', mag: 'N/A'}],
								 '556': [{hash: 'img0850', if_type: 'merge', mag: 'N/A'}],
								 '557': [{hash: 'img0851', if_type: 'merge', mag: 'N/A'}],
								 '558': [{hash: 'img0852', if_type: 'merge', mag: 'N/A'}],
								 '559': [{hash: 'img0853', if_type: 'merge', mag: 'N/A'}],
								 '56': [{hash: 'img0350', if_type: 'merge', mag: 'N/A'}],
								 '560': [{hash: 'img0854', if_type: 'merge', mag: 'N/A'}],
								 '561': [{hash: 'img0855', if_type: 'merge', mag: 'N/A'}],
								 '562': [{hash: 'img0856', if_type: 'merge', mag: 'N/A'}],
								 '563': [{hash: 'img0857', if_type: 'merge', mag: 'N/A'}],
								 '564': [{hash: 'img0858', if_type: 'merge', mag: 'N/A'}],
								 '565': [{hash: 'img0859', if_type: 'merge', mag: 'N/A'}],
								 '566': [{hash: 'img0860', if_type: 'merge', mag: 'N/A'}],
								 '567': [{hash: 'img0861', if_type: 'merge', mag: 'N/A'}],
								 '568': [{hash: 'img0862', if_type: 'merge', mag: 'N/A'}],
								 '569': [{hash: 'img0863', if_type: 'merge', mag: 'N/A'}],
								 '57': [{hash: 'img0351', if_type: 'merge', mag: 'N/A'}],
								 '570': [{hash: 'img0864', if_type: 'merge', mag: 'N/A'}],
								 '571': [{hash: 'img0865', if_type: 'merge', mag: 'N/A'}],
								 '572': [{hash: 'img0866', if_type: 'merge', mag: 'N/A'}],
								 '573': [{hash: 'img0867', if_type: 'merge', mag: 'N/A'}],
								 '574': [{hash: 'img0868', if_type: 'merge', mag: 'N/A'}],
								 '575': [{hash: 'img0869', if_type: 'merge', mag: 'N/A'}],
								 '576': [{hash: 'img0870', if_type: 'merge', mag: 'N/A'}],
								 '577': [{hash: 'img0871', if_type: 'merge', mag: 'N/A'}],
								 '578': [{hash: 'img0872', if_type: 'merge', mag: 'N/A'}],
								 '579': [{hash: 'img0873', if_type: 'merge', mag: 'N/A'}],
								 '58': [{hash: 'img0352', if_type: 'merge', mag: 'N/A'}],
								 '580': [{hash: 'img0874', if_type: 'merge', mag: 'N/A'}],
								 '581': [{hash: 'img0875', if_type: 'merge', mag: 'N/A'}],
								 '582': [{hash: 'img0876', if_type: 'merge', mag: 'N/A'}],
								 '583': [{hash: 'img0877', if_type: 'merge', mag: 'N/A'}],
								 '584': [{hash: 'img0878', if_type: 'merge', mag: 'N/A'}],
								 '585': [{hash: 'img0879', if_type: 'merge', mag: 'N/A'}],
								 '586': [{hash: 'img0880', if_type: 'merge', mag: 'N/A'}],
								 '587': [{hash: 'img0881', if_type: 'merge', mag: 'N/A'}],
								 '588': [{hash: 'img0882', if_type: 'merge', mag: 'N/A'}],
								 '589': [{hash: 'img0883', if_type: 'merge', mag: 'N/A'}],
								 '59': [{hash: 'img0353', if_type: 'merge', mag: 'N/A'}],
								 '590': [{hash: 'img0884', if_type: 'merge', mag: 'N/A'}],
								 '591': [{hash: 'img0885', if_type: 'merge', mag: 'N/A'}],
								 '592': [{hash: 'img0886', if_type: 'merge', mag: 'N/A'}],
								 '593': [{hash: 'img0887', if_type: 'merge', mag: 'N/A'}],
								 '594': [{hash: 'img0888', if_type: 'merge', mag: 'N/A'}],
								 '595': [{hash: 'img0889', if_type: 'merge', mag: 'N/A'}],
								 '596': [{hash: 'img0890', if_type: 'merge', mag: 'N/A'}],
								 '597': [{hash: 'img0891', if_type: 'merge', mag: 'N/A'}],
								 '598': [{hash: 'img0892', if_type: 'merge', mag: 'N/A'}],
								 '599': [{hash: 'img0893', if_type: 'merge', mag: 'N/A'}],
								 '6': [{hash: 'img0300', if_type: 'merge', mag: 'N/A'}],
								 '60': [{hash: 'img0354', if_type: 'merge', mag: 'N/A'}],
								 '600': [{hash: 'img0894', if_type: 'merge', mag: 'N/A'}],
								 '601': [{hash: 'img0895', if_type: 'merge', mag: 'N/A'}],
								 '602': [{hash: 'img0896', if_type: 'merge', mag: 'N/A'}],
								 '603': [{hash: 'img0897', if_type: 'merge', mag: 'N/A'}],
								 '604': [{hash: 'img0898', if_type: 'merge', mag: 'N/A'}],
								 '605': [{hash: 'img0899', if_type: 'merge', mag: 'N/A'}],
								 '606': [{hash: 'img0900', if_type: 'merge', mag: 'N/A'}],
								 '607': [{hash: 'img0901', if_type: 'merge', mag: 'N/A'}],
								 '608': [{hash: 'img0902', if_type: 'merge', mag: 'N/A'}],
								 '609': [{hash: 'img0903', if_type: 'merge', mag: 'N/A'}],
								 '61': [{hash: 'img0355', if_type: 'merge', mag: 'N/A'}],
								 '610': [{hash: 'img0904', if_type: 'merge', mag: 'N/A'}],
								 '611': [{hash: 'img0905', if_type: 'merge', mag: 'N/A'}],
								 '612': [{hash: 'img0906', if_type: 'merge', mag: 'N/A'}],
								 '613': [{hash: 'img0907', if_type: 'merge', mag: 'N/A'}],
								 '614': [{hash: 'img0908', if_type: 'merge', mag: 'N/A'}],
								 '615': [{hash: 'img0909', if_type: 'merge', mag: 'N/A'}],
								 '616': [{hash: 'img0910', if_type: 'merge', mag: 'N/A'}],
								 '617': [{hash: 'img0911', if_type: 'merge', mag: 'N/A'}],
								 '618': [{hash: 'img0912', if_type: 'merge', mag: 'N/A'}],
								 '619': [{hash: 'img0913', if_type: 'merge', mag: 'N/A'}],
								 '62': [{hash: 'img0356', if_type: 'merge', mag: 'N/A'}],
								 '620': [{hash: 'img0914', if_type: 'merge', mag: 'N/A'}],
								 '621': [{hash: 'img0915', if_type: 'merge', mag: 'N/A'}],
								 '622': [{hash: 'img0916', if_type: 'merge', mag: 'N/A'}],
								 '623': [{hash: 'img0917', if_type: 'merge', mag: 'N/A'}],
								 '624': [{hash: 'img0918', if_type: 'merge', mag: 'N/A'}],
								 '625': [{hash: 'img0919', if_type: 'merge', mag: 'N/A'}],
								 '626': [{hash: 'img0920', if_type: 'merge', mag: 'N/A'}],
								 '627': [{hash: 'img0921', if_type: 'merge', mag: 'N/A'}],
								 '628': [{hash: 'img0922', if_type: 'merge', mag: 'N/A'}],
								 '629': [{hash: 'img0923', if_type: 'merge', mag: 'N/A'}],
								 '63': [{hash: 'img0357', if_type: 'merge', mag: 'N/A'}],
								 '630': [{hash: 'img0924', if_type: 'merge', mag: 'N/A'}],
								 '631': [{hash: 'img0925', if_type: 'merge', mag: 'N/A'}],
								 '632': [{hash: 'img0926', if_type: 'merge', mag: 'N/A'}],
								 '633': [{hash: 'img0927', if_type: 'merge', mag: 'N/A'}],
								 '634': [{hash: 'img0928', if_type: 'merge', mag: 'N/A'}],
								 '635': [{hash: 'img0929', if_type: 'merge', mag: 'N/A'}],
								 '636': [{hash: 'img0930', if_type: 'merge', mag: 'N/A'}],
								 '637': [{hash: 'img0931', if_type: 'merge', mag: 'N/A'}],
								 '638': [{hash: 'img0932', if_type: 'merge', mag: 'N/A'}],
								 '639': [{hash: 'img0933', if_type: 'merge', mag: 'N/A'}],
								 '64': [{hash: 'img0358', if_type: 'merge', mag: 'N/A'}],
								 '640': [{hash: 'img0934', if_type: 'merge', mag: 'N/A'}],
								 '641': [{hash: 'img0935', if_type: 'merge', mag: 'N/A'}],
								 '642': [{hash: 'img0936', if_type: 'merge', mag: 'N/A'}],
								 '643': [{hash: 'img0937', if_type: 'merge', mag: 'N/A'}],
								 '644': [{hash: 'img0938', if_type: 'merge', mag: 'N/A'}],
								 '645': [{hash: 'img0939', if_type: 'merge', mag: 'N/A'}],
								 '646': [{hash: 'img0940', if_type: 'merge', mag: 'N/A'}],
								 '647': [{hash: 'img0941', if_type: 'merge', mag: 'N/A'}],
								 '648': [{hash: 'img0942', if_type: 'merge', mag: 'N/A'}],
								 '649': [{hash: 'img0943', if_type: 'merge', mag: 'N/A'}],
								 '65': [{hash: 'img0359', if_type: 'merge', mag: 'N/A'}],
								 '650': [{hash: 'img0944', if_type: 'merge', mag: 'N/A'}],
								 '651': [{hash: 'img0945', if_type: 'merge', mag: 'N/A'}],
								 '652': [{hash: 'img0946', if_type: 'merge', mag: 'N/A'}],
								 '653': [{hash: 'img0947', if_type: 'merge', mag: 'N/A'}],
								 '654': [{hash: 'img0948', if_type: 'merge', mag: 'N/A'}],
								 '655': [{hash: 'img0949', if_type: 'merge', mag: 'N/A'}],
								 '656': [{hash: 'img0950', if_type: 'merge', mag: 'N/A'}],
								 '657': [{hash: 'img0951', if_type: 'merge', mag: 'N/A'}],
								 '658': [{hash: 'img0952', if_type: 'merge', mag: 'N/A'}],
								 '659': [{hash: 'img0953', if_type: 'merge', mag: 'N/A'}],
								 '66': [{hash: 'img0360', if_type: 'merge', mag: 'N/A'}],
								 '660': [{hash: 'img0954', if_type: 'merge', mag: 'N/A'}],
								 '661': [{hash: 'img0955', if_type: 'merge', mag: 'N/A'}],
								 '662': [{hash: 'img0956', if_type: 'merge', mag: 'N/A'}],
								 '663': [{hash: 'img0957', if_type: 'merge', mag: 'N/A'}],
								 '664': [{hash: 'img0958', if_type: 'merge', mag: 'N/A'}],
								 '665': [{hash: 'img0959', if_type: 'merge', mag: 'N/A'}],
								 '666': [{hash: 'img0960', if_type: 'merge', mag: 'N/A'}],
								 '667': [{hash: 'img0961', if_type: 'merge', mag: 'N/A'}],
								 '668': [{hash: 'img0962', if_type: 'merge', mag: 'N/A'}],
								 '669': [{hash: 'img0963', if_type: 'merge', mag: 'N/A'}],
								 '67': [{hash: 'img0361', if_type: 'merge', mag: 'N/A'}],
								 '670': [{hash: 'img0964', if_type: 'merge', mag: 'N/A'}],
								 '671': [{hash: 'img0965', if_type: 'merge', mag: 'N/A'}],
								 '672': [{hash: 'img0966', if_type: 'merge', mag: 'N/A'}],
								 '673': [{hash: 'img0967', if_type: 'merge', mag: 'N/A'}],
								 '674': [{hash: 'img0968', if_type: 'merge', mag: 'N/A'}],
								 '675': [{hash: 'img0969', if_type: 'merge', mag: 'N/A'}],
								 '676': [{hash: 'img0970', if_type: 'merge', mag: 'N/A'}],
								 '677': [{hash: 'img0971', if_type: 'merge', mag: 'N/A'}],
								 '678': [{hash: 'img0972', if_type: 'merge', mag: 'N/A'}],
								 '679': [{hash: 'img0973', if_type: 'merge', mag: 'N/A'}],
								 '68': [{hash: 'img0362', if_type: 'merge', mag: 'N/A'}],
								 '680': [{hash: 'img0974', if_type: 'merge', mag: 'N/A'}],
								 '681': [{hash: 'img0975', if_type: 'merge', mag: 'N/A'}],
								 '682': [{hash: 'img0976', if_type: 'merge', mag: 'N/A'}],
								 '683': [{hash: 'img0977', if_type: 'merge', mag: 'N/A'}],
								 '684': [{hash: 'img0978', if_type: 'merge', mag: 'N/A'}],
								 '685': [{hash: 'img0979', if_type: 'merge', mag: 'N/A'}],
								 '686': [{hash: 'img0980', if_type: 'merge', mag: 'N/A'}],
								 '687': [{hash: 'img0981', if_type: 'merge', mag: 'N/A'}],
								 '688': [{hash: 'img0982', if_type: 'merge', mag: 'N/A'}],
								 '689': [{hash: 'img0983', if_type: 'merge', mag: 'N/A'}],
								 '69': [{hash: 'img0363', if_type: 'merge', mag: 'N/A'}],
								 '690': [{hash: 'img0984', if_type: 'merge', mag: 'N/A'}],
								 '691': [{hash: 'img0985', if_type: 'merge', mag: 'N/A'}],
								 '692': [{hash: 'img0986', if_type: 'merge', mag: 'N/A'}],
								 '693': [{hash: 'img0987', if_type: 'merge', mag: 'N/A'}],
								 '694': [{hash: 'img0988', if_type: 'merge', mag: 'N/A'}],
								 '695': [{hash: 'img0989', if_type: 'merge', mag: 'N/A'}],
								 '696': [{hash: 'img0990', if_type: 'merge', mag: 'N/A'}],
								 '697': [{hash: 'img0991', if_type: 'merge', mag: 'N/A'}],
								 '698': [{hash: 'img0992', if_type: 'merge', mag: 'N/A'}],
								 '699': [{hash: 'img0993', if_type: 'merge', mag: 'N/A'}],
								 '7': [{hash: 'img0301', if_type: 'merge', mag: 'N/A'}],
								 '70': [{hash: 'img0364', if_type: 'merge', mag: 'N/A'}],
								 '700': [{hash: 'img0994', if_type: 'merge', mag: 'N/A'}],
								 '701': [{hash: 'img0995', if_type: 'merge', mag: 'N/A'}],
								 '702': [{hash: 'img0996', if_type: 'merge', mag: 'N/A'}],
								 '703': [{hash: 'img0997', if_type: 'merge', mag: 'N/A'}],
								 '704': [{hash: 'img0998', if_type: 'merge', mag: 'N/A'}],
								 '705': [{hash: 'img0999', if_type: 'merge', mag: 'N/A'}],
								 '706': [{hash: 'img1000', if_type: 'merge', mag: 'N/A'}],
								 '707': [{hash: 'img1001', if_type: 'merge', mag: 'N/A'}],
								 '708': [{hash: 'img1002', if_type: 'merge', mag: 'N/A'}],
								 '709': [{hash: 'img1003', if_type: 'merge', mag: 'N/A'}],
								 '71': [{hash: 'img0365', if_type: 'merge', mag: 'N/A'}],
								 '710': [{hash: 'img1004', if_type: 'merge', mag: 'N/A'}],
								 '711': [{hash: 'img1005', if_type: 'merge', mag: 'N/A'}],
								 '712': [{hash: 'img1006', if_type: 'merge', mag: 'N/A'}],
								 '713': [{hash: 'img1007', if_type: 'merge', mag: 'N/A'}],
								 '714': [{hash: 'img1008', if_type: 'merge', mag: 'N/A'}],
								 '715': [{hash: 'img1009', if_type: 'merge', mag: 'N/A'}],
								 '716': [{hash: 'img1010', if_type: 'merge', mag: 'N/A'}],
								 '717': [{hash: 'img1011', if_type: 'merge', mag: 'N/A'}],
								 '718': [{hash: 'img1012', if_type: 'merge', mag: 'N/A'}],
								 '719': [{hash: 'img1013', if_type: 'merge', mag: 'N/A'}],
								 '72': [{hash: 'img0366', if_type: 'merge', mag: 'N/A'}],
								 '720': [{hash: 'img1014', if_type: 'merge', mag: 'N/A'}],
								 '721': [{hash: 'img1015', if_type: 'merge', mag: 'N/A'}],
								 '722': [{hash: 'img1016', if_type: 'merge', mag: 'N/A'}],
								 '723': [{hash: 'img1017', if_type: 'merge', mag: 'N/A'}],
								 '724': [{hash: 'img1018', if_type: 'merge', mag: 'N/A'}],
								 '725': [{hash: 'img1019', if_type: 'merge', mag: 'N/A'}],
								 '726': [{hash: 'img1020', if_type: 'merge', mag: 'N/A'}],
								 '727': [{hash: 'img1021', if_type: 'merge', mag: 'N/A'}],
								 '728': [{hash: 'img1022', if_type: 'merge', mag: 'N/A'}],
								 '729': [{hash: 'img1023', if_type: 'merge', mag: 'N/A'}],
								 '73': [{hash: 'img0367', if_type: 'merge', mag: 'N/A'}],
								 '730': [{hash: 'img1024', if_type: 'merge', mag: 'N/A'}],
								 '731': [{hash: 'img1025', if_type: 'merge', mag: 'N/A'}],
								 '732': [{hash: 'img1026', if_type: 'merge', mag: 'N/A'}],
								 '733': [{hash: 'img1027', if_type: 'merge', mag: 'N/A'}],
								 '734': [{hash: 'img1028', if_type: 'merge', mag: 'N/A'}],
								 '735': [{hash: 'img1029', if_type: 'merge', mag: 'N/A'}],
								 '736': [{hash: 'img1030', if_type: 'merge', mag: 'N/A'}],
								 '737': [{hash: 'img1031', if_type: 'merge', mag: 'N/A'}],
								 '738': [{hash: 'img1032', if_type: 'merge', mag: 'N/A'}],
								 '739': [{hash: 'img1033', if_type: 'merge', mag: 'N/A'}],
								 '74': [{hash: 'img0368', if_type: 'merge', mag: 'N/A'}],
								 '740': [{hash: 'img1034', if_type: 'merge', mag: 'N/A'}],
								 '741': [{hash: 'img1035', if_type: 'merge', mag: 'N/A'}],
								 '742': [{hash: 'img1036', if_type: 'merge', mag: 'N/A'}],
								 '743': [{hash: 'img1037', if_type: 'merge', mag: 'N/A'}],
								 '744': [{hash: 'img1038', if_type: 'merge', mag: 'N/A'}],
								 '745': [{hash: 'img1039', if_type: 'merge', mag: 'N/A'}],
								 '746': [{hash: 'img1040', if_type: 'merge', mag: 'N/A'}],
								 '747': [{hash: 'img1041', if_type: 'merge', mag: 'N/A'}],
								 '748': [{hash: 'img1042', if_type: 'merge', mag: 'N/A'}],
								 '749': [{hash: 'img1043', if_type: 'merge', mag: 'N/A'}],
								 '75': [{hash: 'img0369', if_type: 'merge', mag: 'N/A'}],
								 '750': [{hash: 'img1044', if_type: 'merge', mag: 'N/A'}],
								 '751': [{hash: 'img1045', if_type: 'merge', mag: 'N/A'}],
								 '752': [{hash: 'img1046', if_type: 'merge', mag: 'N/A'}],
								 '753': [{hash: 'img1047', if_type: 'merge', mag: 'N/A'}],
								 '754': [{hash: 'img1048', if_type: 'merge', mag: 'N/A'}],
								 '755': [{hash: 'img1049', if_type: 'merge', mag: 'N/A'}],
								 '756': [{hash: 'img1050', if_type: 'merge', mag: 'N/A'}],
								 '757': [{hash: 'img1051', if_type: 'merge', mag: 'N/A'}],
								 '758': [{hash: 'img1052', if_type: 'merge', mag: 'N/A'}],
								 '759': [{hash: 'img1053', if_type: 'merge', mag: 'N/A'}],
								 '76': [{hash: 'img0370', if_type: 'merge', mag: 'N/A'}],
								 '760': [{hash: 'img1054', if_type: 'merge', mag: 'N/A'}],
								 '761': [{hash: 'img1055', if_type: 'merge', mag: 'N/A'}],
								 '762': [{hash: 'img1056', if_type: 'merge', mag: 'N/A'}],
								 '763': [{hash: 'img1057', if_type: 'merge', mag: 'N/A'}],
								 '764': [{hash: 'img1058', if_type: 'merge', mag: 'N/A'}],
								 '765': [{hash: 'img1059', if_type: 'merge', mag: 'N/A'}],
								 '766': [{hash: 'img1060', if_type: 'merge', mag: 'N/A'}],
								 '767': [{hash: 'img1061', if_type: 'merge', mag: 'N/A'}],
								 '768': [{hash: 'img1062', if_type: 'merge', mag: 'N/A'}],
								 '769': [{hash: 'img1063', if_type: 'merge', mag: 'N/A'}],
								 '77': [{hash: 'img0371', if_type: 'merge', mag: 'N/A'}],
								 '770': [{hash: 'img1064', if_type: 'merge', mag: 'N/A'}],
								 '771': [{hash: 'img1065', if_type: 'merge', mag: 'N/A'}],
								 '772': [{hash: 'img1066', if_type: 'merge', mag: 'N/A'}],
								 '773': [{hash: 'img1067', if_type: 'merge', mag: 'N/A'}],
								 '774': [{hash: 'img1068', if_type: 'merge', mag: 'N/A'}],
								 '775': [{hash: 'img1069', if_type: 'merge', mag: 'N/A'}],
								 '776': [{hash: 'img1070', if_type: 'merge', mag: 'N/A'}],
								 '777': [{hash: 'img1071', if_type: 'merge', mag: 'N/A'}],
								 '778': [{hash: 'img1072', if_type: 'merge', mag: 'N/A'}],
								 '779': [{hash: 'img1073', if_type: 'merge', mag: 'N/A'}],
								 '78': [{hash: 'img0372', if_type: 'merge', mag: 'N/A'}],
								 '780': [{hash: 'img1074', if_type: 'merge', mag: 'N/A'}],
								 '781': [{hash: 'img1075', if_type: 'merge', mag: 'N/A'}],
								 '782': [{hash: 'img1076', if_type: 'merge', mag: 'N/A'}],
								 '783': [{hash: 'img1077', if_type: 'merge', mag: 'N/A'}],
								 '784': [{hash: 'img1078', if_type: 'merge', mag: 'N/A'}],
								 '785': [{hash: 'img1079', if_type: 'merge', mag: 'N/A'}],
								 '786': [{hash: 'img1080', if_type: 'merge', mag: 'N/A'}],
								 '787': [{hash: 'img1081', if_type: 'merge', mag: 'N/A'}],
								 '788': [{hash: 'img1082', if_type: 'merge', mag: 'N/A'}],
								 '789': [{hash: 'img1083', if_type: 'merge', mag: 'N/A'}],
								 '79': [{hash: 'img0373', if_type: 'merge', mag: 'N/A'}],
								 '790': [{hash: 'img1084', if_type: 'merge', mag: 'N/A'}],
								 '791': [{hash: 'img1085', if_type: 'merge', mag: 'N/A'}],
								 '792': [{hash: 'img1086', if_type: 'merge', mag: 'N/A'}],
								 '793': [{hash: 'img1087', if_type: 'merge', mag: 'N/A'}],
								 '794': [{hash: 'img1088', if_type: 'merge', mag: 'N/A'}],
								 '795': [{hash: 'img1089', if_type: 'merge', mag: 'N/A'}],
								 '796': [{hash: 'img1090', if_type: 'merge', mag: 'N/A'}],
								 '797': [{hash: 'img1091', if_type: 'merge', mag: 'N/A'}],
								 '798': [{hash: 'img1092', if_type: 'merge', mag: 'N/A'}],
								 '799': [{hash: 'img1093', if_type: 'merge', mag: 'N/A'}],
								 '8': [{hash: 'img0302', if_type: 'merge', mag: 'N/A'}],
								 '80': [{hash: 'img0374', if_type: 'merge', mag: 'N/A'}],
								 '800': [{hash: 'img1094', if_type: 'merge', mag: 'N/A'}],
								 '801': [{hash: 'img1095', if_type: 'merge', mag: 'N/A'}],
								 '802': [{hash: 'img1096', if_type: 'merge', mag: 'N/A'}],
								 '803': [{hash: 'img1097', if_type: 'merge', mag: 'N/A'}],
								 '804': [{hash: 'img1098', if_type: 'merge', mag: 'N/A'}],
								 '805': [{hash: 'img1099', if_type: 'merge', mag: 'N/A'}],
								 '806': [{hash: 'img1100', if_type: 'merge', mag: 'N/A'}],
								 '807': [{hash: 'img1101', if_type: 'merge', mag: 'N/A'}],
								 '808': [{hash: 'img1102', if_type: 'merge', mag: 'N/A'}],
								 '809': [{hash: 'img1103', if_type: 'merge', mag: 'N/A'}],
								 '81': [{hash: 'img0375', if_type: 'merge', mag: 'N/A'}],
								 '810': [{hash: 'img1104', if_type: 'merge', mag: 'N/A'}],
								 '811': [{hash: 'img1105', if_type: 'merge', mag: 'N/A'}],
								 '812': [{hash: 'img1106', if_type: 'merge', mag: 'N/A'}],
								 '813': [{hash: 'img1107', if_type: 'merge', mag: 'N/A'}],
								 '814': [{hash: 'img1108', if_type: 'merge', mag: 'N/A'}],
								 '815': [{hash: 'img1109', if_type: 'merge', mag: 'N/A'}],
								 '816': [{hash: 'img1110', if_type: 'merge', mag: 'N/A'}],
								 '817': [{hash: 'img1111', if_type: 'merge', mag: 'N/A'}],
								 '818': [{hash: 'img1112', if_type: 'merge', mag: 'N/A'}],
								 '819': [{hash: 'img1113', if_type: 'merge', mag: 'N/A'}],
								 '82': [{hash: 'img0376', if_type: 'merge', mag: 'N/A'}],
								 '820': [{hash: 'img1114', if_type: 'merge', mag: 'N/A'}],
								 '821': [{hash: 'img1115', if_type: 'merge', mag: 'N/A'}],
								 '822': [{hash: 'img1116', if_type: 'merge', mag: 'N/A'}],
								 '823': [{hash: 'img1117', if_type: 'merge', mag: 'N/A'}],
								 '824': [{hash: 'img1118', if_type: 'merge', mag: 'N/A'}],
								 '825': [{hash: 'img1119', if_type: 'merge', mag: 'N/A'}],
								 '826': [{hash: 'img1120', if_type: 'merge', mag: 'N/A'}],
								 '827': [{hash: 'img1121', if_type: 'merge', mag: 'N/A'}],
								 '828': [{hash: 'img1122', if_type: 'merge', mag: 'N/A'}],
								 '829': [{hash: 'img1123', if_type: 'merge', mag: 'N/A'}],
								 '83': [{hash: 'img0377', if_type: 'merge', mag: 'N/A'}],
								 '830': [{hash: 'img1124', if_type: 'merge', mag: 'N/A'}],
								 '831': [{hash: 'img1125', if_type: 'merge', mag: 'N/A'}],
								 '832': [{hash: 'img1126', if_type: 'merge', mag: 'N/A'}],
								 '833': [{hash: 'img1127', if_type: 'merge', mag: 'N/A'}],
								 '834': [{hash: 'img1128', if_type: 'merge', mag: 'N/A'}],
								 '835': [{hash: 'img1129', if_type: 'merge', mag: 'N/A'}],
								 '836': [{hash: 'img1130', if_type: 'merge', mag: 'N/A'}],
								 '837': [{hash: 'img1131', if_type: 'merge', mag: 'N/A'}],
								 '838': [{hash: 'img1132', if_type: 'merge', mag: 'N/A'}],
								 '839': [{hash: 'img1133', if_type: 'merge', mag: 'N/A'}],
								 '84': [{hash: 'img0378', if_type: 'merge', mag: 'N/A'}],
								 '840': [{hash: 'img1134', if_type: 'merge', mag: 'N/A'}],
								 '841': [{hash: 'img1135', if_type: 'merge', mag: 'N/A'}],
								 '842': [{hash: 'img1136', if_type: 'merge', mag: 'N/A'}],
								 '843': [{hash: 'img1137', if_type: 'merge', mag: 'N/A'}],
								 '844': [{hash: 'img1138', if_type: 'merge', mag: 'N/A'}],
								 '845': [{hash: 'img1139', if_type: 'merge', mag: 'N/A'}],
								 '846': [{hash: 'img1140', if_type: 'merge', mag: 'N/A'}],
								 '847': [{hash: 'img1141', if_type: 'merge', mag: 'N/A'}],
								 '848': [{hash: 'img1142', if_type: 'merge', mag: 'N/A'}],
								 '849': [{hash: 'img1143', if_type: 'merge', mag: 'N/A'}],
								 '85': [{hash: 'img0379', if_type: 'merge', mag: 'N/A'}],
								 '850': [{hash: 'img1144', if_type: 'merge', mag: 'N/A'}],
								 '851': [{hash: 'img1145', if_type: 'merge', mag: 'N/A'}],
								 '852': [{hash: 'img1146', if_type: 'merge', mag: 'N/A'}],
								 '853': [{hash: 'img1147', if_type: 'merge', mag: 'N/A'}],
								 '854': [{hash: 'img1148', if_type: 'merge', mag: 'N/A'}],
								 '855': [{hash: 'img1149', if_type: 'merge', mag: 'N/A'}],
								 '856': [{hash: 'img1150', if_type: 'merge', mag: 'N/A'}],
								 '857': [{hash: 'img1151', if_type: 'merge', mag: 'N/A'}],
								 '858': [{hash: 'img1152', if_type: 'merge', mag: 'N/A'}],
								 '859': [{hash: 'img1153', if_type: 'merge', mag: 'N/A'}],
								 '86': [{hash: 'img0380', if_type: 'merge', mag: 'N/A'}],
								 '860': [{hash: 'img1154', if_type: 'merge', mag: 'N/A'}],
								 '861': [{hash: 'img1155', if_type: 'merge', mag: 'N/A'}],
								 '862': [{hash: 'img1156', if_type: 'merge', mag: 'N/A'}],
								 '863': [{hash: 'img1157', if_type: 'merge', mag: 'N/A'}],
								 '864': [{hash: 'img1158', if_type: 'merge', mag: 'N/A'}],
								 '865': [{hash: 'img1159', if_type: 'merge', mag: 'N/A'}],
								 '866': [{hash: 'img1160', if_type: 'merge', mag: 'N/A'}],
								 '867': [{hash: 'img1161', if_type: 'merge', mag: 'N/A'}],
								 '868': [{hash: 'img1162', if_type: 'merge', mag: 'N/A'}],
								 '869': [{hash: 'img1163', if_type: 'merge', mag: 'N/A'}],
								 '87': [{hash: 'img0381', if_type: 'merge', mag: 'N/A'}],
								 '870': [{hash: 'img1164', if_type: 'merge', mag: 'N/A'}],
								 '871': [{hash: 'img1165', if_type: 'merge', mag: 'N/A'}],
								 '872': [{hash: 'img1166', if_type: 'merge', mag: 'N/A'}],
								 '873': [{hash: 'img1167', if_type: 'merge', mag: 'N/A'}],
								 '874': [{hash: 'img1168', if_type: 'merge', mag: 'N/A'}],
								 '875': [{hash: 'img1169', if_type: 'merge', mag: 'N/A'}],
								 '876': [{hash: 'img1170', if_type: 'merge', mag: 'N/A'}],
								 '877': [{hash: 'img1171', if_type: 'merge', mag: 'N/A'}],
								 '878': [{hash: 'img1172', if_type: 'merge', mag: 'N/A'}],
								 '879': [{hash: 'img1173', if_type: 'merge', mag: 'N/A'}],
								 '88': [{hash: 'img0382', if_type: 'merge', mag: 'N/A'}],
								 '880': [{hash: 'img1174', if_type: 'merge', mag: 'N/A'}],
								 '881': [{hash: 'img1175', if_type: 'merge', mag: 'N/A'}],
								 '882': [{hash: 'img1176', if_type: 'merge', mag: 'N/A'}],
								 '883': [{hash: 'img1177', if_type: 'merge', mag: 'N/A'}],
								 '884': [{hash: 'img1178', if_type: 'merge', mag: 'N/A'}],
								 '885': [{hash: 'img1179', if_type: 'merge', mag: 'N/A'}],
								 '886': [{hash: 'img1180', if_type: 'merge', mag: 'N/A'}],
								 '887': [{hash: 'img1181', if_type: 'merge', mag: 'N/A'}],
								 '888': [{hash: 'img1182', if_type: 'merge', mag: 'N/A'}],
								 '889': [{hash: 'img1183', if_type: 'merge', mag: 'N/A'}],
								 '89': [{hash: 'img0383', if_type: 'merge', mag: 'N/A'}],
								 '890': [{hash: 'img1184', if_type: 'merge', mag: 'N/A'}],
								 '891': [{hash: 'img1185', if_type: 'merge', mag: 'N/A'}],
								 '892': [{hash: 'img1186', if_type: 'merge', mag: 'N/A'}],
								 '893': [{hash: 'img1187', if_type: 'merge', mag: 'N/A'}],
								 '894': [{hash: 'img1188', if_type: 'merge', mag: 'N/A'}],
								 '895': [{hash: 'img1189', if_type: 'merge', mag: 'N/A'}],
								 '896': [{hash: 'img1190', if_type: 'merge', mag: 'N/A'}],
								 '897': [{hash: 'img1191', if_type: 'merge', mag: 'N/A'}],
								 '898': [{hash: 'img1192', if_type: 'merge', mag: 'N/A'}],
								 '899': [{hash: 'img1193', if_type: 'merge', mag: 'N/A'}],
								 '9': [{hash: 'img0303', if_type: 'merge', mag: 'N/A'}],
								 '90': [{hash: 'img0384', if_type: 'merge', mag: 'N/A'}],
								 '900': [{hash: 'img1194', if_type: 'merge', mag: 'N/A'}],
								 '901': [{hash: 'img1195', if_type: 'merge', mag: 'N/A'}],
								 '902': [{hash: 'img1196', if_type: 'merge', mag: 'N/A'}],
								 '903': [{hash: 'img1197', if_type: 'merge', mag: 'N/A'}],
								 '904': [{hash: 'img1198', if_type: 'merge', mag: 'N/A'}],
								 '905': [{hash: 'img1199', if_type: 'merge', mag: 'N/A'}],
								 '906': [{hash: 'img1200', if_type: 'merge', mag: 'N/A'}],
								 '907': [{hash: 'img1201', if_type: 'merge', mag: 'N/A'}],
								 '908': [{hash: 'img1202', if_type: 'merge', mag: 'N/A'}],
								 '909': [{hash: 'img1203', if_type: 'merge', mag: 'N/A'}],
								 '91': [{hash: 'img0385', if_type: 'merge', mag: 'N/A'}],
								 '910': [{hash: 'img1204', if_type: 'merge', mag: 'N/A'}],
								 '911': [{hash: 'img1205', if_type: 'merge', mag: 'N/A'}],
								 '912': [{hash: 'img1206', if_type: 'merge', mag: 'N/A'}],
								 '913': [{hash: 'img1207', if_type: 'merge', mag: 'N/A'}],
								 '914': [{hash: 'img1208', if_type: 'merge', mag: 'N/A'}],
								 '915': [{hash: 'img1209', if_type: 'merge', mag: 'N/A'}],
								 '916': [{hash: 'img1210', if_type: 'merge', mag: 'N/A'}],
								 '917': [{hash: 'img1211', if_type: 'merge', mag: 'N/A'}],
								 '918': [{hash: 'img1212', if_type: 'merge', mag: 'N/A'}],
								 '919': [{hash: 'img1213', if_type: 'merge', mag: 'N/A'}],
								 '92': [{hash: 'img0386', if_type: 'merge', mag: 'N/A'}],
								 '920': [{hash: 'img1214', if_type: 'merge', mag: 'N/A'}],
								 '921': [{hash: 'img1215', if_type: 'merge', mag: 'N/A'}],
								 '922': [{hash: 'img1216', if_type: 'merge', mag: 'N/A'}],
								 '923': [{hash: 'img1217', if_type: 'merge', mag: 'N/A'}],
								 '924': [{hash: 'img1218', if_type: 'merge', mag: 'N/A'}],
								 '925': [{hash: 'img1219', if_type: 'merge', mag: 'N/A'}],
								 '926': [{hash: 'img1220', if_type: 'merge', mag: 'N/A'}],
								 '927': [{hash: 'img1221', if_type: 'merge', mag: 'N/A'}],
								 '928': [{hash: 'img1222', if_type: 'merge', mag: 'N/A'}],
								 '929': [{hash: 'img1223', if_type: 'merge', mag: 'N/A'}],
								 '93': [{hash: 'img0387', if_type: 'merge', mag: 'N/A'}],
								 '930': [{hash: 'img1224', if_type: 'merge', mag: 'N/A'}],
								 '931': [{hash: 'img1225', if_type: 'merge', mag: 'N/A'}],
								 '932': [{hash: 'img1226', if_type: 'merge', mag: 'N/A'}],
								 '933': [{hash: 'img1227', if_type: 'merge', mag: 'N/A'}],
								 '934': [{hash: 'img1228', if_type: 'merge', mag: 'N/A'}],
								 '935': [{hash: 'img1229', if_type: 'merge', mag: 'N/A'}],
								 '936': [{hash: 'img1230', if_type: 'merge', mag: 'N/A'}],
								 '937': [{hash: 'img1231', if_type: 'merge', mag: 'N/A'}],
								 '938': [{hash: 'img1232', if_type: 'merge', mag: 'N/A'}],
								 '939': [{hash: 'img1233', if_type: 'merge', mag: 'N/A'}],
								 '94': [{hash: 'img0388', if_type: 'merge', mag: 'N/A'}],
								 '940': [{hash: 'img1234', if_type: 'merge', mag: 'N/A'}],
								 '941': [{hash: 'img1235', if_type: 'merge', mag: 'N/A'}],
								 '942': [{hash: 'img1236', if_type: 'merge', mag: 'N/A'}],
								 '943': [{hash: 'img1237', if_type: 'merge', mag: 'N/A'}],
								 '944': [{hash: 'img1238', if_type: 'merge', mag: 'N/A'}],
								 '945': [{hash: 'img1239', if_type: 'merge', mag: 'N/A'}],
								 '946': [{hash: 'img1240', if_type: 'merge', mag: 'N/A'}],
								 '947': [{hash: 'img1241', if_type: 'merge', mag: 'N/A'}],
								 '948': [{hash: 'img1242', if_type: 'merge', mag: 'N/A'}],
								 '949': [{hash: 'img1243', if_type: 'merge', mag: 'N/A'}],
								 '95': [{hash: 'img0389', if_type: 'merge', mag: 'N/A'}],
								 '950': [{hash: 'img1244', if_type: 'merge', mag: 'N/A'}],
								 '951': [{hash: 'img1245', if_type: 'merge', mag: 'N/A'}],
								 '952': [{hash: 'img1246', if_type: 'merge', mag: 'N/A'}],
								 '953': [{hash: 'img1247', if_type: 'merge', mag: 'N/A'}],
								 '954': [{hash: 'img1248', if_type: 'merge', mag: 'N/A'}],
								 '955': [{hash: 'img1249', if_type: 'merge', mag: 'N/A'}],
								 '956': [{hash: 'img1250', if_type: 'merge', mag: 'N/A'}],
								 '957': [{hash: 'img1251', if_type: 'merge', mag: 'N/A'}],
								 '958': [{hash: 'img1252', if_type: 'merge', mag: 'N/A'}],
								 '959': [{hash: 'img1253', if_type: 'merge', mag: 'N/A'}],
								 '96': [{hash: 'img0390', if_type: 'merge', mag: 'N/A'}],
								 '960': [{hash: 'img1254', if_type: 'merge', mag: 'N/A'}],
								 '961': [{hash: 'img1255', if_type: 'merge', mag: 'N/A'}],
								 '962': [{hash: 'img1256', if_type: 'merge', mag: 'N/A'}],
								 '963': [{hash: 'img1257', if_type: 'merge', mag: 'N/A'}],
								 '964': [{hash: 'img1258', if_type: 'merge', mag: 'N/A'}],
								 '965': [{hash: 'img1259', if_type: 'merge', mag: 'N/A'}],
								 '966': [{hash: 'img1260', if_type: 'merge', mag: 'N/A'}],
								 '967': [{hash: 'img1261', if_type: 'merge', mag: 'N/A'}],
								 '968': [{hash: 'img1262', if_type: 'merge', mag: 'N/A'}],
								 '969': [{hash: 'img1263', if_type: 'merge', mag: 'N/A'}],
								 '97': [{hash: 'img0391', if_type: 'merge', mag: 'N/A'}],
								 '970': [{hash: 'img1264', if_type: 'merge', mag: 'N/A'}],
								 '971': [{hash: 'img1265', if_type: 'merge', mag: 'N/A'}],
								 '972': [{hash: 'img1266', if_type: 'merge', mag: 'N/A'}],
								 '973': [{hash: 'img1267', if_type: 'merge', mag: 'N/A'}],
								 '974': [{hash: 'img1268', if_type: 'merge', mag: 'N/A'}],
								 '975': [{hash: 'img1269', if_type: 'merge', mag: 'N/A'}],
								 '976': [{hash: 'img1270', if_type: 'merge', mag: 'N/A'}],
								 '977': [{hash: 'img1271', if_type: 'merge', mag: 'N/A'}],
								 '978': [{hash: 'img1272', if_type: 'merge', mag: 'N/A'}],
								 '979': [{hash: 'img1273', if_type: 'merge', mag: 'N/A'}],
								 '98': [{hash: 'img0392', if_type: 'merge', mag: 'N/A'}],
								 '980': [{hash: 'img1274', if_type: 'merge', mag: 'N/A'}],
								 '981': [{hash: 'img1275', if_type: 'merge', mag: 'N/A'}],
								 '982': [{hash: 'img1276', if_type: 'merge', mag: 'N/A'}],
								 '983': [{hash: 'img1277', if_type: 'merge', mag: 'N/A'}],
								 '984': [{hash: 'img1278', if_type: 'merge', mag: 'N/A'}],
								 '985': [{hash: 'img1279', if_type: 'merge', mag: 'N/A'}],
								 '986': [{hash: 'img1280', if_type: 'merge', mag: 'N/A'}],
								 '987': [{hash: 'img1281', if_type: 'merge', mag: 'N/A'}],
								 '988': [{hash: 'img1282', if_type: 'merge', mag: 'N/A'}],
								 '989': [{hash: 'img1283', if_type: 'merge', mag: 'N/A'}],
								 '99': [{hash: 'img0393', if_type: 'merge', mag: 'N/A'}],
								 '990': [{hash: 'img1284', if_type: 'merge', mag: 'N/A'}],
								 '991': [{hash: 'img1285', if_type: 'merge', mag: 'N/A'}],
								 '992': [{hash: 'img1286', if_type: 'merge', mag: 'N/A'}],
								 '993': [{hash: 'img1287', if_type: 'merge', mag: 'N/A'}],
								 '994': [{hash: 'img1288', if_type: 'merge', mag: 'N/A'}],
								 '995': [{hash: 'img1289', if_type: 'merge', mag: 'N/A'}],
								 '996': [{hash: 'img1290', if_type: 'merge', mag: 'N/A'}],
								 '997': [{hash: 'img1291', if_type: 'merge', mag: 'N/A'}],
								 '998': [{hash: 'img1292', if_type: 'merge', mag: 'N/A'}],
								 '999': [{hash: 'img1293', if_type: 'merge', mag: 'N/A'}]
							}
						},
						'g':{
							'premature':{
								'1': [{
									hash: 'img35',
									mag: 'N/A',
									if_type: 'green'
								}],
								'2': [{
									hash: 'img36',
									mag: 'N/A',
									if_type: 'green'
								}],
								'3': [{
									hash: 'img37',
									mag: 'N/A',
									if_type: 'green'
								}]
							},
							
							
						},
						'gr':{
							'interphase':{
								'1': [{
									hash: 'img5',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img6',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'metaphase':{
								'1': [{
									hash: 'img7',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'anaphase':{
								'1': [{
									hash: 'img3',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'unequal':{
								'1': [{
									hash: 'img8',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'bridges':{
								'1': [{
									hash: 'img4',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'composite':{
								'1': [{
									hash: 'img0293',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img0294',
									mag: 'N/A',
									if_type: 'merge'
								}]
							}
						},
						'rb':{
							'off':{
								'1': [{
									hash: 'img9',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'on':{
								'1': [{
									hash: 'img10',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img11',
									mag: 'N/A',
									if_type: 'merge'
								}]
							},
							'composite': {
								'1': [{
									hash: 'img1303',
									mag: 'N/A',
									if_type: 'merge'
								}],
								'2': [{
									hash: 'img1304',
									mag: 'N/A',
									if_type: 'merge'
								}]
							}
						}
					}
				}
		},
            model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'nc',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    },
                                	 {
                                        name: 'Rad21',
                                        weight: 29.5,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    }, 
                                    {
                                        name: 'Rad21',
                                        weight: 19.9,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 1,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 2,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'rna1',
                                cell_line: 'S2',
                                above_marks: [
                                	 {
                                        name: 'Rad21',
                                        weight: 29.5,
                                        intensity: 2,
                                        primary_anti_body: ['rad21']
                                    }, 
                                    {
                                        name: 'Rad21',
                                        weight: 19.9,
                                        intensity: 2,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 25,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'rna2',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    },
                                	 {
                                        name: 'Rad21',
                                        weight: 29.5,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    }, 
                                    {
                                        name: 'Rad21',
                                        weight: 19.9,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 1,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 2,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 57,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'rna3',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 25,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'rna4',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 32,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'rna5',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    },
                                	 {
                                        name: 'Rad21',
                                        weight: 29.5,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    }, 
                                    {
                                        name: 'Rad21',
                                        weight: 19.9,
                                        intensity: 0.5,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 1,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 2,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Nocodazole',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    },
            						{
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 25,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Hydroxyurea',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 2,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Chk1',
                                        weight: 57,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Serum',
                                cell_line: 'S2',
                                above_marks: [
                                	{
                                        name: 'Pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    },
            						{
                                        name: 'Chk1',
                                        weight: 54,
                                        intensity: 2,
                                        primary_anti_body: ['chk1']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 32,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: 4,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                	'ticks': [50, 100, 150, 250],
                	'max': 250,
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: '2-peak-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'nc',
                                shape: '2-peak-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'rna1',
                                shape: 'peak-100-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'rna2',
                                shape: '2-peak-uneven-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'rna3',
                                shape: 'peak-100-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'rna4',
                                shape: 'peak-50-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'rna5',
                                shape: '4-peak-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'Hydroxyurea',
                                shape: 's-block-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'Nocodazole',
                                shape: 'peak-100-normal-400'
                            },
                            {
                                match: ['drug_id'],
                                drug_id: 'Serum',
                                shape: 'peak-50-normal-400'
                            }
                        ]

                    }
                },
                microscopy: {
                	'valid': ['S2', 'nc'],
                	'slide': {
                	
                		'conditions_parser':[
                		{
                			match: [],
                			
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['nc'],
                			conditions: 'rgb',
                			phenotype: 'composite3'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['nc'],
                			conditions: 'rb',
                			phenotype: 'composite'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna1'],
                			conditions: 'g',
                			phenotype: 'premature'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna2'],
                			conditions: 'gr',
                			phenotype: 'composite'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna2'],
                			conditions: 'rb',
                			phenotype: 'composite'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna3'],
                			conditions: 'rgb',
                			phenotype: 'metaphase'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna3'],
                			conditions: 'rb',
                			phenotype: 'on'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna4'],
                			conditions: 'rgb',
                			phenotype: 'interphase'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna5'],
                			conditions: 'rgb',
                			phenotype: 'composite4'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['rna5'],
                			conditions: 'rb',
                			phenotype: 'off'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['Serum'],
                			conditions: 'rgb',
                			phenotype: 'interphase'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['Hydroxyurea'],
                			conditions: 'rgb',
                			phenotype: 'interphase'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['Nocodazole'],
                			conditions: 'rgb',
                			phenotype: 'metaphase'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'conditions'],
                			cell_line: 'S2',
                			drug_id: ['Nocodazole'],
                			conditions: 'rb',
                			phenotype: 'on'
                		}
                			
                		]
                		
                	}
                }
                
            }
        }
    };
    
var ps2_strain_A = {
				'western_blot': 
							 {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -1,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 36, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'Securin',
                                        weight: 41.8,
                                        intensity: -1,
                                        primary_anti_body: ['securin']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 68, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 29.5, // 34&35
                                        intensity: 1,
                                        primary_anti_body: ['rad21']
                                    },
                                    {
                                        name: 'Rad21',
                                        weight: 19.9, // 34&35
                                        intensity: 1,
                                        primary_anti_body: ['rad21']
                                    }
                                ]
                            }, 
                        'facs':
                        	{
                                match: ['cell_line', 'temperature'],
                                cell_line: '',
                                temperature: 40,
                                shape: 'g2-block'
                            }                     
                            
                	};

var ps2_strain_B = {    
				'western_blot': 
							{
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdt1',
                                        weight: 65,
                                        intensity: -.8,
                                        primary_anti_body: ['cdt1']
                                    },
                                    {
                                        name: 'Cdk1',
                                        weight: 35, //35&36
                                        intensity: -1,
                                        primary_anti_body: ['cdk1']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            }, 
                        'facs':               
                        	{
                                match: ['cell_line', 'temperature'],
                                cell_line: '',
                                temperature: 40,
                                shape: 'S-block'
                            }
					};

var ps2_strain_C = {
				'western_blot': 
							{
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cyclin E',
                                        weight: 148,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            }, 
                        'facs':
                        	{
                                match: ['cell_line', 'temperature'],
                                cell_line: '',
                                temperature: 40,
                                shape: 'g1-block'
                            }                     
                            
                    };

var ps2_strain_D = {						
				'western_blot': 
							{
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cyclin E',
                                        weight: 25,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            }, 
                        'facs':
                        	{
                                match: ['cell_line', 'temperature'],
                                cell_line: '',
                                temperature: 40,
                                shape: 'alpha-block'
                            }                     
                                                
                            
                    };

var ps2_strain_E = {						
				'western_blot': 
							{
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cyclin E',
                                        weight: 15,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            }, 
                        'facs':
                        	{
                                match: ['cell_line', 'temperature'],
                                cell_line: '',
                                temperature: 40,
                                shape: 'g2-block'
                            }                       
                            
                    };

var __decusability_newfacs = {
        id: 'decusability2',
        name: 'StarCellBio Usability Test2',
        course: 'usability',
    	course_name: 'December 2013 Usability Testing',
        description: 'FACS and Western Blot for temperature sensitive mutants',
        experiments: {},
        template: {
            instructions: [
            	['Goal & Introduction','Here come instructions when we build them']
            	],
            ui: {
                experimental_design: {
                    techniques: [ 'wb' , 'facs']
                },
                experiment_setup: {
                    table: [ //
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: false}, //
                        {kind: 'treatments',
                            children: [//
                                {kind: 'drug', title: 'Treatment', editable: false},//
                            ]
                        },//
                        {kind: 'temperature', title: 'Temperature', editable: false},//
                        {kind: 'actions', title: 'Actions'}//
                    ],//
                    actions: [

                    ]
                },
                western_blot: {format: "%CELL_LINE%, %TREATMENT%, %PP1% %TEMPERATURE%",
                    keys: {
                        '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                        '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                        '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']},
                        '%TEMPERATURE%': {attr: ['treatment_list', 'list', '0', 'temperature'], map: ['experiment_temperatures', '%KEY%', 'name']},
                        '%PP1%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '1', 'drug_id'], map: ['drugs', '%KEY%', 'short_name'], default: ''}
                    }
                },
                add_multiple_dialog: {
                    'wt': {
                        title: '<b>Strain:</b> Wild Type',
                        headings: ['Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }

                        ]
                    },
                    'm1': {
                        title: '<b>Strain:</b> Mutant 1',

                        headings: ['Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [ 
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm1',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    },
                    'm2': {
                        title: '<b>Strain:</b> Mutant 2',

                        headings: [ 'Treatment', 'Temperature', ''],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "30 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '25'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'Growth Media'},
                                    {kind: 'text', text: "37 " + degreeEntity + "C"},
                                    {kind: 'checkbox', name: 'NOPP1'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'm2',
                                            treatment_list: {list: [
                                                {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '40'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                        ]

                    }
                }
            },
            add_new_row_instructions: 'add new row instructions',

            concentrations: {
                '0': {
                    name: '',
                    value: 0
                },
                '2': {
                    name: '2 ' + microEntity + 'g/mL',
                    value: 5
                },
                '15': {
                    name: '15 ' + microEntity + 'g/mL',
                    value: 5
                },
                '200': {
                    name: '200 mM',
                    value: 5
                },
                '1u': {
                    name: '1 unit',
                    value: 1000
                }
            },
            drugs: {
                'nc': {
                    name: 'Growth Media',
                    concentrations: [0]
                },
                'Nocodazole': {
                    name: 'Nocodazole',
                    concentrations: [15]
                },
                'Alpha': {
                    name: 'Alpha Factor',
                    concentrations: [2]
                },
                'Hydroxyurea': {
                    name: 'Hydroxyurea',
                    concentrations: [200]
                },
                'pp1': {
                    name: 'Protein Phosphatase 1',
                    concentrations: ['1u'],
                    short_name: 'PP1'
                }

            },
            experiment_temperatures: {
                '25': {
                    name: "30" + degreeEntity + "C"
                },
                '40': {
                    name: "37" + degreeEntity + "C"
                }
            },

            cell_lines: {
                'wt': {
                    name: 'Wild Type'
                },
                'm1': {
                    name: 'Mutant 1'
                },
                'm2': {
                    name: 'Mutant 2'
                }

            },
            time_unit: {
                kind: 'minutes'
            },
            primary_anti_body: {
            	order: ['cdk2', 'cyclin', 'cyclinE', 'pgk1'],
                'cdk2': {
                    name: 'rabbit anti-cdk2',
                    secondary: ['r'],
                    marks: [
                        {weight: 33, intensity: 0},
                        {weight: 34, intensity: 0},
                        {weight: 35, intensity: 0}
                    ],
                    gel_name: 'cdk2'
                },
                'cyclin': {
                    name: 'mouse anti-cyclin B',
                    secondary: ['m'],
                    marks: [
                        {weight: 58, intensity: 0},
                    ],
                    gel_name: 'cyclin B'
                },
                'cyclinE': {
                    name: 'mouse anti-cyclin E',
                    secondary: ['m'],
                    marks: [
                        {weight: 48, intensity: 0},
                    ],
                    gel_name: 'cyclin E'
                },
                'pgk1': {
                    name: 'rabbit anti-pgk1',
                    secondary: ['r'],
                    marks: [
                        {weight: 45, intensity: 0},
                    ],
                    gel_name: 'pgk1'
                }
            },//
            secondary_anti_body: {
                'm': {
                    name: 'rabbit anti-mouse'
                },
                'r': {
                    name: 'goat anti-rabbit'
                }
            },//
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'Dye':{
            		name:'Dye/Stain',
            		conditions: {
            			'whole': {name: 'PI'}
            		}
            	},
            	'Anti':{
            		name:'Antibody-labeling ',
            		conditions: {
            			'a': {name: 'example antibody'}
            		}
            	}
            },
            model: { // models
                western_blot: {
                    'cyto': {
                        'parser_fixed': [
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: '*ANY*',
                                marks: [
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: 2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: 4,
                                        primary_anti_body: ['cyclinE']
                                    },
                                    {
                                        name: 'pgk1',
                                        weight: 45,
                                        intensity: 10,
                                        primary_anti_body: ['pgk1']
                                    }

                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'pp1',
                                cell_line: '*ANY*',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 33, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ],
                                below_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: .3,
                                        primary_anti_body: ['cdk2']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'wt',
                                marks: [
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm1',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'static',
                                cutoff: -1,
                                drug: 'nc',
                                cell_line: 'm2',
                                temperature: '40',
                                marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Nocodazole',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin E',
                                        weight: 48,
                                        intensity: -4,
                                        primary_anti_body: ['cyclinE']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Hydroxyurea',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 35, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            },
                            {
                                transfer_function: 'delta',
                                cutoff: 1,
                                drug: 'Alpha',
                                cell_line: 'wt',
                                above_marks: [
                                    {
                                        name: 'Cdk2',
                                        weight: 34, // 34&35
                                        intensity: -1,
                                        primary_anti_body: ['cdk2']
                                    },
                                    {
                                        name: 'Cyclin B',
                                        weight: 58,
                                        intensity: -2,
                                        primary_anti_body: ['cyclin']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: 'normal'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm1',
                                temperature: 40,
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'temperature'],
                                cell_line: 'm2',
                                temperature: 40,
                                shape: 'S-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Nocodazole',
                                shape: 'g2-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Alpha',
                                shape: 'alpha-block'
                            },
                            {
                                match: ['cell_line', 'drug_id'],
                                cell_line: 'wt',
                                drug_id: 'Hydroxyurea',
                                shape: 'S-block'
                            }
                        ]

                    }
                }
            }
        }
    };




master_model_data = {
    app_title: 'StarCellBio',
    app_description: 'StarCellBio Placeholder',
    assignments: {
        list: [ 
         __assignment2, __usability_test, __basic_tests, __assigment_706, __assigment_tufts, __decusability,  __microscopy_test, __assignment_706_2014  , __assignment_706_2014_ps2, __decusability_newfacs 
        ]
    },
    ui: {}
};
window.master_model_data = master_model_data;
$.ajax({
	type: "POST",
	url: 'scb/create_courses.js',
	data: JSON.stringify(master_model_data)
});

$(function () {
	console.log(get_courses_result);
	var usability_test = {};
	var assignment_706 = {};
	var decusability = {};
	var decusability_newfacs = {};
	var assignment_tufts = {};	
	var microscopy_test ={};
	var assignment_706_2014 ={};
	var assignment_706_2014_ps2 ={};
	for (var x = 0; x < get_courses_result.list.length; x++){
		if(get_courses_result.list[x].id == 'usability_test'){
			usability_test = get_courses_result.list[x];
			usability_test.description = scb_model_microscopy.abstract();
			usability_test.template.setup_video_box = scb_model_microscopy.setup_video_box();
			usability_test.template.setup_video_box_kind = 'coin-slider';

			usability_test.template.experiment_setup = scb_model_usability.experiment_setup();
			
			get_courses_result.list[x] = usability_test;
		}
		if(get_courses_result.list[x].id == 'microscopy_test'){
			microscopy_test = get_courses_result.list[x];
			microscopy_test.description = scb_model_microscopy.abstract();
			microscopy_test.template.setup_video_box = scb_model_microscopy.setup_video_box();
			microscopy_test.template.setup_video_box_kind = 'coin-slider';

			microscopy_test.template.experiment_setup = scb_model_microscopy.experiment_setup();
			
			get_courses_result.list[x] = microscopy_test;
		}
		if(get_courses_result.list[x].id == 'mit_7_06_0313'){
			assignment_706 = get_courses_result.list[x];
			assignment_706.description = scb_assignment_specific_mit706s13.assignment_overview();
    		assignment_706.template.instructions = [
    			['Goal & Introduction', scb_assignment_specific_mit706s13.goal_and_introduction()],
    			['Question 1',scb_assignment_specific_mit706s13.question_1()],
    			['Question 2', scb_assignment_specific_mit706s13.question_2()],
    			['Question 3', scb_assignment_specific_mit706s13.question_3()],
    			['Reference Information', scb_assignment_specific_mit706s13.reference_information()]
    			];
    		assignment_706.template.experiment_setup = scb_assignment_specific_mit706s13.experiment_setup();

			assignment_706.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'mit706s13.setup',
				css: {
					width: '800px',
					height: '900px',
					left: 'inherit',
					top: '000px'
				}
			});
			get_courses_result.list[x] = assignment_706;
		}
		if(get_courses_result.list[x].id == 'assignment_706_2014'){
			assignment_706_2014 = get_courses_result.list[x];
			assignment_706_2014.template.instructions = [
				['Introduction', scb_assignment_specific_mit706s14.introduction()],
				['Background Information',scb_assignment_specific_mit706s14.background_information()],
				['Question 1', scb_assignment_specific_mit706s14.question_1()],
				['Question 2', scb_assignment_specific_mit706s14.question_2()]
				];
			assignment_706_2014.template.experiment_setup = scb_assignment_specific_mit706s14.experiment_setup();

			assignment_706_2014.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'mit706s14.setup',
				css: {
					width: '885px',
					height: '540px',
					left: 'inherit',
					top: '15%'
				}
			});
			get_courses_result.list[x] = assignment_706_2014;
		}
		if(get_courses_result.list[x].id == 'assignment_706_2014_ps2'){
			assignment_706_2014_ps2 = get_courses_result.list[x];
			//assignment_706_2014_ps2 = choose_n_mutant_strains(assignment_706_2014_ps2.template.random_order, ['m1', 'm2'], assignment_706_2014_ps2);
			
			//save in temporary variables the 5 treatments
			var element1 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[1];
			var element2 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[2];
			var element3 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[3];
			var element4 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[4];
			var element5 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[5];
			
			
			//based on the random order, reinsert the elements in the appropriate spot
			for(var y = 0; y < assignment_706_2014_ps2.template.random_order.length; y++){
				var element = null;
				if(assignment_706_2014_ps2.template.random_order[y] == 1){
					element = element1;
				}
				else if(assignment_706_2014_ps2.template.random_order[y] == 2){
					element = element2;
				}
				else if(assignment_706_2014_ps2.template.random_order[y] == 3){
					element = element3;
				}
				else if(assignment_706_2014_ps2.template.random_order[y] == 4){
					element = element4;
				}
				else if(assignment_706_2014_ps2.template.random_order[y] == 5){
					element = element5;
				}
				assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[y+1] = element;
				
			}
			
			//In the order I replace each of the numbers with their corresponding rna name
			var order_array = ps2_change(assignment_706_2014_ps2.template.random_order);
			
			
			//rename the 5 proteins to their new order, determined by the for loop above
			assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[1].cells[2].text = 'siRNA #1';
			assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[2].cells[2].text =  'siRNA #2';
			assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[3].cells[2].text = 'siRNA #3';
			assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[4].cells[2].text = 'siRNA #4' ;
			assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[5].cells[2].text = 'siRNA #5';
			
			//replace the names of the drugs in the template with the new order array.
			replace_names(assignment_706_2014_ps2.template.drugs, order_array, ['siRNA #1', 'siRNA #2', 'siRNA #3', 'siRNA #4' , 'siRNA #5']);
			
			
			assignment_706_2014_ps2.template.instructions = [
				['Getting Started', scb_assignment_specific_mit706s14ps2.page1()],
				['Background Information',scb_assignment_specific_mit706s14ps2.page2()],
				['Questions', scb_assignment_specific_mit706s14ps2.page3()]
				];
			assignment_706_2014_ps2.template.experiment_setup = scb_assignment_specific_mit706s14.experiment_setup();

			assignment_706_2014_ps2.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'mit706s14ps2.setup',
				css: {
					width: '885px',
					height: '600px',
					left: 'inherit',
					top: '000px'
				}
			});
			get_courses_result.list[x] = assignment_706_2014_ps2;
		}
		if(get_courses_result.list[x].id == 'decusability'){
			decusability = get_courses_result.list[x];
    		decusability.template.instructions = [
    			['Welcome to the Usability Evaluation', scb_assignment_specific_decusability.welcome_usability()],
				['Introduction',scb_assignment_specific_decusability.intro()],
				['Reference Material',scb_assignment_specific_decusability.ref()],
    			['Question 1', scb_assignment_specific_decusability.question_1()],
    			['Question 2', scb_assignment_specific_decusability.question_2()]
    			];
    		decusability.template.experiment_setup = scb_assignment_specific_decusability.experiment_setup();

			decusability.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'decusability.setup',
				css: {
					width: '800px',
					height: '700px',
					left: 'inherit',
					top: '000px'
				}
			});
			get_courses_result.list[x] = decusability;
		}
		
		if(get_courses_result.list[x].id == 'decusability2'){
			decusability_newfacs = get_courses_result.list[x];
    		decusability_newfacs.template.instructions = [
    			['Welcome to the Usability Evaluation', scb_assignment_specific_decusability.welcome_usability()],
				['Introduction',scb_assignment_specific_decusability.intro()],
				['Reference Material',scb_assignment_specific_decusability.ref()],
    			['Question 1', scb_assignment_specific_decusability.question_1()],
    			['Question 2', scb_assignment_specific_decusability.question_2()]
    			];
    		decusability_newfacs.template.experiment_setup = scb_assignment_specific_decusability.experiment_setup();

			decusability_newfacs.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'decusability.setup',
				css: {
					width: '800px',
					height: '700px',
					left: 'inherit',
					top: '000px'
				}
			});
			get_courses_result.list[x] = decusability_newfacs;
		}
		if(get_courses_result.list[x].id == 'assignment_tufts'){
			assignment_tufts = get_courses_result.list[x];
			assignment_tufts.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'mit706s13.setup',
				css: {
					width: '600px',
					height: '400px',
					left: 'inherit',
					top: '000px'
				}
			});
			assignment_tufts.template.experiment_setup = scb_assignment_specific_tufts.experiment_setup();
			assignment_tufts.description = scb_assignment_specific_tufts.assignment_overview();
			get_courses_result.list[x] = assignment_tufts;
			
		}
	}
});



function ps2_change(array){
	var return_array = []
	for(var x =0; x<array.length; x++){
		if(array[x] == 1)
			return_array[x] = 'rna1'
		if(array[x] == 2)
			return_array[x] = 'rna2'
		if(array[x] == 3)
			return_array[x] = 'rna3'
		if(array[x] == 4)
			return_array[x] = 'rna4'
		if(array[x] == 5)
			return_array[x] = 'rna5'
	}
	return return_array;
}

function replace_names(structure, array_of_names, array_of_order){
	for(var x = 0; x < array_of_names.length; x ++){
		structure[array_of_names[x]].name = array_of_order[x];
	}
	return structure
}

function choose_n_mutant_strains(n_array,id_array,assignment){
	
	n = n_array.length;
	for(var x = 0; x <n_array.length; x++){
		var element = null;
		if(n_array[x]=='A')
			element = ps2_strain_A;
		else if(n_array[x]=='B')
			element = ps2_strain_B;
		else if(n_array[x]=='C')
			element = ps2_strain_C;
		else if(n_array[x]=='D')
			element = ps2_strain_D;
		else if(n_array[x]=='E')
			element = ps2_strain_E;
		for (var y = 0; y < assignment.template.model.western_blot.cyto.parser_fixed.length ; y++){
			var parser = assignment.template.model.western_blot.cyto.parser_fixed[y];
			if(parser.cell_line == 'm1' && id_array[x] =='m1'){
				parser = element.western_blot;
				parser.cell_line = 'm1';
				assignment.template.model.western_blot.cyto.parser_fixed[y]=parser;
			}
			else if(parser.cell_line == 'm2' && id_array[x] =='m2'){
				parser = element.western_blot;
				parser.cell_line = 'm2';
				assignment.template.model.western_blot.cyto.parser_fixed[y]=parser;
			}	
		}
		for (var y = 0; y < assignment.template.model.facs.dna.parser_simple.length; y++){
			var parser = assignment.template.model.facs.dna.parser_simple[y];
			if(parser.cell_line == 'm1' && id_array[x] =='m1'){
				parser = element.facs;
				parser.cell_line = 'm1';
				assignment.template.model.facs.dna.parser_simple[y]=parser;
			}
			else if(parser.cell_line == 'm2' && id_array[x] =='m2'){
				parser = element.facs;
				parser.cell_line = 'm2';
				assignment.template.model.facs.dna.parser_simple[y]=parser;
			}
		}
	}
	return assignment
}