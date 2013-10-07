from __future__ import absolute_import

from django import forms

import StarCellBio.settings as settings

class SignupForm(forms.Form):
	def save(self, request):
		import sys
		import os
<<<<<<< .merge_file_YYKIpU
                site_root = settings.SITE_ROOT
=======
		import pudb
		#pudb.set_trace()
		site_root = settings.SITE_ROOT
>>>>>>> .merge_file_FaHLg5
		path_name = site_root+'/../auth/course.py'
		try:
			import course
		except ImportError:
			sys.path.append(os.path.dirname(path_name))
			try:
				import course
			finally:
				sys.path.remove(os.path.dirname(path_name))
		course.create_course_records(request,self.data.get('CC'))
        """
        An extension point for subclasses.
        """
        pass
