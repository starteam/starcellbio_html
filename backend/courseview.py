from django.shortcuts import render, redirect, get_object_or_404
from django.forms import ModelForm
from django.contrib.auth.decorators import login_required

from backend.models import Course


class CourseForm(ModelForm):
    class Meta:
        model = Course
        fields = ('code', 'course_name')


@login_required
def list(request, template_name='courses/list.html'):
    servers = Course.objects.filter(ownerID=request.user)
    data = {}
    data['object_list'] = servers
    return render(request, template_name, data)


@login_required
def create(request, template_name='courses/form.html'):
    form = CourseForm(request.POST or None)
    if form.is_valid():
        c = form.save()
        c.ownerID = request.user
        c.save()
        return redirect('course_list')
    return render(request, template_name, {'form': form})


@login_required
def update(request, pk, template_name='courses/form.html'):
    server = get_object_or_404(Course, pk=pk, ownerID=request.user)
    form = CourseForm(request.POST or None, instance=server)
    if form.is_valid():
        form.save()
        return redirect('course_list')
    return render(request, template_name, {'form': form})


@login_required
def delete(request, pk, template_name='courses/confirm_delete.html'):
    server = get_object_or_404(Course, pk=pk, ownerID=request.user)
    if request.method == 'POST':
        server.delete()
        return redirect('course_list')
    return render(request, template_name, {'object': server})

