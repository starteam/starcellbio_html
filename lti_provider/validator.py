import logging

import datetime
from oauthlib import oauth1

from lti_provider.models import Consumer
from lti_provider import utils, lti_settings

logger = logging.getLogger(__name__)


class RequestValidator(oauth1.RequestValidator):

    def __init__(self):
        super(RequestValidator, self).__init__()
        self.consumer = None

    @property
    def enforce_ssl(self):
        try:
            ssl = lti_settings.LTI_SSL
        except AttributeError:
            ssl = True
        return ssl

    def check_client_key(self, client_key):
        """
        Check client key is provided correctly and LII Consumer with that key exists

        :param client_key: client key from LTI request
        :return: boolean flag
        """
        logger.debug('Client key is checking')
        try:
            self.consumer = Consumer.objects.get(consumer_key=client_key)
        except Consumer.DoesNotExist:
            raise oauth1.OAuth1Error('Consumer with the key {} is not found.'.format(client_key))
        return super(RequestValidator, self).check_client_key(client_key)

    def validate_timestamp_and_nonce(self, client_key, timestamp, nonce, request):
        """
        Validate LTI Consumer has not expired key

        :param client_key: client key from LTI request
        :param timestamp: timestamp from LTI request
        :param nonce: nonce from LTI request
        :param request: LTI request
        :return: boolean flag
        """
        logger.debug('Timestamp validation run...')
        today = datetime.date.today()
        consumer_expired_date = self.consumer.expiration_date
        if consumer_expired_date and consumer_expired_date < today:
            raise oauth1.OAuth1Error('Consumer Key is expired.')
        return True

    def validate_client_key(self, client_key, request):
        """
        Validate client key ...

        :param client_key: client key from LTI request
        :param request: LTI request
        :return: boolean flag
        """
        logger.debug('Client key validation run...')
        return True

    def get_client_secret(self, client_key, request):
        """
        Retrieve secret key storing in the LTI Consumer

        :param client_key: client key from LTI request
        :param request: LTI request
        :return: secret key
        """
        logger.debug('Client secret is getting...')
        return self.consumer.consumer_secret
