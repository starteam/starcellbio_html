from django.contrib import admin

from lti_provider.models import LTIUser, Consumer


class ConsumerAdmin(admin.ModelAdmin):
    search_fields = ('consumer_name', 'consumer_key', 'expiration_date')


admin.site.register(Consumer, ConsumerAdmin)
admin.site.register(LTIUser)
