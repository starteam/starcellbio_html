from django.conf.urls import patterns, include, url


# import pudb
# pudb.set_trace()
urlpatterns = patterns('',
	(r'^accounts/', include('allauth.urls')),
#                       url(r'^$', 'django.views.generic.simple.direct_to_template', {'template': 'index.html' }),
	url(r'^accounts/profile/$', 'django.views.generic.simple.direct_to_template', {'template': 'profile.html' })
#                       url(r'^admin/', include(admin.site.urls)),
)
