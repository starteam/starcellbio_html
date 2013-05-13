from django.contrib.auth.models import User
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie.authorization import DjangoAuthorization

class UserResource(ModelResource):
    class Meta:
        #import pudb
        #pudb.set_trace()
        queryset = User.objects.all()
        resource_name = 'auth/user'
        excludes = ['email', 'password', 'is_superuser']
        authorization = DjangoAuthorization()
