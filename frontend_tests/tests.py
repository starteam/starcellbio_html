"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from StarCellBio import settings
from django.contrib.auth.models import User
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
import time
from selenium.webdriver import ActionChains
import platform
import os
import os.path
import sys

from .pages.homepage import Homepage

REPO_ROOT=os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

class SimpleTest(LiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        cls.browser = webdriver.Remote(
            os.getenv('SELENIUM_URL', 'http://localhost:14444/wd/hub'),
            webdriver.DesiredCapabilities.FIREFOX.copy()
        )
        super(SimpleTest, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        cls.browser.quit()
        super(SimpleTest, cls).tearDownClass()

    def tearDown(self):
        if sys.exc_info()[0]:
            test_method_name = self._testMethodName
            self.browser.save_screenshot(os.path.join(REPO_ROOT, 'screenshots',  "{}.png".format(test_method_name)))

        super(SimpleTest, self).tearDown()


    def setUp(self):
        User.objects.create_user(username='test', password='test')

    def _setup_experiment(self, number=3, samples=tuple()):
        """
        Returns technique page with samples selected for particular exercise number
        """
        assert len(samples) >= 1
        home = Homepage(self.browser, base_url=self.live_server_url).visit()
        assignments = home.try_experiment()
        assignments.click_exercise(number)
        design = assignments.start_experiment()
        setup = design.experiment_setup()

        sample_modal = setup.add_samples()
        for sample in samples:
            sample_modal.select_sample(*sample)
        sample_modal.add_samples()

        return setup.run_experiment()

    def test_can_create_experiment(self):
        technique = self._setup_experiment(3, [
            ['NoUB', 'gm30'],
            ['NoUB', 'gm60'],
        ])
        self.assertTrue(technique.is_browser_on_page())

    def test_can_run_western_blotting(self):
        technique = self._setup_experiment(3, [
            ['NoUB', 'gm30'],
            ['NoUB', 'gm60'],
        ])

        wb = technique.western_blot()
        wb.select_all()
        wb.prepare_lysates()
        wb.select_gel_type(12)
        wb.add_marker()
        wb.load_gel()
        wb.run_gel_transfer()
        wb.set_primary_antibody("Mouse anti-PGK1")
        wb.set_secondary_antibody("goat anti-rabbit")
        wb.blot_and_develop()

        self.assertIn('Blotting Conditions', self.browser.page_source)

    def test_can_run_flow_cytometry(self):
        technique = self._setup_experiment(3, [
            ['NoUB', 'gm30'],
            ['NoUB', 'gm60'],
        ])

        facs = technique.flow_cytometry()
        facs.select_all()
        facs.prepare_samples()
        facs.run_samples()
        facs.analyze_data()

        self.assertIn('Analysis Tools', self.browser.page_source)

    def test_can_run_microscopy(self):
        technique = self._setup_experiment(3, [
            ['WT-EGFR', 'gm30'],
        ])

        micro = technique.microscopy()
        micro.select_all_samples()
        micro.add_all_conditions()
        micro.prepare_slides()
        micro.load_slides()

        self.assertIn("Your slides have been loaded.", self.browser.page_source)
