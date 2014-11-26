from instructor.models import *
import json


def preview_as_json(assignment_id):
    return json.dumps(preview(assignment_id))


def preview(assignment_id):
    ret = dict()
    ret['app_title'] = 'StarCellBio Preview'
    ret['app_description'] = 'StarCellBio Instructor Preview'
    ret['assignments'] = {'list': [compile(assignment_id)]}
    return ret



def compile(assignment_id):
    a = Assignment.objects.get(id=assignment_id)
    ret = {
        'id': a.id,
        'name': a.name,
        'course': a.course.code,
        'course_name': a.course.name,
        'description': a.name,
        'notebook': {},
        'experiments': {},
        'template': {
            # instructions
            'ui': {
                'techniques': compile_techniques(a)
            },
            'cell_lines': compile_cell_lines(a.strains.all()),
            'time_unit': {
                'kind': 'minutes'
            }
        }
    }
    return ret


def compile_cell_lines(cell_lines):
    ret = {}
    for c in cell_lines:
        ret[str(c.id)] = c.name
    return ret

def compile_techniques(a):
    ret = []
    if a.has_fc:
        ret.append('facs')
    if a.has_micro:
        ret.append('micro')
    if a.has_wb:
        ret.append('wb')
    return ret
