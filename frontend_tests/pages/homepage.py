from .object import PageObject
from .assignments import AssignmentsPage

class Homepage(PageObject):
    url_fragment = ""

    @property
    def _try_experiment_element(self):
        return self.q(css='.scb_f_try_an_experiment')

    def is_browser_on_page(self):
        return self._try_experiment_element.visible

    def try_experiment(self):
        self._try_experiment_element.click()
        return AssignmentsPage(self.browser, self.base_url).wait_for_page()
