from instructor.models import *
import json


def preview_as_json(assignment_id):
    ret = dict()
    ret['app_title'] = 'StarCellBio Preview'
    ret['app_description'] = 'StarCellBio Instructor Preview'
    ret['assignments'] = {'list': [compile(assignment_id)]}
    return json.dumps(ret)





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
            'experiment_setup': 'Experiment Setup',
            'ui': {
                'experimental_design': {
                    'techniques': compile_techniques(a),
                    'gel_types': gel_types(a)
                },
                'experiment_setup': {
                    'table': [
                        {'kind': "cell_line",
                         'title': "Strain",
                         'editable': 'false'
                        },
                    ], 'actions': [
                    {'kind': 'add_protocol', 'name': 'Add Protocol'}
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
        treatments.append({'kind': "concentration", 'title': "Concentration", 'editable': False})
    if a.has_temperature:
        treatments.append({'kind': "temperature", 'title': "Temperature", 'editable': False})
    if a.has_start_time:
        treatments.append({'kind': "start", 'title': "Start", 'editable': False})
    if a.has_duration:
        treatments.append({'kind': "duration", 'title': "Duration", 'editable': False})
    if a.has_collection_time:
        treatments.append({'kind': "collection", 'title': "Collection Time", 'editable': False})
    table = ret['template']['ui']['experiment_setup']['table']
    table.append({'kind': "treatments", 'children': treatments})
    table.append({'kind': 'actions', 'title': 'Actions'});
    instructions = []
    for t in a.assignment_text.all():
        instructions.append([t.title, t.text])
    ret['template']['instructions'] = instructions
    ret['template']['model'] = {}

    ret['template']['ui']['add_multiple_dialog'] = add_multiple_dialog(a)
    ret['template']['drugs'] = drugs(a)
    ret['template']['concentrations'] = concentrations(a)
    ret['template']['experiment_temperatures'] = experiment_temperatures(a)

    ret['template']['ui']['western_blot'] = {'format': "%CELL_LINE%, %TREATMENT%, %PP1% %TEMPERATURE%",
                                             'keys': {
                                                 '%CELL_LINE%': {'attr': ['cell_line'],
                                                                 'map': ['cell_lines', '%KEY%', 'name']},
                                                 '%TREATMENT%': {
                                                     'attr': ['treatment_list', 'list', '0', 'drug_list', 'list', '0',
                                                              'drug_id'], 'map': ['drugs', '%KEY%', 'name']},
                                                 '%CONCENTRATION%': {
                                                     'attr': ['treatment_list', 'list', '0', 'drug_list', 'list', '0',
                                                              'concentration_id'],
                                                     'map': ['concentrations', '%KEY%', 'name']},
                                                 '%TEMPERATURE%': {
                                                     'attr': ['treatment_list', 'list', '0', 'temperature'],
                                                     'map': ['experiment_temperatures', '%KEY%', 'name']},
                                                 '%PP1%': {
                                                     'attr': ['treatment_list', 'list', '0', 'drug_list', 'list', '1',
                                                              'drug_id'], 'map': ['drugs', '%KEY%', 'short_name'],
                                                     'default': ''}
                                             }}
    ret['template']['primary_anti_body'] = primary_anti_body(a)
    ret['template']['secondary_anti_body'] = secondary_anti_body(a)
    ret['template']['lysate_kinds'] = lysate_kinds(a)
    ret['template']['micro_kinds'] = micro_kinds(a)

    ret['template']['model']['western_blot'] = generate_western_blot_model(a)
    ret['template']['ui']['microscopy'] = {}
    ret['template']['ui']['microscopy']['disable_blur'] = True  # # is this right?
    ret['template']['ui']['microscopy']['disable_brightness'] = True  # # is this right?
    ret['template']['model']['microscopy'] = micro_model(a)
    ret['template']['slide_parser'] = {
        'collection_ab': micro_kinds(a)
    }
    ret['template']['slides'] = generate_slides(a)
    ret['template']['facs_kinds'] = facs_kinds(a)
    ret['template']['model']['facs'] = facs_model(a)
    return ret

def csv_custom(data):
    ret = []
    import StringIO
    import csv
    f = StringIO.StringIO(data)
    reader = csv.reader(f, delimiter=',')
    for row in reader:
        ret.append(row)
    return ret

def facs_model(a):
    ab_parser = []
    for sp in a.facs_sample_prep.all():
        for h in sp.histograms.all():
            if h.enabled:
                protocol_id = h.strain_protocol_id
                kind = h.kind
                custom_data = h.data
                identifier = "SP_ID_{}".format(protocol_id)
                analysis = sp.analysis
                treatment = sp.treatment
                condition = sp.condition
                if kind == 'custom':
                    custom_data = csv_custom(custom_data)
                ab_parser.append({
                    'identifier': identifier,
                    'analysis': analysis,
                    'treatment': treatment,
                    'condition': condition,
                    'kind': kind,
                    'shape': kind,
                    'custom_data': custom_data
                })
    return {'is_ab': True, 'ab_parser': ab_parser}


def facs_kinds(a):
    ret = {}
    for sp in a.facs_sample_prep.all():
        treatment = sp.treatment
        analysis = sp.analysis
        condition = sp.condition or ''

        if not ret.has_key(analysis):
            ret[analysis] = {
                'name': sp.get_analysis_display(),
                'conditions': {

                },
                'Live': {},
                'Fixed': {}
            }
        if not ret[analysis].has_key(treatment):
            ret[analysis][treatment] = {}

        for histogram in sp.histograms.all():
            enabled = histogram.enabled
            if enabled:
                kind = histogram.kind
                data = histogram.data
                strain_protocol = histogram.strain_protocol
                sp_id = 'SP_ID_{}'.format(strain_protocol.id)
                ret[analysis][treatment][sp_id] = 1
                if not ret[analysis]['conditions'].has_key(condition):
                    ret[analysis]['conditions'][condition] = {
                        'name': condition,
                        'short_name': condition,
                        'identity': {}
                    }
                ret[analysis]['conditions'][condition]['identity'][sp_id] = {
                    'kind': kind,
                    'data': data,
                    'treatment': treatment
                }

    return ret


def micro_model(a):
    ret = {
        'is_ab': True
    }
    for sp in a.microscopy_sample_prep.all():
        for i in sp.microscopy_images.all():
            key = "{sp.analysis}%%{sp.condition}%%SP_ID{protocol}".format(sp=sp, protocol=i.strain_protocol_id)
            if not key in ret:
                ret[key] = {
                    'slides': [{
                                   'hash': "IMAGE_{}".format(i.pk),
                                   'if_type': i.filter,
                                   'mag': i.objective
                               }],
                    'slide_type': sp.analysis
                }
            else:
                ret[key]['slides'].append({
                    'hash': "IMAGE_{}".format(i.pk),
                    'if_type': i.filter,
                    'mag': i.objective
                })
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
            bands = WesternBlotBands.objects.filter(antibody=antibodies, strain_protocol=ps)
            marks = {'cyto': [], 'nuc': [], 'wc': []}
            for band in bands:
                marks[band.lysate_type].append({
                    'weight': band.weight,
                    'intensity': band.intensity,
                    'primary_anti_body': ['AB_{}'.format(antibodies.id)]
                })

            cyto.append({
                'identifier': "SP_ID_{}".format(ps.id),
                'marks': marks['cyto']
            })
            nuclear.append({
                'identifier': "SP_ID_{}".format(ps.id),
                'marks': marks['nuc']
            })
            whole.append({
                'identifier': "SP_ID_{}".format(ps.id),
                'marks': marks['wc']
            })

    ret['cyto']['parser_ab'] = cyto
    ret['nuclear']['parser_ab'] = nuclear
    ret['whole']['parser_ab'] = whole

    return ret


def gel_types(a):
    ret = []
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
        if not ret.has_key(analysis):
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
        if not ret[analysis]['conditions'][condition].has_key('identifiers'):
            ret[analysis]['conditions'][condition]['identifiers'] = {}
        for p in sp.microscopy_images.all():
            ret[analysis]['identifiers']["SP_ID_{}".format(p.strain_treatment_id)] = 1
            ret[analysis]['conditions'][condition]['identifiers']["SP_ID_{}".format(p.strain_treatment_id)] = 1
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
        secondary[a.secondary] = {
            'name': a.secondary
        }
    return secondary


def primary_anti_body(assignment):
    ret = {}
    western_blot = assignment.western_blot
    primary = {}
    for a in western_blot.antibodies.all():
        if primary.has_key(a.primary):
            primary[a.primary].append(a.secondary)
        else:
            primary[a.primary] = [a.secondary]
    order = {}
    for a in western_blot.antibodies.all():
        pk = 'AB_{}'.format(a.id)
        order[pk] = 1
        marks = []
        for band in a.bands.all():
            if western_blot.has_whole_cell_lysate:
                marks.append({
                    'weight': band.weight,
                    'intensity': 0
                })
            if western_blot.has_cytoplasmic_fractination:
                marks.append({
                    'weight': band.weight,
                    'intensity': 0
                })
            if western_blot.has_nuclear_fractination:
                marks.append({
                    'weight': band.weight,
                    'intensity': 0
                })
        ret[pk] = {
            'name': a.primary,
            'secondary': primary[a.primary],
            'marks': marks,
            'gel_name': a.primary
        }
    ret['order'] = order.keys()
    return ret


def drugs(assignment):
    ret = {}
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        treatment = strain_protocol.treatment
        tr = treatment.drug.name
        ret[str(tr)] = {'name': str(tr)}
    return ret


def concentrations(assignment):
    ret = {}
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        treatment = strain_protocol.treatment
        tr = treatment.drug.concentration
        ret[str(tr)] = {
            'name': str(tr),
            'value': tr
        }
    return ret


def experiment_temperatures(assignment):
    ret = {}
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        treatment = strain_protocol.treatment
        t = treatment.temperature
        tr = t.degrees
        ret[str(t.id)] = {
            'name': str(tr)
        }
    return ret


def add_multiple_dialog(assignment):
    ret = []
    for strain_protocol in assignment.strain_treatment.filter(enabled=True):
        strain = strain_protocol.strain
        treatment = strain_protocol.treatment
        row = {
            'id': "SP_ID_{}".format(str(strain_protocol.id)),
            'identifier': "SP_ID_{}".format(str(strain_protocol.id)),
            'protocol': treatment.drug.name,
            'strain': strain.name,
            'cell_line': str(strain.id),
            'treatment_list': {
                'list': compile_treatments([treatment])
            }
        }
        ret.append(row)
    return ret


def compile_treatments(treatments):
    ret = []
    for treatment in treatments:
        row = {
            'id': 'treatment_{}'.format(treatment.id),
            'drug_list': {'list': [{
                                       'drug_id': treatment.drug.id,
                                       'drug_name': treatment.drug.name,
                                       'concentration_id': treatment.drug.concentration
                                   }]},
            'start_time': treatment.drug.start_time,
            'duration': treatment.drug.duration,
            'temperature': treatment.temperature.id,
            'collection_time': treatment.collection_time,
            'microscope': ['rgb', 'g', 'gr', 'rb'],  # # microscope?!
            'collection_id': 'collection_ab'
        }
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
