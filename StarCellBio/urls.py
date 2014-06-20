from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from StarCellBio import settings
import auth.urls

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', "StarCellBio.views.home", name='home'),
                       url(r'^instructor/', "StarCellBio.views.home", name='home'),
                       url(r'^index.html$', "StarCellBio.views.home"),
                       url(r'^scb/contact$', "StarCellBio.views.contact", name='contact'),
                       url(r'^scb/get_model.js$', "StarCellBio.views.get_model", name='get_model'),
                       url(r'^scb/create_courses.js$', "StarCellBio.views.create_courses", name='create_courses'),
                       url(r'^scb/get_student_courses.js$', "StarCellBio.views.get_student_courses", name='get_student_courses'),
                       url(r'^scb/get_instructor_assignments.js$', "StarCellBio.views.get_instructor_assignments", name='get_instructor_assignments'),
                       url(r'^scb/get_user.js$', "StarCellBio.views.get_user", name='get_user'),
                       url(r'^scb/post_state.js$', "StarCellBio.views.post_state", name='post_state'),
                       # url(r'^StarCellBio/', include('StarCellBio.foo.urls')),
                       # Uncomment the admin/doc line below to enable admin documentation:
                       url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       #url(r'^scb_rest/', include('rest_framework.urls', namespace='rest_framework')),
                       url(r'^images/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': 'html_app/images/'}),
                       url(r'^pdf/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'html_app/pdf/'}),
                       url(r'^js/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'html_app/js/'}),
                       #url(r'^api/', include(user_resources.urls)),
                       
)
# add authentication URL patterns
urlpatterns += auth.urls.urlpatterns

from tastypie.api import Api
from backend.services import UserResource, CourseResource, AssignmentResource, StudentAssignmentResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(CourseResource())
v1_api.register(AssignmentResource())
v1_api.register(StudentAssignmentResource())

urlpatterns += patterns('', url(r'^api/', include(v1_api.urls)), )
