from __future__ import absolute_import

from django import forms

class SignupForm(forms.Form):
	def save(self, request):
		import sys
		import os
		try:
			import course
		except ImportError:
			sys.path.append(os.path.dirname('/Users/admin/Desktop/VE/scb2/starcellbio_html/auth/course.py'))
			try:
				import course
			finally:
				sys.path.remove(os.path.dirname('/Users/admin/Desktop/VE/scb2/starcellbio_html/auth/course.py'))
		course.create_course_records(request,self.data.get('CC'))
        """
        An extension point for subclasses.
        """
        pass
