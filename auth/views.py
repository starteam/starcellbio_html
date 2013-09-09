from django.core.urlresolvers import reverse
from django.contrib.sites.models import Site
from django.http import HttpResponseRedirect,HttpResponse, Http404
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.utils.http import base36_to_int
from django.utils.translation import ugettext
from django.utils.translation import ugettext_lazy as _
from django.views.generic.base import TemplateResponseMixin, View
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import redirect

from allauth.utils import passthrough_login_redirect_url, get_user_model

from backend.models import UserCourse, Course, Assignment
from django.contrib.auth.models import User

# Create your views here.

def create_courses(request, **kwargs):
	import pudb
	pudb.set_trace()
# 	if(request.method == POST):
# 		assign_id = request.POST["ass_id"]
# 		course_code = request.POST["course"]
# 		assign_name = request.POST["name"]
# 		jsondata=request.POST["data"]
# 		if(assign_id):
# 			c = Course(code = course_code, course_name = 'NewCourse')
# 			c.save()
# 			a = Assignment(courseID=c, assignmentID=assign_id, assignmentName=assign_name, data = jsondata)
# 			a.save()
# 			return HttpResponse('got it')
	return HttpResponse('/thanks/')
		