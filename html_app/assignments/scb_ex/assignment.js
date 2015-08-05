degreeEntity = $('<div />').html('&deg;').text();

var __scb_sample_1 = {
    id: 'scb_ex1',
    name: 'Exercise 1',
    course: 'SCB_SampleExercises',
    course_name: 'Sample Exercises',
    description: 'StarCellBio Exercise 1 – Protein localization',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ["Goal & Learning Objectives", scb_ex1_text.goal({})],
            ["Introduction", scb_ex1_text.intro({})],
            ["Background Information", scb_ex1_text.bg_info({})],
            ["Questions", scb_ex1_text.questions({})]

        ],
        ui: {
            experimental_design: {
                techniques: [ 'micro' ]
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
                    {kind: 'actions', title: 'Actions'}
                ],
                actions: [
                    {kind: "add_many", name: "ADD SAMPLES", open: 'scb_ex1.setup', css: {
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
            western_blot: {format: "%CELL_LINE%, %TREATMENT%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'],
                        map: ['drugs', '%KEY%', 'name']}
                }
            },
            add_multiple_dialog: {
                order: ['no-gfp', 'gfp', 'gfp-pa', 'gfp-pb', 'gfp-pc', 'gfp-pd', 'gfp-ma', 'gfp-mb', 'gfp-nuc', 'gfp-cyto', 'gfp-pm',
                    'gfp-er', 'gfp-nm'],
                headings: [
                    '', 'Strains', 'Treatments'
                ],
                'no-gfp': {
                    rows: [
                        {
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'No-GFP'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'no-gfp',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ProA'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pa',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ProB'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pb',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ProC'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pc',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ProD'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pd',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Mut ProA'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-ma',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Mut ProB'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-mb',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Nuc'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-nuc',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-Cyto'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-cyto',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-PM'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-pm',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-ER'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-er',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
                            treatment_id: 'nc',
                            cells: [
                                {kind: 'checkbox', name: "growth_media", treatment_id: 'nc'},
                                {kind: 'text', text: 'GFP-NM'},
                                {kind: 'text', text: 'Growth Media'}
                            ],
                            cell_treatments: {
                                growth_media: [
                                    {
                                        cell_line: 'gfp-nm',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '0'}
                                                ]},
                                                temperature: '0',
                                                conditions: {
                                                    'FLUOR': ['gfp']
                                                }
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
        collections: {
            '6 m': {
                name: '6 months'
            }
        },

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
                name: 'No-GFP'
            },
            'gfp': {
                name: 'GFP'
            },
            'gfp-pa': {
                name: 'GFP-ProA'
            },
            'gfp-pb': {
                name: 'GFP-ProB'
            },
            'gfp-pc': {
                name: 'GFP-ProC'
            },
            'gfp-pd': {
                name: 'GFP-ProD'
            },
            'gfp-ma': {
                name: 'GFP-Mut ProA'
            },
            'gfp-mb': {
                name: 'GFP-Mut ProB'
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
            'FLUOR': {
                name: 'Fluorescence',
                conditions: {
                    'gfp': {name: 'GFP (green)',
                        short_name: 'G:GFP'}
                }
            },
            'na': {
                name: 'None'
            }
        },
        /* for microscopy only*/
        slides: {
            '1': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn2.jpg',
            '2': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn3.jpg',
            '3': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn5.jpg',
            '4': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn6.jpg',
            '5': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn7.jpg',
            '6': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn8.jpg',
            '7': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn11.jpg',
            '8': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn12.jpg',
            '9': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn15.jpg',
            '10': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn17.jpg',
            '11': 'images/microscopy/SCB_EX1/nuc_and_cyto/cn20.jpg',

            '12': 'images/microscopy/SCB_EX1/er_final/er1crop.jpg',
            '13': 'images/microscopy/SCB_EX1/er_final/er2crop.jpg',
            '14': 'images/microscopy/SCB_EX1/er_final/er3crop1.jpg',
            '15': 'images/microscopy/SCB_EX1/er_final/er3crop2.jpg',
            '16': 'images/microscopy/SCB_EX1/er_final/er5crop1.jpg',

            '17': 'images/microscopy/SCB_EX1/nucleus_final/n2.jpg',
            '18': 'images/microscopy/SCB_EX1/nucleus_final/n8.jpg',
            '19': 'images/microscopy/SCB_EX1/nucleus_final/n9.jpg',
            '20': 'images/microscopy/SCB_EX1/nucleus_final/n18.jpg',
            '21': 'images/microscopy/SCB_EX1/nucleus_final/n34.jpg',
            '22': 'images/microscopy/SCB_EX1/nucleus_final/n43.jpg',
            '23': 'images/microscopy/SCB_EX1/nucleus_final/n47.jpg',
            '24': 'images/microscopy/SCB_EX1/nucleus_final/n60.jpg',
            '25': 'images/microscopy/SCB_EX1/nucleus_final/n64.jpg',
            '26': 'images/microscopy/SCB_EX1/nucleus_final/nuc-a.jpg',
            '27': 'images/microscopy/SCB_EX1/nucleus_final/nuc-b.jpg',
            '28': 'images/microscopy/SCB_EX1/nucleus_final/nuc-c.jpg',

            '29': 'images/microscopy/SCB_EX1/pm_final/pm-b.jpg',
            '30': 'images/microscopy/SCB_EX1/pm_final/pm-c.jpg',
            '31': 'images/microscopy/SCB_EX1/pm_final/pm2b.jpg',
            '33': 'images/microscopy/SCB_EX1/pm_final/pm3b.jpg',
            '34': 'images/microscopy/SCB_EX1/pm_final/pm34-1.jpg',
            '35': 'images/microscopy/SCB_EX1/pm_final/pm34-2.jpg',

            '36': 'images/microscopy/SCB_EX1/cyto_final/c-a.jpg',
            '37': 'images/microscopy/SCB_EX1/cyto_final/c-b.jpg',
            '38': 'images/microscopy/SCB_EX1/cyto_final/c-c.jpg',
            '39': 'images/microscopy/SCB_EX1/cyto_final/c-d.jpg',
            '40': 'images/microscopy/SCB_EX1/cyto_final/c1.jpg',
            '41': 'images/microscopy/SCB_EX1/cyto_final/c7.jpg',
            '42': 'images/microscopy/SCB_EX1/cyto_final/c15-1.jpg',
            '43': 'images/microscopy/SCB_EX1/cyto_final/c15-2.jpg',
            '44': 'images/microscopy/SCB_EX1/cyto_final/c17.jpg',
            '45': 'images/microscopy/SCB_EX1/cyto_final/c29.jpg',

            '46': 'images/microscopy/SCB_EX1/nm_final/NM1crop.jpg',
            '47': 'images/microscopy/SCB_EX1/nm_final/nm2crop.jpg',
            '48': 'images/microscopy/SCB_EX1/nm_final/nm3crop1.jpg',
            '49': 'images/microscopy/SCB_EX1/nm_final/nm3crop2.jpg',
            '50': 'images/microscopy/SCB_EX1/nm_final/nm5crop.jpg',

            'bo': 'images/microscopy/SCB_EX1/negative_control.jpg',
            'dummy': 'dummy'
        },
        model: {
            microscopy: {
                'slide': {
                    'parser_simple': [
                        {
                            match: ['cell_line'],
                            cell_line: 'no-gfp',
                            imgs_hash: [
                                [
                                    {hash: 'bo'}
                                ]
                            ]
                        },
                        { //nuc and cyto
                            match: ['cell_line'],
                            cell_line: 'gfp',
                            imgs_hash: [
                                [
                                    {hash: '1', if_type: 'green'}
                                ],
                                [
                                    {hash: '2', if_type: 'green'}
                                ],
                                [
                                    {hash: '3', if_type: 'green'}
                                ],
                                [
                                    {hash: '4', if_type: 'green'}
                                ],
                                [
                                    {hash: '5', if_type: 'green'}
                                ],
                                [
                                    {hash: '6', if_type: 'green'}
                                ],
                                [
                                    {hash: '7', if_type: 'green'}
                                ],
                                [
                                    {hash: '8', if_type: 'green'}
                                ],
                                [
                                    {hash: '9', if_type: 'green'}
                                ],
                                [
                                    {hash: '10', if_type: 'green'}
                                ],
                                [
                                    {hash: '11', if_type: 'green'}
                                ]
                            ]
                        },
                        {//er
                            match: ['cell_line'],
                            cell_line: 'gfp-pa',
                            imgs_hash: [
                                [
                                    {hash: '12', if_type: 'green'}
                                ],
                                [
                                    {hash: '13', if_type: 'green'}
                                ],
                                [
                                    {hash: '14', if_type: 'green'}
                                ],
                                [
                                    {hash: '15', if_type: 'green'}
                                ],
                                [
                                    {hash: '16', if_type: 'green'}
                                ]
                            ]
                        },
                        {//nucleus
                            match: ['cell_line'],
                            cell_line: 'gfp-pb',
                            imgs_hash: [
                                [
                                    {hash: '17', if_type: 'green'}
                                ],
                                [
                                    {hash: '18', if_type: 'green'}
                                ],
                                [
                                    {hash: '19', if_type: 'green'}
                                ],
                                [
                                    {hash: '20', if_type: 'green'}
                                ],
                                [
                                    {hash: '21', if_type: 'green'}
                                ],
                                [
                                    {hash: '22', if_type: 'green'}
                                ],
                                [
                                    {hash: '23', if_type: 'green'}
                                ],
                                [
                                    {hash: '24', if_type: 'green'}
                                ],
                                [
                                    {hash: '25', if_type: 'green'}
                                ],
                                [
                                    {hash: '26', if_type: 'green'}
                                ],
                                [
                                    {hash: '27', if_type: 'green'}
                                ],
                                [
                                    {hash: '28', if_type: 'green'}
                                ]
                            ]
                        },
                        {//pm
                            match: ['cell_line'],
                            cell_line: 'gfp-pc',
                            imgs_hash: [
                                [
                                    {hash: '29', if_type: 'green'}
                                ],
                                [
                                    {hash: '30', if_type: 'green'}
                                ],
                                [
                                    {hash: '31', if_type: 'green'}
                                ],
                                [
                                    {hash: '32', if_type: 'green'}
                                ],
                                [
                                    {hash: '33', if_type: 'green'}
                                ],
                                [
                                    {hash: '34', if_type: 'green'}
                                ],
                                [
                                    {hash: '35', if_type: 'green'}
                                ]
                            ]
                        },
                        {//cyto
                            match: ['cell_line'],
                            cell_line: 'gfp-pd',
                            imgs_hash: [
                                [
                                    {hash: '36', if_type: 'green'}
                                ],
                                [
                                    {hash: '37', if_type: 'green'}
                                ],
                                [
                                    {hash: '38', if_type: 'green'}
                                ],
                                [
                                    {hash: '39', if_type: 'green'}
                                ],
                                [
                                    {hash: '40', if_type: 'green'}
                                ],
                                [
                                    {hash: '41', if_type: 'green'}
                                ],
                                [
                                    {hash: '42', if_type: 'green'}
                                ],
                                [
                                    {hash: '45', if_type: 'green'}
                                ]
                            ]
                        },
                        {//pm
                            match: ['cell_line'],
                            cell_line: 'gfp-ma',
                            imgs_hash: [
                                [
                                    {hash: '29', if_type: 'green'}
                                ],
                                [
                                    {hash: '30', if_type: 'green'}
                                ],
                                [
                                    {hash: '31', if_type: 'green'}
                                ],
                                [
                                    {hash: '32', if_type: 'green'}
                                ],
                                [
                                    {hash: '33', if_type: 'green'}
                                ],
                                [
                                    {hash: '34', if_type: 'green'}
                                ],
                                [
                                    {hash: '35', if_type: 'green'}
                                ]
                            ]
                        },
                        {//nucleus
                            match: ['cell_line'],
                            cell_line: 'gfp-mb',
                            imgs_hash: [
                                [
                                    {hash: '17', if_type: 'green'}
                                ],
                                [
                                    {hash: '18', if_type: 'green'}
                                ],
                                [
                                    {hash: '19', if_type: 'green'}
                                ],
                                [
                                    {hash: '20', if_type: 'green'}
                                ],
                                [
                                    {hash: '21', if_type: 'green'}
                                ],
                                [
                                    {hash: '22', if_type: 'green'}
                                ],
                                [
                                    {hash: '23', if_type: 'green'}
                                ],
                                [
                                    {hash: '24', if_type: 'green'}
                                ],
                                [
                                    {hash: '25', if_type: 'green'}
                                ],
                                [
                                    {hash: '26', if_type: 'green'}
                                ],
                                [
                                    {hash: '27', if_type: 'green'}
                                ],
                                [
                                    {hash: '28', if_type: 'green'}
                                ]
                            ]
                        },
                        {//nucleus
                            match: ['cell_line'],
                            cell_line: 'gfp-nuc',
                            imgs_hash: [
                                [
                                    {hash: '17', if_type: 'green'}
                                ],
                                [
                                    {hash: '18', if_type: 'green'}
                                ],
                                [
                                    {hash: '19', if_type: 'green'}
                                ],
                                [
                                    {hash: '20', if_type: 'green'}
                                ],
                                [
                                    {hash: '21', if_type: 'green'}
                                ],
                                [
                                    {hash: '22', if_type: 'green'}
                                ],
                                [
                                    {hash: '23', if_type: 'green'}
                                ],
                                [
                                    {hash: '24', if_type: 'green'}
                                ],
                                [
                                    {hash: '25', if_type: 'green'}
                                ],
                                [
                                    {hash: '26', if_type: 'green'}
                                ],
                                [
                                    {hash: '27', if_type: 'green'}
                                ],
                                [
                                    {hash: '28', if_type: 'green'}
                                ]
                            ]
                        },
                        {//cyto
                            match: ['cell_line'],
                            cell_line: 'gfp-cyto',
                            imgs_hash: [
                                [
                                    {hash: '36', if_type: 'green'}
                                ],
                                [
                                    {hash: '37', if_type: 'green'}
                                ],
                                [
                                    {hash: '38', if_type: 'green'}
                                ],
                                [
                                    {hash: '39', if_type: 'green'}
                                ],
                                [
                                    {hash: '40', if_type: 'green'}
                                ],
                                [
                                    {hash: '41', if_type: 'green'}
                                ],
                                [
                                    {hash: '42', if_type: 'green'}
                                ],
                                [
                                    {hash: '45', if_type: 'green'}
                                ]
                            ]
                        },
                        {//pm
                            match: ['cell_line'],
                            cell_line: 'gfp-pm',
                            imgs_hash: [
                                [
                                    {hash: '29', if_type: 'green'}
                                ],
                                [
                                    {hash: '30', if_type: 'green'}
                                ],
                                [
                                    {hash: '31', if_type: 'green'}
                                ],
                                [
                                    {hash: '32', if_type: 'green'}
                                ],
                                [
                                    {hash: '33', if_type: 'green'}
                                ],
                                [
                                    {hash: '34', if_type: 'green'}
                                ],
                                [
                                    {hash: '35', if_type: 'green'}
                                ]
                            ]
                        },
                        {//er
                            match: ['cell_line'],
                            cell_line: 'gfp-er',
                            imgs_hash: [
                                [
                                    {hash: '12', if_type: 'green'}
                                ],
                                [
                                    {hash: '13', if_type: 'green'}
                                ],
                                [
                                    {hash: '14', if_type: 'green'}
                                ],
                                [
                                    {hash: '15', if_type: 'green'}
                                ],
                                [
                                    {hash: '16', if_type: 'green'}
                                ]
                            ]
                        },
                        {//nm
                            match: ['cell_line'],
                            cell_line: 'gfp-nm',
                            imgs_hash: [
                                [
                                    {hash: '46', if_type: 'green'}
                                ],
                                [
                                    {hash: '47', if_type: 'green'}
                                ],
                                [
                                    {hash: '48', if_type: 'green'}
                                ],
                                [
                                    {hash: '49', if_type: 'green'}
                                ],
                                [
                                    {hash: '50', if_type: 'green'}
                                ]
                            ]
                        }

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
        instructions: [
            ["Goal & Learning Objectives", scb_ex2_text.goal({})],
            ["Introduction", scb_ex2_text.intro({})],
            ["Background Information", scb_ex2_text.bg_info({})],
            ["Questions", scb_ex2_text.questions({})]

        ],
        ui: {
            experimental_design: {
                techniques: [ 'facs', 'wb'],
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
                    {kind: 'actions', title: 'Actions'}
                ],
                actions: [
                    {kind: "add_many", name: "ADD SAMPLES", open: 'scb_ex2.setup', css: {
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
            western_blot: {format: "%CELL_LINE%, %TREATMENT%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'],
                        map: ['drugs', '%KEY%', 'name']}
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
                            treatment_id: 'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'NoTags'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'nt',
                                        treatment_list: {list: [
                                            {
                                                drug_list: {list: [
                                                    {drug_id: 'gmBuf', concentration_id: '0'}
                                                ]},
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
                                                drug_list: {list: [
                                                    {drug_id: 'gmProK', concentration_id: '0'}
                                                ]},
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
                            treatment_id: 'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'ProX-Null'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'proX-Null',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmBuf', concentration_id: '0'}
                                                    ]},
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
                                {kind: 'text', text: 'ProX-Null'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'proX-Null',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmProK', concentration_id: '0'}
                                                    ]},
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
                            treatment_id: 'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'ProY-Null'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'proY-Null',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmBuf', concentration_id: '0'}
                                                    ]},
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
                                {kind: 'text', text: 'ProY-Null'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'proY-Null',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmProK', concentration_id: '0'}
                                                    ]},
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
                            treatment_id: 'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'HisProX-FLAG'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'HproX-FLAG',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmBuf', concentration_id: '0'}
                                                    ]},
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
                                {kind: 'text', text: 'HisProX-FLAG'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'HproX-FLAG',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmProK', concentration_id: '0'}
                                                    ]},
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
                            treatment_id: 'gmBuf',
                            cells: [
                                {kind: 'checkbox', name: "GrowthMediaBuffer", treatment_id: 'gmBuf'},
                                {kind: 'text', text: 'HisProY-FLAG'},
                                {kind: 'text', text: 'Growth Media + Buffer'}
                            ],
                            cell_treatments: {
                                GrowthMediaBuffer: [
                                    {
                                        cell_line: 'HproY-FLAG',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmBuf', concentration_id: '0'}
                                                    ]},
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
                                {kind: 'text', text: 'HisProY-FLAG'},
                                {kind: 'text', text: 'Growth Media + ProK'}
                            ],
                            cell_treatments: {
                                GrowthMediaProK: [
                                    {
                                        cell_line: 'HproY-FLAG',
                                        treatment_list: {
                                            list: [
                                                {
                                                    drug_list: {list: [
                                                        {drug_id: 'gmProK', concentration_id: '0'}
                                                    ]},
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
        experiment_temperatures: {
            '25': {
                name: "30" + degreeEntity + "C"
            },
            '40': {
                name: "37" + degreeEntity + "C"
            },
            '0': {
                name: ''
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
            order: ['1', '2', '3', '4', '5'],
            '1': {
                name: 'Mouse anti-Protein X',
                secondary: ['r'],
                marks: [
                    {weight: 82, intensity: 0},
                    {weight: 84, intensity: 0}
                ],
                gel_name: 'anti-Protein X'
            },
            '2': {
                name: 'Rabbit anti-Protein Y',
                secondary: ['g'],
                marks: [
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'anti-Protein Y'
            },
            '3': {
                name: 'Mouse anti-6xHis',
                secondary: ['r'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'anti-6xHis'
            },
            '4': {
                name: 'Rabbit anti-FLAG',
                secondary: ['g'],
                marks: [
                    {weight: 45, intensity: 0}
                ],
                gel_name: 'anti-FLAG'
            },
            '5': {
                name: 'Mouse anti-PGK1',
                secondary: ['r'],
                marks: [
                    {weight: 45, intensity: 0}
                ],
                gel_name: 'anti-PGK1'
            }
        },
        secondary_anti_body: {
            'r': {
                name: 'Rabbit anti-Mouse'
            },
            'g': {
                name: 'Goat anti-Rabbit'
            }

        },
        lysate_kinds: {
            'whole': {
                name: 'Whole Cell'
            }
        },

        facs_kinds: {
            'Anti': {
                name: 'Antibody-labeling ',
                conditions: {
                    'His_488': {name: 'His 488'},
                    'FLAG_488': {name: 'FLAG 488'},
                    'proX_488': {name: 'ProX 488'},
                    'proY_488': {name: 'ProY 488'}
                }
            }
        },
        model: { // models
            western_blot: {
                'cyto': {
                    'parser_fixed': [

                        {
                            transfer_function: 'static',
                            drug: 'gmBuf',
                            cell_line: 'nt',
                            marks: [
                                {    //antibody 1
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0.5,//none
                                    primary_anti_body: ['1']
                                },

                                {    //antibody 2
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0.5,//none
                                    primary_anti_body: ['2']
                                },
                                {    //antibody 3
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },

                                {   //antibody 4
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {    //antibody 5
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }

                            ]
                        },


                        {
                            transfer_function: 'static',
                            drug: 'gmProK',
                            cell_line: 'nt',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmBuf',
                            cell_line: 'proX-Null',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0.5,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,323
                                    intensity: 0,//none,none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmProK',
                            cell_line: 'proX-Null',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 0,//none,none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmBuf',
                            cell_line: 'proY-Null',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0.5,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,323
                                    intensity: 0,//none, none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmProK',
                            cell_line: 'proY-Null',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 0,//none,none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 0.5,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmBuf',
                            cell_line: 'HproX-FLAG',
                            marks: [
                                /* Antibody 1 */
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0.5,//high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 84,
                                    intensity: 2,
                                    primary_anti_body: ['1']
                                },
                                /* Antibody 2 */
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 2,//none
                                    primary_anti_body: ['2']
                                },
                                /* Antibody 3 */
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84, 232
                                    intensity: 0,//high, none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 84,
                                    intensity: 2,
                                    primary_anti_body: ['3']
                                },
                                /* Antibody 4 */
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 2,//none
                                    primary_anti_body: ['4']
                                },
                                /* Antibody 5 */
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmProK',
                            cell_line: 'HproX-FLAG',
                            marks: [
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 1,//none,none
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmBuf',
                            cell_line: 'HproY-FLAG',
                            marks: [
                                /* Antibody 1 */
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0.5,//none
                                    primary_anti_body: ['1']
                                },
                                /* Antibody 2 */
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0.5,//high
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 232,
                                    intensity: 2,
                                    primary_anti_body: ['2']
                                },
                                /* Antibody 3 */
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84, 232
                                    intensity: 0,//none, high
                                    primary_anti_body: ['3']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 232,
                                    intensity: 2,
                                    primary_anti_body: ['3']
                                },
                                /* Antibody 4 */
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//high
                                    primary_anti_body: ['4']
                                },
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 232,
                                    intensity: 2,
                                    primary_anti_body: ['4']
                                },
                                /* Antibody 5 */
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        },
                        {
                            transfer_function: 'static',
                            drug: 'gmProK',
                            cell_line: 'HproY-FLAG',
                            marks: [
                                /* Antibody 1 */
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 82,//84
                                    intensity: 0,//none
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-Protein X',
                                    weight: 84,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                /* Antibody 2 */
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 230,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['2']
                                },
                                {
                                    name: 'Rabbit anti-Protein Y',
                                    weight: 232,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                /* Antibody 3 */
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 40,//84,232
                                    intensity: 0,//none,none
                                    primary_anti_body: ['3']
                                },
                                /* Antibody 4 */
                                {
                                    name: 'Rabbit anti-FLAG',
                                    weight: 84,//232
                                    intensity: 0,//none
                                    primary_anti_body: ['4']
                                },
                                /* Antibody 5 */
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1,
                                    primary_anti_body: ['5']
                                }
                            ]
                        }

                    ]
                }
            },
            facs: {
                'ticks': [50, 100 , 150],
                'max': 200,
                'scale': 'pseudo',
                'dna': {
                    'parser_simple': [
                        {
                            match: [],
                            shape: 'normal'
                        },
                        {
                            match: ['drug_id'],
                            drug_id: 'gmProK',
                            shape: 'graph-b'
                        },
                        { //His 488
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'nt',
                            drug_id: 'gmBuf',
                            condition: 'His_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmBuf',
                            condition: 'His_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmBuf',
                            condition: 'His_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'His_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'His_488',
                            shape: 'scaled-peak-3'
                        },
                        //FLAG 488
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'nt',
                            drug_id: 'gmBuf',
                            condition: 'FLAG_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmBuf',
                            condition: 'FLAG_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmBuf',
                            condition: 'FLAG_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'FLAG_488',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'FLAG_488',
                            shape: 'scaled-peak-3'
                        },
                        //ProX 488
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'nt',
                            drug_id: 'gmBuf',
                            condition: 'proX_488',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmBuf',
                            condition: 'proX_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmBuf',
                            condition: 'proX_488',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'proX_488',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'proX_488',
                            shape: 'graph-c'
                        },
                        //ProY 488
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'nt',
                            drug_id: 'gmBuf',
                            condition: 'proY_488',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proX-Null',
                            drug_id: 'gmBuf',
                            condition: 'proY_488',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'proY-Null',
                            drug_id: 'gmBuf',
                            condition: 'proY_488',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproX-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'proY_488',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'condition'],
                            cell_line: 'HproY-FLAG',
                            drug_id: 'gmBuf',
                            condition: 'proY_488',
                            shape: 'scaled-peak-3'
                        }

                    ]

                }
            }
        }
    }
};


var __scb_sample_3 = {
    id: 'scb_ex3',
    name: 'Exercise 3',
    course: 'SCB_SampleExercises',
    course_name: 'Sample Exercises',
    description: 'StarCellBio Exercise 3',
    notebook: {},
    experiments: {},
    template: {
        instructions: [
            ["Goal & Learning Objectives", scb_ex3_text.goal({})],
            ["Introduction", scb_ex3_text.intro({})],
            ["Background Information", scb_ex3_text.bg_info({})],
            ["Questions", scb_ex3_text.questions({})]
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs', 'micro' ],
                gel_types: ['.10', '.12', '.15']
            },
            experiment_setup: {
                table: [
                    {kind: "cell_plate", title: " ", editable: false},
                    {kind: 'cell_line', title: 'Strain', editable: false},
                    {kind: 'treatments',
                        children: [
                            {kind: 'drug', title: 'Treatment', editable: false},
                            {kind: 'duration', title: 'Time', editable: false}
                        ]
                    },
                    {kind: 'actions', title: 'Actions'}
                ],
                actions: [
                    {kind: "add_many", name: "ADD SAMPLES", open: 'scb_ex3.setup', css: {
                        width: '885px',
                        height: '600px',
                        left: 'inherit',
                        top: '15%'
                    },
                        'collection_id': '%CELL_LINE%'
                    }

                ]
            },
            western_blot: {format: "%CELL_LINE%, %TREATMENT%, %COLLECTION%",
                keys: {
                    '%CELL_LINE%': {attr: ['cell_line'], map: ['cell_lines', '%KEY%', 'name']},
                    '%TREATMENT%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'],
                        map: ['drugs', '%KEY%', 'name']},
                    '%COLLECTION%': {
                        attr: ['treatment_list', 'list', '0', 'duration'],
                        map: ['durations', '%KEY%', 'name']}
                }
            },
            microscopy: {
                disable_blur: false,
                disable_brightness: false
            },
            add_multiple_dialog: {
                order: ['WT-EGFR', 'EGFR Null', 'EGFR-M1', 'EGFR-M2', 'NoUB',
                    'ConstActive', 'His-EGFR-FLAG', 'His-EGFR-M1-FLAG', 'His-EGFR-M2-FLAG'],
                headings: ['', 'Strain', 'Treatment', 'Treatment Duration'],
                'WT-EGFR': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {
                                'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {
                                        'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {
                                                'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm'],
                                        'conditions': {
                                            'IF': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                { 'kind': 'checkbox', 'name': 'gm30', 'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm'],
                                        'conditions': {
                                            'IF': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm'],
                                        'conditions': {
                                            'IF': ['egfr', 'pm', 'cyto', 'nuc', 'er', 'nm']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'},
                        {   'cell_treatments': {   'gmBuff': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaBuff'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmBuff',
                                    'treatment_id': 'growth_mediaBuff'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media + buffer'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaBuff'},
                        {   'cell_treatments': {   'gmProK': [
                            {   'cell_line': 'WT-EGFR',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaProK'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmProK',
                                    'treatment_id': 'growth_mediaProK'},
                                {'kind': 'text', 'text': 'WT-EGFR'},
                                {'kind': 'text', 'text': 'Growth media + ProK'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaProK'}
                    ]
                },
                'EGFR Null': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm30',
                                    'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'},
                        {   'cell_treatments': {   'gmBuff': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaBuff'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmBuff',
                                    'treatment_id': 'growth_mediaBuff'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media + buffer'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaBuff'},
                        {   'cell_treatments': {   'gmProK': [
                            {   'cell_line': 'EGFR Null',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaProK'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmProK',
                                    'treatment_id': 'growth_mediaProK'},
                                {'kind': 'text', 'text': 'EGFR Null'},
                                {'kind': 'text', 'text': 'Growth media + ProK'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaProK'}

                    ]
                },
                'EGFR-M1': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm30',
                                    'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'EGFR-M1',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'EGFR-M1'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'}
                    ]
                },
                'EGFR-M2': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm30',
                                    'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['egfr'],
                                        'conditions': {
                                            'IF': ['egfr']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'EGFR-M2',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'EGFR-M2'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'}
                    ]
                },
                'NoUB': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm30',
                                    'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'NoUB',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'NoUB'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'}

                    ]
                },
                'ConstActive': {
                    rows: [
                        {   'cell_treatments': {   'gm30': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm30',
                                    'treatment_id': 'growth_media30'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_media30'},
                        {   'cell_treatments': {   'gm60': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm60',
                                    'treatment_id': 'growth_media60'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_media60'},
                        {   'cell_treatments': {   'gm6': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_media'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gm6',
                                    'treatment_id': 'growth_media6'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media only'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_media6'},
                        {   'cell_treatments': {   'gmEGF30': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '30 sec',
                                        'duration_value': 30,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF30',
                                    'treatment_id': 'growth_mediaEGF30'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '30 sec'}
                            ],
                            'treatment_id': 'growth_mediaEGF30'},
                        {   'cell_treatments': {   'gmEGF60': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '1 min',
                                        'duration_value': 60,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF60',
                                    'treatment_id': 'growth_mediaEGF60'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '1 min'}
                            ],
                            'treatment_id': 'growth_mediaEGF60'},
                        {   'cell_treatments': {   'gmEGF6': [
                            {   'cell_line': 'ConstActive',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaEGF'}
                                        ]},
                                        'duration': '6 hrs',
                                        'duration_value': 21600,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmEGF6',
                                    'treatment_id': 'growth_mediaEGF6'},
                                {'kind': 'text', 'text': 'ConstActive'},
                                {'kind': 'text', 'text': 'Growth media + EGF'},
                                {'kind': 'text', 'text': '6 hrs'}
                            ],
                            'treatment_id': 'growth_mediaEGF6'}
                    ]
                },
                'His-EGFR-FLAG': {
                    rows: [
                        {   'cell_treatments': {   'gmBuff': [
                            {   'cell_line': 'His-EGFR-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaBuff'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmBuff',
                                    'treatment_id': 'growth_mediaBuff'},
                                {'kind': 'text', 'text': 'His-EGFR-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + buffer'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaBuff'},
                        {   'cell_treatments': {   'gmProK': [
                            {   'cell_line': 'His-EGFR-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaProK'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmProK',
                                    'treatment_id': 'growth_mediaProK'},
                                {'kind': 'text', 'text': 'His-EGFR-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + ProK'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaProK'}

                    ]
                },
                'His-EGFR-M1-FLAG': {
                    rows: [
                        {   'cell_treatments': {   'gmBuff': [
                            {   'cell_line': 'His-EGFR-M1-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaBuff'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmBuff',
                                    'treatment_id': 'growth_mediaBuff'},
                                {'kind': 'text', 'text': 'His-EGFR-M1-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + buffer'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaBuff'},
                        {   'cell_treatments': {   'gmProK': [
                            {   'cell_line': 'His-EGFR-M1-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaProK'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmProK',
                                    'treatment_id': 'growth_mediaProK'},
                                {'kind': 'text', 'text': 'His-EGFR-M1-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + ProK'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaProK'}

                    ]
                },
                'His-EGFR-M2-FLAG': {
                    rows: [
                        {   'cell_treatments': {   'gmBuff': [
                            {   'cell_line': 'His-EGFR-M2-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaBuff'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmBuff',
                                    'treatment_id': 'growth_mediaBuff'},
                                {'kind': 'text', 'text': 'His-EGFR-M2-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + buffer'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaBuff'},
                        {   'cell_treatments': {   'gmProK': [
                            {   'cell_line': 'His-EGFR-M2-FLAG',
                                'treatment_list': {   'list': [
                                    {   'collection_id': 'default',
                                        'drug_list': {   'list': [
                                            {   'concentration_id': '100',
                                                'drug_id': 'growth_mediaProK'}
                                        ]},
                                        'duration': '30 min',
                                        'duration_value': 1800,
                                        'microscope': ['na'],
                                        'conditions': {
                                            'na': ['None']
                                        },
                                        'temperature': '25'}
                                ]}}
                        ]},
                            'cells': [
                                {   'kind': 'checkbox',
                                    'name': 'gmProK',
                                    'treatment_id': 'growth_mediaProK'},
                                {'kind': 'text', 'text': 'His-EGFR-M2-FLAG'},
                                {'kind': 'text', 'text': 'Growth media + ProK'},
                                {'kind': 'text', 'text': '30 min'}
                            ],
                            'treatment_id': 'growth_mediaProK'}

                    ]
                }
            }
        },
        add_new_row_instructions: 'add new row instructions',
        experiment_setup: scb_ex3_text.experiment_setup({}),
        collections: {
            '30 s': {
                name: '30 sec'
            },
            '60 s': {
                name: '1 min'
            },
            '6 h': {
                name: '6 hrs'
            },
            '30 m': {
                name: '30 min'
            }
        },
        durations: {
            '30 sec': {
                name: '30 sec'
            },
            '1 min': {
                name: '1 min'
            },
            '6 h': {
                name: '6 hrs'
            },
            '30 min': {
                name: '30 min'
            }
        },
        concentrations: {
            100: {
                name: '',
                value: 100
            }
        },
        drugs: {
            'growth_media': {
                name: 'Growth media only',
                concentrations: [100]
            },
            'growth_mediaEGF': {
                name: 'Growth media + EGF',
                concentrations: [100]
            },
            'growth_mediaBuff': {
                name: 'Growth media + buffer',
                concentrations: [100]
            },
            'growth_mediaProK': {
                name: 'Growth media + ProK',
                concentrations: [100]
            }

        },
        experiment_temperatures: {
            '25': {
                name: "30" + degreeEntity + "C"
            }
        },
        cell_lines: {
            'WT-EGFR': {
                name: 'WT-EGFR'
            },
            'EGFR Null': {
                name: 'EGFR Null'
            },
            'EGFR-M1': {
                name: 'EGFR-M1'
            },
            'EGFR-M2': {
                name: 'EGFR-M2'
            },
            'NoUB': {
                name: 'NoUB'
            },
            'ConstActive': {
                name: 'ConstActive'
            },
            'His-EGFR-FLAG': {
                name: 'His-EGFR-FLAG'
            },
            'His-EGFR-M1-FLAG': {
                name: 'His-EGFR-M1-FLAG'
            },
            'His-EGFR-M2-FLAG': {
                name: 'His-EGFR-M2-FLAG'
            }



        },
        time_unit: {
            kind: 'minutes'
        },
        primary_anti_body: {
            order: ['1', '2', '3', '4', '5', '6', '7'],
            '1': {
                name: 'Mouse anti-EGFR',
                secondary: ['m'],
                marks: [
                    {weight: 54, intensity: 0}
                ],
                gel_name: 'anti-EGFR'
            },
            '2': {
                name: 'Mouse anti-pEGFR',
                secondary: ['m'],
                marks: [
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'anti-pEGFR'
            },
            '3': {
                name: 'Mouse anti-pMEK',
                secondary: ['m'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'anti-pMEK'
            },
            '4': {
                name: 'Mouse anti-pRAF',
                secondary: ['m'],
                marks: [
                    {weight: 25, intensity: 0}
                ],
                gel_name: 'anti-pRAF'
            },
            '5': {
                name: 'Mouse anti-PGK1',
                secondary: ['m'],
                marks: [
                    {weight: 45, intensity: 0}
                ],
                gel_name: 'anti-PGK1'
            },
            '6': {
                name: 'Rabbit anti-6xHis',
                secondary: ['r'],
                marks: [
                    {weight: 68, intensity: 0}
                ],
                gel_name: 'anti-6xHis'
            },
            '7': {
                name: 'Rabbit anti-FLAG',
                secondary: ['r'],
                marks: [
                    {weight: 68, intensity: 0}
                ],
                gel_name: 'anti-FLAG'
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
            'Anti': {
                name: 'Antibody-labeling',
                conditions: {
                    'EGFR': {name: 'EGFR A488'}
                }
            }
        },
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'egfr': { name: 'EGFR A488', short_name: 'EGFR'},
                    'pm': { name: 'PM A488', short_name: 'PM'},
                    'cyto': { name: 'Cyto A488', short_name: 'Cyto'},
                    'nuc': { name: 'Nuc A488', short_name: 'Nuc'},
                    'er': { name: 'ER A488', short_name: 'ER'},
                    'nm': { name: 'NM A488', short_name: 'NM'},
                    'na': {name: 'None', short_name: 'None'}
                }


            },
            'na': {
                name: 'None'
            }

        },
        slides: {

            '1': 'images/microscopy/scb_ex3/pm_final/pm-b.jpg',
            '2': 'images/microscopy/scb_ex3/pm_final/pm-c.jpg',
            '3': 'images/microscopy/scb_ex3/pm_final/pm2b.jpg',
            '4': 'images/microscopy/scb_ex3/pm_final/pm3b.jpg',
            '5': 'images/microscopy/scb_ex3/pm_final/pm34-1.jpg',
            '6': 'images/microscopy/scb_ex3/pm_final/pm34-2.jpg',

            '7': 'images/microscopy/scb_ex3/cyto_final/c-a.jpg',
            '8': 'images/microscopy/scb_ex3/cyto_final/c-b.jpg',
            '9': 'images/microscopy/scb_ex3/cyto_final/c-c.jpg',
            '10': 'images/microscopy/scb_ex3/cyto_final/c-d.jpg',
            '11': 'images/microscopy/scb_ex3/cyto_final/c1.jpg',
            '12': 'images/microscopy/scb_ex3/cyto_final/c7.jpg',
            '13': 'images/microscopy/scb_ex3/cyto_final/c15-1.jpg',
            '14': 'images/microscopy/scb_ex3/cyto_final/c15-2.jpg',
            '15': 'images/microscopy/scb_ex3/cyto_final/c17.jpg',
            '16': 'images/microscopy/scb_ex3/cyto_final/c29.jpg',

            '17': 'images/microscopy/scb_ex3/nucleus_final/n2.jpg',
            '18': 'images/microscopy/scb_ex3/nucleus_final/n8.jpg',
            '19': 'images/microscopy/scb_ex3/nucleus_final/n9.jpg',
            '20': 'images/microscopy/scb_ex3/nucleus_final/n18.jpg',
            '21': 'images/microscopy/scb_ex3/nucleus_final/n34.jpg',
            '22': 'images/microscopy/scb_ex3/nucleus_final/n43.jpg',
            '23': 'images/microscopy/scb_ex3/nucleus_final/n47.jpg',
            '24': 'images/microscopy/scb_ex3/nucleus_final/n60.jpg',
            '25': 'images/microscopy/scb_ex3/nucleus_final/n64.jpg',
            '26': 'images/microscopy/scb_ex3/nucleus_final/nuc-a.jpg',
            '27': 'images/microscopy/scb_ex3/nucleus_final/nuc-b.jpg',
            '28': 'images/microscopy/scb_ex3/nucleus_final/nuc-c.jpg',

            '29': 'images/microscopy/scb_ex3/er_final/er1crop.jpg',
            '30': 'images/microscopy/scb_ex3/er_final/er2crop.jpg',
            '31': 'images/microscopy/scb_ex3/er_final/er3crop1.jpg',
            '32': 'images/microscopy/scb_ex3/er_final/er3crop2.jpg',
            '33': 'images/microscopy/scb_ex3/er_final/er5crop1.jpg',


            '34': 'images/microscopy/scb_ex3/nm_final/NM1crop.jpg',
            '35': 'images/microscopy/scb_ex3/nm_final/nm2crop.jpg',
            '36': 'images/microscopy/scb_ex3/nm_final/nm3crop1.jpg',
            '37': 'images/microscopy/scb_ex3/nm_final/nm3crop2.jpg',
            '38': 'images/microscopy/scb_ex3/nm_final/nm5crop.jpg',

            'bo': 'images/microscopy/scb_ex3/negative_control.jpg',
            'dummy': 'dummy'
        },
        model: {
            western_blot: {
                'cyto': {
                    'parser_fixed': [
                        /* WT-EGFR */
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_media',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, //high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_mediaEGF',
                            duration: '30 sec',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 1,//med
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 1, //med
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 1, //med
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_mediaEGF',
                            duration: '1 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, //high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 2, //high
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, //high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, //high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_mediaEGF',
                            duration: '6 h',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0.5, //low
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_mediaBuff',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2,//high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'WT-EGFR',
                            drug: 'growth_mediaProK',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /* EGFR Null */
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR Null',
                            drug: '*ANY*',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /* EGFR-M1 */
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR-M1',
                            drug: '*ANY*',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, //high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /*EGFR-M2*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR-M2',
                            drug: 'growth_media',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2,//high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR-M2',
                            drug: 'growth_mediaEGF',
                            duration: '30 sec',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 1, //med
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 5,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 1,//med
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR-M2',
                            drug: 'growth_mediaEGF',
                            duration: '1 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, //high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, //high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'EGFR-M2',
                            drug: 'growth_mediaEGF',
                            duration: '6 h',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, // high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, // high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /*NoUB*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'NoUB',
                            drug: 'growth_media',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, //high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'NoUB',
                            drug: 'growth_mediaEGF',
                            duration: '30 sec',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 1, //med
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 1, //med
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 1, //med
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'NoUB',
                            drug: 'growth_mediaEGF',
                            duration: '1 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, //high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 2, //high
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, // high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, //high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'NoUB',
                            drug: 'growth_mediaEGF',
                            duration: '6 h',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 8,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, // high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, // high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /*ConstActive*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'ConstActive',
                            drug: '*ANY*',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 2, // high
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 2, // high
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 2, // high
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /* His-EGFR-FLAG*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-FLAG',
                            drug: 'growth_mediaBuff',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-FLAG',
                            drug: 'growth_mediaProK',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 1, //med
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /*His-EGFR-M1-FLAG */
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-M1-FLAG',
                            drug: 'growth_mediaBuff',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-M1-FLAG',
                            drug: 'growth_mediaProK',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 1, //med
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 1, //med
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /* His-EGFR-M2-FLAG*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-M2-FLAG',
                            drug: 'growth_mediaBuff',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 2, // high
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: 'His-EGFR-M2-FLAG',
                            drug: 'growth_mediaProK',
                            duration: '30 min',
                            above_marks: [
                                //antibody 1
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                {
                                    name: 'Mouse anti-EGFR',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['1']
                                },
                                //antibody 2
                                {
                                    name: 'Mouse anti-pEGFR',
                                    weight: 140,
                                    intensity: 0,
                                    primary_anti_body: ['2']
                                },
                                //antibody 3
                                {
                                    name: 'Mouse anti-pRAF',
                                    weight: 75,
                                    intensity: 0,
                                    primary_anti_body: ['3']
                                },
                                //antibody 4
                                {
                                    name: 'Mouse anti-pMEK',
                                    weight: 45,
                                    intensity: 0,
                                    primary_anti_body: ['4']
                                },
                                //antibody 5 is included in *ANY* cell_line
                                //antibody 6
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                {
                                    name: 'Mouse anti-6xHis',
                                    weight: 65,
                                    intensity: 0,
                                    primary_anti_body: ['6']
                                },
                                //antibody 7
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 120,
                                    intensity: 0,
                                    primary_anti_body: ['7']
                                },
                                {
                                    name: 'Mouse anti-FLAG',
                                    weight: 51,
                                    intensity: 1, //med
                                    primary_anti_body: ['7']
                                }
                            ]
                        },
                        /*ANY cell_line*/
                        {
                            transfer_function: 'delta',
                            cutoff: 1,
                            cell_line: '*ANY*',
                            drug: '*ANY*',
                            duration: '*ANY*',
                            above_marks: [
                                //antibody 5 is the same for all treatments
                                {
                                    name: 'Mouse anti-PGK1',
                                    weight: 44,
                                    intensity: 1, //med
                                    primary_anti_body: ['5']
                                }


                            ]
                        }
                    ]
                }
            },
            facs: {
                'ticks': [50, 100, 150],
                'max': 200,
                'scale': 'pseudo',
                'dna': {
                    'parser_simple': [
                        {
                            match: [],
                            shape: '2-peak-normal-400'
                        },
                        /*The same graph for all treatments for EGFR Null*/
                        {
                            match: ['cell_line'],
                            cell_line: 'EGFR Null',
                            shape: 'graph-b'
                        },
                        /*The same graph for all treatments for EGFR-M1*/
                        {
                            match: ['cell_line'],
                            cell_line: 'EGFR-M1',
                            shape: 'graph-b'
                        },
                        /*The same graph for all treatments for EGFR-M2*/
                        {
                            match: ['cell_line'],
                            cell_line: 'EGFR-M2',
                            shape: 'scaled-peak-3'
                        },
                        /*The same graph for all treatments for NoUB*/
                        {
                            match: ['cell_line'],
                            cell_line: 'NoUB',
                            shape: 'scaled-peak-3'
                        },
                        /*WT-EGFR*/
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_mediaEGF',
                            duration: '30 sec',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_mediaEGF',
                            duration: '1 min',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_mediaEGF',
                            duration: '6 h',
                            shape: 'graph-c'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_mediaBuff',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_mediaProK',
                            shape: 'graph-b'
                        },


                        /*ConstActive*/
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'ConstActive',
                            drug_id: 'growth_media',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'ConstActive',
                            drug_id: 'growth_mediaEGF',
                            duration: '30 sec',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'ConstActive',
                            drug_id: 'growth_mediaEGF',
                            duration: '1 min',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'duration'],
                            cell_line: 'ConstActive',
                            drug_id: 'growth_mediaEGF',
                            duration: '6 h',
                            shape: 'graph-c'
                        },
                        /*His-EGFR-FLAG*/
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-FLAG',
                            drug_id: 'growth_mediaBuff',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-FLAG',
                            drug_id: 'growth_mediaProK',
                            shape: 'graph-b'
                        },
                        /*His-EGFR-M1-FLAG*/
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-M1-FLAG',
                            drug_id: 'growth_mediaBuff',
                            shape: 'graph-b'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-M1-FLAG',
                            drug_id: 'growth_mediaProK',
                            shape: 'graph-b'
                        },
                        /*His-EGFR-M2-FLAG*/
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-M2-FLAG',
                            drug_id: 'growth_mediaBuff',
                            shape: 'scaled-peak-3'
                        },
                        {
                            match: ['cell_line', 'drug_id'],
                            cell_line: 'His-EGFR-M2-FLAG',
                            drug_id: 'growth_mediaProK',
                            shape: 'graph-b'
                        }
                    ]

                }
            },
            microscopy: {
                'slide': {
                    'parser_simple': [
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'EGFR Null',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'egfr',
                            imgs_hash: [
                                [
                                    {hash: 'bo', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'egfr',
                            imgs_hash: [
                                [
                                    {hash: '1', if_type: 'green'}
                                ],
                                [
                                    {hash: '2', if_type: 'green'}
                                ],
                                [
                                    {hash: '3', if_type: 'green'}
                                ],
                                [
                                    {hash: '4', if_type: 'green'}
                                ],
                                [
                                    {hash: '5', if_type: 'green'}
                                ],
                                [
                                    {hash: '6', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'pm',
                            imgs_hash: [
                                [
                                    {hash: '1', if_type: 'green'}
                                ],
                                [
                                    {hash: '2', if_type: 'green'}
                                ],
                                [
                                    {hash: '3', if_type: 'green'}
                                ],
                                [
                                    {hash: '4', if_type: 'green'}
                                ],
                                [
                                    {hash: '5', if_type: 'green'}
                                ],
                                [
                                    {hash: '6', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'cyto',
                            imgs_hash: [
                                [
                                    {hash: '7', if_type: 'green'}
                                ],
                                [
                                    {hash: '8', if_type: 'green'}
                                ],
                                [
                                    {hash: '9', if_type: 'green'}
                                ],
                                [
                                    {hash: '10', if_type: 'green'}
                                ],
                                [
                                    {hash: '11', if_type: 'green'}
                                ],
                                [
                                    {hash: '12', if_type: 'green'}
                                ],
                                [
                                    {hash: '13', if_type: 'green'}
                                ],
                                [
                                    {hash: '14', if_type: 'green'}
                                ],
                                [
                                    {hash: '15', if_type: 'green'}
                                ],
                                [
                                    {hash: '16', if_type: 'green'}
                                ]

                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'nuc',
                            imgs_hash: [
                                [
                                    {hash: '18', if_type: 'green'}
                                ],
                                [
                                    {hash: '19', if_type: 'green'}
                                ],
                                [
                                    {hash: '20', if_type: 'green'}
                                ],
                                [
                                    {hash: '21', if_type: 'green'}
                                ],
                                [
                                    {hash: '22', if_type: 'green'}
                                ],
                                [
                                    {hash: '23', if_type: 'green'}
                                ],
                                [
                                    {hash: '24', if_type: 'green'}
                                ],
                                [
                                    {hash: '25', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'er',
                            imgs_hash: [
                                [
                                    {hash: '29', if_type: 'green'}
                                ],
                                [
                                    {hash: '30', if_type: 'green'}
                                ],
                                [
                                    {hash: '31', if_type: 'green'}
                                ],
                                [
                                    {hash: '32', if_type: 'green'}
                                ],
                                [
                                    {hash: '33', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'WT-EGFR',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'nm',
                            imgs_hash: [
                                [
                                    {hash: '34', if_type: 'green'}
                                ],
                                [
                                    {hash: '35', if_type: 'green'}
                                ],
                                [
                                    {hash: '36', if_type: 'green'}
                                ],
                                [
                                    {hash: '37', if_type: 'green'}
                                ],
                                [
                                    {hash: '38', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'EGFR-M1',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'egfr',
                            imgs_hash: [
                                [
                                    {hash: '1', if_type: 'green'}
                                ],
                                [
                                    {hash: '2', if_type: 'green'}
                                ],
                                [
                                    {hash: '3', if_type: 'green'}
                                ],
                                [
                                    {hash: '4', if_type: 'green'}
                                ],
                                [
                                    {hash: '5', if_type: 'green'}
                                ],
                                [
                                    {hash: '6', if_type: 'green'}
                                ]
                            ]
                        },
                        {
                            match: ['cell_line', 'drug_id', 'kind', 'conditions'],
                            cell_line: 'EGFR-M2',
                            drug_id: 'growth_media',
                            kind: 'IF',
                            conditions: 'egfr',
                            imgs_hash: [
                                [
                                    {hash: '1', if_type: 'green'}
                                ],
                                [
                                    {hash: '2', if_type: 'green'}
                                ],
                                [
                                    {hash: '3', if_type: 'green'}
                                ],
                                [
                                    {hash: '4', if_type: 'green'}
                                ],
                                [
                                    {hash: '5', if_type: 'green'}
                                ],
                                [
                                    {hash: '6', if_type: 'green'}
                                ]
                            ]
                        }
                    ]
                }

            }

        }
    }
};

