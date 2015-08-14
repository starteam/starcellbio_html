from django.conf.urls import patterns, include, url
import views
from django.views.generic import TemplateView

# import pudb
# pudb.set_trace()
urlpatterns = patterns('',
	(r'^accounts/', include('allauth.urls')),
#                       url(r'^$', 'django.views.generic.simple.direct_to_template', {'template': 'index.html' }),
	url(r'^accounts/profile/$', TemplateView.as_view(template_name="profile.html"))

#                       url(r'^admin/', include(admin.site.urls)),
)
