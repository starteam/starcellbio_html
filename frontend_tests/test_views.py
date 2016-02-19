from django.test import TestCase


class ViewTests(TestCase):

    def test_get_user(self):
        response = self.client.get('/scb/get_user.js')
        self.assertEqual(response.status_code, 200)
