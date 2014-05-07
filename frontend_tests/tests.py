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
from selenium.webdriver import ActionChains
import platform

class SimpleTest(TestCase):
    @classmethod
    def setUpClass(self):
        #self.driver = webdriver.Firefox()
        print settings.rel('../../mac/chromedriver')
        self.driver = webdriver.Chrome(settings.rel('../../mac/chromedriver'))
        #print settings.rel('../../ubuntu/chromedriver')
        #self.driver = webdriver.Chrome(settings.rel('../../ubuntu/chromedriver'))
        self.base_url = 'http://localhost:8000/static/index.html#view=assignments'

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
        #pudb.set_trace()
        self.select_assignment('decusability', title='StarCellBio Usability Test',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.open_assignment('decusability', title='StarCellBio Usability Test',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
#         self.navigate_via(' ASSIGNMENTS')
#         self.assert_on_assignments_page()
#         self.open_assignment('decusability', title='StarCellBio Usability Test',
#             description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
#         self.assert_on_assignment_page()
#         self.assert_experiments([])
#         self.navigate_via('New Experiment')
        self.assert_on_experiment_design_page()
        experiment_title = 'Test Experiment'
        experiment_hypo = 'Sample hypothesis ABC'
        experiment_obj = 'Sample objective ABC'
        self.set_experiment_design_values(experiment_title, experiment_hypo,experiment_obj)
        self.navigate_via('ASSIGNMENTS')
        self.assert_on_assignments_page()
#         self.assert_experiments(['Test Experiment'])
        self.select_assignment('decusability', title='StarCellBio Usability Test',
            description='$DISPLAY_ASSIGNMENT_INSTRUCTIONS$')
        self.navigate_via('EXPERIMENTS')
        self.assert_on_experiment_design_page()
        self.assert_experiment_design_values(experiment_title, experiment_hypo,experiment_obj)
        self.navigate_via('EXPERIMENT SETUP')
        self.assert_on_experiment_setup_page()
        self.select_new_set_up()
        self.assert_samples([])
        sample1 = {'cell_line': 'wt', 'treatment_id': 'media_only,25'}
        sample2 = {'cell_line': 'wt', 'treatment_id': 'media_only,40'}
        sample3 = {'cell_line': 'm1', 'treatment_id': 'media_only,25'}
        sample4 = {'cell_line': 'm1', 'treatment_id': 'media_only,40'}
        sample5 = {'cell_line': 'm2', 'treatment_id': 'media_only,25'}
        self.add_sample(sample1)
        self.assert_samples([sample1])
        self.add_sample(sample2)
        self.assert_samples([sample1,sample2])
        self.remove_sample([sample1])
        self.assert_samples([sample2])
        self.add_sample(sample1)
        
        #pudb.set_trace()
        self.assert_samples([sample2,sample1])
        self.add_sample(sample3)
        self.assert_samples([sample2,sample1,sample3])
        self.add_sample(sample4)
        self.assert_samples([sample2,sample1,sample3,sample4])
        self.add_sample(sample5)
        self.assert_samples([sample2,sample1,sample3,sample4,sample5])
        self.navigate_via('DESIGN EXPERIMENT')
        self.assert_on_experiment_design_page()
        self.navigate_via('EXPERIMENT SETUP')
        self.assert_on_experiment_setup_page()
        self.assert_samples([sample2,sample1,sample3,sample4,sample5])
        self.navigate_via('RUN EXPERIMENT')
        
        self.assert_on_experiment_setup_page()
        self.navigate_via('CONFIRM SET-UP')
        self.assert_on_select_technique_page()
        self.assert_western_blots([])
        self.navigate_via('NEW WESTERN BLOT')
        self.assert_on_western_blot_page()
        self.navigate_via('SELECT TECHNIQUE')
        self.assert_on_select_technique_page()
        self.assert_western_blots(['W. B. 1'])
        self.navigate_via('NEW WESTERN BLOT')
        self.assert_on_western_blot_page()
        self.navigate_via('SELECT TECHNIQUE')
        self.assert_on_select_technique_page()
        self.assert_western_blots(['W. B. 1','W. B. 2'])
        self.navigate_via('W. B. 2')
        self.assert_on_western_blot_page()
        self.assert_western_blot_tabs('W. B. 2', ['W. B. 1', 'ADD\n| +'])
        #pudb.set_trace()
        self.navigate_via('W. B. 1')
        self.assert_western_blot_tabs('W. B. 1', ['W. B. 2', 'ADD\n| +'])
        self.navigate_via('SELECT TECHNIQUE')
        self.assert_on_select_technique_page()
        self.navigate_via('NEW WESTERN BLOT')
        self.assert_on_western_blot_page()
        self.assert_western_blot_tabs('W. B. 3', ['W. B. 1', 'W. B. 2', 'ADD\n| +'])
        pudb.set_trace()
        self.remove_western_blot()
        
        self.assert_western_blot_tabs('W. B. 2', ['W. B. 1', 'ADD\n| +'])
        self.rename_western_blot('Exp. 1')
        self.navigate_via('SELECT TECHNIQUE')
        self.assert_on_select_technique_page()
        self.navigate_via('Exp. 1')
        self.assert_western_blot_tabs('Exp. 1', ['W. B. 1', 'ADD\n| +'])
        #pudb.set_trace()
        self.select_lysates()
        self.navigate_via('PREPARE LYSATES')
        #pudb.set_trace()
        self.select_gel_type()
        old_order = self.read_list()
        #The drag and drop command in selenium does not work on the Mac OSX, only the linux
        #if(self.driver.name == u'chrome'):
        print 'old order'
        print old_order
        if(platform.mac_ver()[0] != ''):
        	self.test_sortable()
        	time.sleep(5)
        	new_order = self.read_list()
        	print 'new order:'
        	print new_order
        	#self.assert_order_different(old_order, new_order)
        self.select_load_marker()
        if(platform.mac_ver()[0] != ''):
        	load_order = self.read_list()
        	#self.assert_order_different(old_order, load_order)
        	print 'load_order'
        	print load_order
        self.select_gel_and_transfer()
        if(platform.mac_ver()[0] != ''):
        	gel_order = self.read_list()
        	#self.assert_order_different(old_order, gel_order)
        	#self.assert_order_same(new_order, gel_order)
		print 'gel_order'
		print gel_order
        wb_sample1 = { 'primary_antibody':'1' , 'secondary_antibody':'2' }
        self.select_wb_antibody(wb_sample1)
        self.navigate_via('BLOT')
        #pudb.set_trace()
        self.navigate_via('RE-PROBE')
        self.navigate_via('anti-let-23')
        self.navigate_via('BLOT')
        self.navigate_via('SELECT TECHNIQUE')

    ## navigation helpers and assertions
    def assert_on_assignments_page(self):
        self.find_by_class_name('scb_s_assignments_view')

    def assert_on_assignment_page(self):
        self.find_by_class_name('scb_s_assignment_view')

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
    
    def assert_order_different(self, old, new):
		self.assertNotEqual(old, new)	    
    
    def assert_order_same(self, old, new):
    	self.assertEqual(old, new)
    	
    def read_list(self):
    	array=[]
    	elements = self.driver.find_elements_by_class_name('scb_s_western_blot_choose_samples_list_item')
    	if (elements == []):
    		elements = self.driver.find_elements_by_class_name('scb_s_western_blot_choose_samples_list')
        self.assertGreaterEqual(elements.__len__(), 2)
        for e in elements:
        	array.append(e.get_attribute('id'))
        return array

    def assert_experiments(self, experiment_list):
        web_experiment_list = self.driver.find_elements_by_class_name('scb_f_open_assignment_experiment')
        self.assertEqual(experiment_list.__len__(), web_experiment_list.__len__())
        web_experiment_titles = [x.text for x in web_experiment_list]
        self.assertEqual(web_experiment_titles, experiment_list)
        pass

    def set_experiment_design_values(self, title, hypo,obj):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        e_obj = self.find_by_class_name('scb_s_experiment_design_objective')
        e_title.clear()
        e_title.send_keys(title)
        e_title.send_keys("\n")
        e_hypo.clear()
        e_hypo.send_keys(hypo)
        e_hypo.send_keys("\n")
        e_obj.clear()
        e_obj.send_keys(obj)
        e_obj.send_keys("\n")
        pass

    def assert_experiment_design_values(self, title, hypo,obj):
        e_title = self.find_by_class_name('scb_s_experiment_name_edit')
        e_hypo = self.find_by_class_name('scb_s_experiment_design_hypothesis')
        e_obj = self.find_by_class_name('scb_s_experiment_design_objective')
        self.assertEqual(e_title.get_attribute('value'), title)
        self.assertEqual(e_hypo.text, hypo)
        self.assertEqual(e_obj.text, obj)
        pass

    def assert_samples(self, samples_list):
        web_sample_rows = self.driver.find_elements_by_class_name('scb_s_experiment_setup_table_row')
        web_sample_list = [y for y in set([x.get_attribute('cell_treatment_id') for x in web_sample_rows])]
        self.assertEqual(samples_list.__len__(), web_sample_list.__len__())

    def add_sample(self, sample):
        add_button = self.find_by_class_name('scb_f_experiment_setup_action_open_add_samples_dialog')
        add_button.click()
        self.find_by_class_name('scb_mit706s16_dialog')
        self.select_option(sample['cell_line'], 'cell_line', 'scb_f_experiment_setup_dialog_checkbox')
#         self.select_option(sample['treatment_id'], 'treatment_id', 'scb_f_experiment_setup_dialog_checkbox')
#         self.select_option(sample['collection_id'], 'value','scb_s_experiment_setup_dialog_collection_select_option')
        add_dialog_button = self.find_by_class_name('scb_mit706s16_inner_dialog_add')
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
        self.assertEqual(western_blot_active, (web_active_western_blot.text if len(web_active_western_blot.text)>0 else web_active_western_blot.get_attribute('value')))
        web_wb_rows = self.driver.find_elements_by_class_name('scb_f_open_western_blot');
        self.assertEqual(western_blot_titles.__len__(), web_wb_rows.__len__())
        web_wb_list = [x.text for x in web_wb_rows]
        self.assertEqual(web_wb_list, western_blot_titles)

    def remove_western_blot(self):
        web_active_western_blot_remove_button = self.find_by_class_name('scb_f_western_blot_remove')
        web_active_western_blot_remove_button.click()

    def rename_western_blot(self, title):
        e_title = self.find_by_class_name('scb_s_western_blot_selected')
        e_title.clear()
        e_title.send_keys(title)
        e_title.send_keys("\n")
        
    def select_new_set_up(self):
    	e_class = self.find_by_class_name('scb_f_experiment_setup_new_set_up')
    	e_class.click()


    def select_wb_antibody(self,sample):
        time.sleep(1)
        self.select_option(sample['primary_antibody'], 'model_id', 'scb_f_wb_anti_body_select_primary_option')
        time.sleep(1)
        self.select_option(sample['secondary_antibody'], 'model_id', 'scb_f_wb_anti_body_select_secondary_option')
        pass

    def select_option(self, value, attribute, css_class):
        web_options = self.driver.find_elements_by_class_name(css_class)
        web_filtered = [x for x in web_options if x.get_attribute(attribute) == value]
        self.assertGreater(web_filtered.__len__(), 0)
        option = web_filtered[0]
        option.click()

    def select_gel_type(self):
        e_class = self.find_by_class_name('scb_s_western_blot_choose_gel_type_input')
        e_class.click()
        
    def select_load_marker(self):
        e_class = self.find_by_class_name('scb_s_western_blot_load_marker')
        e_class.click()
    
    def select_gel_and_transfer(self):
    	e_class = self.find_by_class_name('scb_s_western_blot_run_gel_and_transfer')
    	e_class.click()

    def select_lysates(self):
        cbs = self.driver.find_elements_by_css_selector('.scb_f_western_blot_sample_active')
        for i in range(0,cbs.__len__()):
            checkboxes = self.driver.find_elements_by_css_selector('.scb_f_western_blot_sample_active')
            cb = checkboxes[i]
            cb.click()
            select = self.driver.find_elements_by_css_selector('.scb_f_western_blot_select_lysate_type')
            options = select[2*i].find_elements_by_tag_name('option')
            option = [x for x in options if x.get_attribute('value') == 'whole']
            if(option.__len__() > 0 ):
                option[0].click()

    def load_website(self):
        self.driver.get(self.base_url)
        main = self.driver.find_element_by_id('main');
        self.assertEqual(main.tag_name, u'div')


    def select_assignment(self, name, title, description, **map):
        assignment = self.find_by_link_text(title)
        self.assertEqual(assignment.tag_name, u'a')
        assignment.click()
        assignment = self.find_by_link_text(title)
        #pudb.set_trace()
        cls = assignment.get_attribute('class')
        self.assertRegexpMatches(cls, 'scb_f_open_assignment')
        new_exp = self.find_by_class_name('scb_assignments_new_experiment')
        new_exp_href = new_exp.get_attribute('href')
        self.assertRegexpMatches(new_exp_href, "assignment_id=%s" % name)
        self.assertRegexpMatches(new_exp_href, "view=experiment_design")
        abstract = self.find_by_class_name('scb_s_abstract').text
        self.assertRegexpMatches(abstract, title)


    def open_assignment(self, name, title, description, **map):
        assignment = self.find_by_class_name('scb_assignments_new_experiment')
        cls = assignment.get_attribute('class')
        #pudb.set_trace()
        self.assertRegexpMatches(cls, 'scb_f_open_experiment')
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
        elements = self.driver.find_elements_by_partial_link_text(selector)
        self.assertGreater(elements.__len__(), 0)
        return elements[0]
        
        
    def test_sortable(self):
    	with open(settings.rel('../html_app/js/jquery-1.7.2.js')) as jquery_js_2:
    		jquery = jquery_js_2.read()
    	self.driver.execute_script(jquery)
    	with open(settings.rel('jquery.simulate.drag-sortable.js')) as jquery_js_3:
    		jquery_drag = jquery_js_3.read()
    	self.driver.execute_script(jquery_drag)
    	#Need this library to be injected beyond the jquery to make sure you don't get errors for the other selectors
    	with open(settings.rel('../html_app/js/jquery.ba-bbq.min.js')) as jquery_js_4:
    		jquery_bbq = jquery_js_4.read()
    	self.driver.execute_script(jquery_bbq)
    	script = "$($('.scb_s_western_blot_choose_samples_list_item')[0]).simulateDragSortable({ move: 1 });"
    	success = self.driver.execute_script(script)
    	
