from urlparse import urlparse, urlunparse
from django.db.models import Q
from django.utils.html import format_html, format_html_join
from instructor.models import (
    Assignment, WesternBlotBands, FlowCytometryHistogramMapping,
    MicroscopyImageMapping
)
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
    techniques = compile_techniques(a)
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
                    'techniques': techniques,
                    'gel_types': []
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
            a.name,
            a.text if a.text else ''
        ]
    ]
    ret['template']['files'] = json.loads(a.files) if a.files else []
    ret['template']['model'] = {}

    ret['template']['ui']['add_multiple_dialog'] = add_multiple_dialog(a)
    ret['template']['drugs'] = drugs(a)
    ret['template']['concentrations'] = concentrations(a)
    ret['template']['experiment_temperatures'] = experiment_temperatures(a)

    ret['template']['ui']['western_blot'] = format_table(a)
    ret['template']['micro_kinds'] = micro_kinds(a)

    if 'wb' in techniques:
        ret['template']['ui']['experimental_design']['gel_types'] = gel_types(
            a
        )
        ret['template']['primary_anti_body'] = primary_anti_body(a)
        ret['template']['secondary_anti_body'] = secondary_anti_body(a)
        ret['template']['lysate_kinds'] = lysate_kinds(a)
        ret['template']['model']['western_blot'] = generate_western_blot_model(
            a
        )
    if 'micro' in techniques:
        ret['template']['ui']['microscopy'] = {}
        ret['template']['ui']['microscopy'][
            'disable_blur'
        ] = True  # # is this right?
        ret['template']['ui']['microscopy'][
            'disable_brightness'
        ] = True  # # is this right?
        ret['template']['model']['microscopy'] = micro_model(a)
        ret['template']['slides'] = generate_slides(a)
    if 'facs' in techniques:
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
    ab_parser = {
        'xmax': facs.xrange,
        'ymax': facs.yrange,
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
    filters = ['red', 'blue', 'green', 'merge']
    for sample_prep in a.microscopy_sample_prep.all():
        for mapping in sample_prep.image_mapping.all():
            key = "{sp.micro_analysis}%%{sp.condition}%%SP_ID_{protocol}".format(
                sp=sample_prep,
                protocol=mapping.strain_protocol.id
            )
            if has_images(mapping, sample_prep):
                if key not in ret:
                    ret[key] = {
                        'slides': [],
                        'slide_type': sample_prep.micro_analysis
                    }

                if sample_prep.has_filters:
                    for image_group in mapping.grouped_images.all():
                        image_list = []
                        for filter_name in filters:
                            image = getattr(
                                image_group, filter_name + '_filter_image'
                            )
                            if image:
                                image_list.append(
                                    {
                                        'hash': image.pk,
                                        'if_type': filter_name,
                                        'mag': image.objective
                                        if image.objective else 'N/A'
                                    }
                                )
                        if image_list:
                            ret[key]['slides'].append(image_list)
                else:
                    for image in mapping.images.all():
                        ret[key]['slides'].append(
                            [
                                {
                                    'hash': image.pk,
                                    'if_type': 'green',
                                    'mag': image.objective
                                    if image.objective else 'N/A'
                                }
                            ]
                        )
    return ret


def generate_slides(assignment):
    ret = {}
    for image in assignment.image.all():
        image_url = urlparse(image.file.url)._replace(query=None)
        ret[image.id] = urlunparse(image_url)
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
    ret = {'na': {'name': 'None'}}
    for sample_prep in a.microscopy_sample_prep.all():
        analysis = sample_prep.micro_analysis
        condition = sample_prep.condition
        if analysis not in ret:
            ret[analysis] = {
                'name': sample_prep.get_micro_analysis_display(),
                'conditions': {
                },
                'identifiers': {}
            }
        ret[analysis]['conditions'][condition] = {
            'name': condition if analysis != 'BF' else "",
            'short_name': condition if analysis != 'BF' else ""
        }
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
                    [treatment], strain_treatment, assignment
                )
            }
        }
        ret['rows'].append(row)
    return ret


def compile_treatments(treatments, strain_treatment, assignment):
    ret = []
    for treatment in treatments:
        row = {
            'id': 'treatment_{}'.format(treatment.id),
            'drug_list': {
                'list': [
                    {
                        'drug_id': int(treatment.drug.id),
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
            'conditions': get_avail_conditions(strain_treatment),
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


def get_avail_conditions(strain_treatment):
    conditions = {}
    mappings = strain_treatment.image_mapping.all()
    for mapping in mappings:
        sample_prep = mapping.sample_prep
        analysis = mapping.sample_prep.micro_analysis

        if has_images(mapping, sample_prep):
            if analysis not in conditions:
                conditions[analysis] = []
            conditions[analysis].append(mapping.sample_prep.condition)

    # if there are no images for this strain_treatment
    if not conditions:
        conditions['na'] = ['None']

    return conditions


def has_images(mapping, sample_prep):
    """
    Check if there are any images for the sample
    depending on has_filters in sample_prep
    """
    return (
        ((not sample_prep.has_filters) and mapping.images.count() > 0) or
        (sample_prep.has_filters and mapping.grouped_images.count() > 0)
    )


def compile_cell_lines(cell_lines):
    ret = {}
    for cell_line in cell_lines:
        ret[str(cell_line.id)] = {'name': cell_line.name}
    return ret


def compile_techniques(assignment):
    """
    If technique is enabled, it has to be complete.
    When previewing an assignment user can have technique
    enabled, and not finished.
    """
    ret = []
    if assignment.has_fc and is_facs_complete(assignment):
        ret.append('facs')
    if assignment.has_micro and is_micro_complete(assignment):
        ret.append('micro')
    if assignment.has_wb and is_wb_complete(assignment):
        ret.append('wb')
    return ret


def is_micro_complete(assignment):
    """
    At least one ImageMapping instance should have at least one image,
    or image group with at least one image.
    """
    if assignment.has_micro:
        return MicroscopyImageMapping.objects.filter(
            sample_prep__assignment=assignment,
            images__isnull=False
        ).exists() or MicroscopyImageMapping.objects.filter(
            Q(grouped_images__blue_filter_image__isnull=False) |
            Q(grouped_images__red_filter_image__isnull=False) |
            Q(grouped_images__green_filter_image__isnull=False) |
            Q(grouped_images__merge_filter_image__isnull=False),
            sample_prep__assignment=assignment,
            grouped_images__isnull=False
        ).exists()
    return True


def is_wb_complete(assignment):
    if assignment.has_wb:
        return WesternBlotBands.objects.filter(
            antibody__western_blot__assignment=assignment
        ).exists()
    return True


def is_facs_complete(assignment):
    if assignment.has_fc:
        mappings = FlowCytometryHistogramMapping.objects.filter(
            sample_prep__assignment=assignment
        )
        if mappings.exists():
            for mapping in mappings:
                if mapping.sample_prep.live and mapping.live_data is None:
                    return False
                if mapping.sample_prep.fixed and mapping.fixed_data is None:
                    return False
            return True  # all mappings have data
        return False
    return True
