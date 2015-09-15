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
    if request.method == "POST":
        # Have to give error for empty name
        request.session['assignment_name'] = request.POST['name']
        if request.POST['based_on']:
            request.session['based_on'] = request.POST['based_on']

        if 'continue' in request.POST:
            return redirect('common_course_setup')

    all_assignments = models.Assignment.objects.all()
    return render_to_response('instructor/assignment_setup.html',
                              {'assignments': all_assignments,
                               'assignment_name': request.session['assignment_name'],
                               'based_on': request.session['based_on'],
                               'new': request.session['new']},
                                context_instance=RequestContext(request))

@login_required
def course_setup(request):
    CourseForm = modelform_factory(models.Course, fields=['code', 'name'])

    if request.method == "POST":
        if 'course_pk' in request.POST:
            # Adding to an existing course
            course = models.Course.objects.get(pk=request.POST['course_pk'])
        else:
            # Create a new course
            user = User.objects.get(username=request.user)
            form = CourseForm(request.POST)
            course = form.save(commit=False)
            course.owner_id = user.id
            course.save()

        # Create a new assignment
        assignment_name = request.session['assignment_name']
        assignment_id = assignment_name + datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")

        if request.session['based_on']:
            a = models.Assignment(course=course,
                                  name=assignment_name,
                                  assignment_id=assignment_id,
                                  basedOn=request.session['based_on'])
        else:
            a = models.Assignment(course=course,
                                  name=assignment_name,
                                  assignment_id=assignment_id)
        a.save()
        request.session['assignment_id'] = a.id
        request.session['new'] = False

        if 'save' in request.POST:
            return redirect("common_course_modify")
        else:
            # Continue
            return redirect('common_assignments_edit_strains')

    else:
        all_courses = models.Course.objects.all()
        form = CourseForm()
        return render_to_response('instructor/course_setup.html',
                                  {'courses': all_courses,
                                   'form': form,
                                   'new': request.session['new']},
                                  context_instance=RequestContext(request))

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
                               'new': request.session['new']},
                              context_instance=RequestContext(request))


@login_required
def course_modify(request):
    assignment_id = request.session['assignment_id']
    assignment = get_object_or_404(models.Assignment, pk=assignment_id)
    CourseForm = modelform_factory(models.Course, fields=['name', 'code'])

    form = CourseForm(instance=assignment.course)
    if request.method == 'POST':
        if 'course_pk' in request.POST:
            # change the course for this assignment
            new_course = models.Course.objects.get(pk=request.POST['course_pk'])
            assignment.course = new_course
            assignment.save()
            if 'continue' in request.POST:
                return redirect("common_assignments_edit_strains")
        else:
            # change this course's name or code
            form = CourseForm(request.POST, instance=assignment.course)
            if form.is_valid():
                form.save()
                if 'continue' in request.POST:
                    return redirect("common_assignments_edit_strains")



    all_courses = models.Course.objects.all()
    return render_to_response('instructor/course_setup.html',
                              {'courses': all_courses,
                               'form': form,
                               'new':  request.session['new']},
                              context_instance=RequestContext(request))



def assignments_edit_meta(request):
    assignment_id = request.session['assignment_id']
    assignment = models.Assignment.objects.get(id=assignment_id)
    AssignmentForm = modelform_factory(models.Assignment, fields=['has_concentration', 'has_temperature',
                                                                  'has_start_time', 'has_duration',
                                                                  'has_collection_time'])
    message = ''
    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if form.is_valid():
            message = "Thank you"
            form.save()
        else:
            message = "Something went wrong"
    else:
        form = AssignmentForm(instance=assignment)
    return render_to_response('instructor/assignment_meta.html',
                              {'form': form,
                               'message': message,
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

    StrainsFormSet = modelformset_factory(models.Strains, extra=extra_fields, fields=['name'])

    if request.method == "POST":
        formset = StrainsFormSet(request.POST)
        formset.clean()

        if formset.is_valid():
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = assignment
                form.save()

        if 'continue' in request.POST:
            return redirect('common_assignments_edit_protocols')

    formset = StrainsFormSet(queryset=models.Strains.objects.filter(assignment=assignment))

    return render_to_response('instructor/strains.html',
                              {'formset': formset,
                               'new':  request.session['new'],
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))

@login_required
def assignments_delete_strain(request):
    try:
        models.Strains.objects.get(id=request.POST['pk']).delete()
    except models.Strains.DoesNotExist:
        raise Http404('Strain does not exist')
    return redirect('common_assignments_edit_strains')


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
