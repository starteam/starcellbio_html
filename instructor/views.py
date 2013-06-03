# Create your views here.

from django.http import HttpResponse
from django.template import Context
from backend.models import Course
from django.shortcuts import render, render_to_response
from django.forms.models import modelformset_factory

def index(request):
    courses = Course.objects.all()
    return render(request, 'instructor/index.html', {
        "courses": courses
    })

def courses(request):
    CourseFormSet = modelformset_factory(Course)
    if request.method == 'POST':
        formset = CourseFormSet(request.POST, request.FILES)
        if formset.is_valid():
            formset.save()
            # do something.
    else:
        formset = CourseFormSet()
    ret = render_to_response("instructor/courses.html", {
        "formset": formset,
    })
    return ret

def course(request, **kwargs):
    course = Course.objects.get(id=kwargs['course_id'])
    return render(request, 'instructor/course.html', {
        "course": course
    })