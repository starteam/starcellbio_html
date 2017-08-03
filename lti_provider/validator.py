import datetime
import logging

from django.core.cache import caches
from oauthlib import oauth1

from lti_provider.models import Consumer
from lti_provider import lti_settings

logger = logging.getLogger(__name__)


class RequestValidator(oauth1.RequestValidator):

    def __init__(self):
        super(RequestValidator, self).__init__()
        self.consumer = None
        self.cache = caches['lti_cache']

    @property
    def enforce_ssl(self):
        try:
            ssl = lti_settings.LTI_SSL
        except AttributeError:
            ssl = True
        return ssl

    def validate_timestamp_and_nonce(self, client_key, timestamp, nonce, request):
        """
        Validate LTI request's timestamp and nonce

        Timestamp is validated to be equal or greater than the timestamp used in previous requests from certain
        LTI Consumer.

        Nonce is validating to be unique in the time frame which is by default equal to 10 seconds.
        Time frame could be configured in the StarCellBio settings as a TIMEOUT parameter of the CACHES['lti_cache']

        :param client_key: client key from LTI request
        :param timestamp: timestamp from LTI request
        :param nonce: nonce from LTI request
        :param request: LTI request
        :return: boolean flag
        """
        message = "LTI request's {} is not valid."

        logger.debug('Timestamp validating is started.')
        timestamp = int(timestamp)
        timestamp_key = '{}_timestamp'.format(client_key)
        cache_timestamp = self.cache.get(timestamp_key, timestamp)
        if cache_timestamp > timestamp:
            logger.debug(message.format('timestamp'))
            return False
        self.cache.set(timestamp_key, timestamp)
        logger.debug('Timestamp is valid.')

        logger.debug('Nonce validating is started.')
        if self.cache.get(nonce):
            logger.debug(message.format('nonce'))
            return False
        self.cache.set(nonce, 1)
        logger.debug('Nonce is valid.')
        return True

    def validate_client_key(self, client_key, request):
        """
        Validate client key exists and is not expired

        :param client_key: client key from LTI request
        :param request: LTI request
        :return: boolean flag
        """
        logger.debug('Consumer key relevance validating is started.')
        try:
            self.consumer = Consumer.objects.get(consumer_key=client_key)
        except Consumer.DoesNotExist:
            logger.error('Consumer with the key {} is not found.'.format(client_key))
            return False
        today = datetime.date.today()
        consumer_expired_date = self.consumer.expiration_date
        if consumer_expired_date and consumer_expired_date < today:
            logger.error('Consumer Key is expired.')
            return False
        return True

    def get_client_secret(self, client_key, request):
        """
        Retrieve secret key storing in the LTI Consumer

        :param client_key: client key from LTI request
        :param request: LTI request
        :return: secret key
        """
        logger.debug('Client secret getting is started.')
        return self.consumer.consumer_secret
