from django.conf.urls import patterns, url

import views


urlpatterns = [
    url(r'^config$', views.config, name='config'),
    url(r'^launch/(?P<assignment_id>\w*)$', views.lti_launch, name='launch'),
]
