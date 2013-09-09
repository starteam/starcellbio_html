from backend.models import UserCourse, Course, Assignment
from django.contrib.auth.models import User

def create_course_records(usr, course_code):
	import pudb
	pudb.set_trace()
	print 'Hello'
	if(Course.objects.filter(code = course_code).count()>0):
		course = Course.objects.get(code = course_code)
		user_course = UserCourse(course_name=course_code, user=usr, courseID = course)
		user_course.save()
# 		assignment = Assignment(courseID = course, assignmentID='3', assignmentName='eg', data = 'JSON')
# 		assignment.save()
		print 'done'
# 	else: 
# 		course = Course(code = course_code, course_name = 'NewCourse')
# 		course.save()

	# get the data
