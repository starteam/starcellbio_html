Using Selenium
==============

General

    tests.py does not work with Firefox on selenium version 2.26.0 (i.e. one specified in requirements.txt) but does work with Chrome

    tests.py works with Firefox on selenium version 2.35.0, but limited functionality

Mechanics of Sortable (required info for Selenium sortable testing)

    A sortable list is classified with ui-sortable in tag. When an element is clicked and moved any amount of pixels in a sortable list, an automatic ui-sortable-placeholder, with no information and hidden visibility. While visually you are moving the original element, you are actually moving the placeholder. The original clicked element remains in place. When you release the visual placeholder, you are making the element visible and copying the information from the original element to the placeholder. The original element is deleted.

Tried Methods for Chrome Browser for Selenium 2.26.0 (didn't work)

    For all these elements I use s to refer to the original element and t to refer to the placeholder I am trying to move the first element of a list greater or equal to 2 to the end of the list.

    click_and_hold s, move_by_offset (0,110), click t
    click_and_hold s, move_by_offset (0, 5) , drag_and_drop_by_offset s 0,110
    click_and_hold s, move_by_offset (0,5), drag_and_drop_by_offset t, 0, 110
    ac.drag_and_drop_by_offset(s, 0,110).perform()
    javascript using execute_script
    use ui-sortable-helper and ui-sortable-placeholder to refer to s and t elements
    ac.click_and_hold(s).perform() ac.move_by_offset(0,200).perform() targets = self.driver.find_elements_by_class_name('ui-sortable-placeholder') self.driver.execute_script("var t = document.getElementsByClassName('ui-sortable-placeholder')[0]; t.textContent = 'target'; t.style.visibility = 'visible';") t = targets[0] ac.click_and_hold(t).perform() ac.move_by_offset(0,110).perform() t.click()
    ac.click_and_hold(s).perform() ac.move_to_element(t).perform() s.click()
    ### Various other combinations on Windows and Ubuntu VMs and using both Chrome and Firefox combos with both versions of selenium library
    Code has been commented out for the time being; will work on at later time.