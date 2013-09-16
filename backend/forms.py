from django import forms

class SignupForm(forms.SignupForm):
	
	def after_signup(self, user, **kwargs):
		print 'apple'
		super(SignupForm, self).after_signup()