from django.contrib.auth.models import User
from django.db import models

from auth import forms
from lti_provider.utils import key_secret_generator, hash_lti_username


class Consumer(models.Model):
    """
    Model to manage LTI consumers
    """
    consumer_name = models.CharField(max_length=255, unique=True)
    consumer_key = models.CharField(max_length=30, unique=True, default=key_secret_generator)
    consumer_secret = models.CharField(max_length=30, unique=True, default=key_secret_generator)
    expiration_date = models.DateField(verbose_name='Consumer key expiration date', null=True, blank=True)

    def __unicode__(self):
        return self.consumer_name


class LTIUser(models.Model):
    """
    Model to manage LTI users
    """
    user_id = models.CharField(max_length=255, blank=False)
    consumer = models.ForeignKey(Consumer, null=True)
    scb_user = models.ForeignKey(User, null=True, related_name='lti_user')

    class Meta:  # pragma: no cover
        unique_together = ('user_id', 'consumer')

    @property
    def is_scb_user(self):
        return bool(self.scb_user)

    def lti_to_scb_user(self, roles):
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


class OutcomeService(models.Model):
    lis_outcome_service_url = models.CharField(max_length=255)
    consumer = models.ForeignKey(Consumer)

    class Meta:
        unique_together = (
            'lis_outcome_service_url', 'consumer'
        )

    def __unicode__(self):
        return self.lis_outcome_service_url


class GradedLaunch(models.Model):
    user = models.ForeignKey(User, db_index=True)
    course_id = models.IntegerField(db_index=True)
    outcome_service = models.ForeignKey(OutcomeService)
    lis_result_sourcedid = models.CharField(max_length=255, db_index=True)

    class Meta(object):
        unique_together = (
            'outcome_service', 'lis_result_sourcedid', 'user', 'course_id'
        )

    def __unicode__(self):
        return self.lis_result_sourcedid
