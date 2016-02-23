from backend.models import UserCourse, Course, Assignment
from django.contrib.auth.models import User

def create_course_records(usr, course_code):
#     import pudb
#     pudb.set_trace()
    if(Course.objects.filter(code = course_code).count()>0):
        course = Course.objects.get(code = course_code)
        user_course = UserCourse(course_name=course_code, user=usr, courseID = course)
        user_course.save()
        print course_code

    # get the data
