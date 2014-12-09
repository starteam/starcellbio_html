microEntity = $('<div />').html('&#181;').text();
degreeEntity = $('<div />').html('&deg;').text();

///OLD ASSIGNMENTS//////////
var __assigment_facs = {
    id: 'assignment_3',
    name: 'FACS prototype',
    course: 'StarX',
    course_name: 'Prototypes',
    description: 'FACS prototype assignment.',
    notebook: {},
    experiments: {
    },
    template: {
        instructions: [
            ['Goal & Introduction', 'FACS prototype assignment.']
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
            order: [1, 2, 3],
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
    notebook: {},
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
            ]
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
            order: [1, 2, 3, 9, 4, 5, 6, 7, 8],
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

var __assignment2 = {
    id: 'assignment_2',
    course: '7.02',
    course_name: 'MIT Course 7.02',
    name: 'StarCellBio Prototype Assignment',
    description: 'Biochemical approach to analyzing vulva development in <i>C. elegans.</i>',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Your new lab is studying vulva development in <i>C. elegans</i>. You screen a chemical library and identify four new drugs, which all affect vulva development, and you name them Vulvarine 1, 2, 3 and 4.<br><br>Increasing amounts of Vulvarines 1 and 2 result in a vulvaless phenotype in the wild-type worms whereas treatment of wild-type worms with Vulvarines 3 and 4 results in a multivulva phenotype. Your advisor tells you that some proteins involved in the vulva development pathway are already known and she advises you to do western blots to test if some of these proteins are affected by these treatments.<br><br>i) Use the StarCellBio software to analyze the western blots from worms treated with increasing doses of Vulvarines. Choose the gene products whose expression you would like to check. <br>ii) Which proteins are affected by Vulvarine treatment? What is the critical Vulvarine concentration for each treatment?<br> iii) Look up the biological function of each protein whose expression is affected by the drug and speculate as to how the change in its levels may have a role in vulva development.<br>']

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
            order: [1, 2, 3, 9, 4, 5, 6, 7, 8],
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
    course: 'Bio52',
    course_name: 'Tufts Bio52',
    description: 'Bio52 Homework Assignment.',
    notebook: {},
    experiments: {
    },
    template: {
        instructions: [
            ['Goal & Introduction', "Here come instructions"]
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
                actions: []//

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
                name: '20' + microEntity + 'M',
                value: 20
            },
            10: {
                name: '10' + microEntity + 'M',
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
            order: [1, 2, 3, 4, 5],
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
                                }
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

var __decusability_newfacs = {
    id: 'decusability2',
    name: 'StarCellBio Usability Test2',
    course: 'usability',
    course_name: 'December 2013 Usability Testing',
    description: 'FACS and Western Blot for temperature sensitive mutants',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
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
                                            {
                                                facs: {'whole': 1, 'a': 1},
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '25'
                                            }
                                        ]}}
                                ], NOPP1: [
                                    {cell_line: 'wt',
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
                                    {cell_line: 'wt',
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
                                    {cell_line: 'wt',
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
            'Dye': {
                name: 'Dye/Stain',
                conditions: {
                    'whole': {name: 'PI',
                        short_name: 'PI'}
                }
            },
            'Anti': {
                name: 'Antibody-labeling ',
                conditions: {
                    'a': {name: 'Antibody',
                        short_name: 'Antibody'}
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

var __usability_test = {
    id: 'usability_test',
    name: 'SCB Usability Test',
    course: 'StarX',
    course_name: 'Prototypes',
    description: "Placeholder",
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Placeholder', 'Usability test']
        ],
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
            ]
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
            order: [1, 2, 3, 9, 4, 5, 6, 7, 8, 9],
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

var __microscopy_test = {
    id: 'microscopy_test',
    name: 'StarCellBio Microscopy Test',
    course: 'StarX',
    course_name: 'Prototypes',
    description: 'Microscopy Test of images',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
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
                ]
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
                    '%COLLECTION%': {attr: ['treatment_list', 'list', '0', 'collection_id'], map: ['collections', '%KEY%', 'name']}
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
                        {schedule_value: 5000, collection_id: '6 m', schedule: 'immediately', // start
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
        collections: {
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
            'whole': {
                name: 'PI',
                conditions: {
                    'whole': {name: 'PI'}
                }
            }
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'NFIB (red), DAPI (blue), control (green)',
                        short_name: 'IF: RGB'}
                }
            },
            'IHC': {
                name: 'Antibody-labeling IHC',
                conditions: {
                    'NFIB': {name: 'NFIB',
                        short_name: 'IHC: NFIB'},
                    'ki67': {name: 'Ki-67',
                        short_name: 'IHC: Ki-67'},
                    'secondary': {name: 'Secondary only control',
                        short_name: 'IHC: Secondary'}
                }
            },
            'Dye': {
                name: 'Dye/Stain',
                conditions: {
                    'HnE': {name: 'H&E',
                        short_name: 'Dye: H&E'}
                }

            }
        },
        slides: {
//         		'img1': 'images/microscopy/microscopy_test/Normal_lung/HnE/Sample_1/AD20E1_20x.jpg',
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
        slide_parser: {
            'default': {
                'Dye': {
                    'HnE': {
                        // 				'1': [{
// 									hash: 'img1',
// 									mag: '20x'
// 								}],
                        '1': [
                            {
                                hash: 'img2',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img3',
                                mag: '20x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img5',
                                mag: '20x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img6',
                                mag: '20x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img7',
                                mag: '4x'
                            }
                        ],
                        '6': [
                            {
                                hash: 'img8',
                                mag: '4x'
                            }
                        ],
                        '7': [
                            {
                                hash: 'img9',
                                mag: '4x'
                            }
                        ],
                        '8': [
                            {
                                hash: 'img10',
                                mag: '20x'
                            }
                        ],
                        '9': [
                            {
                                hash: 'img4',
                                mag: '40x'
                            }
                        ]
                    }
                }
            },
            '3 m': {
                'Dye': {
                    'HnE': {
                        '1': [
                            {
                                hash: 'img11',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img12',
                                mag: '10x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img13',
                                mag: '20x'
                            }
                        ]
                    }
                }
            },
            '6 m': {
                'Dye': {
                    'HnE': {
                        '1': [
                            {
                                hash: 'img14',
                                mag: '40x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img15',
                                mag: '20x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img17',
                                mag: '40x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img18',
                                mag: '20x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img20',
                                mag: '40x'
                            }
                        ],
                        '6': [
                            {
                                hash: 'img21',
                                mag: '20x'
                            }
                        ],
                        '7': [
                            {
                                hash: 'img16',
                                mag: '40x'
                            }
                        ],
                        '8': [
                            {
                                hash: 'img22',
                                mag: '40x'
                            }
                        ],
                        '9': [
                            {
                                hash: 'img19',
                                mag: '40x'
                            }
                        ]
                    }
                },
                'IHC': {
                    'secondary': {
                        '1': [
                            {
                                hash: 'img23',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img27',
                                mag: '40x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img29',
                                mag: '20x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img30',
                                mag: '40x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img24',
                                mag: '40x'
                            }
                        ]
                    },
                    'ki67': {
                        '1': [
                            {
                                hash: 'img25',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img28',
                                mag: '40x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img31',
                                mag: '20x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img26',
                                mag: '40x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img32',
                                mag: '40x'
                            }
                        ]
                    }
                }
            },
            '1 yr': {
                'Dye': {
                    'HnE': {
                        '1': [
                            {
                                hash: 'img33',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img34',
                                mag: '20x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img35',
                                mag: '4x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img38',
                                mag: '20x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img39',
                                mag: '20x'
                            }
                        ],
                        '6': [
                            {
                                hash: 'img40',
                                mag: '20x'
                            }
                        ],
                        '7': [
                            {
                                hash: 'img36',
                                mag: '10x'
                            }
                        ],
                        '8': [
                            {
                                hash: 'img37',
                                mag: '20x'
                            }
                        ]
                    }
                },
                'IF': {
                    'rgb': {
                        '1': [
                            {
                                hash: 'img44',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img41',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img42',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img43',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img45',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        '3': [
                            {
                                hash: 'img46',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        '4': [
                            {
                                hash: 'img50',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img47',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img48',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img49',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        '5': [
                            {
                                hash: 'img54',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img51',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img52',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img53',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ]
                    }
                },
                'IHC': {
                    'NFIB': {
                        '1': [
                            {
                                hash: 'img55',
                                mag: '20x'
                            }
                        ],
                        '2': [
                            {
                                hash: 'img56',
                                mag: '20x'
                            }
                        ]
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

                    'parser_simple': [
                        {
                            match: [],

                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '3 m',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'IHC',
                            conditions: 'secondary'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'IHC',
                            conditions: 'ki67'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '1 yr',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'pfl',
                            drug_id: 'ac',
                            collection_id: '1 yr',
                            kind: 'IF',
                            conditions: 'rgb'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
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

var __assigment_706 = {
    id: 'mit_7_06_0313',
    name: '7.06 Spring 2013',
    course: '7.06',
    course_name: 'MIT Course 7.06',
    description: 'FACS and Western Blot for temperature sensitive mutants',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
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
            'whole': {
                name: 'PI',
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

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

///NEW ASSIGNMENTS//////////


var blank_model = {
    id: '',
    name: '',
    course: '',
    course_name: '',
    description: '',
    notebook: {},
    experiments: {},
    template: {
        random_choose: true,
        randomize_all: false,
        random_order: [],
        finished_random: false,
        instructions: [
            ['', '']
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
                    '', 'Strain', 'Treatment', 'Treatment Duration'
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
                                            {collection_id: 'default', microscope: ['rgb', 'g', 'gr', 'rb'],
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '100'}
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
        collections: {
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
            order: ['chk1'],
            'chk1': {
                name: 'rabbit anti-chk1',
                secondary: ['r'],
                marks: [
                    {weight: 54, intensity: 0}
                ],
                gel_name: 'chk1'
            },
        },//
        secondary_anti_body: {
            'm': {
                name: 'rabbit anti-mouse'
            }
        },//
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            }
        },
        facs_kinds: {
            'whole': {
                name: 'PI',
                conditions: {
                    'whole': {name: 'PI'}
                }
            }
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'γ-tubulin (red), α-tubulin (green), DAPI (blue)',
                        short_name: 'R:γ-tub, G:α-tub, B:DAPI'},
                    'g': {name: 'H2B (green)',
                        short_name: 'G:H2B'}
                }
            }
        },
        slides: {
            'img0001': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_off_kinetochores/Mad2_Cytoplasm_cropped.jpg'
        },
        slide_parser: {
            'default': {
                'IF': {
                    'rgb': {
                        'interphase': [
                            [
                                {'hash': 'img0004', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ]
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
                        }
                    ]

                }
            },
            microscopy: {
                'valid': ['S2', 'nc'],
                'slide': {

                    'conditions_parser': [
                        {
                            match: [],

                        },
                        {
                            match: ['cell_line', 'drug_id', 'conditions'],
                            cell_line: 'S2',
                            drug_id: ['nc'],
                            conditions: 'rgb',
                            phenotype: 'composite3'
                        }
                    ]

                }
            }

        }
    }
}


var __decusability = {
    id: 'decusability',
    name: 'StarCellBio Usability Test',
    course: 'usability',
    course_name: 'December 2013 Usability Testing',
    description: 'FACS and Western Blot for temperature sensitive mutants',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs'],
                gel_types: ['.10', '.12', '.15']
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
                                NOPP1: [
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
                                NOPP1: [
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
                                NOPP1: [
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
                                NOPP1: [
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
                                NOPP1: [
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
                                NOPP1: [
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
            }
        },
        drugs: {
            'nc': {
                name: 'Growth Media',
                concentrations: [0]
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
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'cyclin B'
            },
            'cyclinE': {
                name: 'mouse anti-cyclin E',
                secondary: ['m'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'cyclin E'
            },
            'pgk1': {
                name: 'rabbit anti-pgk1',
                secondary: ['r'],
                marks: [
                    {weight: 45, intensity: 0}
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
            'whole': {
                name: 'PI',
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
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'micro'],
                gel_types: ['.10', '.12', '.15']
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
                'gfp': {
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
                'gfp1': {
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
                'gfp2': {
                    rows: [
                        {
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
                'gfp3': {
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
                'gfp4': {
                    rows: [
                        {
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
                'gfp5': {
                    rows: [
                        {
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
                'gfpH': {
                    rows: [
                        {
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
                'gfp100': {
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
                'gfpTD': {
                    rows: [
                        {
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
        collections: {
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
                name: 'Growth media + ligand',
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
            order: ['mp1', 'mp2', 'mp3', 'mp4', 'mp5', 'mpAG'],
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
                    {weight: 134, intensity: 0}
                ],
                gel_name: 'P-Protein B'
            },
            'mp3': {
                name: 'mouse anti-phospho-protein C',
                secondary: ['m'],
                marks: [
                    {weight: 44, intensity: 0}
                ],
                gel_name: 'P-Protein C'
            },
            'mp4': {
                name: 'mouse anti-phospho-protein D',
                secondary: ['m'],
                marks: [
                    {weight: 67, intensity: 0}
                ],
                gel_name: 'P-Protein D'
            },
            'mp5': {
                name: 'mouse anti-phospho-protein E',
                secondary: ['m'],
                marks: [
                    {weight: 74, intensity: 0}
                ],
                gel_name: 'P-Protein E'
            },
            'mpAG': {
                name: 'rabbit anti-GAPDH',
                secondary: ['r'],
                marks: [
                    {weight: 37, intensity: 0}
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
            'IF': {
                name: 'Fluorescence',
                conditions: {
                    'rgb': {name: 'GFP (green)',
                        short_name: 'Fluorescence: GFP'}
                }
            }
        },
        slides: {
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
        slide_parser: {
            'default': {
                'IF': {
                    'rgb': {
                        'cytoplasm': [
                            [
                                {
                                    hash: 'img1',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img2',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img3',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img4',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img40',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img41',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img6',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img42',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img7',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img8',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]
                        ],
                        'plasma_membrane': [
                            [
                                {
                                    hash: 'img36',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img37',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img44',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img45',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]

                        ],
                        'nucleus': [
                            [
                                {
                                    hash: 'img21',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img22',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img23',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img24',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img26',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img29',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img30',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img31',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img32',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img46',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]


                        ],
                        'cytoplasm_nucleus': [
                            [
                                {
                                    hash: 'img9',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img10',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img11',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img12',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img13',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img14',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img16',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img17',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img18',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img19',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img20',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]

                        ]
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

                    'complex_parser': [
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
                            drug_id: ['gm', 'gml', 'gmi', 'gmil'],
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
                            drug_id: ['gml', 'gmil'],
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
                            drug_id: ['gm', 'gmi', 'gmil'],
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
    notebook: {},
    experiments: {},
    template: {
        random_choose: true,
        randomize_all: false,
        random_order: [],
        finished_random: false,
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs', 'micro' ],
                gel_types: ['.10', '.12', '.15']
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
                    '', 'Strain', 'Treatment', 'Treatment Duration'
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
                                            {collection_id: 'default', microscope: ['rgb', 'g', 'gr', 'rb'],
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
                                            {collection_id: 'default', microscope: ['g'],
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
                                            {collection_id: 'default', microscope: ['g', 'gr', 'rb'],
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
                                            {collection_id: 'default', microscope: ['rgb', 'g', 'rb'],
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
                                            {collection_id: 'default', microscope: ['na'],
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
                                            {collection_id: 'default', microscope: ['rgb', 'g'],
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
                                            {collection_id: 'default', microscope: ['na'],
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
                                        treatment_list: {
                                            list: [
                                                {
                                                    collection_id: 'default',
                                                    microscope: ['na'],
                                                    duration_value: 3600 * 24 * 3,
                                                    duration: '3 d',
                                                    drug_list: {
                                                        list: [
                                                            {drug_id: 'Hydroxyurea', concentration_id: '100'},
                                                        ]
                                                    },
                                                    temperature: '25'
                                                }
                                            ]

                                        }}
                                ]
                            }
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: "C", treatment_id: 'colchicine'},
                                {kind: 'text', text: 'S2'},
                                {kind: 'text', text: 'Colchicine'},
                                {kind: 'text', text: "3 days"}
                            ],
                            treatment_id: 'colchicine',
                            cell_treatments: {
                                C: [
                                    {cell_line: 'S2',
                                        treatment_list: {list: [
                                            {collection_id: 'default', microscope: ['na'],
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Colchicine', concentration_id: '100'},
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
        collections: {
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
            'Colchicine': {
                name: 'Colchicine',
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
            order: ['chk1', 'rad21', 'cyclin', 'cyclinE', 'mad2', 'pgk1'],
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
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'cyclin B'
            },
            'cyclinE': {
                name: 'mouse anti-cyclin E',
                secondary: ['m'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'cyclin E'
            },
            'mad2': {
                name: 'rabbit anti-Mad2',
                secondary: ['r'],
                marks: [
                    {weight: 25, intensity: 0}
                ],
                gel_name: 'mad2'
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
            'whole': {
                name: 'PI',
                conditions: {
                    'whole': {name: 'PI'}
                }
            }
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'γ-tubulin (red), α-tubulin (green), DAPI (blue)',
                        short_name: 'R:γ-tub, G:α-tub, B:DAPI'},
                    'g': {name: 'H2B (green)',
                        short_name: 'G:H2B'},
                    'gr': {name: 'H2B (green), α-tubulin(red)',
                        short_name: 'G:H2B, R:α-tub'},
                    'rb': {name: 'Mad2 (red), DAPI (blue)',
                        short_name: 'R:Mad2, B:DAPI'},
                    'na': {name: 'None',
                        short_name: 'None'}
                }
            }
        },
        slides: {
            'img0001': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_off_kinetochores/Mad2_Cytoplasm_cropped.jpg',
            'img0002': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_on_kinetochore/Mad2_kinetochore_2_cropped.jpg',
            'img0003': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_DNA-blue_Mad2-red/Mad2_on_kinetochore/Mad2_kinetochore_cropped.jpg',

            'img0004': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_10.jpg',
            'img0005': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_12.jpg',
            'img0006': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Interphase_13.jpg',
            'img0007': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_1.jpg',
            'img0008': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_2.jpg',
            'img0009': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Interphase/Maybe_Interphase_3.jpg',

            'img0010': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Metaphase_arrest/Metaphase_arrest_1.jpg',
            'img0011': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Metaphase_arrest/metaphase_arrest_4.jpg',
            'img0012': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Metaphase_arrest/metaphase_arrest_5.jpg',

            'img0013': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Nocodazole_treated_cells/nocodazole_treated_1.jpg',
            'img0014': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Nocodazole_treated_cells/nocodazole_treated_2.jpg',
            'img0015': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Nocodazole_treated_cells/nocodazole_treated_3.jpg',
            'img0016': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Nocodazole_treated_cells/nocodazole_treated_4.jpg',

            'img0017': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_1.jpg',
            'img0018': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_2.jpg',
            'img0019': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_3.jpg',
            'img0020': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_4.jpg',
            'img0021': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_5.jpg',
            'img0022': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Anaphase/Normal_Anaphase_6.jpg',

            'img0024': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_4.jpg',
            'img0025': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_5.jpg',
            'img0027': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_7.jpg',
            'img0028': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_8.jpg',
            'img0029': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Normal_Metaphase/Normal_Metaphase_9.jpg',

            'img0034': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Normal_Metaphase/PSSC_control_Barren.jpg',

            'img0035': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Premature_Sister_Chromatid_Separation/PSSC_1.jpg',
            'img0036': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green/Premature_Sister_Chromatid_Separation/PSSC_2.jpg',

            'img0037': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Anaphase/Normal_Anaphase.jpg',

            'img0038': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Chromosome_Bridges/Chromosome_Bridges_Color.jpg',

            'img0039': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Interphase/Normal_Interphase_2_Color.jpg',
            'img0040': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Interphase/Normal_Interphase_Color.jpg',

            'img0041': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Metaphase/Normal_Metaphase_2.jpg',

            'img0042': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_H2B-green_tubulin-red/Unequal_Chromosome_Distribution/Unequal_chromosome_distribution_2.jpg',


            'img0049': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
            'img0050': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
            'img0051': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
            'img0052': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
            'img0053': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
            'img0054': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
            'img0055': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
            'img0056': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
            'img0057': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
            'img0058': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
            'img0059': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
            'img0060': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
            'img0067': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
            'img0068': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
            'img0069': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
            'img0070': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
            'img0071': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
            'img0072': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
            'img0073': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
            'img0074': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
            'img0075': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
            'img0076': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
            'img0077': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
            'img0078': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
            'img0079': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
            'img0080': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
            'img0081': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
            'img0082': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
            'img0083': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
            'img0084': 'images/microscopy/assignment_706_2014_ps2/composites/Metaphase_Anaphase-control/Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',

            'img0085': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution_2.jpg',
            'img0087': 'images/microscopy/assignment_706_2014_ps2/Antibody_Labeling_IF_DNA-blue_MT-green_spindle_poles-red/Unequal_Chromosome_Distribution/Unequal_Chromosome_Distribution_6.jpg'
        },
        slide_parser: {
            'default': {
                'IF': {
                    'rgb': {
                        'interphase': [
                            [
                                {'hash': 'img0004', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0005', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0006', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0007', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0008', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0009', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'metaphase_arrest': [
                            [
                                {'hash': 'img0010', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0011', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0012', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'normal_metaphase': [
                            [
                                {'hash': 'img0024', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0025', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0027', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0028', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0029', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'nocodazole': [
                            [
                                {'hash': 'img0013', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0014', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0015', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0016', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'anaphase': [
                            [
                                {'hash': 'img0017', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0018', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0019', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0020', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0021', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0022', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'unequal': [
                            [
                                {'hash': 'img0085', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0087', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ],
                        'composite5': [
                            [
                                {'hash': 'img0052', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0053', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0054', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0055', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0056', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0057', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0058', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0059', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0060', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0067', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0068', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0069', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0070', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0071', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0072', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0073', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0074', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0075', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0076', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0077', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0078', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0079', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0080', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0081', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0082', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0083', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0084', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0049', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0050', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0051', 'if_type': 'merge', 'mag': 'N/A'}
                            ]
                        ]
                    },
                    'g': {
                        'premature': [
                            [
                                {
                                    hash: 'img0035',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ],
                            [
                                {
                                    hash: 'img0036',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]
                        ],
                        'normal_metaphase': [
                            [
                                {
                                    hash: 'img0034',
                                    mag: 'N/A',
                                    if_type: 'green'
                                }
                            ]
                        ]
                    },
                    'gr': {
                        'interphase': [
                            [
                                {
                                    hash: 'img0039',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ],
                            [
                                {
                                    hash: 'img0040',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ],
                        'metaphase': [
                            [
                                {
                                    hash: 'img0041',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ],
                        'anaphase': [
                            [
                                {
                                    hash: 'img0037',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ],
                        'unequal': [
                            [
                                {
                                    hash: 'img0042',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ],
                        'bridges': [
                            [
                                {
                                    hash: 'img0038',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ]
                    },
                    'rb': {
                        'off': [
                            [
                                {
                                    hash: 'img0001',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ],
                        'on': [
                            [
                                {
                                    hash: 'img0002',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ],
                            [
                                {
                                    hash: 'img0003',
                                    mag: 'N/A',
                                    if_type: 'merge'
                                }
                            ]
                        ]
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    weight: 59,
                                    intensity: 4,
                                    primary_anti_body: ['chk1']
                                },
                                {
                                    name: 'Chk1',
                                    weight: 54,
                                    intensity: 0.5,
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                            drug: 'Colchicine',
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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
                                    name: 'Mad2',
                                    weight: 25,
                                    intensity: 2,
                                    primary_anti_body: ['mad2']
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

                    'conditions_parser': [
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

var __june_2014_usability = {
    id: 'microscopy_usability',
    name: 'Microscopy Usability Test',
    course: 'usability',
    course_name: 'StarCellBio Usability Testing',
    description: 'Microscopy Test of images',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ['Goal & Introduction', 'Here come instructions when we build them']
        ],
        ui: {
            experimental_design: {
                techniques: [ 'micro'],
                gel_types: ['.10', '.12', '.15']
            },
            experiment_setup: {
                table: [
                    {kind: "cell_plate", title: " ", editable: false},
                    {kind: 'cell_line', title: 'Strain', editable: false},
                    {kind: 'treatments',
                        children: [
                            {kind: 'drug', title: 'Treatment', editable: false},
                            {kind: 'collection', title: 'Timepoints', editable: false}
                        ]
                    },
                    {kind: 'actions', title: 'Actions'}
                ],
                actions: [
                ]
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
                    '%COLLECTION%': {attr: ['treatment_list', 'list', '0', 'collection_id'], map: ['collections', '%KEY%', 'name']}
                }
            },
            add_multiple_dialog: {
                order: ['wt', 'cko'],
                headings: [
                    '', 'Strains', 'Treatments', 'Timepoints'
                ],
                'wt': {
                    rows: [
                        {
                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV3'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "3 months"}
                            ],
                            treatment_id: 'controlV3',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '3 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }
                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV6'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "6 months"}
                            ],
                            treatment_id: 'controlV6',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '6 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV1'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "1 year"}
                            ],
                            treatment_id: 'controlV1',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '1 yr', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        },
                        {
                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV3'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "3 months"}
                            ],
                            treatment_id: 'creV3',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '3 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        },
                        {

                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV6'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "6 months"}
                            ],
                            treatment_id: 'creV6',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '6 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        },
                        {


                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV1'},
                                {kind: 'text', text: 'Wild type'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "1 year"}
                            ],
                            treatment_id: 'creV1',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'wt',
                                        treatment_list: {list: [
                                            {collection_id: '1 yr', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        }

                    ]
                },
                'cko': {
                    rows: [
                        {

                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV3'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "3 months"}
                            ],
                            treatment_id: 'controlV3',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '3 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }

                        },
                        {

                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV6'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "6 months"}
                            ],
                            treatment_id: 'controlV6',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '6 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }



                        },
                        {

                            cells: [
                                {kind: 'checkbox', name: "control", treatment_id: 'controlV1'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Control Virus'},
                                {kind: 'text', text: "1 year"}
                            ],
                            treatment_id: 'controlV1',
                            cell_treatments: {
                                control: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '1 yr', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ae', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }





                        },
                        {

                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV3'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "3 months"}
                            ],
                            treatment_id: 'creV3',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '3 m', microscope: ['HnE'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }




                        },
                        {


                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV6'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "6 months"}
                            ],
                            treatment_id: 'creV6',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '6 m', microscope: ['HnE', 'ki67', 'cgrp'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }





                        },
                        {


                            cells: [
                                {kind: 'checkbox', name: "cre", treatment_id: 'creV1'},
                                {kind: 'text', text: 'Conditional KO'},
                                {kind: 'text', text: 'Cre Virus'},
                                {kind: 'text', text: "1 year"}
                            ],
                            treatment_id: 'creV1',
                            cell_treatments: {
                                cre: [
                                    {cell_line: 'cko',
                                        treatment_list: {list: [
                                            {collection_id: '1 yr', microscope: ['HnE', 'cgrp', 'rgb'],
                                                drug_list: {list: [
                                                    {drug_id: 'ac', concentration_id: '108'},
                                                ]}, temperature: '22'
                                            }
                                        ]}}
                                ]
                            }
                        }

                    ]
                }

            }

        },

        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs',
        collections: {
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
                name: 'Cre Virus',
                concentrations: ['108']
            },
            'ae': {
                name: 'Control Virus',
                concentrations: ['108']
            }
        },
        experiment_temperatures: {
            '22': {
                name: "22" + degreeEntity + "C"
            }
        },

        cell_lines: {
            'wt': {
                name: 'Wild Type',
                full_name: 'Wild Type'
            },
            'cko': {
                name: 'Conditional KO',
                full_name: 'Conditional KO'
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
            'whole': {
                name: 'PI',
                conditions: {
                    'whole': {name: 'PI'}
                }
            }
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'Nfib (red), DAPI (blue), control (green)',
                        short_name: 'R:Nfib, G:control, B:DAPI'}
                }
            },
            'IHC': {
                name: 'Antibody-labeling IHC',
                conditions: {
                    'ki67': {name: 'Ki-67 (brown), hematoxylin (blue)',
                        short_name: 'IHC: Ki-67'},
                    'cgrp': {name: 'CGRP (brown), hematoxylin (blue)',
                        short_name: 'IHC: CGRP'}
                }
            },
            'Dye': {
                name: 'Dye/Stain',
                conditions: {
                    'HnE': {name: 'Hematoxylin and Eosin (H&E)',
                        short_name: 'Dye: H&E'}
                }

            }
        },
        slides: {
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
            'img56': 'images/microscopy/microscopy_test/lung_1yr/match/Sample_2/AD3587E_NFIB_20X-1.jpg',

            'img60': 'images/microscopy/microscopy_test/lung_1yr/CGRP_IHC/35873587E_advanced_strong_10X.jpg',
            'img61': 'images/microscopy/microscopy_test/lung_1yr/CGRP_IHC/AD3172E_Nfib_10X_strong-2-0001.jpg',
            'img62': 'images/microscopy/microscopy_test/lung_1yr/CGRP_IHC/35883588E_advanced_strong_20X.jpg',

            'img63': 'images/microscopy/microscopy_test/lung_6m/CGRP_IHC/31723172E_early_strong_20X-2.jpg',
            'img64': 'images/microscopy/microscopy_test/lung_6m/CGRP_IHC/AD1017_NFIB_20X.jpg',
            'img65': 'images/microscopy/microscopy_test/lung_6m/CGRP_IHC/35253525E_early_weak_20X.jpg',
            'img66': 'images/microscopy/microscopy_test/lung_6m/CGRP_IHC/35873587E_early_strong_20X.jpg',
            'img67': 'images/microscopy/microscopy_test/lung_6m/CGRP_IHC/AD3587E_NFIB_20X-1.jpg'


        },
        slide_parser: {
            'default': {
                'Dye': {
                    'HnE': [
                        [
                            {
                                hash: 'img1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img7',
                                mag: '4x'
                            }
                        ],
                        [
                            {
                                hash: 'img8',
                                mag: '4x'
                            }
                        ],
                        [
                            {
                                hash: 'img9',
                                mag: '4x'
                            }
                        ],
                        [
                            {
                                hash: 'img10',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img4',
                                mag: '40x'
                            }
                        ]
                    ]
                }
            },
            '3 m': {
                'Dye': {
                    'HnE': [
                        [
                            {
                                hash: 'img11',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img12',
                                mag: '10x'
                            }
                        ],
                        [
                            {
                                hash: 'img13',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            '6 m': {
                'Dye': {
                    'HnE': [
                        [
                            {
                                hash: 'img14',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img15',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img17',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img18',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img20',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img21',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img16',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img22',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img19',
                                mag: '40x'
                            }
                        ]
                    ]
                },
                'IHC': {
                    'cgrp': [
                        [
                            {
                                hash: 'img63',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img64',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img65',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img66',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img67',
                                mag: '20x'
                            }
                        ]
                    ],
                    'ki67': [
                        [
                            {
                                hash: 'img25',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img28',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img31',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img26',
                                mag: '40x'
                            }
                        ],
                        [
                            {
                                hash: 'img32',
                                mag: '40x'
                            }
                        ]
                    ]
                }
            },
            '1 yr': {
                'Dye': {
                    'HnE': [
                        [
                            {
                                hash: 'img33',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img34',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img35',
                                mag: '4x'
                            }
                        ],
                        [
                            {
                                hash: 'img38',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img39',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img40',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'img36',
                                mag: '10x'
                            }
                        ],
                        [
                            {
                                hash: 'img37',
                                mag: '20x'
                            }
                        ]
                    ]
                },
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'img44',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img41',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img42',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img43',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        [
                            {
                                hash: 'img45',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        [
                            {
                                hash: 'img46',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        [
                            {
                                hash: 'img50',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img47',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img48',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img49',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ],
                        [
                            {
                                hash: 'img54',
                                if_type: 'red',
                                mag: '60x'
                            },
                            {
                                hash: 'img51',
                                if_type: 'blue',
                                mag: '60x'
                            },
                            {
                                hash: 'img52',
                                if_type: 'green',
                                mag: '60x'
                            },
                            {
                                hash: 'img53',
                                if_type: 'merge',
                                mag: '60x'
                            }
                        ]
                    ]
                },
                'IHC': {
                    'cgrp': [
                        [
                            {
                                hash: 'img60',
                                mag: '10x'
                            }
                        ],
                        [
                            {
                                hash: 'img61',
                                mag: '10x'
                            }
                        ],
                        [
                            {
                                hash: 'img62',
                                mag: '20x'
                            }
                        ]
                    ]
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
                'valid': ['cko', 'ac'],
                'slide': {

                    'parser_simple': [
                        {
                            match: [],

                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '3 m',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'IHC',
                            conditions: 'cgrp'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '1 yr',
                            kind: 'IHC',
                            conditions: 'cgrp'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '6 m',
                            kind: 'IHC',
                            conditions: 'ki67'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '1 yr',
                            kind: 'Dye',
                            conditions: 'HnE'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'collection_id', 'kind', 'conditions'],
                            cell_line: 'cko',
                            drug_id: 'ac',
                            collection_id: '1 yr',
                            kind: 'IF',
                            conditions: 'rgb'
                        }

                    ]

                }
            }

        }
    }
};


var ps2_strain_A = {
    'western_blot': {
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
    'facs': {
        match: ['cell_line', 'temperature'],
        cell_line: '',
        temperature: 40,
        shape: 'g2-block'
    }

};

var ps2_strain_B = {
    'western_blot': {
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
    'facs': {
        match: ['cell_line', 'temperature'],
        cell_line: '',
        temperature: 40,
        shape: 'S-block'
    }
};

var ps2_strain_C = {
    'western_blot': {
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
    'facs': {
        match: ['cell_line', 'temperature'],
        cell_line: '',
        temperature: 40,
        shape: 'g1-block'
    }

};

var ps2_strain_D = {
    'western_blot': {
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
    'facs': {
        match: ['cell_line', 'temperature'],
        cell_line: '',
        temperature: 40,
        shape: 'alpha-block'
    }


};

var ps2_strain_E = {
    'western_blot': {
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
    'facs': {
        match: ['cell_line', 'temperature'],
        cell_line: '',
        temperature: 40,
        shape: 'g2-block'
    }

};

var __scb_sample_1 = {
    id: 'scb_ex1',
    name: 'Exercise 1',
    course: 'SCB_SampleExercises',
    course_name: 'Sample Exercises',
    description: 'StarCellBio Exercise 1 – Protein localization',
    notebook: {},
    experiments: {},
    template: {
        instructions:[
                ["Goal & Learning Objectives", scb_ex1_text.goal({})],
                ["Introduction",scb_ex1_text.intro({})],
                ["Background Information",scb_ex1_text.bg_info({})],
                ["Questions",scb_ex1_text.questions({})]

            ],
        ui: {
            experimental_design: {
                techniques: [ 'micro' ]
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
                    {kind: 'actions', title: 'Actions'}//
                ],//
                actions: [
                    {kind: "add_many", name: "Add Samples", open: 'scb_ex1.setup', css: {
                        width: '885px',
                        height: '600px',
                        left: 'inherit',
                        top: '15%'
                    },
                        'collection_id': '%CELL_LINE%'
                    }

                ]
            },
            microscopy: {
                disable_blur: false,
                disable_brightness: false
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
                order: ['no-gfp', 'gfp', 'gfp-pa', 'gfp-pb', 'gfp-pc','gfp-pd','gfp-ma','gfp-mb','gfp-nuc','gfp-cyto','gfp-pm',
                        'gfp-er','gfp-nm'],
                headings: [
                    '', 'Strains', 'Treatments'
                ],
                'no-gfp': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'No GFP'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'no-gfp',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-pa': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Protein A'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pa',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-pb': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Protein B'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pb',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-pc': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Protein C'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pc',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-pd': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Protein D'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pd',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-ma': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Mutant A'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-ma',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-mb': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Mutant B'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-mb',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-nuc': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Nuc'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-nuc',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-cyto': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Cyto'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-cyto',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-pm': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-PM'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pm',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-er': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ER'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-er',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                },
                'gfp-nm': {
                    rows: [
                        {
                            treatment_id:'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-NM'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-nm',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'nc', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }

                    ]
                }


            }
        },
        add_new_row_instructions: 'add new row instructions',
        experiment_setup: scb_ex1_text.experiment_setup({}),

        concentrations: {
            '0': {
                name: '',
                value: 0
            }
        },
        drugs: {
            'nc': {
                name: 'Growth Media',
                concentrations: [0]
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
            'no-gfp': {
                name: 'No GFP'
            },
            'gfp': {
                name: 'GFP'
            },
            'gfp-pa': {
                name: 'GFP-Protein A'
            },
            'gfp-pb': {
                name: 'GFP-Protein B'
            },
            'gfp-pc': {
                name: 'GFP-Protein C'
            },
            'gfp-pd': {
                name: 'GFP-Protein D'
            },
            'gfp-ma': {
                name: 'GFP-Mutant A'
            },
            'gfp-mb': {
                name: 'GFP-Mutant B'
            },
            'gfp-nuc': {
                name: 'GFP-Nuc'
            },
            'gfp-cyto': {
                name: 'GFP-Cyto'
            },
            'gfp-pm': {
                name: 'GFP-PM'
            },
            'gfp-er': {
                name: 'GFP-ER'
            },
            'gfp-nm': {
                name: 'GFP-NM'
            }
        },
        time_unit: {
            kind: 'minutes'
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'NFIB (red), DAPI (blue), control (green)',
                        short_name: 'IF: RGB'}
                }
            }
        },
        slides: {
            'gfp-pa_1': 'images/microscopy/SCB_EX1/er_final/er1crop.jpg',
            'gfp-pa_2': 'images/microscopy/SCB_EX1/er_final/er2crop.jpg',
            'gfp-pa_3': 'images/microscopy/SCB_EX1/er_final/er3crop1.jpg',
            'gfp-pa_4': 'images/microscopy/SCB_EX1/er_final/er3crop2.jpg',
            'gfp-pa_5': 'images/microscopy/SCB_EX1/er_final/er5crop1.jpg',
            'gfp-pb_1': 'images/microscopy/SCB_EX1/nucleus_final/n2.jpg',
            'gfp-pb_2': 'images/microscopy/SCB_EX1/nucleus_final/n8.jpg',
            'gfp-pb_3': 'images/microscopy/SCB_EX1/nucleus_final/n9.jpg',
            'gfp-pb_4': 'images/microscopy/SCB_EX1/nucleus_final/n18.jpg',
            'gfp-pb_5': 'images/microscopy/SCB_EX1/nucleus_final/n34.jpg',
            'gfp-pb_6': 'images/microscopy/SCB_EX1/nucleus_final/n43.jpg',
            'gfp-pb_7': 'images/microscopy/SCB_EX1/nucleus_final/n47.jpg',
            'gfp-pb_8': 'images/microscopy/SCB_EX1/nucleus_final/n60.jpg',
            'gfp-pb_9': 'images/microscopy/SCB_EX1/nucleus_final/n64.jpg',
            'gfp-pb_10': 'images/microscopy/SCB_EX1/nucleus_final/nuc-a.jpg',
            'gfp-pb_11': 'images/microscopy/SCB_EX1/nucleus_final/nuc-b.jpg',
            'gfp-pb_12': 'images/microscopy/SCB_EX1/nucleus_final/nuc-c.jpg',
            'gfp-pc_1': 'images/microscopy/SCB_EX1/pm_final/pm-b.jpg',
            'gfp-pc_2': 'images/microscopy/SCB_EX1/pm_final/pm-c.jpg',
            'gfp-pc_3': 'images/microscopy/SCB_EX1/pm_final/pm2b.jpg',
            'gfp-pc_4': 'images/microscopy/SCB_EX1/pm_final/pm3b.jpg',
            'gfp-pc_5': 'images/microscopy/SCB_EX1/pm_final/pm34-1.jpg',
            'gfp-pc_6': 'images/microscopy/SCB_EX1/pm_final/pm34-2.jpg',
            'gfp-pd_1': 'images/microscopy/SCB_EX1/cyto_final/c-a.jpg',
            'gfp-pd_2': 'images/microscopy/SCB_EX1/cyto_final/c-b.jpg',
            'gfp-pd_3': 'images/microscopy/SCB_EX1/cyto_final/c-c.jpg',
            'gfp-pd_4': 'images/microscopy/SCB_EX1/cyto_final/c-d.jpg',
            'gfp-pd_5': 'images/microscopy/SCB_EX1/cyto_final/c1.jpg',
            'gfp-pd_6': 'images/microscopy/SCB_EX1/cyto_final/c7.jpg',
            'gfp-pd_7': 'images/microscopy/SCB_EX1/cyto_final/c15-1.jpg',
            'gfp-pd_8': 'images/microscopy/SCB_EX1/cyto_final/c15-2.jpg',
            'gfp-pd_9': 'images/microscopy/SCB_EX1/cyto_final/c17.jpg',
            'gfp-pd_10': 'images/microscopy/SCB_EX1/cyto_final/c29.jpg',
            'gfp-nm_1': 'images/microscopy/SCB_EX1/nm_final/NM1crop.jpg',
            'gfp-nm_2': 'images/microscopy/SCB_EX1/nm_final/nm2crop.jpg',
            'gfp-nm_3': 'images/microscopy/SCB_EX1/nm_final/nm3crop1.jpg',
            'gfp-nm_4': 'images/microscopy/SCB_EX1/nm_final/nm3crop2.jpg',
            'gfp-nm_5': 'images/microscopy/SCB_EX1/nm_final/nm5crop.jpg',
            'gfp_1': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn2.jpg',
            'gfp_2': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn3.jpg',
            'gfp_3': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn5.jpg',
            'gfp_4': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn6.jpg',
            'gfp_5': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn7.jpg',
            'gfp_6': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn8.jpg',
            'gfp_7': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn11.jpg',
            'gfp_8': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn12.jpg',
            'gfp_9': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn15.jpg',
            'gfp_10': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn17.jpg',
            'gfp_11': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn20.jpg',
            'bo': 'images/microscopy/SCB_EX1/negative_control.jpg',
            'dummy': 'dummy'
        },
        slide_parser: {
            'gfp-pa': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pa_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_5',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pb': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pb_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_10',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_11',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_12',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pc': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pc_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_6',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pd': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pd_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_10',
                                mag: '20x'
                            }
                        ],
                    ] } },
            'gfp-nm': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-nm_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_5',
                                mag: '20x'
                            }
                        ]
                    ] } },
            'bo': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'bo',
                                mag: '20x'
                            }
                        ]

                    ] } },
            'gfp': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_10',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_11',
                                mag: '20x'
                            }
                        ]

                    ] } }

        },
        model: { // models
            microscopy: {
                'valid': [],
                'slide': {
                    'parser_simple': [
                        {
                            match: ['cell_line'],
                            cell_line: 'bo'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pa'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pd'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-ma',
                            use_collection_id: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-mb',
                            use_collection_id: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-nuc',
                            use_collection_id: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-cyto',
                            use_collection_id: 'gfp-pd'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pm',
                            use_collection_id: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-er',
                            use_collection_id: 'gfp-pa'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-nm',
                            use_collection_id: 'gfp-nm'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp',
                            use_collection_id: 'gfp'
                        },
                    ]
                }
            }

        }
    }
};
var __scb_sample_2 = {
    id: 'scb_ex2',
    name: 'Exercise 2',
    course: 'SCB_SampleExercises',
    course_name: 'Sample Exercises',
    description: 'StarCellBio Exercise 2 – Orientation of Transmembrane Proteins',
    notebook: {},
    experiments: {},
    template: {
        instructions:[
                ["Goal & Learning Objectives", scb_ex2_text.goal({})],
                ["Introduction",scb_ex2_text.intro({})],
                ["Background Information",scb_ex2_text.bg_info({})],
                ["Questions",scb_ex2_text.questions({})]

            ],
        ui: {
            experimental_design: {
                techniques: [ 'facs','wb'], //remove micro
                gel_types: ['.10', '.12', '.15']
            },
            experiment_setup: {
                table: [ //
                    {kind: "cell_plate", title: " ", editable: false},
                    {kind: 'cell_line', title: 'Strain', editable: false}, //
                    {kind: 'treatments',
                        children: [//
                            {kind: 'drug', title: 'Treatment', editable: false}
                        ]
                    },//
                    {kind: 'actions', title: 'Actions'}//
                ],//
                actions: [
                    {kind: "add_many", name: "Add Samples", open: 'scb_ex2.setup', css: {
                        width: '885px',
                        height: '600px',
                        left: 'inherit',
                        top: '15%'
                    },
                        'collection_id': '%CELL_LINE%',
                    }

                ],
            },
            microscopy: {
                disable_blur: false,
                disable_brightness: false
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
                order: ['nt', 'proX-Null', 'proY-Null', 'HproX-FLAG', 'HproY-FLAG'],
                headings: [
                    '', 'Strains', 'Treatments'
                ],
                'nt': {
                    rows: [
                        {
                            treatment_id:'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'NoTags'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'nt',
                                        treatment_list:{list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmBuf', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            treatment_id: 'gmProK',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaProK", treatment_id: 'gmProK'},
                                {kind: 'text', text: 'NoTags'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],

                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'nt',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [{drug_id: 'gmProK', concentration_id: '0'}]},
                                                temperature: '0'
                                            }
                                        ]}
                                    }

                                ]

                            }
                        }
                    ]
                },
                'proX-Null': {
                    rows: [
                        {
                             treatment_id:'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'ProX-Null'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'proX-Null',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmBuf', concentration_id: '0'}]},
                                                temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            treatment_id:'gmProK',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaProK", treatment_id: 'gmProK'},
                                {kind: 'text', text: 'ProX-Null'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'proX-Null',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmProK', concentration_id: '0'}]},
                                                temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                'proY-Null': {
                    rows: [
                        {
                             treatment_id:'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'ProY-Null'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'proY-Null',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmBuf', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            treatment_id:'gmProK',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaProK", treatment_id: 'gmProK'},
                                {kind: 'text', text: 'ProY-Null'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'proY-Null',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmProK', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                'HproX-FLAG': {
                    rows: [
                        {
                             treatment_id:'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'HisProX-FLAG'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'HproX-FLAG',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmBuf', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            treatment_id:'gmProK',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaProK", treatment_id: 'gmProK'},
                                {kind: 'text', text: 'HisProX-FLAG'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'HproX-FLAG',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmProK', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                'HproY-FLAG': {
                    rows: [
                        {
                             treatment_id:'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'HisProY-FLAG'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'HproY-FLAG',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmBuf', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            treatment_id:'gmProK',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaProK", treatment_id: 'gmProK'},
                                {kind: 'text', text: 'HisProY-FLAG'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'HproY-FLAG',
                                        treatment_list:
                                        {
                                           list: [
                                            {
                                                drug_list: {list: [ {drug_id: 'gmProK', concentration_id: '0'}]},
                                                 temperature: '0'

                                            }
                                        ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }

            }
        },
        add_new_row_instructions: 'add new row instructions',
        experiment_setup: scb_ex2_text.experiment_setup({}),

        concentrations: {
            '0': {
                name: '',
                value: 0
            }
        },
        drugs: {
            'gmBuf': {
                name: 'Growth Media + Buffer'

            },
            'gmProK': {
                name: 'Growth Media + ProK'
            }

        },
//        not used
        experiment_temperatures: {
            '25': {
                name: "30" + degreeEntity + "C"
            },
            '40': {
                name: "37" + degreeEntity + "C"
            },
            '0': {
                name:''
            }
        },

        cell_lines: {
            'nt': {
                name: 'NoTags'
            },
            'proX-Null': {
                name: 'ProX-Null'
            },
            'proY-Null': {
                name: 'ProY-Null'
            },
            'HproX-FLAG': {
                name: 'His-ProX-FLAG'
            },
            'HproY-FLAG': {
                name: 'His-ProY-FLAG'
            }

        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
            order: ['1', '2', '3', '4','5'],
            '1': {
                name: 'Mouse anti-Protein X',
                secondary: ['r'],
                marks: [

                    {weight: 82, intensity: 'low'},
                    {weight: 82, intensity: 'none'},
                    {weight: 84, intensity: 'high'},
                    {weight: 84, intensity: 'none'}
                ],
                gel_name: 'apX'
            },
            '2': {
                name: 'Rabbit anti-Protein Y',
                secondary: ['g'],
                marks: [
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'apY'
            },
            '3': {
                name: 'Mouse anti-6xHis',
                secondary: ['r'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'a6xH'
            },
            '4': {
                name: 'Rabbit anti-FLAG',
                secondary: ['g'],
                marks: [
                    {weight: 45, intensity: 0}
                ],
                gel_name: 'aFLAG'
            },
            '5': {
                name: 'Mouse anti-PGK1',
                secondary: ['r'],
                marks: [
                    {weight: 45, intensity: 0}
                ],
                gel_name: 'aPGK1'
            }
        },//
        secondary_anti_body: {
            'r': {
                name: 'Rabbit anti-Mouse'
            },
            'g': {
                name: 'Goat anti-Rabbit'
            }

        },//
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            }
        },

        facs_kinds: {
//            'Dye': {
//                name: 'Dye/Stain',
//                conditions: {
//                    'whole': {name: 'PI',
//                        short_name: 'PI'}
//                }
//            },
            'Anti': {
                name: 'Antibody-labeling ',
                conditions: {
//                    'a': {name: 'Antibody',
//                        short_name: 'Antibody'},
                    'His_488':{name: 'His 488'},
                    'FLAG_488':{name:'FLAG 488'},
                    'proX_488':{name: 'ProX 488'},
                    'proY_488':{name: 'ProY 488'}
                }
            }
        },

        slide_parser: {
            'gfp-pa': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pa_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pa_5',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pb': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pb_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_10',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_11',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pb_12',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pc': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pc_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pc_6',
                                mag: '20x'
                            }
                        ]
                    ]
                }
            },
            'gfp-pd': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-pd_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-pd_10',
                                mag: '20x'
                            }
                        ],
                    ] } },
            'gfp-nm': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp-nm_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp-nm_5',
                                mag: '20x'
                            }
                        ]
                    ] } },
            'bo': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'bo',
                                mag: '20x'
                            }
                        ]

                    ] } },
            'gfp': {
                'IF': {
                    'rgb': [
                        [
                            {
                                hash: 'gfp_1',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_2',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_3',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_4',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_5',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_6',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_7',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_8',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_9',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_10',
                                mag: '20x'
                            }
                        ],
                        [
                            {
                                hash: 'gfp_11',
                                mag: '20x'
                            }
                        ]

                    ] } }

        },
        model: { // models
            microscopy: {
                'valid': [],
                'slide': {
                    'parser_simple': [
                        {
                            match: ['cell_line'],
                            cell_line: 'bo'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pa'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pd'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-ma',
                            use_collection_id: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-mb',
                            use_collection_id: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-nuc',
                            use_collection_id: 'gfp-pb'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-cyto',
                            use_collection_id: 'gfp-pd'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-pm',
                            use_collection_id: 'gfp-pc'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-er',
                            use_collection_id: 'gfp-pa'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp-nm',
                            use_collection_id: 'gfp-nm'
                        },
                        {
                            match: ['cell_line'],
                            cell_line: 'gfp',
                            use_collection_id: 'gfp'
                        },
                    ]
                }
            },
            western_blot: {
                'cyto': {
                    'parser_fixed': [

                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmBuf',
                            cell_line: 'nt',
                            marks: [
                                {    //antibody 1
                                    name:'Mouse anti-Protein X',
                                    weight: 82,
                                    intensity:'low',
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 84,
                                    intensity:'none',
                                    primary_anti_body:['1']
                                },
                                {    //antibody 2
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,
                                    intensity:'low',
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 232,
                                    intensity:'none',
                                    primary_anti_body:['2']
                                },
                                {    //antibody 3
                                    name:'Mouse anti-6xHis',
                                    weight: 40,
                                    intensity:'none',
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 84,
                                    intensity:'none',
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 232,
                                    intensity:'none',
                                    primary_anti_body:['3']
                                },
                                {   //antibody 4
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 232,
                                    intensity:'none',
                                    primary_anti_body:['4']
                                },
                                {    //antibody 5
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }

                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmProK',
                            cell_line: 'nt',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,
                                    intensity:'none',
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,
                                    intensity:'low',
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,
                                    intensity:'none',
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmBuf',
                            cell_line: 'proX-Null',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'none',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'low',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,323
                                    intensity:'none',//none,none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmProK',
                            cell_line: 'proX-Null',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'none',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'none',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity:'none',//none,none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmBuf',
                            cell_line: 'proY-Null',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'low',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'none',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,323
                                    intensity:'none',//none, none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmProK',
                            cell_line: 'proY-Null',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'none',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'none',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity:'none',//none,none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmBuf',
                            cell_line: 'HproX-FLAG',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'low',//high
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'low',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84, 232
                                    intensity:'none',//high, none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'high',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmProK',
                            cell_line: 'HproX-FLAG',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'none',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'none',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity:'med',//none,none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmBuf',
                            cell_line: 'HproY-FLAG',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'low',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'low',//high
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84, 232
                                    intensity:'none',//none, high
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//high
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            cutoff: -1,
                            drug: 'gmProK',
                            cell_line: 'HproY-FLAG',
                            temperature: '40',
                            marks: [
                                {
                                    name:'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity:'none',//none
                                    primary_anti_body:['1']
                                },
                                {
                                    name:'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity:'none',//none
                                    primary_anti_body:['2']
                                },
                                {
                                    name:'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity:'none',//none,none
                                    primary_anti_body:['3']
                                },
                                {
                                    name:'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity:'none',//none
                                    primary_anti_body:['4']
                                },
                                {
                                    name:'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity:'med',
                                    primary_anti_body:['5']
                                }
                            ]
                        }
                    ]
                }
            },
            facs: {
                'ticks': [10,100 ,1000],
                'max': 1300,
                'dna': {
                    'parser_simple': [
                        {
                            match: [],
                            shape: 'normal'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'nt',
                            drug_id: 'gmBuf',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'nt',
                            drug_id: 'gmProK',
                            shape: 'S-block'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmBuf',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmProK',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmBuf',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmProK',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmBuf',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmProK',
                            shape: 'S-block-C'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmBuf',
                            shape: 'graph-A'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmProK',
                            shape: 'S-block-C'
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
            __decusability, __assignment_706_2014, __assignment_706_2014_ps2, __june_2014_usability,
            __scb_sample_1, __scb_sample_2
        ]
    },
    ui: {}
};
window.master_model_data = master_model_data;
$.ajax({
    type: "POST",
    url: 'scb/initialize_courses.js',
    data: JSON.stringify(master_model_data)
});

var fix_assignment_models = function (assignment_result) {
    console.log(assignment_result);
    var usability_test = {};
    var assignment_706 = {};
    var decusability = {};
    var decusability_newfacs = {};
    var assignment_tufts = {};
    var microscopy_test = {};
    var assignment_706_2014 = {};
    var assignment_706_2014_ps2 = {};
    var june_2014_usability = {};
    for (var x = 0; x < assignment_result.length; x++) {
        if (assignment_result[x].id == 'usability_test') {
            usability_test = assignment_result[x];
            usability_test.description = scb_model_microscopy.abstract();
            usability_test.template.setup_video_box = scb_model_microscopy.setup_video_box();
            usability_test.template.setup_video_box_kind = 'coin-slider';

            usability_test.template.experiment_setup = scb_model_usability.experiment_setup();

            assignment_result[x] = usability_test;
        }
        if (assignment_result[x].id == 'microscopy_test') {
            microscopy_test = assignment_result[x];
            microscopy_test.description = scb_model_microscopy.abstract();
            microscopy_test.template.setup_video_box = scb_model_microscopy.setup_video_box();
            microscopy_test.template.setup_video_box_kind = 'coin-slider';

            microscopy_test.template.experiment_setup = scb_model_microscopy.experiment_setup();

            assignment_result[x] = microscopy_test;
        }
        if (assignment_result[x].id == 'mit_7_06_0313') {
            assignment_706 = assignment_result[x];
            assignment_706.description = scb_assignment_specific_mit706s13.assignment_overview();
            assignment_706.template.instructions = [
                ['Goal & Introduction', scb_assignment_specific_mit706s13.goal_and_introduction()],
                ['Question 1', scb_assignment_specific_mit706s13.question_1()],
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
            assignment_result[x] = assignment_706;
        }
        if (assignment_result[x].id == 'assignment_706_2014') {
            assignment_706_2014 = assignment_result[x];
            assignment_706_2014.template.instructions = [
                ['Introduction', scb_assignment_specific_mit706s14.introduction()],
                ['Background Information', scb_assignment_specific_mit706s14.background_information()],
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
            assignment_result[x] = assignment_706_2014;
        }
        if (assignment_result[x].id == 'assignment_706_2014_ps2') {
            assignment_706_2014_ps2 = assignment_result[x];
            //assignment_706_2014_ps2 = choose_n_mutant_strains(assignment_706_2014_ps2.template.random_order, ['m1', 'm2'], assignment_706_2014_ps2);
            if (assignment_706_2014_ps2.template.finished_random) {
            }
            else {
                var element1 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[1];
                var element2 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[2];
                var element3 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[3];
                var element4 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[4];
                var element5 = assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[5];


                //based on the random order, reinsert the elements in the appropriate spot
                for (var y = 0; y < assignment_706_2014_ps2.template.random_order.length; y++) {
                    var element = null;
                    if (assignment_706_2014_ps2.template.random_order[y] == 1) {
                        element = element1;
                    }
                    else if (assignment_706_2014_ps2.template.random_order[y] == 2) {
                        element = element2;
                    }
                    else if (assignment_706_2014_ps2.template.random_order[y] == 3) {
                        element = element3;
                    }
                    else if (assignment_706_2014_ps2.template.random_order[y] == 4) {
                        element = element4;
                    }
                    else if (assignment_706_2014_ps2.template.random_order[y] == 5) {
                        element = element5;
                    }
                    assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[y + 1] = element;

                }

                //In the order I replace each of the numbers with their corresponding rna name
                var order_array = ps2_change(assignment_706_2014_ps2.template.random_order);


                //rename the 5 proteins to their new order, determined by the for loop above
                assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[1].cells[2].text = 'siRNA #1';
                assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[2].cells[2].text = 'siRNA #2';
                assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[3].cells[2].text = 'siRNA #3';
                assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[4].cells[2].text = 'siRNA #4';
                assignment_706_2014_ps2.template.ui.add_multiple_dialog.S2.rows[5].cells[2].text = 'siRNA #5';

                //replace the names of the drugs in the template with the new order array.
                replace_names(assignment_706_2014_ps2.template.drugs, order_array, ['siRNA #1', 'siRNA #2', 'siRNA #3', 'siRNA #4' , 'siRNA #5']);
                assignment_706_2014_ps2.template.finished_random = true;
            }

            assignment_706_2014_ps2.template.instructions = [
                ['Getting Started', scb_assignment_specific_mit706s14ps2.page1()],
                ['Background Information', scb_assignment_specific_mit706s14ps2.page2()],
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
            assignment_result[x] = assignment_706_2014_ps2;
        }
        if (assignment_result[x].id == 'decusability') {
            decusability = assignment_result[x];
            decusability.template.instructions = [
                ['Welcome to the Usability Evaluation', scb_assignment_specific_decusability.welcome_usability()],
                ['Introduction', scb_assignment_specific_decusability.intro()],
                ['Reference Material', scb_assignment_specific_decusability.ref()],
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
            assignment_result[x] = decusability;
        }
        if (assignment_result[x].id == 'microscopy_usability') {
            june_2014_usability = assignment_result[x];
            june_2014_usability.template.instructions = [
                ['Welcome to the Usability Evaluation', scb_assignment_specific_microscopy_usability.welcome_usability()],
                ['Introduction', scb_assignment_specific_microscopy_usability.intro()],
                ['Background Information', scb_assignment_specific_microscopy_usability.ref()],
                ['Question 1', scb_assignment_specific_microscopy_usability.question_1()]
            ];
            june_2014_usability.template.experiment_setup = scb_assignment_specific_microscopy_usability.experiment_setup();

            june_2014_usability.template.ui.experiment_setup.actions.push({
                name: 'ADD SAMPLES',
                open: 'microscopy_usability.setup',
                css: {
                    width: '680px',
                    height: '566px',
                    left: 'inherit',
                    top: '000px'
                }
            });
            assignment_result[x] = june_2014_usability;
        }
        if (assignment_result[x].id == 'decusability2') {
            decusability_newfacs = assignment_result[x];
            decusability_newfacs.template.instructions = [
                ['Welcome to the Usability Evaluation', scb_assignment_specific_decusability.welcome_usability()],
                ['Introduction', scb_assignment_specific_decusability.intro()],
                ['Reference Material', scb_assignment_specific_decusability.ref()],
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
            assignment_result[x] = decusability_newfacs;
        }
        if (assignment_result[x].id == 'assignment_tufts') {
            assignment_tufts = assignment_result[x];
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
            assignment_result[x] = assignment_tufts;

        }
    }
    return assignment_result;
};


function ps2_change(array) {
    var return_array = []
    for (var x = 0; x < array.length; x++) {
        if (array[x] == 1)
            return_array[x] = 'rna1'
        if (array[x] == 2)
            return_array[x] = 'rna2'
        if (array[x] == 3)
            return_array[x] = 'rna3'
        if (array[x] == 4)
            return_array[x] = 'rna4'
        if (array[x] == 5)
            return_array[x] = 'rna5'
    }
    return return_array;
}

function replace_names(structure, array_of_names, array_of_order) {
    for (var x = 0; x < array_of_names.length; x++) {
        structure[array_of_names[x]].name = array_of_order[x];
    }
    return structure
}
