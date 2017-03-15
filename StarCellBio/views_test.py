from django.core.urlresolvers import reverse
from django.test import TestCase, RequestFactory
from django.core import mail
import mock

from .views import contact


class ContactTests(TestCase):
    def test_400_on_GET(self):
        factory = RequestFactory()
        request = factory.get(reverse('contact'))
        response = contact(request)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(len(mail.outbox), 0)

    def test_error_on_invalid_form(self):
        factory = RequestFactory()
        request = factory.post(reverse('contact'))
        response = contact(request)

        self.assertContains(response, 'Errors in contact form')
        self.assertEqual(len(mail.outbox), 0)

    def test_sends_email_on_valid_form(self):
        factory = RequestFactory()
        request = factory.post(reverse('contact'), data={
            'report': 'There was an error',
            'note': 'this is my note',
        })
        response = contact(request)

        self.assertContains(response, 'Thank you for your feedback')
        self.assertEqual(len(mail.outbox), 1)
        email = mail.outbox[0]
        self.assertIn('WebFeedback', email.subject)
        self.assertEqual(['star@mit.edu'], email.to)

    def test_sends_error_on_sendmail_exception(self):
        factory = RequestFactory()
        request = factory.post(reverse('contact'), data={
            'report': 'There was an error',
            'note': 'this is my note',
        })
        with mock.patch('StarCellBio.views.send_mail') as mailer:
            mailer.side_effect = Exception()

            response = contact(request)

        self.assertEqual(500, response.status_code)
        self.assertTrue('Unable to send the email' in response.content)


