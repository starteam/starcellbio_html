from django.contrib.auth.models import User, Group
from django.core.urlresolvers import reverse
from django.test import TestCase, RequestFactory

from backend.models import Course, UserCourse
from lti_provider.models import Consumer, LTIUser


class TestConsumer(TestCase):
    """
    Testing LTI Consumer model
    """

    def test_new_consumer_key_and_secret(self):
        """
        Tests new consumer creates with autocomplete key and secret
        """
        new_consumer = Consumer.objects.create(consumer_name='TestKeySecret')
        self.assertTrue(new_consumer.consumer_key, msg='Consumer key was not autocompleted.')
        self.assertTrue(new_consumer.consumer_secret, msg='Consumer secret was not autocompleted.')


class TestLTIUser(TestCase):
    """
    Testing LTI User model
    """
    @classmethod
    def setUpClass(cls):
        cls.consumer = Consumer.objects.create(consumer_name='TestLTIUser')
        cls.course_code = 'fake_course'
        Group.objects.get_or_create(name='student')
        Group.objects.get_or_create(name='instructor')
        cls.user = User.objects.create()
        cls.course = Course.objects.create(code=cls.course_code, ownerID=cls.user)

    @classmethod
    def tearDownClass(cls):
        cls.user.delete()
        cls.course.delete()
        cls.consumer.delete()

    def setUp(self):
        self.user = LTIUser.objects.create(user_id='test_user', consumer=self.consumer)

    def tearDown(self):
        self.user.delete()

    def test_lti_to_scb_user_role_student(self):
        """
        Tests SCB User is created with student role in the group and creating UserCourse record
        """
        roles = ['Student']  # LTI sends list with roles
        self.assertFalse(self.user.is_scb_user)
        self.user.lti_to_scb_user(roles, self.course_code)
        self.assertTrue(self.user.is_scb_user)
        self.assertTrue(self.user.scb_user.groups.filter(name='student').exists())
        self.assertTrue(UserCourse.objects.filter(course_name=self.course_code, user=self.user.scb_user).exists())

    def test_lti_to_scb_user_role_instructor(self):
        """
        Tests SCB User is created with instructor role in the group and creating UserCourse record
        """
        roles = ['Instructor']  # LTI sends list with roles
        self.assertFalse(self.user.is_scb_user)
        self.user.lti_to_scb_user(roles, self.course_code)
        self.assertTrue(self.user.is_scb_user)
        self.assertTrue(self.user.scb_user.groups.filter(name='instructor').exists())
        self.assertTrue(UserCourse.objects.filter(course_name=self.course_code, user=self.user.scb_user).exists())

    def test_login(self):
        """
        Tests login process for SCB User
        """
        factory = RequestFactory()
        roles = ['Student']  # LTI sends list with roles
        self.assertFalse(self.user.is_scb_user)
        self.user.lti_to_scb_user(roles, self.course_code)
        self.assertTrue(self.user.is_scb_user)
        request = factory.post(reverse('home'), content_type='application/json')
        request.user = self.user.scb_user
        from django.contrib.sessions.middleware import SessionMiddleware
        SessionMiddleware().process_request(request)
        self.user.login(request)
        self.assertTrue(self.user.scb_user.is_authenticated())
