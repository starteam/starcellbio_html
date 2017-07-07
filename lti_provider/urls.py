from django.conf.urls import patterns, url

import views


urlpatterns = [
    url(r'^config$', views.config, name='config'),
    url(r'^launch$', views.lti_launch, name='launch'),
]
