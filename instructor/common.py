from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django import forms
from django.forms.models import modelformset_factory, inlineformset_factory
from django.forms.models import modelform_factory
from instructor import models
from instructor import compiler
from django.contrib.auth.models import User
import datetime
from django.http import Http404
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
import json

@login_required
def courses(request):
    message = ''
    CourseFormSet = modelformset_factory(models.Course, extra=1, fields=['name', 'code'], can_delete=True)
    if request.method == "POST":
        formset = CourseFormSet(request.POST)
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.owner = request.user
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/courses_new.html',
                              {'formset': CourseFormSet(queryset=models.Course.objects.filter(owner=request.user)),
                               'message': message},
                              context_instance=RequestContext(request))

@login_required
def course_delete(request, pk):
    try:
        models.Course.objects.get(id=pk).delete()
    except models.Course.DoesNotExist:
        raise Http404('Course does not exist')

    return redirect('common_course')


def assignments(request):
    public_list = models.Assignment.objects.filter(access='Public')

    return render_to_response('instructor/assignments.html',
                              {'assignments': public_list},
                              context_instance=RequestContext(request))

@login_required
def assignment_delete(request, pk):
    try:
        models.Assignment.objects.get(id=pk).delete()
    except models.Assignment.DoesNotExist:
        raise Http404('Object does not exist')

    return redirect('common_assignments')

def create_new_assignment(request):
    request.session['new'] = True
    request.session['assignment_name'] = ''
    request.session['based_on'] = ''
    return redirect('common_assignment_setup')


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
        filtered_asgmts = models.Assignment.objects.filter(name__regex=r'Assignment.*')
        # want to allow index one larger then there are currently assignments
        for index in xrange(1, len(filtered_asgmts)+2):
            if not filtered_asgmts.filter(name="Assignment {}".format(index)).count():
                assignment_name = "Assignment {}".format(index)
                break

    all_assignments = models.Assignment.objects.all()

    return render_to_response('instructor/assignment_setup.html',
                              {
                                  'assignments': all_assignments,
                                  'error': error,
                                  'assignment_name': assignment_name,
                                  'based_on': request.session['based_on'],
                                  'new': request.session['new'],
                                  'section_name': 'Assignment',
                                  'page_name': 'assignment'
                              },
                              context_instance=RequestContext(request))

@login_required
def course_setup(request):

    CourseFormSet = modelformset_factory(models.Course, extra=1, can_delete=True, fields=['name', 'code'])
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

    # if there is at least one course
    all_courses = models.Course.objects.all()
    if len(all_courses) > 0:
        course_selected = all_courses[0]
        create_assignment(request, course_selected)
        if 'continue' in request.POST:
            return redirect("common_assignments_edit_strains")

    if course_selected:
        return redirect("common_course_modify")

    formset = CourseFormSet(queryset=models.Course.objects.all())
    return render_to_response('instructor/course_modify.html',
                              {
                                  'courses': all_courses,
                                  'formset': formset,
                                  'course_selected': course_selected,
                                  'new': request.session['new'],
                                  'assignment_name': request.session['assignment_name'],
                                  'section_name': 'Assignment',
                                  'page_name': 'course'
                              },
                              context_instance=RequestContext(request))


def create_assignment(request, course_selected):
    # Create a new assignment
    assignment_name = request.session['assignment_name']
    assignment_id = assignment_name + datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")

    if request.session['based_on']:
        based_on = models.Assignment.objects.get(pk=request.session['based_on'])
        a = models.Assignment(course=course_selected,
                              name=assignment_name,
                              assignment_id=assignment_id,
                              basedOn=based_on)
    else:
        a = models.Assignment(course=course_selected,
                              name=assignment_name,
                              assignment_id=assignment_id)
    a.save()
    request.session['assignment_id'] = a.id
    request.session['new'] = False


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

@login_required
def assignment_modify(request):
    assignment_id = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, pk=assignment_id)
    AssignmentForm = modelform_factory(models.Assignment, fields=['name'])

    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            form.save()
            if 'continue' in request.POST:
                return redirect("common_course_modify")
    else:
        form = AssignmentForm(instance=assignment)

    all_assignments = models.Assignment.objects.all()

    return render_to_response('instructor/assignment_modify.html',
                              {'assignments': all_assignments,
                               'form': form,
                               'based_on': request.session['based_on'],
                               'new': request.session['new'],
                               'assignment_name': assignment.name,
                               'section_name': 'Assignment',
                               'page_name': 'assignment'
                              },
                              context_instance=RequestContext(request))


@login_required
def course_modify(request):
    assignment_id = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, pk=assignment_id)
    CourseFormSet = modelformset_factory(models.Course, extra=1, can_delete=True, fields=['name', 'code'])
    if request.method == 'POST':
        pk = request.POST['course_pk']
        if not long(pk) == assignment.course.id:
            # change the course for this assignment
            new_course = get_object_or_404(models.Course, pk=long(pk))
            assignment.course = new_course
            assignment.save()

        # change this course's name or code
        formset = CourseFormSet(request.POST)
        if formset.is_valid():

            instances = formset.save(commit=False)
            user = User.objects.get(username=request.user)
            for obj in formset.deleted_objects:
                if obj.owner == user and obj != assignment.course:
                    obj.delete()
            for instance in instances:
                if hasattr(instance, 'owner') and instance.owner != user:
                    raise PermissionDenied
                # need to set the owner
                instance.owner = user
                instance.save()
            if 'continue' in request.POST:
                return redirect("common_assignments_edit_strains")
    formset = CourseFormSet(queryset=models.Course.objects.all())
    all_courses = models.Course.objects.all()
    course_selected = assignment.course.code
    return render_to_response('instructor/course_modify.html',
                              {
                                  'courses': all_courses,
                                  'formset': formset,
                                  'course_selected': course_selected,
                                  'new': request.session['new'],
                                  'assignment_name': assignment.name,
                                  'section_name': 'Assignment',
                                  'page_name': 'course'
                              },
                              context_instance=RequestContext(request))

@login_required
def assignments_variables(request):
    max_num_of_vars = 3
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)
    var_fields = ['has_concentration', 'has_temperature', 'has_start_time',
                  'has_duration', 'has_collection_time']
    AssignmentForm = modelform_factory(models.Assignment, fields=var_fields)

    # Want to know if Treatments were already created
    treatments_created = False
    if models.Treatment.objects.filter(assignment=assignment).exists():
        treatments_created = True
    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            if form.has_changed():
                models.Treatment.objects.filter(assignment=assignment).delete()
                models.StrainTreatment.objects.filter(assignment=assignment).delete()
                create_treatments(assignment)
                # Want to save the form only if at most 3 vars are selected
                form.save(commit=False)
                num_variables = 0
                for field in var_fields:
                    if getattr(assignment, field):
                        num_variables += 1
                if num_variables <= max_num_of_vars:
                    form.save()
            if 'continue' in request.POST:
                return redirect("common_assignments_edit_treatments")
    # Refresh the assignment from the database
    assignment = models.Assignment.objects.get(id=assignment_id)
    form = AssignmentForm(instance=assignment)
    return render_to_response('instructor/assignment_select_variables.html',
                              {'form': form,
                               'treatments_created': json.dumps(treatments_created),
                               'assignment_name': assignment.name,
                               'section_name': 'Experiment Setup',
                               'page_name': 'variables'
                              },
                              context_instance=RequestContext(request))

@login_required
def select_technique(request):
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)
    var_fields = ['has_wb', 'has_fc', 'has_micro']
    AssignmentForm = modelform_factory(models.Assignment, fields=var_fields)

    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            form.save()
            if 'continue' in request.POST:
                return redirect("western_blot_lysate_type")

    form = AssignmentForm(instance=assignment)
    return render_to_response(
        'instructor/select_technique.html',
        {
            'form': form,
            'assignment_name': assignment.name,
            'section_name': 'Select Technique',
            'page_name': 'techniques'

        })


@login_required
def assignments_edit_strains(request):
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    extra_fields = 0
    if 'add' in request.POST or not models.Strains.objects.filter(assignment=assignment):
        extra_fields = 1

    StrainsFormSet = modelformset_factory(models.Strains, extra=extra_fields, fields=['name'], can_delete=True)

    if request.method == "POST":
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
            return redirect('common_assignments_variables')

    formset = StrainsFormSet(queryset=models.Strains.objects.filter(assignment=assignment))

    return render_to_response('instructor/strains.html',
                              {'formset': formset,
                               'new':  request.session['new'],
                               'assignment_name': assignment.name,
                               'section_name': 'Experiment Setup',
                               'page_name': 'strains'
                              },
                              context_instance=RequestContext(request))

@login_required
def assignments_edit_treatments(request):
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

    if not (has_duration or has_start_time):
        drug_formset_exclude.extend(['duration', 'start_time', 'time_unit'])
    elif not has_duration:
        drug_formset_exclude.append('duration')
        input_headers.extend(['Start Time', 'Time Units'])
    elif not has_start_time:
        drug_formset_exclude.append('start_time')
        input_headers.extend(['Duration', 'Duration Units'])
    else:
        input_headers.extend(['Start Time', 'Duration', 'Time Units'])
   
    DrugFormSet = modelformset_factory(models.Drug,
                                       can_delete=True,
                                       exclude=drug_formset_exclude)
    TemperatureFormSet = modelformset_factory(models.Temperature,
                                              can_delete=True,
                                              exclude=['assignment'])
    CollectionTimeFormSet = modelformset_factory(models.CollectionTime,
                                                 can_delete=True,
                                                 exclude=['assignment'])

    if request.method == "POST":
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
                        create_treatments(assignment, **{treatment_kw: [instance]})
                    else:
                        instance.save()

        if 'continue' in request.POST:
            return redirect('common_strain_treatments')

     # If instructor clicked ADD, add extra form
    drug_extra_form = 0
    temperature_extra_form = 0
    collection_extra_form = 0
    if 'add_drug' in request.POST or not models.Drug.objects.filter(assignment=assignment).exists():
        drug_extra_form = 1
    if 'add_temperature' in request.POST or not models.Temperature.objects.filter(assignment=assignment).exists():
        temperature_extra_form = 1
    if 'add_collection' in request.POST or not models.CollectionTime.objects.filter(assignment=assignment).exists():
        collection_extra_form = 1

    DrugFormSet = modelformset_factory(models.Drug,
                                       extra=drug_extra_form,
                                       can_delete=True,
                                       exclude=drug_formset_exclude)
    TemperatureFormSet = modelformset_factory(models.Temperature,
                                              extra=temperature_extra_form,
                                              can_delete=True,
                                              exclude=['assignment'])
    CollectionTimeFormSet = modelformset_factory(models.CollectionTime,
                                                 extra=collection_extra_form,
                                                 can_delete=True,
                                                 exclude=['assignment'])

    drug_formset = DrugFormSet(
        queryset=models.Drug.objects.filter(assignment=assignment),
        prefix='drug')
    temperature_formset = TemperatureFormSet(
        queryset=models.Temperature.objects.filter(assignment=assignment),
        prefix='temperature')
    collection_time_formset = CollectionTimeFormSet(
        queryset=models.CollectionTime.objects.filter(assignment=assignment),
        prefix='collection_time')

    time_unit_list = ['sec', 'min', 'hour']
    concentration_unit_list = ['con', 'con2']
    return render_to_response(
        'instructor/protocols.html',
        {
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
            'page_name': 'treatments'
        },
        context_instance=RequestContext(request)
    )

@login_required
def strain_treatments_edit(request):
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)

    headers = ['Strain', 'Treatment']
    # Optional headers
    optional_vars = ['Concentration', 'Start Time',
                     'Duration', 'Temperature',
                     'Collection Time']
    # assignment fields names
    var_fields = ['has_concentration', 'has_start_time',
                  'has_duration', 'has_temperature',
                  'has_collection_time']

    # Adding headers for enabled experimental variables
    for index, field in enumerate(var_fields):
        if getattr(assignment, field):
            headers.append(optional_vars[index])

    STFormSet = modelformset_factory(models.StrainTreatment, extra=0,
                                     exclude=['assignment', 'strain', 'treatment'])
    if request.method == "POST":
        formset = STFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            entries = formset.save(commit=False)
            for form in entries:
                form.save()
            if 'continue' in request.POST:
                return redirect("common_select_technique")

    formset = STFormSet(
        queryset=models.StrainTreatment.objects.filter(assignment=assignment).order_by(
            'strain',
            'treatment__drug__name',
            'treatment__temperature__degrees',
            'treatment__collection_time__time'
        )
    )
    return render_to_response('instructor/strain_protocols.html',
                              {'formset': formset,
                               'assignment_name': assignment.name,
                               'headers': headers,
                               'has_concentration': assignment.has_concentration,
                               'has_temperature': assignment.has_temperature,
                               'has_start_time': assignment.has_start_time,
                               'has_duration': assignment.has_duration,
                               'has_collection_time': assignment.has_collection_time,
                               'section_name': 'Experiment Setup',
                               'page_name': 'protocols'
                              },
                              context_instance=RequestContext(request))


def create_treatments(assignment, drugs=None, temperatures=None, collection_times=None):
    if drugs is None:
        drugs = models.Drug.objects.filter(assignment=assignment)
    if assignment.has_temperature and temperatures is None:
        temperatures = models.Temperature.objects.filter(assignment=assignment)
    if assignment.has_collection_time and collection_times is None:
        collection_times = models.CollectionTime.objects.filter(assignment=assignment)
    # Creating treatments
    if assignment.has_temperature and assignment.has_collection_time:
        for d in drugs:
            for t in temperatures:
                for c in collection_times:
                    treatment, created = models.Treatment.objects.get_or_create(
                        drug=d,
                        temperature=t,
                        collection_time=c,
                        assignment=assignment)
                    create_strain_treatments(assignment, treatments=[treatment])
    elif assignment.has_collection_time:
        for drug in drugs:
            for c in collection_times:
                treatment, created = models.Treatment.objects.get_or_create(
                    drug=drug,
                    collection_time=c,
                    assignment=assignment)
                create_strain_treatments(assignment, treatments=[treatment])
    elif assignment.has_temperature:
        for drug in drugs:
            for temp in temperatures:
                treatment, created = models.Treatment.objects.get_or_create(
                    drug=drug,
                    temperature=temp,
                    assignment=assignment)
                create_strain_treatments(assignment, treatments=[treatment])
    else:
        for drug in drugs:
            treatment, created = models.Treatment.objects.get_or_create(
                drug=drug,
                assignment=assignment)
            create_strain_treatments(assignment, treatments=[treatment])


def create_strain_treatments(assignment, strains=None, treatments=None):
    # Creating StrainTreatments
    if strains is None:
        strains = models.Strains.objects.filter(assignment=assignment)
    if treatments is None:
        treatments = models.Treatment.objects.filter(assignment=assignment)

    for s in strains:
        for t in treatments:
            strain_treatment, created = models.StrainTreatment.objects.get_or_create(
                strain=s, treatment=t, assignment=assignment)

@login_required
def western_blot_lysate_type(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(assignment=assignment)
    WesternBlotForm = modelform_factory(models.WesternBlot, exclude=['assignment'])
    if request.method == "POST":
        form = WesternBlotForm(request.POST, instance=wb)
        if form.is_valid():
            form.save()
            if 'continue' in request.POST:
                return redirect('western_blot_antibody')
    else:
        form = WesternBlotForm(instance=wb)
    return render_to_response(
        'instructor/wb_lysate_type.html',
        {
            'form': form,
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_lysate_type'
        },
        context_instance=RequestContext(request))

@login_required
def western_blot_antibody(request):
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(assignment=assignment)
    exclude_fields = ['western_blot', 'wc_weight', 'nuc_weight', 'cyto_weight']
    WesternBlotAntibodyFormset = modelformset_factory(
        models.WesternBlotAntibody,
        can_delete=True,
        exclude=exclude_fields
    )
    if request.method == "POST":
        formset = WesternBlotAntibodyFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for obj in formset.deleted_objects:
                obj.delete()
            for form in entries:
                form.western_blot = wb
                form.save()
            if 'continue' in request.POST:
                return redirect('western_blot_band_size')
    extra_fields = 0
    if 'add' in request.POST or not models.WesternBlotAntibody.objects.filter(western_blot=wb).exists():
        extra_fields = 1
    WesternBlotAntibodyFormset = modelformset_factory(
        models.WesternBlotAntibody,
        extra=extra_fields,
        can_delete=True,
        exclude=exclude_fields
    )
    formset = WesternBlotAntibodyFormset(
        queryset=models.WesternBlotAntibody.objects.filter(western_blot=wb))
    return render_to_response(
        'instructor/wb_antibody.html',
        {
            'formset': formset,
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_antibody'
        },
        context_instance=RequestContext(request))

@login_required
def western_blot_band_size(request):
    pk = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=pk)
    wb, created = models.WesternBlot.objects.get_or_create(assignment=assignment)

    AntibodiesFormset = modelformset_factory(
        models.WesternBlotAntibody,
        extra=0,
        exclude=['primary', 'secondary', 'western_blot']
    )
    if request.method == "POST":
        formset = AntibodiesFormset(request.POST)
        if formset.is_valid():
            entries = formset.save(commit=False)
            for form in entries:
                form.save()
    formset = AntibodiesFormset(queryset=models.WesternBlotAntibody.objects.filter(western_blot=wb))
    return render_to_response(
        'instructor/wb_band_size.html',
        {
            'formset': formset,
            'assignment_name': assignment.name,
            'section_name': 'Western Blotting',
            'page_name': 'wb_band_size'
        },
        context_instance=RequestContext(request))



def microscopy_sample_prep(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    message = ''
    MicroSamplePrepFormset = modelformset_factory(models.MicroscopySamplePrep, extra=1, can_delete=True,
                                                  can_order=True, exclude=['assignment', 'order'])
    if request.method == "POST":
        formset = MicroSamplePrepFormset(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = a
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/generic_formset.html',
                              {'formset': MicroSamplePrepFormset(
                                  queryset=models.MicroscopySamplePrep.objects.filter(assignment=assignment)),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def microscopy_images_edit(request, assignment, sample_prep, sp):
    a = models.Assignment.objects.get(id=assignment)
    sample = models.MicroscopySamplePrep.objects.get(id=sample_prep)
    protocol = models.StrainProtocol.objects.get(id=sp)
    MicroImagesFormset = modelformset_factory(models.MicroscopyImages, extra=1, can_delete=True, can_order=True,
                                              exclude=['sample_prep', 'strain_protocol', 'order', 'image'])
    message = ''
    if request.method == "POST":
        formset = MicroImagesFormset(request.POST)
        formset.clean()
        if formset.is_valid():
            message = 'Thank you'
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.sample_prep = sample
                form.strain_protocol = protocol
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/generic_formset.html',
                              {'formset': MicroImagesFormset(
                                  queryset=models.MicroscopyImages.objects.filter(sample_prep=sample,
                                                                                  strain_protocol=protocol)),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def flowcytometry_sample_prep_edit(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    message = ''
    FACSSamplePrepFormset = modelformset_factory(models.FlowCytometrySamplePrep, extra=1, can_delete=True,
                                                 can_order=True, exclude=['assignment', 'order'])
    if request.method == "POST":
        formset = FACSSamplePrepFormset(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = a
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/generic_formset.html',
                              {'formset': FACSSamplePrepFormset(
                                  queryset=models.FlowCytometrySamplePrep.objects.filter(assignment=assignment)),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def facs_histograms_edit(request, assignment, sample_prep, sp):
    a = models.Assignment.objects.get(id=assignment)
    sample = models.FlowCytometrySamplePrep.objects.get(id=sample_prep)
    protocol = models.StrainProtocol.objects.get(id=sp)
    model, created = models.FlowCytometryHistogram.objects.get_or_create(sample_prep=sample, strain_protocol=protocol)
    model.save()

    FlowCytometryHistogramForm = modelform_factory(models.FlowCytometryHistogram,
                                                   exclude=['sample_prep', 'strain_protocol'])
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
    return render_to_response('instructor/generic_form.html',
                              {'form': form,
                               'message': message,
                               'assignment': a,
                               'title': 'Flow Cyto Histogram'
                              },
                              context_instance=RequestContext(request))


def preview(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    return render_to_response('instructor/preview.html',
                              {'assignment': a,
                               'assignment_json': compiler.preview_as_json(a.id)},
                              context_instance=RequestContext(request))
