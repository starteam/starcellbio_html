
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
            	['Goal & Introduction','Here come instructions when we build them']
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
                    '%COLLECTION%': {attr: ['treatment_list', 'list', '0', 'collection_id'], map:['collections', '%KEY%', 'name']}
                }
            },
            	add_multiple_dialog: {
                	order: ['wt', 'cko'],
					headings: [
							'','Strains', 'Treatments', 'Timepoints'
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ae', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
                                                    {drug_id: 'ac', concentration_id: '108'}
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
            			'rgb': {name: 'Nfib (red), DAPI (blue), control (green)',
            			short_name: 'R:Nfib, G:control, B:DAPI'}
            		}
            	},
            	'IHC':{
            		name:'Antibody-labeling IHC',
            		conditions: {
            			'ki67': {name: 'Ki-67 (brown), hematoxylin (blue)',
            			short_name: 'IHC: Ki-67'},
            			'cgrp': {name: 'CGRP (brown), hematoxylin (blue)',
            			short_name: 'IHC: CGRP'}
            		}
            	},
            	'Dye':{
            		name: 'Dye/Stain',
            		conditions: {
            			'HnE': {name: 'Hematoxylin and Eosin (H&E)',
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
            slide_parser:{
                	'default':{
                		'Dye':{
							'HnE':[
							[{
									hash: 'img1',
									mag: '20x'
								}],
							[{
									hash: 'img2',
									mag: '20x'
								}],
							[{
									hash: 'img3',
									mag: '20x'
								}],
							[{
									hash: 'img5',
									mag: '20x'
								}],
							[{
									hash: 'img6',
									mag: '20x'
								}],
							[{
									hash: 'img7',
									mag: '4x'
								}],
							[{
									hash: 'img8',
									mag: '4x'
								}],
							[{
									hash: 'img9',
									mag: '4x'
								}],
							[{
									hash: 'img10',
									mag: '20x'
								}],
							[{
									hash: 'img4',
									mag: '40x'
								}]
							]
                		}
                	},
                	'3 m':{
                		'Dye':{
                			'HnE':[
								[{
										hash: 'img11',
										mag: '20x'
									}],
								[{
										hash: 'img12',
										mag:'10x'
									}],
								[{
										hash: 'img13',
										mag: '20x'
									}]
                				]
                			}
                	},
                	'6 m':{
                		'Dye':{
                			'HnE':[
								[{
									hash: 'img14',
									mag: '40x'
									}],
								[{
									hash: 'img15',
									mag:'20x'
									}],
								[{
									hash: 'img17',
									mag:'40x'
									}],
								[{
									hash: 'img18',
									mag:'20x'
									}],
								[{
									hash: 'img20',
									mag: '40x'
									}],
								[{
									hash: 'img21',
									mag:'20x'
									}],
								[{
									hash: 'img16',
									mag: '40x'
									}],
								[{
									hash: 'img22',
									mag: '40x'
									}],
								[{
									hash: 'img19',
									mag: '40x'
									}]
                			]
                		},
                		'IHC':{
                			'cgrp':[
								[{
									hash: 'img63',
									mag:'20x'
									}],
								[{
									hash: 'img64',
									mag: '20x'
									}],
								[{
									hash: 'img65',
									mag:'20x'
									}],
								[{
									hash: 'img66',
									mag: '20x'
									}],
								 [{
									hash: 'img67',
									mag: '20x'
									}]
                			],
                			'ki67':[
								[{
									hash: 'img25',
									mag:'20x'
									}],
								[{
									hash: 'img28',
									mag: '40x'
									}],
								[{
									hash: 'img31',
									mag:'20x'
									}],
								[{
									hash: 'img26',
									mag: '40x'
									}],
								[{
									hash: 'img32',
									mag: '40x'
									}]
                			]
                		}
                	},
                	'1 yr':{
                		'Dye':{
                			'HnE':[
								[{
									hash: 'img33',
									mag:'20x'
								}],
								 [{
									hash: 'img34',
									mag:'20x'
								}],
								[{
									hash: 'img35',
									mag:'4x'
								}],
								[{
									hash: 'img38',
									mag:'20x'
								}],
								[{
									hash: 'img39',
									mag:'20x'
								}],
								[{
									hash: 'img40',
									mag:'20x'
								}],
								 [{
									hash: 'img36',
									mag:'10x'
								}],
								 [{
									hash: 'img37',
									mag:'20x'
								}]
                			]
                		},
                		'IF': {
                			'rgb':[
								[{
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
								[{
									hash: 'img45',
									if_type: 'merge',
									mag:'60x'
								}],
								[{
									hash: 'img46',
									if_type: 'merge',
									mag:'60x'
								}],
								[{
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
								[{
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
                			]
                		},
                		'IHC':{
                			'cgrp':[
								[{
									hash: 'img60',
									mag:'10x'
									}],
								[{
									hash: 'img61',
									mag: '10x'
									}],
								[{
									hash: 'img62',
									mag:'20x'
									}]
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

                		'parser_simple':[
                		{
                			match: []

                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '3 m',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'IHC',
                			conditions: 'cgrp'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '1 yr',
                			kind: 'IHC',
                			conditions: 'cgrp'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '6 m',
                			kind: 'IHC',
                			conditions: 'ki67'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
                			cell_line: 'cko',
                			drug_id: 'ac',
                			collection_id: '1 yr',
                			kind: 'Dye',
                			conditions: 'HnE'
                		},
                		{
                			match: ['cell_line', 'drug_id', 'collection_id', 'kind','conditions'],
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
