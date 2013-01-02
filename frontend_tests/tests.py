"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from StarCellBio import settings
from django.test import TestCase
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
import time
import pudb

class SimpleTest(TestCase):
    @classmethod
    def setUpClass(self):
        #self.driver = webdriver.Firefox()
        print settings.rel('../../chromedriver')
        self.driver = webdriver.Chrome(settings.rel('../../chromedriver'))
        self.base_url = 'http://localhost:8000/static/index.html'

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

    """
    This tests that website is up at all
    """

    def test_website_is_up(self):
        self.load_website()

    """
    This tests that website opening website leads to Assignments page
    """

    def test_assignments_page(self):
        self.load_website()
        self.assert_on_assignments_page()

    """
        This tests that one can go to navigation page and back
    """

    def test_assignment_navigation_tests(self):
        self.load_website()
        self.assert_on_assignments_page()
        self.select_assignment('basic_tests', title='StarCellBio Basic Tests',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.open_assignment('basic_tests', title='StarCellBio Basic Tests',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.assert_on_assignment_page()
        self.navigate_via('Assignments')
        self.assert_on_assignments_page()
        self.open_assignment('basic_tests', title='StarCellBio Basic Tests',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.assert_on_assignment_page()
        self.assert_experiments([])
        self.navigate_via('New Experiment')
        self.assert_on_experiment_design_page()
        experiment_title = 'Test Experiment 12'
        experiment_hypo = 'Sample hypothesis ABC'
        self.set_experiment_design_values(experiment_title, experiment_hypo)
        self.navigate_via('Assignment')
        self.assert_on_assignment_page()
        self.assert_experiments(['Test Experiment 12'])
        self.navigate_via(experiment_title)
        self.assert_on_experiment_design_page()
        self.assert_experiment_design_values(experiment_title, experiment_hypo)
        self.navigate_via('Experiment setup')
        self.assert_on_experiment_setup_page()
        self.assert_samples([])
        sample1 = {'cell_line_id': 'wt', 'treatment_id': 'P1', 'collection_id': '3 d'}
        sample2 = {'cell_line_id': 'wt', 'treatment_id': 'P6', 'collection_id': '3 d'}
        sample3 = {'cell_line_id': 'wt', 'treatment_id': 'P2', 'collection_id': '3 d'}
        sample4 = {'cell_line_id': 'wt', 'treatment_id': 'P3', 'collection_id': '3 d'}
        sample5 = {'cell_line_id': 'wt', 'treatment_id': 'P4', 'collection_id': '3 d'}
        self.add_sample(sample1)
        self.assert_samples([sample1])
        self.add_sample(sample2)
        self.assert_samples([sample1,sample2])
        self.remove_sample([sample1])
        self.assert_samples([sample2])
        self.add_sample(sample1)
        self.assert_samples([sample2,sample1])
        self.add_sample(sample3)
        self.assert_samples([sample2,sample1,sample3])
        self.add_sample(sample4)
        self.assert_samples([sample2,sample1,sample3,sample4])
        self.add_sample(sample5)
        self.assert_samples([sample2,sample1,sample3,sample4,sample5])
        self.navigate_via('Design Experiment')
        self.assert_on_experiment_design_page()
        self.navigate_via('Experiment setup')
        self.assert_on_experiment_setup_page()
        self.assert_samples([sample2,sample1,sample3,sample4,sample5])
        self.navigate_via('Run Experiment')
        self.assert_on_experiment_run_page()
        self.navigate_via('Select technique')
        self.assert_on_select_technique_page()
        self.assert_western_blots([])
        self.navigate_via('New Western Blot')
        self.assert_on_western_blot_page()
        self.navigate_via('Select technique')
        self.assert_on_select_technique_page()
        self.assert_western_blots(['W.B. Exp. 1'])
        self.navigate_via('New Western Blot')
        self.assert_on_western_blot_page()
        self.navigate_via('Select technique')
        self.assert_on_select_technique_page()
        self.assert_western_blots(['W.B. Exp. 1','W.B. Exp. 2'])
        self.navigate_via('W.B. Exp. 2')
        self.assert_on_western_blot_page()
        self.assert_western_blot_tabs('W.B. Exp. 2', ['W.B. Exp. 1'])
        self.navigate_via('W.B. Exp. 1')
        self.assert_western_blot_tabs('W.B. Exp. 1', ['W.B. Exp. 2'])
        self.navigate_via('Select technique')
        self.assert_on_select_technique_page()
        self.navigate_via('New Western Blot')
        self.assert_on_western_blot_page()
        self.assert_western_blot_tabs('W.B. Exp. 3', ['W.B. Exp. 1', 'W.B. Exp. 2'])
        self.remove_western_blot()
        self.assert_on_select_technique_page()
        self.navigate_via('W.B. Exp. 1')
        self.assert_western_blot_tabs('W.B. Exp. 1', ['W.B. Exp. 2'])
        pudb.set_trace()
        self.navigate_via('Select technique')


    ## navigation helpers and assertions
    def assert_on_assignments_page(self):
        self.find_by_class_name('scb_s_assignments_view');

    def assert_on_assignment_page(self):
        self.find_by_class_name('scb_s_assignment_view');

    def assert_on_experiment_design_page(self):
        self.find_by_class_name('scb_s_experiment_design_view')

    def assert_on_experiment_setup_page(self):
        self.find_by_class_name('scb_s_experiment_setup_view')
        self.find_by_class_name('scb_s_experiment_setup_table_editable')

    def assert_on_experiment_run_page(self):
        self.find_by_class_name('scb_s_experiment_setup_view')
        self.find_by_class_name('scb_s_experiment_setup_table_readonly')

    def assert_on_select_technique_page(self):
        self.find_by_class_name('scb_s_select_technique_view')

    def assert_on_western_blot_page(self):
        self.find_by_class_name('scb_s_western_blot_view')

    def assert_experiments(self, experiment_list):
        web_experiment_list = self.driver.find_elements_by_class_name('scb_f_open_assignment_experiment')
        self.assertEqual(experiment_list.__len__(), web_experiment_list.__len__())
        web_experiment_titles = [x.text for x in web_experiment_list]
        self.assertEqual(web_experiment_titles, experiment_list)
        pass

    def set_experiment_design_values(self, title, hypo):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        e_title.clear()
        e_title.send_keys(title)
        e_title.send_keys("\n")
        e_hypo.clear()
        e_hypo.send_keys(hypo)
        e_hypo.send_keys("\n")
        pass

    def assert_experiment_design_values(self, title, hypo):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        self.assertEqual(e_title.get_attribute('value'), title)
        self.assertEqual(e_hypo.text, hypo)
        pass


    def assert_samples(self, samples_list):
        web_sample_rows = self.driver.find_elements_by_class_name('scb_s_experiment_setup_table_row');
        web_sample_list = [y for y in set([x.get_attribute('cell_treatment') for x in web_sample_rows])]
        self.assertEqual(samples_list.__len__(), web_sample_list.__len__())

    def add_sample(self, sample):
        add_button = self.find_by_class_name('scb_f_experiment_setup_action_open_add_samples_dialog');
        add_button.click()
        self.find_by_class_name('scb_s_experiment_setup_table_add_samples_dialog')
        self.select_option(sample['cell_line_id'], 'value', 'scb_s_experiment_setup_dialog_cell_lines_select_option')
        self.select_option(sample['treatment_id'], 'value', 'scb_s_experiment_setup_dialog_treatments_select_option')
        self.select_option(sample['collection_id'], 'value','scb_s_experiment_setup_dialog_collection_select_option')
        add_dialog_button = self.find_by_class_name('scb_f_experiment_setup_dialog_apply')
        add_dialog_button.click()

    def remove_sample(self,sample):
        remove_button = self.find_by_class_name('scb_f_experiment_setup_remove_sample')
        remove_button.click();

    def assert_western_blots(self, western_blot_titles):
        web_wb_rows = self.driver.find_elements_by_class_name('scb_f_open_western_blot');
        self.assertEqual(western_blot_titles.__len__(), web_wb_rows.__len__())
        web_wb_list = [x.text for x in web_wb_rows]
        self.assertEqual(web_wb_list, western_blot_titles)

    def assert_western_blot_tabs(self, western_blot_active, western_blot_titles):
        web_active_western_blot = self.find_by_class_name('scb_s_western_blot_selected')
        self.assertEqual(western_blot_active,web_active_western_blot.text)
        web_wb_rows = self.driver.find_elements_by_class_name('scb_f_open_western_blot');
        self.assertEqual(western_blot_titles.__len__(), web_wb_rows.__len__())
        web_wb_list = [x.text for x in web_wb_rows]
        self.assertEqual(web_wb_list, western_blot_titles)

    def remove_western_blot(self):
        web_active_western_blot_remove_button = self.find_by_class_name('scb_f_western_blot_remove')
        web_active_western_blot_remove_button.click()

    def select_option(self, value, attribute, css_class):
        web_options = self.driver.find_elements_by_class_name(css_class)
        web_filtered = [x for x in web_options if x.get_attribute(attribute) == value]
        self.assertGreater(web_filtered.__len__(), 0)
        option = web_filtered[0]
        option.click()

    def load_website(self):
        self.driver.get(self.base_url)
        main = self.driver.find_element_by_id('main');
        self.assertEqual(main.tag_name, u'div')


    def select_assignment(self, name, title, description, **map):
        assignment = self.find_by_link_text(title)
        self.assertEqual(assignment.tag_name, u'a')
        assignment.click()
        assignment = self.find_by_link_text(title)
        cls = assignment.get_attribute('class')
        self.assertRegexpMatches(cls, 'scb_f_open_assignment')
        new_exp = self.find_by_link_text('New Experiment')
        new_exp_href = new_exp.get_attribute('href')
        self.assertRegexpMatches(new_exp_href, "assignment_id=%s" % name)
        self.assertRegexpMatches(new_exp_href, "view=experiment_design")
        abstract = self.find_by_class_name('scb_s_abstract').text
        self.assertRegexpMatches(abstract, title)


    def open_assignment(self, name, title, description, **map):
        assignment = self.find_by_link_text(title)
        cls = assignment.get_attribute('class')
        self.assertRegexpMatches(cls, 'scb_f_open_assignment')
        assignment.click()


    def navigate_via(self, title):
        back = self.find_by_link_text(title)
        back.click()

    ## WebDriver helpers
    def find_by_class_name(self, class_name):
        elements = self.driver.find_elements_by_class_name(class_name)
        self.assertGreater(elements.__len__(), 0)
        return elements[0]


    def find_by_selector(self, selector):
        elements = self.driver.find_elements_by_css_selector(selector)
        self.assertGreater(elements.__len__(), 0)
        return elements[0]


    def find_by_link_text(self, selector):
        elements = self.driver.find_elements_by_link_text(selector)
        self.assertGreater(elements.__len__(), 0)
        return elements[0]

