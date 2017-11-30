import datetime
import time

from django.conf import settings
from django.core.cache import caches
from django.test import TestCase

from lti_provider.models import Consumer
from lti_provider.validator import RequestValidator


class TestRequestValidator(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.key = 'starcellbio201707181230key'
        cls.secret = 'verysctonumk201783test_key'
        cls.nonce = 'fake_nonce'

        cls.exp_date = datetime.date.today() + datetime.timedelta(days=1)
        cls.lti_consumer = Consumer.objects.create(
            consumer_name='testLTI',
            consumer_key=cls.key,
            consumer_secret=cls.secret,
            expiration_date=cls.exp_date
        )
        cls.validator = RequestValidator()
        cls.cache = caches['lti_cache']

    @classmethod
    def tearDownClass(cls):
        cls.lti_consumer.delete()

    def test_validate_client_key_is_valid(self):
        is_valid = self.validator.validate_client_key(self.key, 'fake_request')
        self.assertTrue(is_valid, msg='Consumer key is expired.')

    def test_validate_client_key_is_invalid(self):
        is_fake_key_valid = self.validator.validate_client_key('fake_key', 'fake_request')
        self.assertFalse(is_fake_key_valid)
        exp_date = datetime.date.today() - datetime.timedelta(days=1)
        self.lti_consumer.expiration_date = exp_date
        self.lti_consumer.save()
        is_valid = self.validator.validate_client_key(self.key, 'fake_request')
        self.assertFalse(is_valid)
        self.lti_consumer.expiration_date = self.exp_date
        self.lti_consumer.save()

    def test_get_client_secret(self):
        # NOTE(idegtiarov) validate_client_key is run to ensure RequestValidator instance initialize LTIConsumer
        self.validator.validate_client_key(self.key, 'fake_request')
        client_secret = self.validator.get_client_secret(self.key, 'fake_request')
        self.assertEqual(client_secret, self.secret)

    def test_validate_timestamp_and_nonce_valid(self):
        timestamp = int(time.time())
        is_valid = self.validator.validate_timestamp_and_nonce(self.key, timestamp, self.nonce, 'fake_request')
        self.assertTrue(is_valid)
        timestamp += 1
        is_valid_updated_timestamp = self.validator.validate_timestamp_and_nonce(
            self.key, timestamp, 'new_fake_nonce', 'fake_request'
        )
        self.assertTrue(is_valid_updated_timestamp)
        self.cache.delete_many([self.nonce, 'new_fake_nonce', '{}_timestamp'.format(self.key)])

    def test_validate_timestamp_and_nonce_invalid(self):
        timestamp = int(time.time())
        self.cache.set_many({'{}_timestamp'.format(self.key): timestamp, self.nonce: 1})
        is_valid_past_timestamp = self.validator.validate_timestamp_and_nonce(
            self.key, timestamp - 1, 'new_fake_nonce', 'fake_request'
        )
        self.assertFalse(is_valid_past_timestamp)
        is_valid_duplicated_nonce = self.validator.validate_timestamp_and_nonce(
            self.key, timestamp + 1, self.nonce, 'fake_request'
        )
        self.assertFalse(is_valid_duplicated_nonce)
        is_valid = self.validator.validate_timestamp_and_nonce(
            self.key, timestamp + 1, 'new_fake_nonce', 'fake_request'
        )
        self.assertTrue(is_valid)
        self.cache.delete_many([self.nonce, 'new_fake_nonce', '{}_timestamp'.format(self.key)])

    def test_cache_timelimit_for_validate_timestamp_and_nonce(self):
        timestamp = int(time.time())
        self.cache.set(self.nonce, 1)
        is_valid = self.validator.validate_timestamp_and_nonce(self.key, timestamp, self.nonce, 'fake_request')
        self.assertFalse(is_valid)
        time.sleep(settings.CACHES['lti_cache']['TIMEOUT'])
        is_valid_after_cache_cleared = self.validator.validate_timestamp_and_nonce(
            self.key, timestamp , self.nonce, 'fake_request'
        )
        self.assertTrue(is_valid_after_cache_cleared)
        self.cache.delete_many(self.nonce, '{}_timestamp'.format(self.key))
