var MASTER_TEMPLATE = {
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
