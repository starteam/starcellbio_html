var MASTER_TEMPLATE={
        	random_choose: true,
        	randomize_all: false,
        	random_order: [],
        	finished_random: false,
            instructions: [
            	['','']
            	],
            ui: {
                experimental_design: {
                    techniques: [ '']
                },
                experiment_setup: {
                    table: [ //
                        {kind: "cell_plate", title: " ", editable: false},
                        {kind: 'cell_line', title: 'Strain', editable: false}, //
                        {kind: 'treatments',
                            children: [//
                            	 {kind: 'drug', title: 'Treatment', editable: false},
                                {kind: 'concentration', title: 'Treatment Concentration', editable: false}

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
                	order: [],
					headings: [
							'','Strain', 'Treatment', 'Treatment Concentration'
							],
                }
            },
            collections:{},
            concentrations: {},
            drugs: {},
            experiment_temperatures: {},
            cell_lines: {},
            start_times:{},
            durations: {},
            
            time_unit: {
                kind: ''
            },
            primary_anti_body: {},//
            secondary_anti_body: {},//
            lysate_kinds: {
            },
            facs_kinds: {
                '':{
            		name:'',
            		conditions: {
            			'': {name: ''}
            		}
            	}
            },
            micro_kinds: {
            	'':{
            		name:'',
            		conditions: {
            			'': {name: '',
            			short_name: ''}
            		}
            	}
        	},
        	slides: {
				 '': ''
			},	 
        	slide_parser: {
				'':{
					'':{
						'':{ 
							'':[
								 [{
								 	'hash': '', 
								 	'if_type': '', 
								 	'mag': ''
								 }]
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
                                drug: '',
                                cell_line: '',
                                above_marks: [
                                	{
                                        name: '',
                                        weight: 0, // 34&35
                                        intensity: 0,
                                        primary_anti_body: ['']
                                    }
                                ]
                            }
                        ]
                    }
                },
                facs: {
                	'ticks': [],
                	'max': 0,
                    'dna': {
                        'parser_simple': [
                            {
                                match: [],
                                shape: ''
                            },
                            {
                                match: [],
                                drug_id: '',
                                shape: ''
                            }
                        ]

                    }
                },
                microscopy: {
                	'valid': [],
                	'slide': {
                	
                		'conditions_parser':[
                		{
                			match: [],
                			
                		},
                		{
                			match: [],
                			cell_line: '',
                			drug_id: [''],
                			conditions: '',
                			phenotype: ''
                		}
                		]
                		
                	}
                }
                
            }
        
    

}

var MASTER_TEMPLATE_OLD = {
	name : 'Basic Template',
	concentrations : {
		1 : {
			name : '1ug/ml',
			value : 1
		},
		2 : {
			name : '2ug/ml',
			value : 2
		},
		5 : {
			name : '5ug/ml',
			value : 5
		}
	},
	drugs : {
		1 : {
			name : 'Nocodazole',
			concentrations : [1, 2, 5]
		},
		2 : {
			name : 'Hydroxyurea',
			concentrations : [1, 5]
		},
		3 : {
			name : 'Aminopterin',
			concentrations : [1, 2]
		}
	},
	experiment_temperatures : {
		'25' : {
			name : "25'C"
		},
		'20' : {
			name : "20'C"
		},
		'30' : {
			name : "30'C"
		}
	},
	cell_lines : {
		'hela' : {
			name : 'HeLa'
		},
		'mfc-7' : {
			name : 'MFC-7'
		},
		'293t' : {
			name : '293T'
		},
		'cho' : {
			name : 'CHO'
		}
	},
	time_unit : {
		kind : 'hours'
	},
	primary_anti_body : {
		1 : {
			name : 'rabbit anti-goat beta-actin'
		},
		2 : {
			name : 'mouse anti-mouse phosphotyrosine'
		},
		3 : {
			name : 'mouse anti-mouse cdk2'
		}
	},
	secondary_anti_body : {
		1 : {
			name : 'donkey anti-rabbit'
		},
		2 : {
			name : 'rabbit anti-goat'
		},
		3 : {
			name : 'goat anti-mouse'
		}
	},
	ip_primary_anti_body : {
		1 : {
			name : 'ip primary 1'
		},
		2 : {
			name : 'ip primary 2'
		}
	},
	ip_secondary_anti_body : {
		1 : {
			name : 'ip secondary 1'
		},
		2 : {
			name : 'ip secondary 2'
		}
	},
	lysate_kinds : {
		'whole' : {
			name : 'Whole Cell'
		},
		'cyto' : {
			name : 'Cytoplasm'
		},
		'nuclear' : {
			name : 'Nuclear'
		}
	},
	micro_kinds : {
		'IF':{
			name:'Antibody-labeling IF',
			conditions: {
				'NFIB': {name: 'NFIB (red), DAPI (blue), control (green)'} 
			}
		},
		'IHC':{
			name:'Antibody-labeling IHC',
			conditions: {
				'NFIB': {name: 'NFIB'},
				'KI67': {name: 'Ki-67'},
				'2nd': {name: 'Secondary only control'}   
			}
		},
		'Dye':{
			name: 'Dye/Stain',
			conditions: {
				'HnE': {name: 'H&E'} 
			}

		}
	}

};

var magic_debug = {};
