import hashlib
from uuid import uuid4

from django.conf import settings


def key_secret_generator():
    """
    Generate a key/secret for LTIConsumer.
    """
    return unicode(hashlib.sha1(uuid4().hex).hexdigest())[:30]


def hash_lti_username(user_id):
    """
    Hash LTI username

    :param user_id: user's id
    :return: hash string
    """
    user_hash = hashlib.new('ripemd160')
    user_hash.update(user_id)
    return user_hash.hexdigest()[:30]
