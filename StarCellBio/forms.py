"""Django Forms for display and validation."""
from django import forms


class ContactForm(forms.Form):
    """Contact form."""
    name = forms.CharField(required=False)
    email = forms.EmailField(required=False)
    subscribe = forms.BooleanField(required=False)
    report = forms.CharField()
    note = forms.CharField()
