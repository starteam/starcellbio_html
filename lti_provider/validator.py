import logging
from oauthlib import oauth1

from lti_provider.models import Consumer
from lti_provider import utils, lti_settings

logger = logging.getLogger(__name__)
# DEBUG = lti_settings.DEBUG_LTI


class RequestValidator(oauth1.RequestValidator):
    @property
    def enforce_ssl(self):
        return False

    def check_client_key(self, client_key):
        logger.debug('Client key is checking')
        return super(RequestValidator, self).check_client_key(client_key)

    def validate_timestamp_and_nonce(self, client_key, timestamp, nonce, request):
        logger.debug('Timestamp and nonce is validating...')

        return True

    def validate_client_key(self, client_key, request):
        logger.debug('Client key is validating...')
        return True

    def get_client_secret(self, client_key, request):
        logger.debug('Client secret is getting...')
        return Consumer.objects.filter(consumer_key=client_key).first().consumer_secret
