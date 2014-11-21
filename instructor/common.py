from django.shortcuts import render_to_response,redirect
from django.template import RequestContext
from django import forms
from django.forms.models import modelformset_factory

from instructor import models


def courses(request):
    CourseFormSet = modelformset_factory(models.Course,extra=1,fields=['name','code'])
    if request.method == "POST":
        formset = CourseFormSet(request.POST or None)
        if ( formset.is_valid()):
            message = "Thank you"
            for form in formset:
                form.instance.owner = request.user
                form.save()
        else:
            message = "Something went wrong"

        return render_to_response('instructor/courses_new.html',
                                  {'message': message,
                                   'formset': CourseFormSet()},
                                  context_instance=RequestContext(request))
    else:
        print CourseFormSet()
        return render_to_response('instructor/courses_new.html',
                                  {'formset': CourseFormSet()},
                                  context_instance=RequestContext(request))


def course_delete(request,pk):
    print "DELETE {}".format(pk)
    models.Course.objects.get(id=pk).delete()
    return redirect('common_courses')