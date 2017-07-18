from django.conf.urls import patterns, url

import views


urlpatterns = [
    url(r'^config$', views.config, name='config'),
    url(r'^launch/course/(?P<course_id>\w*)$', views.lti_launch, name='launch_course'),
    url(
        r'^launch/course/(?P<course_id>\w+)/assignment/(?P<assignment>\w+)$',
        views.lti_launch,
        name='launch_assignment'
    ),
    url(
        r'^launch/course/(?P<course_id>\w+)/assignment/(?P<assignment>\w+)/experiment/(?P<experiment>\w+)$',
        views.lti_launch,
        name='launch_experiment'
    ),
]
