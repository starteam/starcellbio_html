from django.conf.urls import patterns, include, url

import auth.views as views


import pudb
pudb.set_trace()
urlpatterns = patterns('',
	(r'^accounts/', include('allauth.urls')),
#                       url(r'^$', 'django.views.generic.simple.direct_to_template', {'template': 'index.html' }),
	url(r'^$', views.create_courses),
	url(r'^accounts/profile/$', 'django.views.generic.simple.direct_to_template', {'template': 'profile.html' })
#                       url(r'^admin/', include(admin.site.urls)),
)
