from django.shortcuts import render_to_response, redirect
from django.template import RequestContext
from django import forms
from django.forms.models import modelformset_factory, inlineformset_factory

from instructor import models


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
    TreatmentsFormSet = modelformset_factory(models.Treatments, extra=1, can_delete=True, exclude=['protocol', 'order'],
                                             can_order=True)
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


def preview(request, assignment):
    a = models.Assignment.objects.get(id=assignment)
    return render_to_response('instructor/preview.html',
                              {'assignment': a},
                              context_instance=RequestContext(request))
