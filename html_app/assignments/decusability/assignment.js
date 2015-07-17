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
                table: [
                    {kind: "cell_plate", title: " ", editable: false},
                    {kind: 'cell_line', title: 'Strain', editable: false},
                    {kind: 'treatments',
                        children: [
                            {kind: 'drug', title: 'Treatment', editable: false}
                        ]
                    },
                    {kind: 'temperature', title: 'Temperature', editable: false},
                    {kind: 'actions', title: 'Actions'}
                ],
                actions: [

                ]
            },
            western_blot: {format: "%CELL_LINE%, %TREATMENT%, %PP1% %TEMPERATURE%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'],
                        map: ['drugs', '%KEY%', 'name']},
                    '%CONCENTRATION%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'concentration_id'],
                        map: ['concentrations', '%KEY%', 'name']},
                    '%TEMPERATURE%': {
                        attr: ['treatment_list', 'list', '0', 'temperature'],
                        map: ['experiment_temperatures', '%KEY%', 'name']},
                    '%PP1%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '1', 'drug_id'],
                        map: ['drugs', '%KEY%', 'short_name'], default: ''}
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
        },
        secondary_anti_body: {
            'm': {
                name: 'rabbit anti-mouse'
            },
            'r': {
                name: 'goat anti-rabbit'
            }
        },
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
                            marks: []
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
