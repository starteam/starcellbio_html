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

                ]
            },
            western_blot: {format: "%CELL_LINE%, %TREATMENT%",
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
                                                conditions: {
                                                    'IF': ['rgb', 'g', 'gr', 'rb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '100'}
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
                                                conditions: {
                                                    'IF': ['g']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna1', concentration_id: '100'}
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
                                                conditions: {
                                                    'IF': ['g', 'gr', 'rb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna2', concentration_id: '100'}
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
                                                conditions: {
                                                    'IF': ['rgb', 'g', 'rb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna3', concentration_id: '100'}
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
                                                conditions: {
                                                    'na': ['None']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna4', concentration_id: '100'}
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
                                                conditions: {
                                                    'IF': ['rgb', 'g']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna5', concentration_id: '100'}
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
                                                conditions: {
                                                    'na': ['None']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Serum', concentration_id: '100'}
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
                                                    conditions: {
                                                        'na': ['None']
                                                    },
                                                    duration_value: 3600 * 24 * 3,
                                                    duration: '3 d',
                                                    drug_list: {
                                                        list: [
                                                            {drug_id: 'Hydroxyurea', concentration_id: '100'}
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
                                                conditions: {
                                                    'na': ['None']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'Colchicine', concentration_id: '100'}
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
                    {weight: 45, intensity: 0}
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
            },
            'na': {
                name: 'None'
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
                            match: []

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
