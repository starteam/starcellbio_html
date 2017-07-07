import logging

from lti_provider.models import OutcomeService, GradedLaunch

logger = logging.getLogger(__name__)


def store_outcomes_params(request_params, user, consumer):
    result_source_id = request_params.get('lis_result_sourcedid')
    course_id = request_params.get('course_id')

    if result_source_id:
        result_service_url = request_params.get('lis_outcome_service_url')
        if not result_service_url:
            logger.warn(
                "Outcome Service required parameter 'lis_outcome_service_url' is missing from scored assignment; "
                "Scores cannot be return without it. Request parameters: {}".format(request_params)
            )
        outcomes, _ = OutcomeService.objects.get_or_create(
            lis_outcome_service_url=result_source_id,
            lti_consumer=consumer
        )
        GradedLaunch.objects.get_or_create(
            lis_result_sourcedid=result_source_id,
            course_id=course_id,
            user=user,
            outcome_service=outcomes
        )
