from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db import models

from auth import forms
from auth.course import create_course_records
from lti_provider.utils import key_secret_generator, hash_lti_username

import logging

logger = logging.getLogger(__name__)


class Consumer(models.Model):
    """
    Model to manage LTI consumers
    """
    consumer_name = models.CharField(max_length=255, unique=True)
    consumer_key = models.CharField(max_length=30, unique=True, default=key_secret_generator)
    consumer_secret = models.CharField(max_length=30, unique=True, default=key_secret_generator)
    expiration_date = models.DateField(verbose_name='Consumer key expiration date', null=True, blank=True)

    class Meta:
        verbose_name = "LTI Consumer"
        verbose_name_plural = "LTI Consumers"

    def __unicode__(self):
        return self.consumer_name


class LTIUser(models.Model):
    """
    Model to manage LTI users
    """
    user_id = models.CharField(max_length=255, blank=False)
    consumer = models.ForeignKey(Consumer, null=True)
    scb_user = models.ForeignKey(User, null=True, related_name='lti_user', on_delete=models.CASCADE)

    class Meta:  # pragma: no cover
        verbose_name = "LTI User"
        verbose_name_plural = "LTI Users"
        unique_together = ('user_id', 'consumer')

    @property
    def is_scb_user(self):
        return bool(self.scb_user)

    def lti_to_scb_user(self, roles, course_id):
        """
        Connecting LTI user with the StarCellBio user account
        :param roles: list of the strings describing assigned roles
        """
        username = hash_lti_username(self.user_id)
        scb_user, _ = User.objects.get_or_create(username=username)
        self.scb_user = scb_user
        for role in roles:
            forms.add_to_group(scb_user, role)
        self.save()
        create_course_records(scb_user, course_id)

    def login(self, request):
        """
        Login connected SCB user
        """
        if self.scb_user:
            self.scb_user.backend = 'allauth.account.auth_backends.AuthenticationBackend'
            logger.debug("Start User {} login process...".format(self.scb_user.username))
            login(request, self.scb_user)
            logger.debug("Check User is authenticated: {}".format(request.user.is_authenticated()))
