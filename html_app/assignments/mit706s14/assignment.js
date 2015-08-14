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
                    '%TREATMENT%': {
                        attr: ['treatment_list', 'list', '0', 'drug_list', 'list', '0', 'drug_id'],
                        map: ['drugs', '%KEY%', 'name']}
                }
            },
            microscopy: {
                disable_blur: true,
                disable_brightness: true
            },
            add_multiple_dialog: {
                order: ['gfp', 'gfp1', 'gfp2', 'gfp3', 'gfp4', 'gfp5', 'gfpH', 'gfp100', 'gfpTD'],
                headings: [
                    'Strain', 'Growth media only', 'Growth media + ligand', 'Growth media + inhibitor',
                    'Growth media + ligand + inhibitor'
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
                                            {
                                                collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gm', concentration_id: '100'}
                                                ]},
                                                temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {
                                                collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]},
                                                temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {
                                                collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]},
                                                temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {
                                                collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }}
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
                                            {
                                                collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gm', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp1',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp1',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp1',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp2',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp2',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp2',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp3',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }}
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp3',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp3',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp4',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp4',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp4',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp5',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp5',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp5',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfpH',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfpH',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfpH',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfp100',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfp100',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfp100',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
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
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], L: [
                                    {cell_line: 'gfpTD',
                                        treatment_id: 'ligand_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gml', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }}
                                        ]}}
                                ], I: [
                                    {cell_line: 'gfpTD',
                                        treatment_id: 'inhibitor_media',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmi', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
                                            }
                                        ]}}
                                ], A: [
                                    {cell_line: 'gfpTD',
                                        treatment_id: 'ligand_media_inhibitor',
                                        treatment_list: {list: [
                                            {collection_id: 'default',
                                                drug_list: {list: [
                                                    {drug_id: 'gmil', concentration_id: '100'}
                                                ]}, temperature: '22',
                                                conditions: {
                                                    'IF': ['rgb']
                                                }
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
                        short_name: 'G:GFP'}
                }
            },
            'na': {
                name: 'None'
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
                            match: []

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
