from django.contrib.sessions.middleware import SessionMiddleware
from mock import patch, Mock

from django.contrib.auth.models import User, Group, AnonymousUser
from django.core.urlresolvers import reverse
from django.test import TestCase, RequestFactory

from backend.models import Course, Assignment
from lti_provider.models import Consumer, LTIUser
from lti_provider.validator import RequestValidator
from lti_provider.views import lti_launch


def mock_tool_provider():
    m = Mock()
    m.is_valid_request.return_value = True
    return m


class TestLTI_Launch(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.course_code = 'fake_course'
        cls.user_id = 'fake_user_id'
        cls.consumer_key = 'fake_consumer_key'
        cls.assignment_id = 'fake_assignment_id'
        cls.user = User.objects.create()  # Course creation requires at least one User exists
        cls.course = Course.objects.create(code=cls.course_code, ownerID=cls.user)
        cls.consumer = Consumer.objects.create(consumer_name='TestLTI_LaunchView', consumer_key=cls.consumer_key)
        cls.assignment = Assignment.objects.create(
            courseID=cls.course,
            assignmentID=cls.assignment_id,
            assignmentName='fake_assignment',
            ownerID=cls.user,
        )
        cls.post_data = {
            'user_id': cls.user_id,
            'oauth_consumer_key': cls.consumer_key,
        }
        Group.objects.get_or_create(name='student')
        Group.objects.get_or_create(name='instructor')

    @classmethod
    def tearDownClass(cls):
        cls.user.delete()
        cls.course.delete()
        cls.consumer.delete()
        cls.assignment.delete()

    def setUp(self):
        self.factory = RequestFactory()
        self.request = self.factory.post(
            reverse('lti:launch_course', args=[self.course_code]),
            data=self.post_data
        )
        self.request.user = AnonymousUser()
        middleware = SessionMiddleware()
        middleware.process_request(self.request)

    def tearDown(self):
        user = LTIUser.objects.get(user_id=self.user_id)
        user.delete()

    @patch('lti.contrib.django.DjangoToolProvider.from_django_request', return_value=mock_tool_provider())
    def test_lti_launch_course_id(self, mock_tool_provider):
        response = lti_launch(self.request, self.course_code)
        response.client = self.client
        self.assertEqual(response.url, '/')
        self.assertEqual(response.status_code, 302)
        mock_tool_provider.asser_called_once_with(RequestValidator)

    @patch('lti.contrib.django.DjangoToolProvider.from_django_request', return_value=mock_tool_provider())
    def test_lti_launch_course_id_assignment_id(self, mock_tool_provider):
        response = lti_launch(self.request, self.course_code, self.assignment_id)
        response.client = self.client
        self.assertEqual(response.url, '/#view=assignments&assignment_id={}'.format(self.assignment_id))
        self.assertEqual(response.status_code, 302)
        mock_tool_provider.asser_called_once_with(RequestValidator)

    @patch('lti.contrib.django.DjangoToolProvider.from_django_request', return_value=mock_tool_provider())
    def test_lti_launch_course_id_assignment_id_experiment_id(self, mock_tool_provider):
        experiment = 'fake_experiment_id'
        response = lti_launch(self.request, self.course_code, self.assignment_id, experiment)
        response.client = self.client
        self.assertEqual(
            response.url,
            '/#view=experiment_design&assignment_id={}&experiment_id={}'.format(
                self.assignment_id,
                experiment
            )
        )
        self.assertEqual(response.status_code, 302)
        mock_tool_provider.asser_called_once_with(RequestValidator)
