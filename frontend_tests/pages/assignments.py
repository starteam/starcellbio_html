from .object import PageObject
from .experiment import ExperimentDesignPage


class AssignmentsPage(PageObject):
    url_fragment = '#view=assignments'

    def is_browser_on_page(self):
        return self.q(css='.scb_s_assignments_sidebar_course').visible

    def click_exercise(self, num):
        self.q(css="[model_id=scb_ex{}]".format(num)).click()

    def start_experiment(self):
        self.q(css=".scb_assignments_new_experiment").click()
        return ExperimentDesignPage(
            self.browser, self.base_url
        ).wait_for_page()
