import datetime

from django.test import TestCase
from oauthlib import oauth1

from lti_provider.models import Consumer
from lti_provider.validator import RequestValidator


class TestRequestValidator(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.key = 'starcellbio201707181230key'
        cls.secret = 'verysctonumk201783test_key'
        cls.exp_date = datetime.date.today() + datetime.timedelta(days=1)
        cls.lti_consumer = Consumer.objects.create(
            consumer_name='testLTI',
            consumer_key=cls.key,
            consumer_secret=cls.secret,
            expiration_date=cls.exp_date
        )
        cls.validator = RequestValidator()

    @classmethod
    def tearDownClass(cls):
        cls.lti_consumer.delete()

    def test_check_client_key_valid(self):
        is_valid = self.validator.check_client_key(self.key)
        self.assertTrue(is_valid, msg='Consumer key is not valid')

    def test_check_client_key_invalid(self):
        key = 'fake_key'
        msg = 'Consumer with the key {} is not found.'.format(key)
        try:
            self.validator.check_client_key(key)
        except oauth1.OAuth1Error as err:
            self.assertEqual(err.description, msg)

    def test_validate_timestamp_valid(self):
        is_valid = self.validator.validate_timestamp_and_nonce(self.key, 'fake_timestamp', 'fake_nonce', 'fake_request')
        self.assertTrue(is_valid, msg='Consumer key is expired.')

    def test_validate_timestamp_invalid(self):
        exp_date = datetime.date.today() - datetime.timedelta(days=1)
        self.lti_consumer.expiration_date = exp_date
        self.lti_consumer.save()
        msg = 'Consumer key {} is expired, expiration date is {}.'.format(self.key, exp_date)
        try:
            self.validator.validate_timestamp_and_nonce(self.key, 'fake_timestamp', 'fake_nonce', 'fake_request')
        except oauth1.OAuth1Error as err:
            self.assertEqual(err.description, msg)
        self.lti_consumer.expiration_date = self.exp_date
        self.lti_consumer.save()

    def test_get_client_secret(self):
        client_secret = self.validator.get_client_secret(self.key, 'fake_request')
        self.assertEqual(client_secret, self.secret)
