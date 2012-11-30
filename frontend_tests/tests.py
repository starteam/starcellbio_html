"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
import time
import pudb

class SimpleTest(TestCase):
    @classmethod
    def setUpClass(self):
        self.driver = webdriver.Firefox()
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
        self.assert_on_assigments_page()

    """
        This tests that one can go to navigation page and back
    """

    def test_assignment_navigation_tests(self):
        self.load_website()
        self.assert_on_assigments_page()
        self.select_assignment('basic_tests', title='StarCellBio Basic Tests',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.open_assignment('basic_tests', title='StarCellBio Basic Tests',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.assert_on_assigment_page()
        self.go_back('Assignments')
        self.assert_on_assigments_page()
        self.open_assignment('basic_tests', title='StarCellBio Basic Tests',
                    description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.assert_on_assigment_page()
        self.assert_experiments([])
        self.go_back('New Experiment')
        self.assert_on_experiment_design_page()
        experiment_title = 'Test Experiment 12'
        experiment_hypo = 'Sample hypothesis ABC'
        self.set_experiment_design_values(experiment_title,experiment_hypo)
        self.go_back('Assignment')
        self.assert_on_assigment_page()
        self.assert_experiments(['Test Experiment 12'])
        self.go_back(experiment_title)
        self.assert_on_experiment_design_page()
        self.assert_experiment_design_values(experiment_title,experiment_hypo)

    ## navigation helpers and assertions
    def assert_on_assigments_page(self):
        self.find_by_class_name('scb_s_assignments_view');

    def assert_on_assigment_page(self):
        self.find_by_class_name('scb_s_assignment_view');

    def assert_on_experiment_design_page(self):
        self.find_by_class_name('scb_s_experiment_design_view')

    def assert_experiments(self,experiment_list):
        web_experiment_list = self.driver.find_elements_by_class_name('scb_f_open_assignment_experiment')
        self.assertEqual(experiment_list.__len__(), web_experiment_list.__len__())
        web_experiment_titles = [x.text for x in web_experiment_list]
        self.assertEqual( web_experiment_titles , experiment_list )
        pass

    def set_experiment_design_values(self,title,hypo):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        e_title.clear()
        e_title.send_keys(title)
        e_title.send_keys("\n")
        e_hypo.clear()
        e_hypo.send_keys(hypo)
        e_hypo.send_keys("\n")
        pass

    def assert_experiment_design_values(self,title,hypo):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        self.assertEqual(e_title.get_attribute('value'),title)
        self.assertEqual(e_hypo.text,hypo)
        pass

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


    def go_back(self, title):
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

