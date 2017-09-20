from django import forms
from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django.forms.models import modelformset_factory
from django.forms.models import modelform_factory
from django.views.decorators.http import require_http_methods

from instructor import models
from instructor import compiler
from django.contrib.auth.models import User
import datetime
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied, FieldError
import backend.models
import json
import re
from instructor.compiler import (
    get_protocol_headers, is_wb_complete, is_facs_complete, is_micro_complete
)
from django.http import HttpResponse, HttpResponseBadRequest
from functools import wraps
from django.template.defaulttags import register

page_order = (
    'assignment', 'course', 'strains', 'variables', 'treatments', 'protocols',
    'techniques', 'wb_lysate_type', 'wb_antibody', 'wb_band_size',
    'wb_band_intensity'
)
facs_pages = ('facs_sample_prep', 'facs_setup', 'facs_analyze')
micro_pages = ('micro_sample_prep', 'micro_analyze')
fluorescent_analyses = ('IF', 'DYE-FLU', 'FLUOR')
filters = ('red', 'blue', 'green', 'merge')


@login_required
def assignments(request):
    assignments = models.Assignment.objects.filter(course__owner=request.user)
    return render_to_response(
        'instructor/assignments.html',
        {
            'assignments': assignments
        },
        context_instance=RequestContext(request)
    )


@login_required
def publish_assignment(request):
    assignment_pk = request.POST.get('pk')
    assignment = get_object_or_404(models.Assignment, pk=assignment_pk)
    assignment_ready = is_assignment_complete(assignment)
    if not assignment_ready:
        return HttpResponseBadRequest("Cannot publish unfinished assignment.")

    if (
        request.user == assignment.course.owner and
        assignment.access == 'private'
    ):
        course, created = backend.models.Course.objects.get_or_create(
            code=assignment.course.code
        )
        assignment_json = compiler.compile(assignment.id)
        backend_assignment = backend.models.Assignment(
            courseID=course,
            assignmentID=assignment.id,
            assignmentName=assignment.name,
            data=assignment_json,
            ownerID=assignment.course.owner,
            access=assignment.access
        )
        backend_assignment.save()
        assignment.access = 'published'
        assignment.save()
    return HttpResponse()


@login_required
def assignment_delete(request, assignment_pk):
    assignment = models.Assignment.objects.get(id=assignment_pk)
    if request.user == assignment.course.owner:
        try:
            assignment.delete()
        except models.Assignment.DoesNotExist:
            raise Http404('Object does not exist')

    return redirect('common_assignments')


def create_new_assignment(request):
    request.session['new'] = True
    request.session['assignment_name'] = ''
    request.session['based_on'] = ''
    return redirect('common_assignment_setup')


def get_pages(assignment):
    """
    Return a dictionary of enabled/disabled pages
    """
    pages = {}
    enabled = True
    for page in page_order:
        pages[page] = enabled
        if page == assignment.last_page_name:
            enabled = False

    if not assignment.has_wb:
        wb_pages = page_order[-4:]
        for page in wb_pages:
            pages[page] = False

    if assignment.has_micro:
        enabled = True
        for page in micro_pages:
            pages[page] = enabled
            if page == assignment.micro_last_enabled_page:
                enabled = False

    if assignment.has_fc:
        enabled = True
        for page in facs_pages:
            pages[page] = enabled
            if page == assignment.facs_last_enabled_page:
                enabled = False

    return pages


@login_required
def assignment_setup(request):
    error = ''
    if request.method == "POST":
        assignment_name = request.POST['name']
        if request.POST['based_on']:
            request.session['based_on'] = request.POST['based_on']
        if assignment_name:
            request.session['assignment_name'] = assignment_name
            if 'continue' in request.POST:
                return redirect('common_course_setup')
        else:  # Have to give error for empty name
            error = "*Empty assignment name"
    else:
        # giving a default name to the assignment
        assignment_name = "Assignment"
        filtered_asgmts = models.Assignment.objects.filter(
            course__owner=request.user,
            name__regex=r'Assignment.*'
        )
        # want to allow index one larger then there are currently assignments
        for index in xrange(1, len(filtered_asgmts) + 2):
            if not filtered_asgmts.filter(
                name="Assignment {}".format(index)
            ).count():
                assignment_name = "Assignment {}".format(index)
                break

    all_assignments = models.Assignment.objects.filter(
        course__owner=request.user
    )
    return render_to_response(
        'instructor/assignment_setup.html',
        {
            'assignments': all_assignments,
            'access': json.dumps('private'),
            'error': error,
            'assignment_name': assignment_name,
            'based_on': request.session['based_on'],
            'new': request.session['new'],
            'section_name': 'Assignment',
            'page_name': 'assignment',
            'pages': {}
        },
        context_instance=RequestContext(request)
    )


@login_required
def course_setup(request):
    CourseFormSet = modelformset_factory(
        models.Course,
        extra=1,
        can_delete=True,
        fields=['name', 'code']
    )
    course_selected = None
    if request.method == 'POST':

        # change this course's name or code
        formset = CourseFormSet(request.POST)
        if formset.is_valid():
            courses = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            user = User.objects.get(username=request.user)
            for course in courses:
                # need to set the owner
                course.owner = user
                course.save()
    else:
        formset = CourseFormSet(
            queryset=models.Course.objects.filter(owner=request.user)
        )

    # if there is at least one course
    all_courses = models.Course.objects.filter(owner=request.user)
    if len(all_courses) > 0:
        course_selected = all_courses[0]
        assignment = create_assignment(request, course_selected)
        if 'continue' in request.POST:
            assignment.last_page_name = 'strains'
            assignment.save()

            return redirect("common_assignments_edit_strains")

    if course_selected:
        return redirect("common_course_modify")

    pages = {'assignment': True, 'course': True}
    return render_to_response(
        'instructor/course_modify.html',
        {
            'access': json.dumps('private'),
            'formset': formset,
            'course_selected': course_selected,
            'new': request.session['new'],
            'assignment_name': request.session['assignment_name'],
            'section_name': 'Assignment',
            'page_name': 'course',
            'pages': pages
        },
        context_instance=RequestContext(request)
    )


def create_assignment(request, course_selected):
    # Create a new assignment
    assignment_name = request.session['assignment_name']
    assignment_id = assignment_name + datetime.datetime.now().strftime(
        "%I:%M%p on %B %d, %Y"
    )

    if request.session['based_on']:
        based_on = models.Assignment.objects.get(
            pk=request.session['based_on']
        )
        a = models.Assignment(
            course=course_selected,
            name=assignment_name,
            assignment_id=assignment_id,
            basedOn=based_on
        )
    else:
        a = models.Assignment(
            course=course_selected,
            name=assignment_name,
            assignment_id=assignment_id
        )
    a.save()
    request.session['assignment_id'] = a.id
    request.session['new'] = False
    return a


@login_required
def assignments_edit(request, assignment_pk):
    assignment = get_object_or_404(models.Assignment, pk=assignment_pk)
    if assignment.basedOn is not None:
        request.session['based_on'] = assignment.basedOn.id
    else:
        request.session['based_on'] = ''
    request.session['assignment_id'] = assignment_pk

    request.session['new'] = False

    return redirect('common_assignment_modify')


def check_assignment_owner(func):
    @wraps(func)
    def check_owner(*args, **kwargs):
        request = args[0]
        assignment_id = request.session['assignment_id']
        assignment = models.Assignment.objects.get(id=assignment_id)
        user = get_object_or_404(User, username=request.user)
        if assignment.course.owner != user:
            raise PermissionDenied
        return func(*args, **kwargs)

    return check_owner


def assignment_selected(func):
    @wraps(func)
    def check_assignment_id(request, *args, **kwargs):
        try:
            request.session['assignment_id']
        except KeyError:
            return redirect('common_assignments')
        else:
            return func(request, *args, **kwargs)

    return check_assignment_id


@assignment_selected
@check_assignment_owner
@login_required
def assignment_modify(request):
    assignment_id = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, pk=assignment_id)
    AssignmentForm = modelform_factory(models.Assignment, fields=['name'])

    if request.method == "POST" and assignment.access == 'private':
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            form.save()
            if 'continue' in request.POST:
                return redirect("common_course_modify")
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_course_modify")
    else:
        form = AssignmentForm(instance=assignment)

    all_assignments = models.Assignment.objects.filter(
        course__owner=request.user
    )

    return render_to_response(
        'instructor/assignment_modify.html',
        {
            'assignments': all_assignments,
            'form': form,
            'access': json.dumps(assignment.access),
            'based_on': request.session['based_on'],
            'new': request.session['new'],
            'assignment_name': assignment.name,
            'section_name': 'Assignment',
            'page_name': 'assignment',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def course_modify(request):
    errors = []
    page_number = page_order.index('course')
    assignment_id = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, pk=assignment_id)
    CourseFormSet = modelformset_factory(
        models.Course,
        extra=1,
        can_delete=True,
        fields=['name', 'code']
    )
    if request.method == 'POST' and assignment.access == 'private':
        # change this course's name or code
        formset = CourseFormSet(request.POST)
        if formset.is_valid():
            new_course_pk = assignment.course.id
            course_instances = formset.save(commit=False)
            user = User.objects.get(username=request.user)
            for obj in formset.deleted_objects:
                if obj.owner == user:
                    if obj == assignment.course:
                        errors.append(
                            'Cannot delete selected '
                            'course for this assignment.'
                        )
                    elif not models.Assignment.objects.filter(
                        course=obj
                    ).exists():
                        obj.delete()
                    else:
                        errors.append(
                            'This course cannot be deleted as there are '
                            'other assignments within this course. If you '
                            'would like to delete all of the assignments '
                            'within the course, please delete the assignments '
                            'individually using the trash can icon on the '
                            'dashboard.'
                        )
            for course in course_instances:
                if hasattr(course, 'owner') and course.owner != user:
                    raise PermissionDenied
                if not course.id:
                    # need to set the owner
                    course.owner = user
                    course.save()
                    new_course_pk = course.id
                else:
                    course.save()
            # Select course
            pk = request.POST['course_pk']
            # if selected the new course
            if not is_long(pk):
                pk = new_course_pk
            if not long(pk) == assignment.course.id:
                # change the course for this assignment
                new_course = get_object_or_404(models.Course, pk=long(pk))
                assignment.course = new_course
                assignment.save()
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'strains'
                assignment.save()
                return redirect("common_assignments_edit_strains")
            if errors:
                # want to avoid form errors when have other errors
                formset = CourseFormSet(
                    queryset=models.Course.objects.filter(owner=request.user)
                )
    # for view mode
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_assignments_edit_strains")
    else:
        formset = CourseFormSet(
            queryset=models.Course.objects.filter(owner=request.user)
        )

    course_selected = assignment.course.code

    return render_to_response(
        'instructor/course_modify.html',
        {
            'errors': errors,
            'formset': formset,
            'access': json.dumps(assignment.access),
            'course_selected': course_selected,
            'new': request.session['new'],
            'assignment_name': assignment.name,
            'section_name': 'Assignment',
            'page_name': 'course',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def assignments_variables(request):
    page_number = page_order.index('variables')
    max_num_of_vars = 3
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)
    var_fields = [
        'has_concentration', 'has_temperature', 'has_start_time',
        'has_duration', 'has_collection_time'
    ]
    AssignmentForm = modelform_factory(models.Assignment, fields=var_fields)

    # Want to know if Treatments were already created
    treatments_created = False
    if models.Treatment.objects.filter(assignment=assignment).exists():
        treatments_created = True
    if request.method == "POST" and assignment.access == 'private':
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            if form.has_changed():
                recreate_experimental_setup(assignment)
                # Want to save the form only if at most 3 vars are selected
                form.save(commit=False)
                num_variables = 0
                for field in var_fields:
                    if getattr(assignment, field):
                        num_variables += 1
                if num_variables <= max_num_of_vars:
                    form.save()
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'treatments'
                assignment.save()
                return redirect("common_assignments_edit_treatments")
    # For published assignment
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_assignments_edit_treatments")

    # Refresh the assignment from the database
    assignment = models.Assignment.objects.get(id=assignment_id)
    form = AssignmentForm(instance=assignment)

    return render_to_response(
        'instructor/assignment_select_variables.html',
        {
            'form': form,
            'access': json.dumps(assignment.access),
            'treatments_created': json.dumps(treatments_created),
            'assignment_name': assignment.name,
            'section_name': 'Experiment Setup',
            'page_name': 'variables',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


def recreate_experimental_setup(assignment):
    models.Treatment.objects.filter(assignment=assignment).delete()
    models.StrainTreatment.objects.filter(assignment=assignment).delete()
    models.WesternBlotBands.objects.filter(
        antibody__western_blot__assignment=assignment
    ).delete()
    create_treatments(assignment)


def find_next_view(assignment, technique):
    """ Page to go to on 'continue' """
    next_view = 'common_select_technique'
    if assignment.has_wb:
        next_view = 'western_blot_lysate_type'
    elif assignment.has_micro and technique == 'has_micro':
        next_view = 'microscopy_sample_prep'
    elif assignment.has_fc and technique == 'has_fc':
        next_view = 'facs_sample_prep'
    return next_view


@assignment_selected
@check_assignment_owner
@login_required
def select_technique(request):
    page_number = page_order.index('techniques')
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)

    if request.method == "POST":
        technique = json.loads(request.body).get('technique')
        setattr(assignment, technique, not getattr(assignment, technique))
        if assignment.has_wb:
            if (
                        page_order.index(assignment.last_page_name) <=
                        page_number
            ):
                assignment.last_page_name = 'wb_lysate_type'
        assignment.save()
        return HttpResponse(reverse(find_next_view(assignment, technique)), content_type='text')

    allow_finish = assignment.has_wb or assignment.has_micro or assignment.has_fc

    return render_to_response(
        'instructor/select_technique.html', {
            'access': json.dumps(assignment.access),
            'assignment_name': assignment.name,
            'section_name': 'Select Technique',
            'page_name': 'techniques',
            'pages': get_pages(assignment),
            'allow_finish': allow_finish,
        }
    )


@assignment_selected
@check_assignment_owner
@login_required
def assignments_edit_strains(request):
    page_number = page_order.index('strains')
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    extra_fields = 0

    StrainsFormSet = modelformset_factory(
        models.Strains,
        fields=['name'],
        can_delete=True
    )

    if request.method == "POST" and assignment.access == 'private':
        formset = StrainsFormSet(request.POST)

        if formset.is_valid():
            entries = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            for strain in entries:
                if strain.id is None:
                    strain.assignment = assignment
                    strain.save()
                    create_strain_treatments(assignment, strains=[strain])
                else:
                    strain.save()
        if 'continue' in request.POST:
            if page_order.index(assignment.last_page_name) <= page_number:
                assignment.last_page_name = 'variables'
            assignment.save()
            return redirect('common_assignments_variables')

    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_assignments_variables")
    # Add extra form if clicked ADD or none exist
    if 'add' in request.POST or not models.Strains.objects.filter(
        assignment=assignment
    ).exists():
        extra_fields = 1

    StrainsFormSet = modelformset_factory(
        models.Strains,
        extra=extra_fields,
        fields=['name'],
        can_delete=True
    )
    formset = StrainsFormSet(
        queryset=models.Strains.objects.filter(assignment=assignment)
    )

    return render_to_response(
        'instructor/strains.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'new': request.session['new'],
            'assignment_name': assignment.name,
            'section_name': 'Experiment Setup',
            'page_name': 'strains',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def assignments_edit_treatments(request):
    page_number = page_order.index('treatments')
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)

    has_start_time = assignment.has_start_time
    has_duration = assignment.has_duration
    drug_formset_exclude = ['assignment']
    # For Drug form
    input_headers = []

    if not assignment.has_concentration:
        drug_formset_exclude.extend(['concentration', 'concentration_unit'])
    else:
        input_headers.extend(['Concen.', 'Concen. Units'])

    if has_duration and has_start_time:
        input_headers.extend(
            [
                'Start Time', 'Time Units', 'Duration', 'Time Units'
            ]
        )
    elif has_start_time:
        drug_formset_exclude.append('duration')
        input_headers.extend(['Start Time', 'Time Units'])
    elif has_duration:
        drug_formset_exclude.append('start_time')
        input_headers.extend(['Duration', 'Duration Units'])
    else:
        drug_formset_exclude.extend(
            [
                'duration', 'duration_unit', 'start_time', 'time_unit'
            ]
        )

    DrugFormSet = modelformset_factory(
        models.Drug,
        can_delete=True,
        exclude=drug_formset_exclude
    )
    TemperatureFormSet = modelformset_factory(
        models.Temperature,
        can_delete=True,
        exclude=['assignment']
    )
    CollectionTimeFormSet = modelformset_factory(
        models.CollectionTime,
        can_delete=True,
        exclude=['assignment']
    )

    if request.method == "POST" and assignment.access == 'private':
        mapping = {
            'drug': (DrugFormSet, 'drugs'),
            'temperature': (TemperatureFormSet, 'temperatures'),
            'collection_time': (CollectionTimeFormSet, 'collection_times')
        }
        for prefix, (ModelFormSet, treatment_kw) in mapping.items():
            formset = ModelFormSet(request.POST, prefix=prefix)
            if formset.is_valid():
                entries = formset.save(commit=False)
                for obj in formset.deleted_objects:
                    obj.delete()
                for instance in entries:
                    if instance.id is None:
                        instance.assignment = assignment
                        instance.save()
                        create_treatments(
                            assignment, **{
                                treatment_kw: [instance]
                            }
                        )
                    else:
                        instance.save()
        if 'continue' in request.POST:
            if page_order.index(assignment.last_page_name) <= page_number:
                assignment.last_page_name = 'protocols'
            assignment.save()
            return redirect('common_strain_treatments')

    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_strain_treatments")

    # If instructor clicked ADD, add extra form
    drug_extra_form = 0
    temperature_extra_form = 0
    collection_extra_form = 0
    if 'add_drug' in request.POST or not models.Drug.objects.filter(
        assignment=assignment
    ).exists():
        drug_extra_form = 1
    if (
        'add_temperature' in request.POST or
        not models.Temperature.objects.filter(
            assignment=assignment
        ).exists()
    ):
        temperature_extra_form = 1
    if (
        'add_collection' in request.POST or
        not models.CollectionTime.objects.filter(
            assignment=assignment
        ).exists()
    ):
        collection_extra_form = 1

    DrugFormSet = modelformset_factory(
        models.Drug,
        extra=drug_extra_form,
        can_delete=True,
        exclude=drug_formset_exclude
    )
    TemperatureFormSet = modelformset_factory(
        models.Temperature,
        extra=temperature_extra_form,
        can_delete=True,
        exclude=['assignment']
    )
    CollectionTimeFormSet = modelformset_factory(
        models.CollectionTime,
        extra=collection_extra_form,
        can_delete=True,
        exclude=['assignment']
    )

    drug_formset = DrugFormSet(
        queryset=models.Drug.objects.filter(assignment=assignment),
        prefix='drug'
    )
    temperature_formset = TemperatureFormSet(
        queryset=models.Temperature.objects.filter(assignment=assignment),
        prefix='temperature'
    )
    collection_time_formset = CollectionTimeFormSet(
        queryset=models.CollectionTime.objects.filter(assignment=assignment),
        prefix='collection_time'
    )

    time_unit_list = ['sec', 'min', 'hour', 'day']
    concentration_unit_list = [
        # ng/uL
        u'ng/\u03BCL',
        # ug/uL
        u'\u03BCg/\u03BCL',
        # ug/mL
        u'\u03BCg/mL',
        'mg/mL',
        'g/L',
        'nM',
        # uM
        u'\u03BCM',
        'mM',
        'M'
    ]
    return render_to_response(
        'instructor/protocols.html',
        {
            'access': json.dumps(assignment.access),
            'drug_formset': drug_formset,
            'temperature_formset': temperature_formset,
            'collection_time_formset': collection_time_formset,
            'time_unit_list': time_unit_list,
            'concentration_unit_list': concentration_unit_list,
            'input_headers': input_headers,
            'has_temperature': assignment.has_temperature,
            'has_collection': assignment.has_collection_time,
            'assignment_name': assignment.name,
            'section_name': 'Experiment Setup',
            'page_name': 'treatments',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def strain_treatments_edit(request):
    page_number = page_order.index('protocols')
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)

    headers = get_protocol_headers(assignment)

    STFormSet = modelformset_factory(
        models.StrainTreatment,
        extra=0,
        exclude=['assignment', 'strain', 'treatment']
    )
    if request.method == "POST" and assignment.access == 'private':
        formset = STFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            entries = formset.save(commit=False)
            for strain_treatment in entries:
                strain_treatment.save()
                if not strain_treatment.enabled:
                    models.WesternBlotBands.objects.filter(
                        strain_protocol=strain_treatment
                    ).delete()
                    models.MicroscopyImageMapping.objects.filter(
                        strain_protocol=strain_treatment
                    ).delete()
            update_wb_bands(assignment)
            update_micro_image_mappings(assignment)
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'techniques'
                assignment.save()
                return redirect("common_select_technique")
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("common_select_technique")

    formset = STFormSet(
        queryset=models.StrainTreatment.objects.filter(
            assignment=assignment
        ).order_by(
            'strain', 'treatment__drug__name',
            'treatment__drug__concentration', 'treatment__drug__start_time',
            'treatment__drug__duration', 'treatment__temperature__degrees',
            'treatment__collection_time__time'
        )
    )
    return render_to_response(
        'instructor/strain_protocols.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'assignment_name': assignment.name,
            'headers': headers,
            'has_concentration': assignment.has_concentration,
            'has_temperature': assignment.has_temperature,
            'has_start_time': assignment.has_start_time,
            'has_duration': assignment.has_duration,
            'has_collection_time': assignment.has_collection_time,
            'section_name': 'Experiment Setup',
            'page_name': 'protocols',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


def create_treatments(
    assignment,
    drugs=None,
    temperatures=None,
    collection_times=None
):
    if drugs is None:
        drugs = models.Drug.objects.filter(assignment=assignment)
    if assignment.has_temperature and temperatures is None:
        temperatures = models.Temperature.objects.filter(assignment=assignment)
    if assignment.has_collection_time and collection_times is None:
        collection_times = models.CollectionTime.objects.filter(
            assignment=assignment
        )
    # Creating treatments
    if assignment.has_temperature and assignment.has_collection_time:
        for d in drugs:
            for t in temperatures:
                for c in collection_times:
                    treatment, created = (
                        models.Treatment.objects.get_or_create(
                            drug=d,
                            temperature=t,
                            collection_time=c,
                            assignment=assignment
                        )
                    )
                    create_strain_treatments(
                        assignment,
                        treatments=[treatment]
                    )
    elif assignment.has_collection_time:
        for drug in drugs:
            for c in collection_times:
                treatment, created = models.Treatment.objects.get_or_create(
                    drug=drug,
                    collection_time=c,
                    assignment=assignment
                )
                create_strain_treatments(assignment, treatments=[treatment])
    elif assignment.has_temperature:
        for drug in drugs:
            for temp in temperatures:
                treatment, created = models.Treatment.objects.get_or_create(
                    drug=drug,
                    temperature=temp,
                    assignment=assignment
                )
                create_strain_treatments(assignment, treatments=[treatment])
    else:
        for drug in drugs:
            treatment, created = models.Treatment.objects.get_or_create(
                drug=drug,
                assignment=assignment
            )
            create_strain_treatments(assignment, treatments=[treatment])


def create_strain_treatments(assignment, strains=None, treatments=None):
    # Creating StrainTreatments
    if strains is None:
        strains = models.Strains.objects.filter(assignment=assignment)
    if treatments is None:
        treatments = models.Treatment.objects.filter(assignment=assignment)

    for s in strains:
        for t in treatments:
            strain_treatment, created = (
                models.StrainTreatment.objects.get_or_create(
                    strain=s,
                    treatment=t,
                    assignment=assignment
                )
            )
            update_wb_bands(assignment, strain_treatments=[strain_treatment])
            update_micro_image_mappings(
                assignment,
                strain_treatments=[strain_treatment]
            )


@assignment_selected
@check_assignment_owner
@login_required
def western_blot_lysate_type(request):
    page_number = page_order.index('wb_lysate_type')
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(
        assignment=assignment
    )
    WesternBlotForm = modelform_factory(
        models.WesternBlot,
        exclude=['assignment']
    )

    if request.method == "POST" and assignment.access == 'private':
        form = WesternBlotForm(request.POST, instance=wb)
        field_names = ['has_gel_10', 'has_gel_12', 'has_gel_15']
        if form.is_valid():
            form.save(commit=False)
            # make sure at least one percentage is selected
            if any(getattr(wb, field) for field in field_names):
                form.save()
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'wb_antibody'
                assignment.save()
                return redirect('western_blot_antibody')

    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("western_blot_antibody")

    wb, created = models.WesternBlot.objects.get_or_create(
        assignment=assignment
    )
    form = WesternBlotForm(instance=wb)
    return render_to_response(
        'instructor/wb_lysate_type.html',
        {
            'form': form,
            'access': json.dumps(assignment.access),
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_lysate_type',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def western_blot_antibody(request):
    page_number = page_order.index('wb_antibody')
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(
        assignment=assignment
    )
    exclude_fields = ['western_blot', 'wc_weight', 'nuc_weight', 'cyto_weight']
    WesternBlotAntibodyFormset = modelformset_factory(
        models.WesternBlotAntibody,
        can_delete=True,
        exclude=exclude_fields
    )
    if request.method == "POST" and assignment.access == 'private':
        formset = WesternBlotAntibodyFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            for form in entries:
                form.western_blot = wb
                form.save()
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'wb_band_size'
                assignment.save()
                return redirect('western_blot_band_size')
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("western_blot_band_size")

    extra_fields = 0
    if 'add' in request.POST or not models.WesternBlotAntibody.objects.filter(
        western_blot=wb
    ).exists():
        extra_fields = 1
    WesternBlotAntibodyFormset = modelformset_factory(
        models.WesternBlotAntibody,
        extra=extra_fields,
        can_delete=True,
        exclude=exclude_fields
    )
    formset = WesternBlotAntibodyFormset(
        queryset=models.WesternBlotAntibody.objects.filter(western_blot=wb)
    )
    return render_to_response(
        'instructor/wb_antibody.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_antibody',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def western_blot_band_size(request):
    page_number = page_order.index('wb_band_size')
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(
        assignment=assignment
    )
    error = ''
    exclude_fields = ['primary', 'secondary', 'western_blot']
    lysate_types = {
        'has_whole_cell_lysate': 'wc_weight',
        'has_nuclear_fractination': 'nuc_weight',
        'has_cytoplasmic_fractination': 'cyto_weight'
    }
    types_selected = {}
    for wb_field, antibody_field in lysate_types.items():
        types_selected[wb_field] = getattr(wb, wb_field)
        if not getattr(wb, wb_field):
            exclude_fields.append(antibody_field)

    AntibodiesFormset = modelformset_factory(
        models.WesternBlotAntibody,
        extra=0,
        exclude=exclude_fields
    )
    if request.method == "POST" and assignment.access == 'private':
        formset = AntibodiesFormset(request.POST)
        if formset.is_valid():
            antibodies = formset.save()
            update_wb_bands(assignment, antibodies=antibodies)
            if 'continue' in request.POST:
                if page_order.index(assignment.last_page_name) <= page_number:
                    assignment.last_page_name = 'wb_band_intensity'
                assignment.save()
                return redirect('western_blot_band_intensity')
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("western_blot_band_intensity")

    formset = AntibodiesFormset(
        queryset=models.WesternBlotAntibody.objects.filter(western_blot=wb)
    )
    return render_to_response(
        'instructor/wb_band_size.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'types_selected': types_selected,
            'assignment_name': assignment.name,
            'error': json.dumps(error),
            'section_name': 'Western Blotting',
            'page_name': 'wb_band_size',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


def update_micro_image_mappings(
    assignment,
    strain_treatments=None,
    sample_prep_list=None
):
    if strain_treatments is None:
        strain_treatments = models.StrainTreatment.objects.filter(
            assignment=assignment,
            enabled=True
        )
    if sample_prep_list is None:
        sample_prep_list = models.MicroscopySamplePrep.objects.filter(
            assignment=assignment
        )
    for strain_treatment in strain_treatments:
        for sample_prep in sample_prep_list:
            models.MicroscopyImageMapping.objects.get_or_create(
                strain_protocol=strain_treatment,
                sample_prep=sample_prep,
            )


def update_wb_bands(assignment, antibodies=None, strain_treatments=None):
    error = ''
    if models.WesternBlot.objects.filter(assignment=assignment).exists():

        message = "You have entered non-numerical values, " \
                  "including negative numbers, text inputs and/or symbols, " \
                  "in the band size input boxes. The band size input " \
                  "boxes must only contain numerical values."

        weights_by_type = ['wc_weight', 'nuc_weight', 'cyto_weight']
        antibodies_updated = True
        if antibodies is None:
            antibodies_updated = False
            antibodies = models.WesternBlotAntibody.objects.filter(
                western_blot=assignment.western_blot
            )
        if strain_treatments is None:
            strain_treatments = models.StrainTreatment.objects.filter(
                assignment=assignment,
                enabled=True
            )

        for antibody in antibodies:
            for index, field in enumerate(weights_by_type):
                weight_str = getattr(antibody, field)
                error = message if re.search(
                    r'[a-zA-Z-]+', weight_str
                ) else error

                weights = [
                    float(s)
                    for s in weight_str.split(',')
                    if is_float(s) and float(s) >= 0
                ]
                if antibodies_updated and antibody.id:
                    bands = models.WesternBlotBands.objects.filter(
                        antibody__id=antibody.id,
                        lysate_type=field.split('_')[0]
                    )
                    for band in bands:
                        # delete bands that are not in the string anymore
                        if band.weight not in weights:
                            models.WesternBlotBands.objects.filter(
                                id=band.id
                            ).delete()
                # create new bands
                for weight in weights:
                    for strain_treatment in strain_treatments:
                        models.WesternBlotBands.objects.get_or_create(
                            strain_protocol=strain_treatment,
                            antibody=antibody,
                            weight=weight,
                            lysate_type=field.split('_')[0]
                        )
    return error


@assignment_selected
@check_assignment_owner
@login_required
def western_blot_band_intensity(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    # Page to go to on 'continue'
    next_view = 'common_select_technique'
    wb, created = models.WesternBlot.objects.get_or_create(
        assignment=assignment
    )
    BandsFormset = modelformset_factory(
        models.WesternBlotBands,
        extra=0,
        exclude=['strain_protocol', 'antibody', 'weight', 'lysate_type']
    )
    if request.method == 'POST' and assignment.access == 'private':
        formset = BandsFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for entry in entries:
                entry.save()
            if 'continue' in request.POST:
                return redirect(next_view)
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect(next_view)
    else:
        formset = BandsFormset(
            queryset=models.WesternBlotBands.objects.filter(
                antibody__western_blot=wb
            ).order_by(
                'strain_protocol__strain',
                'strain_protocol__treatment__drug__name',
                'strain_protocol__treatment__drug__concentration',
                'strain_protocol__treatment__drug__start_time',
                'strain_protocol__treatment__drug__duration',
                'strain_protocol__treatment__temperature__degrees',
                'strain_protocol__treatment__collection_time__time',
                '-lysate_type', 'weight'
            )
        )

    antibodies = models.WesternBlotAntibody.objects.filter(western_blot=wb)
    formset_group = []
    for antibody in antibodies:
        form_list = [
            form
            for form in formset
            if form.instance.antibody.primary == antibody.primary
        ]
        formset_group.append((antibody, form_list))

    variables = {
        'has_concentration': assignment.has_concentration,
        'has_start_time': assignment.has_start_time,
        'has_duration': assignment.has_duration,
        'has_temperature': assignment.has_temperature,
        'has_collection_time': assignment.has_collection_time
    }
    # need to decide to finish the assignment or
    # to move on to next technique
    save_and_continue_button = 'SAVE AND CONTINUE'
    return render_to_response(
        'instructor/wb_band_intensity.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'formset_group': formset_group,
            'variables': variables,
            'save_and_continue': save_and_continue_button,
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_band_intensity',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def microscopy_sample_prep(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)

    MicroSamplePrepFormset = modelformset_factory(
        models.MicroscopySamplePrep,
        extra=1,
        can_delete=True,
        can_order=True,
        exclude=['assignment', 'order']
    )
    if request.method == "POST" and assignment.access == 'private':
        formset = MicroSamplePrepFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            for sample_prep in entries:
                if sample_prep.micro_analysis in fluorescent_analyses:
                    sample_prep.has_filters = True
                else:
                    sample_prep.has_filters = False

                if sample_prep.id is None:
                    sample_prep.assignment = assignment
                    sample_prep.save()
                    update_micro_image_mappings(
                        assignment,
                        sample_prep_list=[sample_prep]
                    )
                else:
                    sample_prep.save()
            if 'continue' in request.POST:
                if (
                    micro_pages.index('micro_sample_prep') <=
                    micro_pages.index(assignment.micro_last_enabled_page)
                ):
                    assignment.micro_last_enabled_page = 'micro_analyze'
                assignment.save()
                return redirect('microscopy_analyze')
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("microscopy_analyze")

    extra_fields = 0
    if (
        'add' in request.POST or
        not models.MicroscopySamplePrep.objects.filter(
            assignment=assignment
        ).exists()
    ):
        extra_fields = 1
    MicroSamplePrepFormset = modelformset_factory(
        models.MicroscopySamplePrep,
        extra=extra_fields,
        can_delete=True,
        can_order=True,
        exclude=['assignment']
    )
    back_url = (
        'western_blot_band_intensity'
        if assignment.has_wb else 'common_select_technique'
    )

    formset = MicroSamplePrepFormset(
        queryset=models.MicroscopySamplePrep.objects.filter(
            assignment=assignment
        )
    )
    return render_to_response(
        'instructor/micro_sample_prep.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'back_url': back_url,
            'assignment_name': assignment.name,
            'section_name': 'Microscopy',
            'page_name': 'micro_sample_prep',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def microscopy_analyze(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    chosen_sampleprep = ""
    chosen_protocol = ""
    mapping_pk = ""
    filter_group_id = ""
    dialog_open = False

    if request.method == "POST" and assignment.access == 'private':
        if 'upload' in request.POST:
            objective = request.POST.get('objective')
            for uploaded_file in request.FILES.getlist('file'):
                new_image, _ = models.MicroscopyImage.objects.get_or_create(
                    file=uploaded_file,
                    assignment=assignment,
                    objective=objective
                )
            # need few variables to keep the dialog open
            dialog_open = True
            if 'mapping_pk' in request.POST:
                chosen_protocol = request.POST.get('protocol')
                chosen_sampleprep = request.POST.get('sample_prep')
                mapping_pk = request.POST.get('mapping_pk')
                filter_group_id = request.POST.get('filter_group_id')

        else:  # then 'save' or 'continue' in request.POST
            if 'continue' in request.POST:
                return redirect('common_select_technique')

    image_mappings = models.MicroscopyImageMapping.objects.filter(
        sample_prep__assignment=assignment
    ).order_by(
        'strain_protocol__strain', 'strain_protocol__treatment__drug__name',
        'strain_protocol__treatment__drug__concentration',
        'strain_protocol__treatment__drug__start_time',
        'strain_protocol__treatment__drug__duration',
        'strain_protocol__treatment__temperature__degrees',
        'strain_protocol__treatment__collection_time__time'
    )

    # Grouping ImageMapping objects by analysis and condition
    grouped_images = []
    sample_preps = models.MicroscopySamplePrep.objects.filter(
        assignment=assignment
    )

    for sample_prep in sample_preps.iterator():
        filtered_list = [
            instance
            for instance in image_mappings
            if instance.sample_prep.micro_analysis ==
            sample_prep.micro_analysis and instance.sample_prep.condition ==
            sample_prep.condition
        ]

        grouped_images.append(
            (
                sample_prep.get_micro_analysis_display, sample_prep.condition,
                filtered_list
            )
        )

    all_images = models.MicroscopyImage.objects.filter(assignment=assignment)
    ImageForm = modelform_factory(
        models.MicroscopyImage,
        fields=['file', 'objective'],
        widgets={'file': forms.ClearableFileInput(attrs={'multiple': True})}
    )
    image_form = ImageForm()
    variables = {
        'has_concentration': assignment.has_concentration,
        'has_start_time': assignment.has_start_time,
        'has_duration': assignment.has_duration,
        'has_temperature': assignment.has_temperature,
        'has_collection_time': assignment.has_collection_time
    }
    # need to decide to finish the assignment or to move on to FACS
    save_and_continue_button = 'SAVE AND CONTINUE'

    return render_to_response(
        'instructor/micro_analyze.html',
        {
            'access': json.dumps(assignment.access),
            'all_images': all_images,
            'image_form': image_form,
            'filters': filters,
            'dialog_open': json.dumps(dialog_open),
            'protocol_name': chosen_protocol,
            'sample_prep_name': chosen_sampleprep,
            'mapping_pk': mapping_pk,
            'filter_group_id': filter_group_id,
            'image_groups': grouped_images,
            'variables': variables,
            'save_and_continue': save_and_continue_button,
            'assignment_name': assignment.name,
            'section_name': 'Microscopy',
            'page_name': 'micro_analyze',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def facs_setup(request):
    """
    User can set scale, range, and tick values
    for x axis, for this assignment
    """
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)

    facs, _ = models.FlowCytometry.objects.get_or_create(assignment=assignment)
    FlowCytometryForm = modelform_factory(
        models.FlowCytometry,
        exclude=['assignment']
    )

    if request.method == "POST" and assignment.access == 'private':
        form = FlowCytometryForm(request.POST, instance=facs)
        if form.is_valid():
            form.save()
        if 'continue' in request.POST:
            if (
                facs_pages.index('facs_setup') <=
                facs_pages.index(assignment.facs_last_enabled_page)
            ):
                assignment.facs_last_enabled_page = 'facs_analyze'
            assignment.save()
            return redirect('facs_analyze')

    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("facs_analyze")

    form = FlowCytometryForm(instance=facs)
    return render_to_response(
        'instructor/facs_setup.html',
        {
            'form': form,
            'access': json.dumps(assignment.access),
            'assignment_name': assignment.name,
            'section_name': 'Flow Cytometry',
            'page_name': 'facs_setup',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def facs_sample_prep(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)

    FACSSamplePrepFormset = modelformset_factory(
        models.FlowCytometrySamplePrep,
        can_delete=True,
        can_order=True,
        exclude=['assignment']
    )
    if request.method == "POST" and assignment.access == 'private':
        formset = FACSSamplePrepFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            for facs_sample in entries:
                if facs_sample.id is None:
                    facs_sample.assignment = assignment
                    facs_sample.save()
                    create_facs_histograms(assignment, facs_sample)
                else:
                    facs_sample.save()
            if 'continue' in request.POST:
                if (
                    facs_pages.index('facs_sample_prep') <=
                    facs_pages.index(assignment.facs_last_enabled_page)
                ):
                    assignment.facs_last_enabled_page = 'facs_setup'
                assignment.save()
                return redirect('facs_setup')
    elif request.method == "POST" and 'continue' in request.POST:
        return redirect("facs_setup")

    extra_fields = 0
    if (
        'add' in request.POST or
        not models.FlowCytometrySamplePrep.objects.filter(
            assignment=assignment
        ).exists()
    ):
        extra_fields = 1
    FACSSamplePrepFormset = modelformset_factory(
        models.FlowCytometrySamplePrep,
        extra=extra_fields,
        can_delete=True,
        can_order=True,
        exclude=['assignment']
    )
    back_url = (
        'western_blot_band_intensity'
        if assignment.has_wb else 'common_select_technique'
    )

    formset = FACSSamplePrepFormset(
        queryset=models.FlowCytometrySamplePrep.objects.filter(
            assignment=assignment
        )
    )
    return render_to_response(
        'instructor/facs_sample_prep.html',
        {
            'formset': formset,
            'access': json.dumps(assignment.access),
            'back_url': back_url,
            'assignment_name': assignment.name,
            'section_name': 'Flow Cytometry',
            'page_name': 'facs_sample_prep',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


def create_facs_histograms(assignment, facs_sample):
    """
    Create FlowCytometryHistogram objects, all combinations of
    this 'facs_sample' (i.e. cell_treatment, analysis, condition)
    and all strain protocols defined for this assignment
    Args:
        assignment: current assignment
        facs_sample: newly created FlowCytometrySamplePrep object

    """
    strain_protocols = models.StrainTreatment.objects.filter(
        assignment=assignment
    )
    for strain_protocol in strain_protocols:
        histogram, created = (
            models.FlowCytometryHistogramMapping.objects.get_or_create(
                sample_prep=facs_sample,
                strain_protocol=strain_protocol,
            )
        )


@assignment_selected
@check_assignment_owner
@login_required
def facs_analyze(request):
    """
    List all combinations of samples, cell treatments,
    analysis types, and conditions. Let the user assign a
    histogram to each combination.
    """
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    facs, _ = models.FlowCytometry.objects.get_or_create(assignment=assignment)

    histogram_mappings = models.FlowCytometryHistogramMapping.objects.filter(
        sample_prep__assignment=assignment,
        strain_protocol__enabled=True
    ).order_by(
        'strain_protocol__strain', 'strain_protocol__treatment__drug__name',
        'strain_protocol__treatment__drug__concentration',
        'strain_protocol__treatment__drug__start_time',
        'strain_protocol__treatment__drug__duration',
        'strain_protocol__treatment__temperature__degrees',
        'strain_protocol__treatment__collection_time__time'
    )

    if request.method == "POST" and 'continue' in request.POST:
        return redirect('common_select_technique')

    # Grouping HistogramMapping objects by cell_treatment,
    # analysis, and condition
    grouped_histograms = []
    samples = models.FlowCytometrySamplePrep.objects.filter(
        assignment=assignment
    )
    for sample in samples.iterator():
        filtered_list = [
            instance
            for instance in histogram_mappings
            if instance.sample_prep.analysis == sample.analysis and
            instance.sample_prep.condition == sample.condition
        ]
        if sample.fixed:
            grouped_histograms.append(
                (
                    'Fixed', sample.get_analysis_display, sample.condition,
                    filtered_list
                )
            )
        if sample.live:
            grouped_histograms.append(
                (
                    'Live', sample.get_analysis_display, sample.condition,
                    filtered_list
                )
            )

    selected_histograms_mapping = {}
    for instance in histogram_mappings:
        selected_histograms_mapping[instance.id] = {
            'fixed': instance.fixed_data.data if instance.fixed_data else None,
            'live': instance.live_data.data if instance.live_data else None
        }
    all_histograms = models.FlowCytometryHistogram.objects.filter(
        facs__assignment__id=pk
    ).exclude(
        data__isnull=True
    )
    all_histogram_data = {
        int(instance.id): instance.data
        for instance in all_histograms
    }

    variables = {
        'has_concentration': assignment.has_concentration,
        'has_start_time': assignment.has_start_time,
        'has_duration': assignment.has_duration,
        'has_temperature': assignment.has_temperature,
        'has_collection_time': assignment.has_collection_time
    }
    return render_to_response(
        'instructor/facs_analyze.html',
        {
            'histograms': json.dumps(selected_histograms_mapping),
            'all_histograms_data': json.dumps(all_histogram_data),
            'all_histograms': all_histograms,
            'access': json.dumps(assignment.access),
            'x_upper_bound': json.dumps(facs.xrange),
            'tick_values': json.dumps(facs.tick_values),
            'histogram_groups': grouped_histograms,
            'variables': variables,
            'assignment_name': assignment.name,
            'section_name': 'Flow Cytometry',
            'page_name': 'facs_analyze',
            'pages': get_pages(assignment)
        },
        context_instance=RequestContext(request)
    )


def facs_histograms_edit(request, assignment, sample_prep, sp):
    a = models.Assignment.objects.get(id=assignment)
    sample = models.FlowCytometrySamplePrep.objects.get(id=sample_prep)
    protocol = models.StrainProtocol.objects.get(id=sp)
    model, created = models.FlowCytometryHistogram.objects.get_or_create(
        sample_prep=sample,
        strain_protocol=protocol
    )
    model.save()

    FlowCytometryHistogramForm = modelform_factory(
        models.FlowCytometryHistogram,
        exclude=['sample_prep', 'strain_protocol']
    )
    message = ''
    if request.method == "POST":
        form = FlowCytometryHistogramForm(request.POST, instance=model)
        if form.is_valid():
            message = "Thank you"
            form.save()
        else:
            message = "Something went wrong"
    else:
        form = FlowCytometryHistogramForm(instance=model)
    return render_to_response(
        'instructor/generic_form.html',
        {
            'form': form,
            'message': message,
            'assignment': a,
            'title': 'Flow Cyto Histogram'
        },
        context_instance=RequestContext(request)
    )


@assignment_selected
@check_assignment_owner
@login_required
def delete_images(request):
    """
    Remove images from library permanently
    """
    pk = request.session['assignment_id']
    image_pk_list = request.POST.getlist('image_pk_list[]')

    for image_pk in image_pk_list:
        selected_image = get_object_or_404(
            models.MicroscopyImage,
            pk=image_pk,
            assignment__pk=pk
        )
        selected_image.delete()
    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def select_images(request):
    pk = request.session['assignment_id']
    mapping_id = request.POST.get('mapping_pk')
    filter_group_id = request.POST.get('filter_group_id')
    image_pk_list = request.POST.getlist('image_pk_list[]')

    if filter_group_id:
        filter_group_id = filter_group_id.split('-')
        filter_name = filter_group_id[0]
        group_id = filter_group_id[1]

        if filter_name not in filters:
            raise FieldError
        image_group = get_object_or_404(
            models.MicroscopyGroupedImages,
            id=group_id,
            image_mapping__sample_prep__assignment__pk=pk
        )
        selected_image = get_object_or_404(
            models.MicroscopyImage,
            pk=image_pk_list[0],
            assignment__pk=pk
        )
        field_name = filter_name + '_filter_image'
        setattr(image_group, field_name, selected_image)
        image_group.save()
    else:
        instance = get_object_or_404(
            models.MicroscopyImageMapping,
            pk=mapping_id,
            sample_prep__assignment__pk=pk
        )
        for image_pk in image_pk_list:
            selected_image = get_object_or_404(
                models.MicroscopyImage,
                pk=image_pk,
                assignment__pk=pk
            )

            instance.images.add(selected_image)
        instance.save()

    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def add_image_group(request):
    pk = request.session['assignment_id']

    mapping_id = request.POST.get('mapping_id')
    instance = get_object_or_404(
        models.MicroscopyImageMapping,
        pk=mapping_id,
        sample_prep__assignment__pk=pk
    )
    image_group = models.MicroscopyGroupedImages.objects.create()
    instance.grouped_images.add(image_group)
    instance.save()

    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def remove_image(request):
    pk = request.session['assignment_id']
    mapping_id = request.POST.get('mapping_id')
    group_id = request.POST.get('group_id')
    filter_name = request.POST.get('filter')
    image_id = request.POST.get('image_id')
    if group_id:
        if filter_name not in filters:
            raise FieldError
        image_group = get_object_or_404(
            models.MicroscopyGroupedImages,
            id=group_id,
            image_mapping__sample_prep__assignment__pk=pk
        )
        setattr(image_group, filter_name + '_filter_image', None)
        image_group.save()
    else:
        mapping = get_object_or_404(
            models.MicroscopyImageMapping,
            pk=mapping_id,
            sample_prep__assignment__pk=pk
        )
        image = get_object_or_404(
            models.MicroscopyImage,
            pk=image_id,
            assignment__pk=pk
        )
        mapping.images.remove(image)
    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def remove_image_group(request):
    pk = request.session['assignment_id']
    group_id = request.POST.get('group_id')

    models.MicroscopyGroupedImages.objects.filter(
        id=group_id,
        image_mapping__sample_prep__assignment__pk=pk
    ).delete()
    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def copy_histogram(request):
    """
    Copy a histogram from one mapping to a given list mappings
    """
    pk = request.session['assignment_id']
    mapping_id = request.POST.get('copy_from_pk')
    cell_treatment = request.POST.get('cell_treatment')
    copy_to_list = json.loads(request.POST.get('copy_to_list'))
    copy_from_mapping = get_object_or_404(
        models.FlowCytometryHistogramMapping,
        id=mapping_id,
        sample_prep__assignment__id=pk
    )
    histogram = None

    if cell_treatment == 'Live':
        histogram = copy_from_mapping.live_data
    elif cell_treatment == 'Fixed':
        histogram = copy_from_mapping.fixed_data

    for sample in copy_to_list:
        mapping = get_object_or_404(
            models.FlowCytometryHistogramMapping,
            id=sample['id'],
            sample_prep__assignment__id=pk
        )
        if sample['cell_treatment'] == 'Live':
            mapping.live_data = histogram
        elif sample['cell_treatment'] == 'Fixed':
            mapping.fixed_data = histogram
        mapping.save()
    return HttpResponse()


@assignment_selected
@check_assignment_owner
@login_required
def submit_histogram(request):
    """
    Save or remove drawn histogram
    """
    pk = request.session['assignment_id']
    facs = get_object_or_404(models.FlowCytometry, assignment__id=pk)
    mapping_id = request.POST.get('mapping_pk')
    cell_treatment = request.POST.get('cell_treatment')
    # if no points data is None
    data = request.POST.get('points', default=None)
    histogram_pk = request.POST.get('histogram_pk', default=None)

    new_histogram = None
    # If existing histogram was selected
    if histogram_pk:
        new_histogram = get_object_or_404(
            models.FlowCytometryHistogram,
            pk=histogram_pk,
            facs=facs
        )
    # Create new histogram
    elif data:
        new_histogram = models.FlowCytometryHistogram.objects.create(
            facs=facs,
            data=data
        )

    # Find HistogramMapping object and update it
    instance = get_object_or_404(
        models.FlowCytometryHistogramMapping,
        pk=mapping_id,
        sample_prep__assignment__id=pk
    )
    if cell_treatment == 'Live':
        instance.live_data = new_histogram
    else:
        instance.fixed_data = new_histogram
    instance.save()

    return HttpResponse()


@login_required
def preview(request, assignment_pk):
    a = models.Assignment.objects.get(id=assignment_pk)
    return render_to_response(
        'instructor/preview.html',
        {
            'assignment': a,
            'assignment_json': compiler.preview_as_json(a.id)
        },
        context_instance=RequestContext(request)
    )


@login_required
def assignment_complete(request):
    assignment_pk = request.POST.get('pk')
    a = models.Assignment.objects.get(id=assignment_pk)
    if is_assignment_complete(a, True):
        return HttpResponse('complete')
    else:
        return HttpResponseBadRequest(
            "Your assignment cannot be previewed. Make sure you have:"
            "<ul><li>defined the experimental setup and variables for "
            "at LEAST ONE experimental technique,</li>"
            "<li>assigned histograms to all samples in flow cytometry "
            "if using this technique</li></ul>"
        )


def is_assignment_complete(assignment, is_preview=False):
    if models.StrainTreatment.objects.filter(
        assignment=assignment,
        enabled=True
    ).exists():
        if assignment.has_fc or assignment.has_wb or assignment.has_micro:
            if is_preview:
                return (
                    is_facs_complete(assignment) or
                    is_wb_complete(assignment) or is_micro_complete(assignment)
                )
            else:
                return (
                    is_facs_complete(assignment) and
                    is_wb_complete(assignment) and
                    is_micro_complete(assignment)
                )
    return False


def is_float(txt):
    try:
        float(txt)
        return True
    except ValueError:
        return False


def is_long(s):
    try:
        long(s)
        return True
    except ValueError:
        return False


@register.filter
def get_item(dictionary, key):
    if type(dictionary) is dict:
        return dictionary.get(key)
    else:
        return getattr(dictionary, key, None)
