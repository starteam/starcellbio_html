import logging

from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from lti.contrib.django import DjangoToolProvider
from lti import ToolConfig, InvalidLTIRequestError
from oauthlib import oauth1

from backend.models import Assignment, Course
from lti_provider import lti_settings as settings
from lti_provider.models import Consumer, LTIUser
from validator import RequestValidator


logger = logging.getLogger(__name__)


ROLES = {
    'Instructor': 'instructor',
    'Student': 'student',
}


def config(request):
    """
    View for config endpoint lti/config

    :return: XML with main info about Star Cell Bio source and LTI launch URL structure
    """
    app_title = 'StarCellBio'
    app_description = 'Star Cell Bio LTI Application'
    launch_view_name = 'lti:launch_experiment'
    launch_url = request.build_absolute_uri(reverse(launch_view_name, args=[
        'course_id',
        'assignment_id',
        'experiment'
    ]))

    lti_tool_config = ToolConfig(
        title=app_title,
        launch_url=launch_url,
        secure_launch_url=launch_url,
        description=app_description
    )

    return HttpResponse(lti_tool_config.to_xml(), content_type='text/xml')


@csrf_exempt
def lti_launch(request, course_id=None, assignment=None, experiment=None):
    """
    LTI main view

    Analyze LTI POST request to launch LTI session

    :param request: LTI request
    :param course_id: course id from the launch URL
    :param assignment: assingment id from the launch URL
    :param experiment: string 'experiment' from the launch URL is a flag for switch on experiment_design page
    """
    request_post = request.POST

    if settings.DEBUG_LTI:
        logger.debug(request.META)
        logger.debug(request_post)

    try:
        tool_provider = DjangoToolProvider.from_django_request(request=request)
        validator = RequestValidator()
        ok = tool_provider.is_valid_request(validator)
    except (oauth1.OAuth1Error, InvalidLTIRequestError, ValueError) as err:
        ok = False
        logger.error('Error happened while LTI request: {}'.format(err.__str__()))
    if settings.DEBUG_LTI:
        logger.debug("LTI request is {}valid".format('' if ok else 'not '))
    if not ok:
        raise Http404('LTI request is not valid')

    user_id = request_post.get('user_id')
    if not user_id:
        raise Http404('Required LTI param "user_id" is missed in the request.')
    roles_from_request = request_post.get('roles', '').split(',')
    roles = list({ROLES.get(role, 'student') for role in roles_from_request})
    consumer = Consumer.objects.get(consumer_key=request_post['oauth_consumer_key'])

    user, created = LTIUser.objects.get_or_create(user_id=user_id, consumer=consumer)

    if not user.is_scb_user:
        # NOTE(idegtiarov) connect user with the SCB user account
        user.lti_to_scb_user(roles, course_id)
        logger.debug('SCB user was successfully created: {}'.format(user.is_scb_user))
    user.login(request)
    url = reverse('home')
    if not course_id or not Course.objects.filter(code=course_id).exists():
        raise Http404('Course with the code {}, does not exist.'.format(course_id))
    if assignment:
        if not Assignment.objects.filter(assignmentID=assignment, courseID__code=course_id).exists():
            raise Http404('Assignment with the assignment_id: {}, does not exist.'.format(assignment))
        url += '#view={0}&assignment_id={1}'.format(
            'experiment_design' if experiment else 'assignments',
            assignment,
        )
    return redirect(url)
