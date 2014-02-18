microEntity = $('<div />').html('&#181;').text();
degreeEntity = $('<div />').html('&deg;').text();

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
                //new_row: {
                //    title: 'New Row',
                //    cell_line: 'wt',
                //    treatment_list: {list: [
                //        {drug_list: {list: [
                //            {drug_id: '1', concentration_id: '0'}
                //        ]}
                //        }
                //    ]}
                //}
            },
//            western_blot: {format: "%CELL_LINE%, %TREATMENT% (%CONCENTRATION%)",
//                keys: {
//                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
//                    '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
//                    '%CONCENTRATION%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'], map: ['concentrations', '%KEY%', 'name']},
//                    '%TEMPERATURE%': {attr: ['treatment_list', 'list', '0', 'temperature'], map: ['experiment_temperatures', '%KEY%', 'name']}
//                }
//            },
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
                //{kind:"add_protocol", title:"Add Treatment Protocol"}
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

                    ],//
                    new_row_is_disabled: {
                        title: 'New Row',
                        cell_line: 'wt',
                        treatment_list: {list: [
                            {drug_list: {list: [
                                {drug_id: 'nc', concentration_id: '0'}
                            ]}, temperature: '25'
                            }
                        ]},
                    }
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
                    name: 'PI'
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
                                {kind: 'concentration', title: 'Concentration', editable: false}//
                            ]
                        },//
                        {kind: 'temperature', title: 'Temperature', editable: false},//
                        {kind: 'actions', title: 'Actions'}//
                    ],//
                    actions: [

                    ],//
                    new_row_is_disabled: {
                        title: 'New Row',
                        cell_line: 'wt',
                        treatment_list: {list: [
                            {drug_list: {list: [
                                {drug_id: 'nc', concentration_id: '0'}
                            ]}, temperature: '25'
                            }
                        ]},
                    }
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
                    name: 'PI'
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
            lysate_kinds: {
                'whole': {
                    name: 'Whole Cell'
                }
            },
            facs_kinds: {
                'whole': {
                    name: 'PI'
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
		}
    ;

var __assignment_706_2014 = {
        id: 'assignment_706_2014',
        name: 'Quiz 3',
        course: '7.06 Spring 2014',
    	course_name: 'Prototypes',
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
                                {kind: 'drug', title: 'Treatment', editable: true},
                                {kind: 'concentration', title: 'Treatment Concentration/Dose', editable: false},
                        		{kind: "start", title: "Treatment Start Time", editable: false},
                        		{kind: "collection", title: "Collection Timepoints", editable: false}
                            ]
                        },
                        {kind: 'actions', title: 'Actions'}
                    ],
                    actions: [
                    ], 
                	new_row_is_disabled: {
						title: 'New row',
						cell_line: 'p+',
						treatment_list: {list: [
							{schedule_value: 0, collection_id: 0, drug_list: {list: [
								{drug_id: 'ac', concentration_id: 0}
							]},  temperature: '22'
							}
						]}
                	}
                },
            western_blot: {
            	format: "%CELL_LINE%, %TREATMENT%, %COLLECTION%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'], map: ['drugs', '%KEY%', 'name']},
                    '%COLLECTION%': {attr: ['treatment_list', 'list', '0', 'collection_id'], map:['collections', '%KEY%', 'name']}
                }
            },
            add_multiple_dialog: {
                        headings: [
							'Strain', 'Growth media only', 'Growth media + ligand', 'Growth media + inhibitor', 'Growth media + ligand + inhibitor'
                        ],
                        rows: [
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'media_only',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Protein A'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'media_only,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            },
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Protein B'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'nocodazole,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Protein C'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'nocodazole,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Nocodazole', concentration_id: '15'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,

                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Protein D'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'hydroxyurea,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Kinase'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'hydroxyurea,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Hydroxyurea', concentration_id: '200'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-Histone H2B'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'alpha_factor,25',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }
                            ,
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-p100'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'alpha_factor,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            },                            
                            {
                                cells: [
                                    {kind: 'text', text: 'WT-GFP-pTD'},
                                    {kind: 'checkbox', name: "G"},
                                    {kind: 'checkbox', name: 'L'},
                                    {kind: 'checkbox', name: 'I'},
                                    {kind: 'checkbox', name: 'A'}
                                ],
                                treatment_id: 'alpha_factor,40',
                                cell_treatments: {
                                    PP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'},
                                                    {drug_id: 'pp1', concentration_id: '1u'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ], NOPP1: [
                                        {cell_line: 'wt',
                                            treatment_list: {list: [
                                                {drug_list: {list: [
                                                    {drug_id: 'Alpha', concentration_id: '2'}
                                                ]}, temperature: '22'
                                                }
                                            ]}}
                                    ]
                                }
                            }

                        ]
                    
                }
                
        },
       			
        add_new_row_instructions: 'On this page, set up your experiment to treat the wild-type worms with the four new drugs',
		collections:{
			0: {
				name: ''
			}
		},
		concentrations: {
			0: {
				name: '',
				value: 0
			}
		},
		drugs: {
			'G': {
				name: 'Growth media only',
				concentrations: ['0']
			},
			'L': {
				name:'Growth media + ligand',
				concentrations: ['0']
			},
			'I': {
				name: 'Growth media + inhibitor',
				concentrations: ['0']
			},
			'A': {
				name: 'Growth media + ligand + inhibitor',
				concentrations: ['0']
			}
		},
		experiment_temperatures: {
			'22': {
				name: "22" + degreeEntity + "C"
			}
		},
		cell_lines: {
			'gfp': {
				name: 'WT-GFP'
			},
			'gfpA': {
				name: 'WT-GFP-Protein A'
			},
			'gfpB': {
				name: 'WT-GFP-Protein B'
			},
			'gfpC': {
				name: 'WT-GFP-Protein C'
			},
			'gfpD': {
				name: 'WT-GFP-Protein D'
			},
			'gfpK': {
				name: 'WT-GFP-Kinase'
			},
			'gfpH': {
				name: 'WT-GFP-Histone H2B'
			},
			'gfp100': {
				name: 'WT-GFP-p100'
			},
			'gfpTD': {
				name: 'WT-GFP-pTD'
			}

		},
		time_unit: {
			kind: 'minutes'
		},
		primary_anti_body: {
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
		micro_kinds: {
			'IF':{
				name:'Antibody-labeling IF',
				conditions: {
					'rgb': {name: 'NFIB (red), DAPI (blue), control (green)'} 
				}
			},
			'IHC':{
				name:'Antibody-labeling IHC',
				conditions: {
					'NFIB': {name: 'NFIB'},
					'ki67': {name: 'Ki-67'},
					'secondary': {name: 'Secondary only control'}   
				}
			},
			'Dye':{
				name: 'Dye/Stain',
				conditions: {
					'HnE': {name: 'H&E'} 
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
			'img5': 'images/microscopy/assignment_706_2014/c16.jpg',
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
			'img15': 'images/microscopy/assignment_706_2014/cn9.jpg',
			'img16': 'images/microscopy/assignment_706_2014/cn11.jpg',
			'img17': 'images/microscopy/assignment_706_2014/cn12.jpg',
			'img18': 'images/microscopy/assignment_706_2014/cn15.jpg',
			'img19': 'images/microscopy/assignment_706_2014/cn17.jpg',
			'img20': 'images/microscopy/assignment_706_2014/cn20.jpg',
			
			'img21': 'images/microscopy/assignment_706_2014/n1.jpg',
			'img22': 'images/microscopy/assignment_706_2014/n2.jpg',
			'img23': 'images/microscopy/assignment_706_2014/n8.jpg',
			'img24': 'images/microscopy/assignment_706_2014/n9.jpg',
			'img25': 'images/microscopy/assignment_706_2014/n11.jpg',
			'img26': 'images/microscopy/assignment_706_2014/n18.jpg',
			'img29': 'images/microscopy/assignment_706_2014/n34.jpg',
			'img30': 'images/microscopy/assignment_706_2014/n43.jpg',
			'img31': 'images/microscopy/assignment_706_2014/n47.jpg',
			'img32': 'images/microscopy/assignment_706_2014/n60.jpg',
			'img46': 'images/microscopy/assignment_706_2014/n64.jpg',
			
			
			'img36': 'images/microscopy/assignment_706_2014/pm2.jpg',
			'img37': 'images/microscopy/assignment_706_2014/pm3.jpg',
			'img38': 'images/microscopy/assignment_706_2014/pm15.jpg',
			'img43': 'images/microscopy/assignment_706_2014/pm17.jpg',
			'img39': 'images/microscopy/assignment_706_2014/pm22.jpg',
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
									mag: 'N/A'
								}],
								'2': [{
									hash: 'img2',
									mag: 'N/A'
								}],
								'3': [{
									hash: 'img3',
									mag: 'N/A'
								}],
								'4': [{
									hash: 'img4',
									mag: 'N/A'
								}],
								'5': [{
									hash: 'img40',
									mag: 'N/A'
								}],
								'6': [{
									hash: 'img41',
									mag: 'N/A'
								}],
								'7': [{
									hash: 'img5',
									mag: 'N/A'
								}],
								'8': [{
									hash: 'img6',
									mag: 'N/A'
								}],
								'9': [{
									hash: 'img42',
									mag: 'N/A'
								}],
								'10': [{
									hash: 'img7',
									mag: 'N/A'
								}],
								'11': [{
									hash: 'img8',
									mag: 'N/A'
								}]
							},
							'plasma_membrane': {
								'1': [{
									hash: 'img36',
									mag: 'N/A'
								}],
								'2': [{
									hash: 'img37',
									mag: 'N/A'
								}],
								'3': [{
									hash: 'img38',
									mag: 'N/A'
								}],
								'4': [{
									hash: 'img43',
									mag: 'N/A'
								}],
								'5': [{
									hash: 'img39',
									mag: 'N/A'
								}],
								'6': [{
									hash: 'img44',
									mag: 'N/A'
								}],
								'7': [{
									hash: 'img45',
									mag: 'N/A'
								}]
							
							},
							'nucleus': {
								'1': [{
									hash: 'img21',
									mag: 'N/A'
								}],
								'2': [{
									hash: 'img22',
									mag: 'N/A'
								}],
								'3': [{
									hash: 'img23',
									mag: 'N/A'
								}],
								'4': [{
									hash: 'img24',
									mag: 'N/A'
								}],
								'5': [{
									hash: 'img25',
									mag: 'N/A'
								}],
								'6': [{
									hash: 'img26',
									mag: 'N/A'
								}],
								'7': [{
									hash: 'img29',
									mag: 'N/A'
								}],
								'8': [{
									hash: 'img30',
									mag: 'N/A'
								}],
								'9': [{
									hash: 'img31',
									mag: 'N/A'
								}],
								'10': [{
									hash: 'img32',
									mag: 'N/A'
								}],
								'11': [{
									hash: 'img46',
									mag: 'N/A'
								}]
							
							
							},
							'cytoplasm_nucleus': {									
								'1': [{
									hash: 'img9',
									mag: 'N/A'
								}],
								'2': [{
									hash: 'img10',
									mag: 'N/A'
								}],
								'3': [{
									hash: 'img11',
									mag: 'N/A'
								}],
								'4': [{
									hash: 'img12',
									mag: 'N/A'
								}],
								'5': [{
									hash: 'img13',
									mag: 'N/A'
								}],
								'6': [{
									hash: 'img14',
									mag: 'N/A'
								}],
								'7': [{
									hash: 'img15',
									mag: 'N/A'
								}],
								'8': [{
									hash: 'img16',
									mag: 'N/A'
								}],
								'9': [{
									hash: 'img17',
									mag: 'N/A'
								}],
								'10': [{
									hash: 'img18',
									mag: 'N/A'
								}],
								'11': [{
									hash: 'img19',
									mag: 'N/A'
								}],									
								'12': [{
									hash: 'img20',
									mag: 'N/A'
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
                                temperature: '22',
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
                                temperature: '22',
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
                microscopy: {
                	'valid': ['pfl', 'ac'],
                	'slide': {
                	
                		'complex_parser':[
                		{
                			match: [],
                			
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfp',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'cytoplasm_nucleus'
                		},             		
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpH',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'nucleus'
                		},             		
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfp100',
                			drug_id:['G', 'L', 'I', 'A'],
                			phenotype: 'cytoplasm'
                		},               		
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpTD',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpA',
                			drug_id: ['G', 'I'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpA',
                			drug_id: ['L',  'A'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpB',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'plasma_membrane'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpC',
                			drug_id: ['G',  'I', 'A'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpC',
                			drug_id: ['L'],
                			phenotype: 'nucleus'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpD',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'cytoplasm'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'phenotype'],
                			cell_line: 'gfpK',
                			drug_id: ['G', 'L', 'I', 'A'],
                			phenotype: 'cytoplasm'
                		}
                			
                		]
                		
                	}
                }
                
		}
		}
		}
    ;








master_model_data = {
    app_title: 'StarCellBio',
    app_description: 'StarCellBio Placeholder',
    assignments: {
        list: [ 
        __assigment_facs, __assignment2, __usability_test, __basic_tests, __assigment_706, __assigment_tufts, __decusability, __microscopy_test
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
	var assignment_tufts = {};	
	var microscopy_test ={};
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
					left: '100px',
					top: '000px'
				}
			});
			get_courses_result.list[x] = assignment_706;
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
					left: '100px',
					top: '000px'
				}
			});
			get_courses_result.list[x] = decusability;
		}
		if(get_courses_result.list[x].id == 'assignment_tufts'){
			assignment_tufts = get_courses_result.list[x];
			assignment_tufts.template.ui.experiment_setup.actions.push({
				name: 'ADD SAMPLES',
				open: 'mit706s13.setup',
				css: {
					width: '600px',
					height: '400px',
					left: '300px',
					top: '000px'
				}
			});
			assignment_tufts.template.experiment_setup = scb_assignment_specific_tufts.experiment_setup();
			assignment_tufts.description = scb_assignment_specific_tufts.assignment_overview();
			get_courses_result.list[x] = assignment_tufts;
			
		}
	}
    __usability_test.description = scb_model_usability.abstract();
    __usability_test.template.setup_video_box = scb_model_usability.setup_video_box();
    __usability_test.template.experiment_setup = scb_model_usability.experiment_setup();
    
    __microscopy_test.description = scb_model_microscopy.abstract();
    __microscopy_test.template.setup_video_box = scb_model_microscopy.setup_video_box();
    __microscopy_test.template.experiment_setup = scb_model_usability.experiment_setup();

    __assigment_706.description = scb_assignment_specific_mit706s13.assignment_overview();
    __assigment_706.template.instructions = [
    			['Goal & Introduction', scb_assignment_specific_mit706s13.goal_and_introduction()],
    			['Question 1',scb_assignment_specific_mit706s13.question_1()],
    			['Question 2', scb_assignment_specific_mit706s13.question_2()],
    			['Question 3', scb_assignment_specific_mit706s13.question_3()],
    			['Reference Information', scb_assignment_specific_mit706s13.reference_information()]
    			];
    __assigment_706.template.experiment_setup = scb_assignment_specific_mit706s13.experiment_setup();

    __assigment_706.template.ui.experiment_setup.actions.push({
        name: 'ADD SAMPLES',
        open: 'mit706s13.setup',
        css: {
            width: '800px',
            height: '900px',
            left: '100px',
            top: '000px'
        }
    });
    
   __decusability.template.instructions = [
		['Welcome to the Usability Evaluation', scb_assignment_specific_decusability.welcome_usability()],
		['Introduction',scb_assignment_specific_decusability.intro()],
		['Reference Material',scb_assignment_specific_decusability.ref()],
		['Question 1', scb_assignment_specific_decusability.question_1()],
		['Question 2', scb_assignment_specific_decusability.question_2()]
		];
	__decusability.template.experiment_setup = scb_assignment_specific_decusability.experiment_setup();

	__decusability.template.ui.experiment_setup.actions.push({
		name: 'ADD SAMPLES',
		open: 'decusability.setup',
		css: {
			width: '800px',
			height: '700px',
			left: '100px',
			top: '000px'
		}
	});

    
    

    __assigment_tufts.template.ui.experiment_setup.actions.push({
        name: 'ADD SAMPLES',
        open: 'mit706s13.setup',
        css: {
            width: '600px',
            height: '400px',
            left: '300px',
            top: '000px'
        }
    });
    __assigment_tufts.template.experiment_setup = scb_assignment_specific_tufts.experiment_setup();
    __assigment_tufts.description = scb_assignment_specific_tufts.assignment_overview();

});
