from selenium.webdriver.support.ui import Select
from .object import PageObject

class ExperimentDesignPage(PageObject):
    url_fragment = "#view=experiment_design"

    def experiment_setup(self):
        self.q(css=".scb_f_open_experiment_setup").click()
        return ExperimentSetupPage(self.browser, self.base_url).wait_for_page()

    def is_browser_on_page(self):
        return self.q(css='.experiment_name_header').visible


class ExperimentSetupPage(PageObject):
    url_fragment = "#view=experiment_setup"

    def is_browser_on_page(self):
        return self.q(css='.scb_f_experiment_setup_action_open_add_samples_dialog').visible

    def add_samples(self):
        self.q(css=".scb_f_experiment_setup_action_open_add_samples_dialog").click()
        return AddSampleModal(self)

    def run_experiment(self):
        self.q(css=".scb_f_run_experiment").click()
        self.q(css=".scb_f_open_select_technique").click()
        return ExperimentSelectTechnique(self.browser, self.base_url).wait_for_page()

class AddSampleModal(object):
    """
    Simple modal which is tied to ExperimentSetupPage.
    """
    def __init__(self, page):
        self.page = page

    def select_sample(self, cell_line, name):
        """treatment_id is a param on the checkbox in the modal"""
        self.page.q(css="[cell_line={}][name={}]".format(cell_line, name)).click()

    def add_samples(self):
        self.page.q(css=".scb_ex_inner_dialog_add").click()


class ExperimentSelectTechnique(PageObject):
    url_fragment = "#view=select_technique"

    def is_browser_on_page(self):
        return self.q(css=".scb_f_new_western_blot").visible

    def flow_cytometry(self):
        self.q(css=".scb_f_new_flow_cytometry").click()
        return FlowCytometry(self.browser, self.base_url).wait_for_page()

    def western_blot(self):
        self.q(css=".scb_f_new_western_blot").click()
        return WesternBlot(self.browser, self.base_url).wait_for_page()

    def microscopy(self):
        self.q(css=".scb_f_new_microscopy").click()
        return Microscopy(self.browser, self.base_url).wait_for_page()

class WesternBlot(PageObject):
    url_fragment = "#view=western_blot"

    # TODO(jabrahms): Would be nice to have a state manager here to turn some
    # methods on and some off depending on browser state.

    def is_browser_on_page(self):
        return self.q(css=".scb_s_experiment_step_button_wb.scb_s_experiment_step_selected").visible

    # Stage 1
    def select_all(self):
        self.q(css=".scb_f_western_blot_sample_active_all").click()

    def prepare_lysates(self):
        self.q(css=".scb_f_western_blot_prepare_lysates").click()

    # Stage 2
    def select_gel_type(self, gel_type):
        gel_type_mapping = {
            10: ".scb_s_western_blot_gel_type_radio_ten",
            12: ".scb_s_western_blot_gel_type_radio_twelve",
            15: ".scb_s_western_blot_gel_type_radio_fifteen",
        }
        self.q(css=gel_type_mapping[gel_type]).click()

    def add_marker(self):
        # TODO(jabrahms): Assert we've selected gel type.
        self.q(css=".scb_s_western_blot_load_marker").click()

    def load_gel(self):
        self.q(css=".scb_s_western_blot_load_all").click()

    def run_gel_transfer(self):
        self.q(css=".scb_s_western_blot_run_gel_and_transfer").click()

    # Stage 3
    def set_primary_antibody(self, text):
        dropdown = Select(self.q(css=".scb_f_wb_anti_body_select_primary")[0])
        dropdown.select_by_visible_text(text)

    def set_secondary_antibody(self, text):
        dropdown = Select(self.q(css=".scb_f_wb_anti_body_select_secondary")[0])
        dropdown.select_by_visible_text(text)

    def blot_and_develop(self):
        self.q(css=".scb_s_western_blot_blot_and_develop").click()


class FlowCytometry(PageObject):
    url_fragment = "#view=facs"

    def is_browser_on_page(self):
        return self.q(css=".scb_s_experiment_step_button_facs.scb_s_experiment_step_selected").visible

    def select_all(self):
        self.q(css=".scb_f_facs_sample_active_all").click()

    def prepare_samples(self):
        self.q(css=".scb_f_facs_prepare_lysates").click()

    def run_samples(self):
        self.q(css=".scb_f_facs_run_samples_short").click()

    def analyze_data(self):
        self.q(css=".scb_f_facs_tools_start_analysis").click()

class Microscopy(PageObject):
    url_fragment = "#view=microscopy"

    def is_browser_on_page(self):
        return self.q(css=".scb_s_experiment_step_button_micro.scb_s_experiment_step_selected").visible

    def select_all_samples(self):
        self.q(css=".scb_f_microscopy_sample_active_all").click()

    def add_all_conditions(self):
        self.q(css=".scb_f_microscopy_add_all_conditions").click()

    def prepare_slides(self):
        self.q(css=".scb_f_microscopy_prepare_slides").click()

    def load_slides(self):
        self.q(css=".scb_f_microscopy_load_slides").click()