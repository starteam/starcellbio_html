from django.contrib import admin
from django.forms.models import ModelForm

from lti_provider.models import LTIUser, Consumer, OutcomeService, GradedLaunch


class ConsumerAdmin(admin.ModelAdmin):
    search_fields = ('consumer_name', 'consumer_key', 'expiration_date')


admin.site.register(Consumer, ConsumerAdmin)
admin.site.register([GradedLaunch, LTIUser, OutcomeService])
