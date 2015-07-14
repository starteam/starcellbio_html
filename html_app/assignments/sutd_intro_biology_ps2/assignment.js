var __sutd_intro_biology_ps2 = {
    id: 'sutd_intro_biology_ps2',
    name: 'StarCellBio Assignment 2 (CC14)',
    course: 'SUTD_Biology',
    course_name: 'SUTD Intro Biology',
    description: 'FACS and Western Blot for temperature sensitive mutants',
    notebook: {},
    experiments: {},
    template: {
        random_choose: true,
        randomize_all: false,
        random_order: [],
        finished_random: false,
        instructions: [
            ["Goal", scb_assignment_sutd_intro_biology_ps2.goal({})],
            ["Background Information", scb_assignment_sutd_intro_biology_ps2.bg_info({})],
            ["Questions", scb_assignment_sutd_intro_biology_ps2.questions({})]
        ],
        ui: {
            experimental_design: {
                techniques: [ 'wb' , 'facs', 'micro'],
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
                    {kind: "add_many", name: "Add Samples", open: 'sutd_ps2.setup', css: {
                        width: '885px',
                        height: '600px',
                        left: 'inherit',
                        top: '15%'
                    },
                        'collection_id': '%CELL_LINE%'
                    }

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
                                {kind: 'checkbox', name: "CR", treatment_id: 'nc'},
                                {kind: 'text', text: 'S2'},
                                {kind: 'text', text: 'Control siRNA'},
                                {kind: 'text', text: "3 days"}
                            ],
                            treatment_id: 'nc',
                            cell_treatments: {
                                CR: [
                                    {cell_line: 'S2',
                                        treatment_list: {list: [
                                            {
                                                collection_id: 'default',
                                                microscope: ['rgb'],
                                                conditions: {
                                                    'IF': ['rgb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'nc', concentration_id: '100'}
                                                ]},
                                                temperature: '25'
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
                                            {
                                                collection_id: 'default', microscope: ['rgb'],
                                                conditions: {
                                                    'IF': ['rgb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna1', concentration_id: '100'}
                                                ]},
                                                temperature: '25'
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
                                            {
                                                collection_id: 'default', microscope: ['rgb'],
                                                conditions: {
                                                    'IF': ['rgb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna2', concentration_id: '100'}
                                                ]},
                                                temperature: '25'
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
                                            {
                                                collection_id: 'default', microscope: ['rgb'],
                                                conditions: {
                                                    'IF': ['rgb']
                                                },
                                                duration_value: 3600 * 24 * 3, duration: '3 d',
                                                drug_list: {list: [
                                                    {drug_id: 'rna3', concentration_id: '100'}
                                                ]},
                                                temperature: '25'
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
        experiment_setup: scb_assignment_sutd_intro_biology_ps2.experiment_setup({}),
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
            order: ['cyclinB', 'cyclinE', 'scc1', 'pgk1'],

            'cyclinB': {
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
                    {weight: 54, intensity: 0},
                    {weight: 55, intensity: 0},
                    {weight: 58, intensity: 0}
                ],
                gel_name: 'cyclin E'
            },
            'scc1': {
                name: 'rabbit anti-Scc1',
                secondary: ['r'],
                marks: [
                    {weight: 48, intensity: 0}
                ],
                gel_name: 'Scc1'
            },
            'pgk1': {
                name: 'rabbit anti-pgk1',
                secondary: ['r'],
                marks: [
                    {weight: 25, intensity: 0}
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
        micro_kinds: {
            'IF': {
                name: 'Antibody-labeling IF',
                conditions: {
                    'rgb': {name: 'γ-tubulin (red), α-tubulin (green), DAPI (blue)',
                        short_name: 'R:γ-tub, G:α-tub, B:DAPI'}
                }
            },
            'na': {
                name: 'None'
            }
        },
        slides: {
            'img0001': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_1_composite.jpg',
            'img0002': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_2_composite.jpg',
            'img0003': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_3_composite.jpg',
            'img0004': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_4_composite.jpg',
            'img0005': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_5_composite.jpg',
            'img0006': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_4Normal_Anaphase_6_composite.jpg',
            'img0007': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_1_composite.jpg',
            'img0008': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_2_composite.jpg',
            'img0009': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_3_composite.jpg',
            'img0010': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_4_composite.jpg',
            'img0011': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_5_composite.jpg',
            'img0012': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_5Normal_Anaphase_6_composite.jpg',
            'img0013': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_1_composite.jpg',
            'img0014': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_2_composite.jpg',
            'img0015': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_3_composite.jpg',
            'img0016': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_4_composite.jpg',
            'img0017': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_5_composite.jpg',
            'img0018': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_6Normal_Anaphase_6_composite.jpg',
            'img0019': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_1_composite.jpg',
            'img0020': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_2_composite.jpg',
            'img0021': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_3_composite.jpg',
            'img0022': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_4_composite.jpg',
            'img0024': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_5_composite.jpg',
            'img0025': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_7Normal_Anaphase_6_composite.jpg',
            'img0027': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_1_composite.jpg',
            'img0028': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_2_composite.jpg',
            'img0029': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_3_composite.jpg',
            'img0034': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_4_composite.jpg',
            'img0035': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_5_composite.jpg',
            'img0036': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_8Normal_Anaphase_6_composite.jpg',
            'img0037': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_1_composite.jpg',
            'img0038': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_2_composite.jpg',
            'img0039': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_3_composite.jpg',
            'img0040': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_4_composite.jpg',
            'img0041': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_5_composite.jpg',
            'img0042': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_9Normal_Anaphase_6_composite.jpg',
            'img0043': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_1_composite.jpg',
            'img0044': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_2_composite.jpg',
            'img0045': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_3_composite.jpg',
            'img0046': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_4_composite.jpg',
            'img0047': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_5_composite.jpg',
            'img0048': 'images/microscopy/sutd_2/cn/Interphase_10Normal_Metaphase_10Normal_Anaphase_6_composite.jpg',

            'img0049': 'images/microscopy/sutd_2/rna1/Metaphase_arrest1.jpg',
            'img0050': 'images/microscopy/sutd_2/rna1/Metaphase_arrest2.jpg',
            'img0051': 'images/microscopy/sutd_2/rna1/Metaphase_arrest3.jpg',
            'img0052': 'images/microscopy/sutd_2/rna1/Metaphase_arrest4.jpg',

            'img0053': 'images/microscopy/sutd_2/rna2/MT_instability1.jpg',
            'img0054': 'images/microscopy/sutd_2/rna2/MT_instability2.jpg',
            'img0055': 'images/microscopy/sutd_2/rna2/MT_instability3.jpg',
            'img0056': 'images/microscopy/sutd_2/rna2/MT_instability4.jpg',
            'img0057': 'images/microscopy/sutd_2/rna2/MT_instability5.jpg',
            'img0058': 'images/microscopy/sutd_2/rna2/MT_instability6.jpg',

            'img0059': 'images/microscopy/sutd_2/rna3/Interphase_10Normal_UnequalChromsomeDistribution1_composite.jpg',
            'img0060': 'images/microscopy/sutd_2/rna3/Interphase_10Normal_UnequalChromsomeDistribution2_composite.jpg',
            'img0067': 'images/microscopy/sutd_2/rna3/Interphase_10Normal_UnequalChromsomeDistribution3_composite.jpg',
            'img0068': 'images/microscopy/sutd_2/rna3/Interphase_10Normal_UnequalChromsomeDistribution4_composite.jpg',
            'img0069': 'images/microscopy/sutd_2/rna3/Interphase_12Normal_UnequalChromsomeDistribution1_composite.jpg',
            'img0070': 'images/microscopy/sutd_2/rna3/Interphase_12Normal_UnequalChromsomeDistribution2_composite.jpg',
            'img0071': 'images/microscopy/sutd_2/rna3/Interphase_12Normal_UnequalChromsomeDistribution3_composite.jpg',
            'img0072': 'images/microscopy/sutd_2/rna3/Interphase_12Normal_UnequalChromsomeDistribution4_composite.jpg',
            'img0073': 'images/microscopy/sutd_2/rna3/Interphase_13Normal_UnequalChromsomeDistribution1_composite.jpg',
            'img0074': 'images/microscopy/sutd_2/rna3/Interphase_13Normal_UnequalChromsomeDistribution2_composite.jpg',
            'img0075': 'images/microscopy/sutd_2/rna3/Interphase_13Normal_UnequalChromsomeDistribution3_composite.jpg',
            'img0076': 'images/microscopy/sutd_2/rna3/Interphase_13Normal_UnequalChromsomeDistribution4_composite.jpg',

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

                        'nc': [
                            [
                                {'hash': 'img0001', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0002', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0003', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
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
                            ],
                            [
                                {'hash': 'img0010', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0011', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0012', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
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
                            ],
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
                            ],
                            [
                                {'hash': 'img0023', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0024', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0025', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0026', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0027', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0028', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0029', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0030', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0031', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0032', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0033', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0034', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0035', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0036', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0037', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0038', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0039', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0040', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0041', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0042', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0043', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0044', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0045', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0046', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0047', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0048', 'if_type': 'merge', 'mag': 'N/A'}
                            ]


                        ],
                        'rna1': [
                            [
                                {'hash': 'img0049', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0050', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0051', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0052', 'if_type': 'merge', 'mag': 'N/A'}
                            ]

                        ],
                        'rna2': [
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
                            ]
                        ],
                        'rna3': [
                            [
                                {'hash': 'img0059', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0060', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0061', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0062', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0063', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0064', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0065', 'if_type': 'merge', 'mag': 'N/A'}
                            ],
                            [
                                {'hash': 'img0066', 'if_type': 'merge', 'mag': 'N/A'}
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
                                    name: 'Cyclin E',
                                    weight: 48,
                                    intensity: 4,
                                    primary_anti_body: ['cyclinE']
                                },
                                {
                                    name: 'Cyclin B',
                                    weight: 58,
                                    intensity: 1,
                                    primary_anti_body: ['cyclinB']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 68,
                                    intensity: 2,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 20,
                                    intensity: 1,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 30,
                                    intensity: 1,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'pgk1',
                                    weight: 45,
                                    intensity: 3,
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
                                    name: 'Cyclin E',
                                    weight: 48,
                                    intensity: 0,
                                    primary_anti_body: ['cyclinE']
                                },
                                {
                                    name: 'Cyclin B',
                                    weight: 58,
                                    intensity: 9,
                                    primary_anti_body: ['cyclinB']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 68,
                                    intensity: 5,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'pgk1',
                                    weight: 45,
                                    intensity: 3,
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
                                    name: 'Cyclin E',
                                    weight: 48,
                                    intensity: 0,
                                    primary_anti_body: ['cyclinE']
                                },
                                {
                                    name: 'Cyclin B',
                                    weight: 58,
                                    intensity: 9,
                                    primary_anti_body: ['cyclinB']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 68,
                                    intensity: 5,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'pgk1',
                                    weight: 45,
                                    intensity: 3,
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
                                    name: 'Cyclin E',
                                    weight: 48,
                                    intensity: 4,
                                    primary_anti_body: ['cyclinE']
                                },
                                {
                                    name: 'Cyclin B',
                                    weight: 58,
                                    intensity: 4,
                                    primary_anti_body: ['cyclinB']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 68,
                                    intensity: 2,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 20,
                                    intensity: 3,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'Scc1',
                                    weight: 30,
                                    intensity: 3,
                                    primary_anti_body: ['scc1']
                                },
                                {
                                    name: 'pgk1',
                                    weight: 45,
                                    intensity: 3,
                                    primary_anti_body: ['pgk1']
                                }

                            ]
                        }

                    ]
                }
            },
            facs: {
                'ticks': [50, 100, 150, 250],
                'max': 250,
                'scale': 'linear',
                'dna': {
                    'parser_simple': [
                        {
                            match: [],
                            shape: '2-peak-normal-400'
                        },
                        {
                            match: ['drug_id'],
                            drug_id: 'nc',
                            shape: '1-peak-normal-1-flatbump-400'
                        },
                        {
                            match: ['drug_id'],
                            drug_id: 'rna1',
                            shape: 'scaled-peak-100'
                        },
                        {
                            match: ['drug_id'],
                            drug_id: 'rna2',
                            shape: 'scaled-peak-100'
                        },
                        {
                            match: ['drug_id'],
                            drug_id: 'rna3',
                            shape: 'unequal-segregation'
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
                            phenotype: 'nc'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'conditions'],
                            cell_line: 'S2',
                            drug_id: ['rna1'],
                            conditions: 'rgb',
                            phenotype: 'rna1'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'conditions'],
                            cell_line: 'S2',
                            drug_id: ['rna2'],
                            conditions: 'rgb',
                            phenotype: 'rna2'
                        },
                        {
                            match: ['cell_line', 'drug_id', 'conditions'],
                            cell_line: 'S2',
                            drug_id: ['rna3'],
                            conditions: 'rgb',
                            phenotype: 'rna3'
                        }
                    ]

                }
            }
        }
    }
};
