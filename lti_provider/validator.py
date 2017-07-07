from oauthlib import oauth1

from lti_provider import utils


class RequestValidator(oauth1.RequestValidator):
    @property
    def enforce_ssl(self):
        return False

    def check_client_key(self, client_key):
        print('Client key is checking')
        return super(RequestValidator, self).check_client_key(client_key)

    def validate_timestamp_and_nonce(self, client_key, timestamp, nonce, request):
        print('Timestamp and nonce is validating...')
        return True

    def validate_client_key(self, client_key, request):
        print('Client key is validating...')
        return True

    def get_client_secret(self, client_key, request):
        print('Client secret is getting...')
        return utils.key_secret_generator()
