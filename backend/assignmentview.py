from django.shortcuts import render, redirect, get_object_or_404
from django.forms import ModelForm
from django.contrib.auth.decorators import login_required

from backend.models import Assignment


class AssignmentForm(ModelForm):
    class Meta:
        model = Assignment
        fields = ('courseID','assignmentID','assignmentName','access','basedOn')

@login_required
def list(request, template_name='assignment/list.html'):
    servers = Assignment.objects.filter(ownerID=request.user)
    return render(request, template_name, {'object_list':servers})


@login_required
def create(request, template_name='courses/form.html'):
    form = AssignmentForm(request.POST or None)
    if form.is_valid():
        c = form.save()
        c.ownerID = request.user
        c.save()
        return redirect('assignment_list')
    return render(request, template_name, {'form': form,'create':True})


@login_required
def update(request, pk, template_name='courses/form.html'):
    server = get_object_or_404(Assignment, pk=pk, ownerID=request.user)
    form = AssignmentForm(request.POST or None, instance=server)

    if form.is_valid():
        form.save()
        return redirect('assignment_list')
    return render(request, template_name, {'form': form,'create':False})


@login_required
def delete(request, pk, template_name='courses/confirm_delete.html'):
    server = get_object_or_404(Assignment, pk=pk, ownerID=request.user)
    if request.method == 'POST':
        server.delete()
        return redirect('assignment_list')
    return render(request, template_name, {'object': server})

