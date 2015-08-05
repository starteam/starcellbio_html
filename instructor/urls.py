from django.conf.urls import patterns, url

from instructor import views, common

urlpatterns = patterns('',
    url(r'^$', views.index, name="instructor_index"),
    url(r'^course/(?P<course_id>\d+)/', views.course, name="instructor_course"),
    url(r'^courses/', views.courses, name="instructor_courses"),
    url(r'^ab/courses/', common.courses, name="common_courses"),

)
