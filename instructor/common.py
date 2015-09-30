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
from StarCellBio.views import get_account_type

from backend.models import Assignment, StudentAssignment

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
                               'assignment_name': request.session['assignment_name']
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
                                  'assignment_name': request.session['assignment_name']
                              },
                              context_instance=RequestContext(request))



def assignments_variables(request):
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)
    AssignmentForm = modelform_factory(models.Assignment, fields=['has_concentration', 'has_temperature',
                                                                  'has_start_time', 'has_duration',
                                                                  'has_collection_time'])
    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            form.save()
    else:
        form = AssignmentForm(instance=assignment)
    return render_to_response('instructor/assignment_select_variables.html',
                              {'form': form,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))


def assignments_edit_text(request):
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    message = ''
    StrainsFormSet = modelformset_factory(models.AssignmentText, extra=1, fields=['title', 'text'], can_delete=True)
    if request.method == "POST":
        formset = StrainsFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = assignment
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/assignment_text.html',
                              {'formset': StrainsFormSet(
                                  queryset=models.AssignmentText.objects.filter(assignment=assignment)),
                               'message': message,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))

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
            for form in entries:
                form.assignment = assignment
                form.save()

        if 'continue' in request.POST:
            return redirect('common_assignments_variables')

    formset = StrainsFormSet(queryset=models.Strains.objects.filter(assignment=assignment))

    return render_to_response('instructor/strains.html',
                              {'formset': formset,
                               'new':  request.session['new'],
                               'assignment_name': request.session['assignment_name']
                              },
                              context_instance=RequestContext(request))


def assignments_edit_protocols(request):
    pk = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, id=pk)
    message = ''
    ProtocolsFormSet = modelformset_factory(models.Protocol, extra=1, can_delete=True, exclude=['assignment'])
    if request.method == "POST":
        formset = ProtocolsFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = assignment
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/protocols.html',
                              {'formset': ProtocolsFormSet(
                                  queryset=models.Protocol.objects.filter(assignment=assignment)),
                               'message': message,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))


def treatments_edit(request, assignment, protocol):
    assignment = models.Assignment.objects.get(id=assignment)
    protocol = models.Protocol.objects.get(id=protocol)
    message = ''
    treatments_set = ['treatment']
    if assignment.has_concentration:
        treatments_set.append('concentration')
        treatments_set.append('concentration_unit')
    if assignment.has_temperature:
        treatments_set.append('temperature')
    if assignment.has_start_time:
        treatments_set.append('start_time')
    if assignment.has_duration:
        treatments_set.append('end_time')
    if assignment.has_collection_time:
        treatments_set.append('collection_time')

    TreatmentsFormSet = modelformset_factory(models.Treatments, extra=1, can_delete=True, exclude=['protocol', 'order'],
                                             can_order=True, fields=treatments_set)
    if request.method == "POST":
        formset = TreatmentsFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.protocol = protocol
                form.save()
        else:
            message = "Something went wrong"

    formset = TreatmentsFormSet(queryset=models.Treatments.objects.filter(protocol=protocol).order_by('order'))
    return render_to_response('instructor/treatments.html',
                              {'formset': formset,
                               'message': message,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))


def strain_treatments_edit(request, assignment):
    assignment = models.Assignment.objects.get(id=assignment)
    strains = models.Strains.objects.filter(assignment=assignment)
    protocols = models.Protocol.objects.filter(assignment=assignment)
    message = ''
    for s in strains:
        for p in protocols:
            sp, created = models.StrainProtocol.objects.get_or_create(strain=s, protocol=p, assignment=assignment)
            sp.save()
    STFormSet = modelformset_factory(models.StrainProtocol, extra=0, exclude=['assignment', 'strain', 'protocol'])
    if request.method == "POST":
        formset = STFormSet(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.save()
        else:
            message = "Something went wrong"
    formset = STFormSet(queryset=models.StrainProtocol.objects.filter(assignment=assignment))
    return render_to_response('instructor/strain_protocols.html',
                              {'formset': formset,
                               'message': message,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))


def western_blot_edit(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    wb, created = models.WesternBlot.objects.get_or_create(assignment=a)
    WesternBlotForm = modelform_factory(models.WesternBlot, exclude=['assignment'])
    message = ''
    if request.method == "POST":
        form = WesternBlotForm(request.POST, instance=wb)
        if form.is_valid():
            message = "Thank you"
            form.save()
        else:
            message = "Something went wrong"
    else:
        form = WesternBlotForm(instance=wb)
    return render_to_response('instructor/generic_form.html',
                              {'form': form,
                               'message': message,
                               'assignment': a,
                               'title': 'Western Blot - Meta'
                              },
                              context_instance=RequestContext(request))


def western_blot_antibody_edit(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    wb, created = models.WesternBlot.objects.get_or_create(assignment=a)
    wb.save()
    WesternBlotAntibodyFormset = modelformset_factory(models.WesternBlotAntibody, extra=1, can_delete=True,
                                                      exclude=['western_blot'])
    message = ''
    if request.method == "POST":
        formset = WesternBlotAntibodyFormset(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.western_blot = wb
                form.save()
        else:
            message = "Something went wrong"
    return render_to_response('instructor/generic_formset.html',
                              {'formset': WesternBlotAntibodyFormset(
                                  queryset=models.WesternBlotAntibody.objects.filter(western_blot=wb)),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def western_blot_antibody_band_edit(request, assignment, antibody, sp):
    a = models.Assignment.objects.get(id=assignment)

    wb, created = models.WesternBlot.objects.get_or_create(assignment=a)
    wb.save()

    protocol, created = models.StrainProtocol.objects.get_or_create(id=sp)
    protocol.save()

    ab = models.WesternBlotAntibody.objects.get(id=antibody)
    WesternBlotAntibodyBandFormset = modelformset_factory(models.WesternBlotAntibodyBands, extra=1, can_delete=True,
                                                          exclude=['antibody', 'strain_protocol'])
    message = ''
    if request.method == "POST":
        formset = WesternBlotAntibodyBandFormset(request.POST)
        formset.clean()
        if formset.is_valid():
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.antibody = ab
                form.strain_protocol = protocol
                form.save()
        else:
            message = "Something went wrong"
    return render_to_response('instructor/generic_formset.html',
                              {'formset': WesternBlotAntibodyBandFormset(
                                  queryset=models.WesternBlotAntibodyBands.objects.filter(antibody=ab,
                                                                                          strain_protocol=protocol)),
                               'message': message,
                               'assignment': a
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
