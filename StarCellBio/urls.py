from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from StarCellBio import settings
import auth.urls

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       url(r'^$', "StarCellBio.views.home", name='home'),
                       url(r'^index.html$', "StarCellBio.views.home", name='home'),
                       url(r'^scb/is_auth/$', "StarCellBio.views.is_auth", name='is_auth'),

                       # url(r'^StarCellBio/', include('StarCellBio.foo.urls')),

                       # Uncomment the admin/doc line below to enable admin documentation:
                       url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

                       # Uncomment the next line to enable the admin:
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^scb_rest/', include('rest_framework.urls', namespace='rest_framework')),
                       url(r'^images/(?P<path>.*)$', 'django.views.static.serve',{'document_root': 'html_app/images/'}),
                       url(r'^pdf/(?P<path>.*)$', 'django.views.static.serve',{'document_root': 'html_app/pdf/'}),
                       url(r'^js/(?P<path>.*)$', 'django.views.static.serve',{'document_root': 'html_app/js/'}),
) + auth.urls.urlpatterns;

