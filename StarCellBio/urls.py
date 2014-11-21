from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from StarCellBio import settings
import auth.urls
from backend import courseview

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', "StarCellBio.views.home", name='home'),
                       # url(r'^instructor/', "StarCellBio.views.home", name='home'),
                       url(r'^index.html$', "StarCellBio.views.home"),
                       url(r'^scb/contact$', "StarCellBio.views.contact", name='contact'),
                       url(r'^scb/get_model.js$', "StarCellBio.views.get_model", name='get_model'),
                       url(r'^scb/initialize_courses.js$', "StarCellBio.views.initialize_courses",
                           name='initialize_courses'),
                       url(r'^scb/get_student_courses.js$', "StarCellBio.views.get_student_courses",
                           name='get_student_courses'),
                       url(r'^scb/get_instructor_assignments.js$', "StarCellBio.views.get_instructor_assignments",
                           name='get_instructor_assignments'),
                       url(r'^scb/edit_assignment.js$', "StarCellBio.views.edit_assignment", name='edit_assignment'),

                       url(r'^scb/create_course.js$', "StarCellBio.views.create_course", name='create_course'),
                       url(r'^scb/create_new_assignment.js$', "StarCellBio.views.create_new_assignment",
                           name='create_new_assignment'),


                       url(r'^scb/get_user.js$', "StarCellBio.views.get_user", name='get_user'),
                       url(r'^scb/post_state.js$', "StarCellBio.views.post_state", name='post_state'),
                       # Uncomment the admin/doc line below to enable admin documentation:
                       url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^images/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': 'html_app/images/'}),
                       url(r'^pdf/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'html_app/pdf/'}),
                       url(r'^js/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'html_app/js/'}),

)
# add authentication URL patterns
urlpatterns += auth.urls.urlpatterns
#urlpatterns += courseview.urlpatterns

urlpatterns += patterns('',
                        url(r'^courses/$', 'backend.courseview.list', name='course_list'),
                        url(r'^courses/new$', 'backend.courseview.create', name='course_new'),
                        url(r'^courses/edit/(?P<pk>.+)$', 'backend.courseview.update', name='course_edit'),
                        url(r'^courses/delete/(?P<pk>.+)$', 'backend.courseview.delete', name='course_delete'),
)

from instructor import common as instructor_common

urlpatterns += patterns('',
                        url(r'^assignments/$', 'backend.assignmentview.list', name='assignment_list'),
                        url(r'^assignments/new$', 'backend.assignmentview.create', name='assignment_new'),
                        url(r'^assignments/edit/(?P<pk>.+)$', 'backend.assignmentview.update', name='assignment_edit'),
                        url(r'^assignments/delete/(?P<pk>.+)$', 'backend.assignmentview.delete', name='assignment_delete'),

                        url(r'^ab/courses/$', instructor_common.courses, name="common_courses"),
                        url(r'^ab/courses/delete/(?P<pk>.+)$', instructor_common.course_delete, name="common_courses_delete"),

)


from tastypie.api import Api
from backend.services import UserResource, CourseResource, AssignmentResource, StudentAssignmentResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(CourseResource())
v1_api.register(AssignmentResource())
v1_api.register(StudentAssignmentResource())

urlpatterns += patterns('', url(r'^api/', include(v1_api.urls)), )
