from __future__ import absolute_import

from django import forms

from allauth.account.forms import BaseSignupForm
from allauth.account.utils import (user_username, user_email,
                                   user_field)

from .models import SocialAccount
from .adapter import get_adapter
from . import app_settings
from . import signals


class SignupForm(BaseSignupForm):
	import pudb
	pudb.set_trace()

    def save(self, request):
        super(SignupForm, self).save(self,request)
        return new_user
    
    def after_signup(self, user, **kwargs):
    	import pudb
    	pudb.set_trace()
    	print 'apple'
    	super(SignupForm, self).after_signup()
