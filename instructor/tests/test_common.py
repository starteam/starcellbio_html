from django.test import TestCase
from instructor.common import get_pages, page_order
from instructor.models import Assignment, Course


class GetPagesTest(TestCase):
    def test_two_pages_enabled(self):
        """
        Test first 2 pages are enabled on assignment creation
        """
        correct_pages = {page_name: False for page_name in page_order}
        correct_pages['assignment'] = True
        correct_pages['course'] = True

        assignment = Assignment(
            course=Course(
                name='CourseName',
                code='test_course'
            ),
            name='Assignment First Page',
            assignment_id='assignment_only_first_page'
        )

        self.assertDictEqual(get_pages(assignment), correct_pages)

    def test_first_facs_page_enabled(self):
        """
        Test first facs page is enabled, and no wb pages
        """
        correct_pages = {
            page_name: (False if page_name.startswith('wb') else True)
            for page_name in page_order
        }

        correct_pages['facs_sample_prep'] = True
        correct_pages['facs_analyze'] = False

        assignment = Assignment(
            course=Course(
                name='CourseName',
                code='test_course'
            ),
            name='Assignment First Page',
            assignment_id='assignment_first_facs_page',
            last_page_name='techniques',
            has_fc=True
        )

        self.assertDictEqual(get_pages(assignment), correct_pages)

    def test_all_wb_pages_enabled(self):
        """
        Test all wb pages are enabled, and no facs
        """
        correct_pages = {page_name: True for page_name in page_order}

        assignment = Assignment(
            course=Course(
                name='CourseName',
                code='test_course'
            ),
            name='Assignment First Page',
            assignment_id='assignment_first_facs_page',
            last_page_name='wb_band_intensity'
        )

        self.assertDictEqual(get_pages(assignment), correct_pages)
