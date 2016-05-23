from instructor.models import Assignment, WesternBlotBands
import json


def preview_as_json(assignment_id):
    ret = dict()
    ret['app_title'] = 'StarCellBio Preview'
    ret['app_description'] = 'StarCellBio Instructor Preview'
    ret['assignments'] = {'list': [compile(assignment_id)]}
    return json.dumps(ret)


def get_protocol_headers(assignment):
    headers = ['Strain', 'Treatment']
    # Optional headers
    optional_vars = [
        ('Concentration', 'has_concentration'),
        ('Start Time', 'has_start_time'), ('Duration', 'has_duration'),
        ('Temperature', 'has_temperature'),
        ('Collection Time', 'has_collection_time')
    ]

    # Adding headers for enabled experimental variables
    for var_name, field_name in optional_vars:
        if getattr(assignment, field_name):
            headers.append(var_name)

    return headers


def compile(assignment_id):
    a = Assignment.objects.get(id=assignment_id)
    ret = {
        'id': 'a_{}'.format(a.id),
        'name': a.name,
        'course': a.course.code,
        'course_name': a.course.name,
        'description': a.name,
        'notebook': {},
        'experiments': {},
        'template': {
            'ui': {
                'experimental_design': {
                    'techniques': compile_techniques(a),
                    'gel_types': gel_types(a)
                },
                'experiment_setup': {
                    'table': [
                        {
                            'kind': "cell_plate",
                            'title': " ",
                            'editable': 'false'
                        },
                        {
                            'kind': "cell_line",
                            'title': "Strain",
                            'editable': 'false'
                        },
                    ],
                    'actions': [
                        {
                            'kind': 'add_protocol',
                            'name': 'ADD SAMPLES',
                            'open': 'scb_ex1.assignment_builder_add_multiple'
                        }
                    ]
                }
            },
            'cell_lines': compile_cell_lines(a.strains.all()),
            'time_unit': {
                'kind': 'minutes'
            }
        }
    }
    treatments = [{'kind': "drug", 'title': "Treatments", 'editable': False}, ]
    if a.has_concentration:
        treatments.append(
            {
                'kind': "concentration",
                'title': "Concentration",
                'editable': False
            }
        )
    if a.has_temperature:
        treatments.append(
            {
                'kind': "temperature",
                'title': "Temperature",
                'editable': False
            }
        )
    if a.has_start_time:
        treatments.append(
            {
                'kind': "start",
                'title': "Start",
                'editable': False
            }
        )
    if a.has_duration:
        treatments.append(
            {
                'kind': "duration",
                'title': "Duration",
                'editable': False
            }
        )
    if a.has_collection_time:
        treatments.append(
            {
                'kind': "collection",
                'title': "Collection Time",
                'editable': False
            }
        )
    table = ret['template']['ui']['experiment_setup']['table']
    table.append({'kind': "treatments", 'children': treatments})
    table.append({'kind': 'actions', 'title': 'Actions'})

    ret['template']['instructions'] = [
        [
            'Assignment',
            'Please contact your instructor for your StarCellBio assignment.'
        ]
    ]
    ret['template']['model'] = {}

    ret['template']['ui']['add_multiple_dialog'] = add_multiple_dialog(a)
    ret['template']['drugs'] = drugs(a)
    ret['template']['concentrations'] = concentrations(a)
    ret['template']['experiment_temperatures'] = experiment_temperatures(a)

    ret['template']['ui']['western_blot'] = format_table(a)
    ret['template']['micro_kinds'] = micro_kinds(a)

    if a.has_wb:
        ret['template']['primary_anti_body'] = primary_anti_body(a)
        ret['template']['secondary_anti_body'] = secondary_anti_body(a)
        ret['template']['lysate_kinds'] = lysate_kinds(a)
        ret['template']['model']['western_blot'] = generate_western_blot_model(
            a
        )
    ret['template']['ui']['microscopy'] = {}
    ret['template']['ui']['microscopy'][
        'disable_blur'
    ] = True  # # is this right?
    ret['template']['ui']['microscopy'][
        'disable_brightness'
    ] = True  # # is this right?
    ret['template']['model']['microscopy'] = micro_model(a)
    ret['template']['slide_parser'] = {'collection_ab': micro_kinds(a)}
    ret['template']['slides'] = generate_slides(a)
    if a.has_fc:
        ret['template']['facs_kinds'] = facs_kinds(a)
        ret['template']['facs_histograms'] = facs_histograms(a)
        ret['template']['model']['facs'] = facs_model(a)
    return ret


def format_table(assignment):
    headers = "%CELL_LINE%, %TREATMENT%"

    keys = {
        '%CELL_LINE%': {
            'attr': ['cell_line'],
            'map': ['cell_lines', '%KEY%', 'name']
        },
        '%TREATMENT%': {
            'attr': [
                'treatment_list', 'list', '0', 'drug_list', 'list', '0',
                'drug_id'
            ],
            'map': ['drugs', '%KEY%', 'name']
        },
    }

    if assignment.has_concentration:
        headers += ', %CONCENTRATION%'
        keys['%CONCENTRATION%'] = {
            'attr': [
                'treatment_list', 'list', '0', 'drug_list', 'list', '0',
                'concentration_id'
            ],
            'map': ['concentrations', '%KEY%', 'name']
        }
    if assignment.has_start_time:
        headers += ', %START_TIME%'
        keys['%START_TIME%'] = {
            'attr': [
                'treatment_list', 'list', '0', 'start_time'
            ]
        }
    if assignment.has_duration:
        headers += ', %DURATION%'
        keys['%DURATION%'] = {
            'attr': [
                'treatment_list', 'list', '0', 'duration'
            ]
        }
    if assignment.has_temperature:
        headers += ', %TEMPERATURE%'
        keys['%TEMPERATURE%'] = {
            'attr': ['treatment_list', 'list', '0', 'temperature'],
            'map': ['experiment_temperatures', '%KEY%', 'name']
        }
    if assignment.has_collection_time:
        headers += ', %COLLECTION_TIME%'
        keys['%COLLECTION_TIME%'] = {
            'attr': ['treatment_list', 'list', '0', 'collection_time']
        }
    wb_table = {'format': headers, 'keys': keys}
    return wb_table


def facs_histograms(assignment):
    histograms = {}
    for sample_prep in assignment.facs_sample_prep.all():
        for histogram_mapping in sample_prep.histogram_mapping.all():
            if histogram_mapping.live_data:
                histogram = histogram_mapping.live_data
                histograms[int(histogram.id)] = json.loads(histogram.data)
            if histogram_mapping.fixed_data:
                histogram = histogram_mapping.fixed_data
                histograms[int(histogram.id)] = json.loads(histogram.data)
    return histograms


def facs_model(assignment):
    facs = assignment.flow_cytometry.first()
    tick_values = [int(value) for value in facs.tick_values.split(',')]
    ab_parser = {
        'ticks': tick_values,
        'max': facs.xrange,
        'scale': facs.scale,
        'dna': {}
    }
    simple_parser = []
    for sample_prep in assignment.facs_sample_prep.all():
        for mapping in sample_prep.histogram_mapping.all():
            protocol_id = mapping.strain_protocol.id
            identifier = "SP_ID_{}".format(protocol_id)
            analysis = mapping.sample_prep.analysis
            condition = mapping.sample_prep.condition
            if mapping.sample_prep.live:
                cell_treatment = 'Live'

                simple_parser.append(
                    {
                        'identifier': identifier,
                        'treatment': cell_treatment,
                        'analysis': analysis,
                        'condition': condition,
                        'histogram_id': mapping.live_data.id
                    }
                )
            if mapping.sample_prep.fixed:
                cell_treatment = 'Fixed'

                simple_parser.append(
                    {
                        'identifier': identifier,
                        'treatment': cell_treatment,
                        'analysis': analysis,
                        'condition': condition,
                        'histogram_id': mapping.fixed_data.id
                    }
                )
    ab_parser['dna']['parser_simple'] = simple_parser
    return {'is_ab': True, 'ab_parser': ab_parser}


def facs_kinds(assignment):
    ret = {}
    for sp in assignment.facs_sample_prep.all():
        analysis = sp.analysis
        condition = sp.condition or ''

        if sp.live:
            if 'Live' not in ret:
                ret['Live'] = {}
            if analysis not in ret['Live']:
                ret['Live'][analysis] = {
                    'name': sp.get_analysis_display(),
                    'conditions': {},
                }
            ret['Live'][analysis]['conditions'][condition] = {
                'name': condition
            }
        if sp.fixed:
            if 'Fixed' not in ret:
                ret['Fixed'] = {}
            if analysis not in ret['Fixed']:
                ret['Fixed'][analysis] = {
                    'name': sp.get_analysis_display(),
                    'conditions': {},
                }
            ret['Fixed'][analysis]['conditions'][condition] = {
                'name': condition
            }

    return ret


def micro_model(a):
    ret = {'is_ab': True}
    for sp in a.microscopy_sample_prep.all():
        for i in sp.microscopy_images.all():
            key = "{sp.analysis}%%{sp.condition}%%SP_ID{protocol}".format(
                sp=sp,
                protocol=i.strain_protocol_id
            )
            if key not in ret:
                ret[key] = {
                    'slides': [
                        {
                            'hash': "IMAGE_{}".format(i.pk),
                            'if_type': i.filter,
                            'mag': i.objective
                        }
                    ],
                    'slide_type': sp.analysis
                }
            else:
                ret[key]['slides'].append(
                    {
                        'hash': "IMAGE_{}".format(i.pk),
                        'if_type': i.filter,
                        'mag': i.objective
                    }
                )
    return ret


def generate_slides(a):
    ret = {}
    for sp in a.microscopy_sample_prep.all():
        for i in sp.microscopy_images.all():
            ret['IMAGE_{}'.format(i.pk)] = i.url
    return ret


def generate_western_blot_model(a):
    ret = {
        'cyto': {'parser_ab': []},
        'nuclear': {'parser_ab': []},
        'whole': {'parser_ab': []}
    }
    for k in lysate_kinds(a).keys():
        ret[k] = {'parser_ab': []}

    cyto = []
    nuclear = []
    whole = []
    for antibodies in a.western_blot.antibodies.all():
        for ps in a.strain_treatment.filter(enabled=True):
            bands = WesternBlotBands.objects.filter(
                antibody=antibodies,
                strain_protocol=ps
            )
            marks = {'cyto': [], 'nuc': [], 'wc': []}
            for band in bands:
                marks[band.lysate_type].append(
                    {
                        'weight': band.weight,
                        'intensity': band.intensity,
                        'primary_anti_body': ['AB_{}'.format(antibodies.id)]
                    }
                )

            cyto.append(
                {
                    'identifier': "SP_ID_{}".format(ps.id),
                    'marks': marks['cyto']
                }
            )
            nuclear.append(
                {
                    'identifier': "SP_ID_{}".format(ps.id),
                    'marks': marks['nuc']
                }
            )
            whole.append(
                {
                    'identifier': "SP_ID_{}".format(ps.id),
                    'marks': marks['wc']
                }
            )

    ret['cyto']['parser_ab'] = cyto
    ret['nuclear']['parser_ab'] = nuclear
    ret['whole']['parser_ab'] = whole

    return ret


def gel_types(a):
    ret = []
    if a.has_wb:
        if a.western_blot.has_gel_10:
            ret.append('.10')
        if a.western_blot.has_gel_12:
            ret.append('.12')
        if a.western_blot.has_gel_15:
            ret.append('.15')
    return ret


def micro_kinds(a):
    ret = {}
    for sp in a.microscopy_sample_prep.all():
        analysis = sp.analysis
        condition = sp.condition
        if analysis not in ret:
            ret[analysis] = {
                'name': analysis,
                'conditions': {
                },
                'identifiers': {}
            }
        ret[analysis]['conditions'][condition] = {
            'name': condition,
            'short_name': condition
        }
        if 'identifiers' not in ret[analysis]['conditions'][condition]:
            ret[analysis]['conditions'][condition]['identifiers'] = {}
        for p in sp.microscopy_images.all():
            ret[analysis]['identifiers'][
                "SP_ID_{}".format(
                    p.strain_treatment_id
                )
            ] = 1
            ret[analysis]['conditions'][condition]['identifiers'][
                "SP_ID_{}".format(p.strain_treatment_id)
            ] = 1
    return ret


def lysate_kinds(assignment):
    ret = {}
    if assignment.western_blot.has_whole_cell_lysate:
        ret['whole'] = {'name': 'Whole Cell'}
    if assignment.western_blot.has_cytoplasmic_fractination:
        ret['cyto'] = {'name': 'Cytoplasm'}
    if assignment.western_blot.has_nuclear_fractination:
        ret['nuclear'] = {'name': 'Nuclear'}
    return ret


def secondary_anti_body(assignment):
    western_blot = assignment.western_blot
    secondary = {}
    for a in western_blot.antibodies.all():
        secondary[a.secondary] = {'name': a.secondary}
    return secondary


def primary_anti_body(assignment):
    ret = {}
    western_blot = assignment.western_blot
    primary = {}
    for a in western_blot.antibodies.all():
        if a.primary in primary:
            primary[a.primary].append(a.secondary)
        else:
            primary[a.primary] = [a.secondary]
    order = {}
    for a in western_blot.antibodies.all():
        pk = 'AB_{}'.format(a.id)
        order[pk] = 1

        ret[pk] = {
            'name': a.primary,
            'secondary': primary[a.primary],
            'gel_name': a.primary
        }
    ret['order'] = order.keys()
    return ret


def drugs(assignment):
    ret = {}
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        drug = strain_protocol.treatment.drug
        ret[str(drug.id)] = {'name': str(drug.name)}
    return ret


def concentrations(assignment):
    ret = {'': {'name': ''}}
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        drug = strain_protocol.treatment.drug
        concentration = drug.concentration
        if concentration is not None:
            ret[str(concentration)] = {
                'name': u"{concentration} {unit}".format(
                    concentration=concentration,
                    unit=drug.concentration_unit
                ),
                'value': str(concentration)
            }
    return ret


def experiment_temperatures(assignment):
    ret = {}
    if assignment.has_temperature:
        for strain_protocol in assignment.strain_treatment.filter(
            enabled=True
        ):
            treatment = strain_protocol.treatment
            temperature = treatment.temperature
            ret[str(temperature.id)] = {
                'name': u'{degrees}\u00b0C'.format(degrees=temperature.degrees)
            }
    return ret


def add_multiple_dialog(assignment):
    ret = {'rows': []}
    ret['headings'] = get_protocol_headers(assignment)
    ret['headings'].insert(0, '')
    ret['has_variables'] = {
        'concentration': assignment.has_concentration,
        'start_time': assignment.has_start_time,
        'duration': assignment.has_duration,
        'temperature': assignment.has_temperature,
        'collection_time': assignment.has_collection_time
    }
    strain_treatments = assignment.strain_treatment.filter(
        enabled=True
    ).order_by(
        'strain', 'treatment__drug__name', 'treatment__drug__concentration',
        'treatment__drug__start_time', 'treatment__drug__duration',
        'treatment__temperature__degrees', 'treatment__collection_time__time'
    )
    for strain_treatment in strain_treatments:
        strain = strain_treatment.strain
        treatment = strain_treatment.treatment
        row = {
            'id': "SP_ID_{}".format(str(strain_treatment.id)),
            'identifier': "SP_ID_{}".format(str(strain_treatment.id)),
            'protocol': treatment.drug.name,
            'strain': strain.name,
            'cell_line': str(strain.id),
            'treatment_list': {
                'list': compile_treatments(
                    [treatment], assignment
                )
            }
        }
        ret['rows'].append(row)
    return ret


def compile_treatments(treatments, assignment):
    ret = []
    for treatment in treatments:
        row = {
            'id': 'treatment_{}'.format(treatment.id),
            'drug_list': {
                'list': [
                    {
                        'drug_id': treatment.drug.id,
                        'drug_name': treatment.drug.name,
                        'concentration_id': ''
                        if treatment.drug.concentration is None else
                        str(treatment.drug.concentration)
                    }
                ]
            },
            'start_time': '' if treatment.drug.start_time is None else
            '{time} {unit}'.format(
                time=treatment.drug.start_time,
                unit=treatment.drug.time_unit
            ),
            'duration': '' if treatment.drug.duration is None else
            '{time} {unit}'.format(
                time=treatment.drug.duration,
                unit=treatment.drug.duration_unit
            ),
            'microscope': ['rgb', 'g', 'gr', 'rb'],  # # microscope?!
            'collection_id': 'collection_ab'
        }
        if assignment.has_temperature:
            row['temperature'] = treatment.temperature.id
        if assignment.has_collection_time:
            row['collection_time'] = "{time} {units}".format(
                time=treatment.collection_time.time,
                units=treatment.collection_time.units
            )
        ret.append(row)
    return ret


def compile_cell_lines(cell_lines):
    ret = {}
    for cell_line in cell_lines:
        ret[str(cell_line.id)] = {'name': cell_line.name}
    return ret


def compile_techniques(assignment):
    ret = []
    if assignment.has_fc:
        ret.append('facs')
    if assignment.has_micro:
        ret.append('micro')
    if assignment.has_wb:
        ret.append('wb')
    return ret
