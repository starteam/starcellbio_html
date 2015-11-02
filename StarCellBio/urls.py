from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from StarCellBio import settings
import auth.urls

admin.autodiscover()

urlpatterns = patterns(
    '',
    # Examples:
    url(r'^$', "StarCellBio.views.home", name='home'),
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

urlpatterns += patterns(
    '',
    url(r'^courses/$', 'backend.courseview.list', name='course_list'),
    url(r'^courses/new$', 'backend.courseview.create', name='course_new'),
    url(r'^courses/edit/(?P<pk>.+)$', 'backend.courseview.update', name='course_edit'),
    url(r'^courses/delete/(?P<pk>.+)$', 'backend.courseview.delete', name='course_delete'),
)

from instructor import common as instructor_common

urlpatterns += patterns(
    '',
    url(r'^assignments/$', 'backend.assignmentview.list', name='assignment_list'),
    url(r'^assignments/new$', 'backend.assignmentview.create', name='assignment_new'),
    url(r'^assignments/edit/(?P<pk>.+)$', 'backend.assignmentview.update', name='assignment_edit'),
    url(r'^assignments/delete/(?P<pk>.+)$', 'backend.assignmentview.delete',
        name='assignment_delete'),

    url(r'^ab/.*/images/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': 'html_app/images/'}),

    url(r'^ab/courses/$', instructor_common.courses, name="common_courses"),
    url(r'^ab/courses/delete/(?P<pk>.+)$', instructor_common.course_delete,
        name="common_courses_delete"),

    # Dashboard
    url(r'^ab/assignments/$', instructor_common.assignments, name="common_assignments"),
    url(r'^ab/assignments/delete/(?P<pk>.+)$', instructor_common.assignment_delete,
        name="common_assignment_delete"),

    # Creating assignment
    url(r'^ab/assignments/course_setup/$', instructor_common.course_setup,
        name="common_course_setup"),
    url(r'^ab/assignments/create_new_assignment/$',
        instructor_common.create_new_assignment, name="common_create_new_assignment"),
    url(r'^ab/assignments/assignment_setup/$', instructor_common.assignment_setup,
        name="common_assignment_setup"),

    # Modify assignment
    url(r'^ab/assignments/edit/(?P<assignment_pk>[^/]+)$',
        instructor_common.assignments_edit, name="common_assignments_edit"),
    url(r'^ab/assignments/assignment_modify/$', instructor_common.assignment_modify,
        name="common_assignment_modify"),
    url(r'^ab/assignments/course_modify/$', instructor_common.course_modify,
        name="common_course_modify"),

    # Experimental setup
    url(r'^ab/assignments/edit_strains/$', instructor_common.assignments_edit_strains,
        name="common_assignments_edit_strains"),
    url(r'^ab/assignments/edit_treatments/$', instructor_common.assignments_edit_treatments,
        name="common_assignments_edit_treatments"),
    url(r'^ab/assignments/edit_strain_treatments/$', instructor_common.strain_treatments_edit,
        name="common_strain_treatments"),
    url(r'^ab/assignments/assignments_variables/$',
        instructor_common.assignments_variables, name="common_assignments_variables"),
    url(r'^ab/assignments/edit_text/$', instructor_common.assignments_edit_text,
        name="common_assignments_edit_text"),

    # Preview
    url(r'^ab/assignments/preview/(?P<assignment>[^/]+)$', instructor_common.preview,
        name="common_preview"),

    # Select Technique
    url(r'^ab/assignments/select_technique/$', instructor_common.select_technique,
        name="common_select_technique"),

    # Western Blot
    url(r'^ab/assignments/wb_edit/(?P<assignment>.+)$', instructor_common.western_blot_edit,
        name="common_western_blot_meta"),
    url(r'^ab/assignments/wba_edit/(?P<assignment>.+)$', instructor_common.western_blot_antibody_edit,
        name="western_blot_antibody_edit"),
    url(r'^ab/assignments/wbab_edit/(?P<assignment>.+)/(?P<antibody>.+)/(?P<sp>.+)/$',
        instructor_common.western_blot_antibody_band_edit,
        name="common_western_blot_antibody_bands_edit"),

    # Microscopy
    url(r'^ab/assignments/microscopy_sample_prep/(?P<assignment>.+)$', instructor_common.microscopy_sample_prep,
        name="microscopy_sample_prep"),
    url(r'^ab/assignments/microscopy_images_edit/(?P<assignment>.+)/(?P<sample_prep>.+)/(?P<sp>.+)/$',
        instructor_common.microscopy_images_edit,
        name="microscopy_images_edit"),

    # Flow Cytometry
    url(r'^ab/assignments/facs_sample_prep/(?P<assignment>.+)$', instructor_common.flowcytometry_sample_prep_edit,
        name="flowcytometry_sample_prep_edit"),
    url(r'^ab/assignments/facs_histograms_edit/(?P<assignment>.+)/(?P<sample_prep>.+)/(?P<sp>.+)/$',
        instructor_common.facs_histograms_edit,
        name="facs_histograms_edit"),

)

from tastypie.api import Api
from backend.services import UserResource, CourseResource, AssignmentResource, StudentAssignmentResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(CourseResource())
v1_api.register(AssignmentResource())
v1_api.register(StudentAssignmentResource())

urlpatterns += patterns('', url(r'^api/', include(v1_api.urls)), )
