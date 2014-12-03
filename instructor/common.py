from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django import forms
from django.forms.models import modelformset_factory, inlineformset_factory
from django.forms.models import modelform_factory
from instructor import models
from instructor import compiler


def courses(request):
    user = request.user
    message = ''
    CourseFormSet = modelformset_factory(models.Course, extra=1, fields=['name', 'code'], can_delete=True)
    if request.method == "POST":
        formset = CourseFormSet(request.POST)
        if ( formset.is_valid()):
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.owner = request.user
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/courses_new.html',
                              {'formset': CourseFormSet(queryset=models.Course.objects.filter(owner=user)),
                               'message': message},
                              context_instance=RequestContext(request))


def course_delete(request, pk):
    print "DELETE {}".format(pk)
    models.Course.objects.get(id=pk).delete()
    return redirect('common_course')


def assignments(request):
    user = request.user
    message = ''
    AssignmentCourseSet = modelformset_factory(models.Assignment, extra=1, can_delete=True)
    if request.method == "POST":
        formset = AssignmentCourseSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/assignments.html',
                              {'formset': AssignmentCourseSet(
                                  queryset=models.Assignment.objects.filter(course__owner=user)),
                               'message': message
                              },
                              context_instance=RequestContext(request))


def assignments_delete(request, pk):
    models.Assignment.objects.get(id=pk).delete()
    return redirect('common_assignments')


def assignments_edit_meta(request, assignment):
    assignment = models.Assignment.objects.get(id=assignment)
    AssignmentForm = modelform_factory(models.Assignment, fields=['has_concentration', 'has_temperature',
                                                                  'has_start_time', 'has_duration',
                                                                  'has_collection_time'])
    message = ''
    if request.method == "POST":
        form = AssignmentForm(request.POST, instance=assignment)
        if ( form.is_valid()):
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


def assignments_edit_text(request, pk):
    assignment = models.Assignment.objects.get(id=pk)
    # strains = models.Strains.objects.filter(assignment=assignment)
    user = request.user
    message = ''
    StrainsFormSet = modelformset_factory(models.AssignmentText, extra=1, fields=['title', 'text'], can_delete=True)
    if request.method == "POST":
        formset = StrainsFormSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
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


def assignments_edit_strains(request, pk):
    assignment = models.Assignment.objects.get(id=pk)
    # strains = models.Strains.objects.filter(assignment=assignment)
    user = request.user
    message = ''
    StrainsFormSet = modelformset_factory(models.Strains, extra=1, fields=['name'], can_delete=True)
    if request.method == "POST":
        formset = StrainsFormSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.assignment = assignment
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/strains.html',
                              {'formset': StrainsFormSet(queryset=models.Strains.objects.filter(assignment=assignment)),
                               'message': message,
                               'assignment': assignment
                              },
                              context_instance=RequestContext(request))


def assignments_edit_protocols(request, pk):
    assignment = models.Assignment.objects.get(id=pk)
    message = ''
    ProtocolsFormSet = modelformset_factory(models.Protocol, extra=1, can_delete=True, exclude=['assignment'])
    if request.method == "POST":
        formset = ProtocolsFormSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
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
    a = models.Assignment.objects.get(id=assignment)
    p = models.Protocol.objects.get(id=protocol)
    message = ''
    treatments_set = ['treatment']
    if a.has_concentration:
        treatments_set.append('concentration')
        treatments_set.append('concentration_unit')
    if a.has_temperature:
        treatments_set.append('temperature')
    if a.has_start_time:
        treatments_set.append('start_time')
    if a.has_duration:
        treatments_set.append('end_time')
    if a.has_collection_time:
        treatments_set.append('collection_time')

    TreatmentsFormSet = modelformset_factory(models.Treatments, extra=1, can_delete=True, exclude=['protocol', 'order'],
                                             can_order=True, fields=treatments_set)
    if request.method == "POST":
        formset = TreatmentsFormSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
            message = "Thank you"
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.protocol = p
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/treatments.html',
                              {'formset': TreatmentsFormSet(
                                  queryset=models.Treatments.objects.filter(protocol=p).order_by('order')),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def strain_treatments_edit(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    strains = models.Strains.objects.filter(assignment=a)
    protocols = models.Protocol.objects.filter(assignment=a)
    message = ''
    for s in strains:
        for p in protocols:
            (sp, created) = models.StrainProtocol.objects.get_or_create(strain=s, protocol=p, assignment=a)
            print s, p, a, created
            sp.save()
    STFormSet = modelformset_factory(models.StrainProtocol, extra=0, exclude=['assignment', 'strain', 'protocol'])
    if request.method == "POST":
        formset = STFormSet(request.POST)
        formset.clean()
        if ( formset.is_valid()):
            message = "Thank you"
            entries = formset.save(commit=False)
            for form in entries:
                form.save()
        else:
            message = "Something went wrong"

    return render_to_response('instructor/strain_protocols.html',
                              {'formset': STFormSet(
                                  queryset=models.StrainProtocol.objects.filter(assignment=a)),
                               'message': message,
                               'assignment': a
                              },
                              context_instance=RequestContext(request))


def western_blot_edit(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    (wb, created) = models.WesternBlot.objects.get_or_create(assignment=a)
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
    (wb, created) = models.WesternBlot.objects.get_or_create(assignment=a)
    wb.save()
    WesternBlotAntibodyFormset = modelformset_factory(models.WesternBlotAntibody, extra=1, can_delete=True,
                                                      exclude=['western_blot'])
    message = ''
    if request.method == "POST":
        formset = WesternBlotAntibodyFormset(request.POST)
        formset.clean()
        if ( formset.is_valid()):
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

    (wb, created) = models.WesternBlot.objects.get_or_create(assignment=a)
    wb.save()

    (protocol, created) = models.StrainProtocol.objects.get_or_create(id=sp)
    protocol.save()

    ab = models.WesternBlotAntibody.objects.get(id=antibody)
    WesternBlotAntibodyBandFormset = modelformset_factory(models.WesternBlotAntibodyBands, extra=1, can_delete=True,
                                                          exclude=['antibody', 'strain_protocol'])
    message = ''
    if request.method == "POST":
        formset = WesternBlotAntibodyBandFormset(request.POST)
        formset.clean()
        if ( formset.is_valid()):
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
        if ( formset.is_valid()):
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
                                              exclude=['sample_prep', 'strain_protocol','order','image'])
    message = ''
    if request.method == "POST":
        formset = MicroImagesFormset(request.POST)
        formset.clean()
        if ( formset.is_valid()):
            message = 'Thank you'
            for form in formset.ordered_forms:
                form.instance.order = form.cleaned_data['ORDER']
            entries = formset.save(commit=False)
            for form in entries:
                form.sample_prep = sample
                form.strain_protocol=protocol
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


def preview(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    return render_to_response('instructor/preview.html',
                              {'assignment': a,
                               'assignment_json': compiler.preview_as_json(a.id)},
                              context_instance=RequestContext(request))
