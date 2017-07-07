import logging

from datetime import date
from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.shortcuts import redirect, get_object_or_404
from lti.contrib.django import DjangoToolProvider
from lti import ToolConfig
from oauthlib import oauth1

from backend.models import Course
from lti_provider import lti_settings as settings
from lti_provider.models import Consumer, LTIUser
from lti_provider.outcomes import store_outcomes_params
from validator import RequestValidator


logger = logging.getLogger(__name__)


ROLES = {
    'Instructor': 'instuctor',
    'Student': 'student',
}


def config(request):
    # Code from lti_django example
    # basic stuff
    app_title = 'StarCellBio'
    app_description = 'Star Cell Bio LTI Application'
    launch_view_name = 'lti:launch'
    launch_url = request.build_absolute_uri(reverse(launch_view_name))

    # maybe you've got some extensions
    # FIXME(idegtiarov) there is no extentions right now, if they don't appear remove example.
    extensions = {
        'my_extensions_provider': {
            # extension settings...
        }
    }

    lti_tool_config = ToolConfig(
        title=app_title,
        launch_url=launch_url,
        secure_launch_url=launch_url,
        extensions=extensions,
        description=app_description
    )

    return HttpResponse(lti_tool_config.to_xml(), content_type='text/xml')


def lti_launch(request, course_id=None):
    request_post = request.POST

    if settings.DEBUG_LTI:
        logger.debug(request.META)
        logger.debug(request_post)

    consumer_key = request_post.get('oauth_consumer_key')
    consumer = Consumer.objects.filter(consumer_key=consumer_key).first()

    if not consumer:
        msg = 'Consumer with the key {} is not found.'.format(consumer_key)
        logger.error(msg)
        # TODO(idegtiarov) add lti_error page if it is needed
        raise Http404(msg)

    try:
        if consumer.expiration_date and consumer.expiration_date < date.today():
            raise oauth1.OAuth1Error('Consumer Key is expired.')
        secret = consumer.consumer_secret

        tool_provider = DjangoToolProvider.from_django_request(request=request)
        validator = RequestValidator()
        # FIXME(idegtiarov) solve issues with the method: is_valid_request, till then it is commented and ok == True
        # ok = tool_provider.is_valid_request(validator)
        ok = True
    except oauth1.OAuth1Error as err:
        ok = False
        logger.error('Error happened while LTI request: {}'.format(err.__str__()))
    if settings.DEBUG_LTI:
        logger.debug("LTI request is {}valid".format('' if ok else 'not '))
    if not ok:
        # TODO(idegtiarov) add lti_error page if it is needed
        raise Http404('LTI request is not valid')

    context_id = request_post.get('context_id')
    user_id = request_post.get('user_id')
    if not user_id:
        # TODO(idegtiarov) add lti_error page if it is needed
        raise Http404('Required LTI param "user_id" is missed in the request.')
    roles_from_request = request_post.get('roles', '').split(',')
    roles = list({ROLES.get(role, 'student') for role in roles_from_request})

    user, created = LTIUser.objects.get_or_create(user_id=user_id, consumer=consumer)

    if not user.is_scb_user:
        # TODO(idegtiarov) connect user with the SCB user account
        pass
    # TODO(idegtiarov) Add possibility for Instructor to create new course if it is not existed.
    # msg="Course you are interested in doesn't exist."
    course = get_object_or_404(Course, code=course_id)

    params = {}
    params['course_id'] = course_id
    params['lis_result_sourcedid'] = request_post.get('lis_result_sourcedid')
    params['lis_outcome_service_url'] = request_post.get('lis_outcome_service_url')
    store_outcomes_params(params, request.user, consumer)

    return redirect('/')
