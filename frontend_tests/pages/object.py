from bok_choy.page_object import PageObject as BokChoyPageObject

class PageObject(BokChoyPageObject):
    """
    A page object with helpers to run on live server test cases (with variable
    base URLs)
    """
    url_fragment = None

    def __init__(self, browser, base_url=""):
        if not base_url:
            raise AttributeError("You must specify the base url of the page")

        if self.url_fragment is None:
            raise AttributeError("You must define the url_fragment for this class")

        self.base_url = base_url
        super(PageObject, self).__init__(browser)

    def is_browser_on_page(self):
        return self.q(css='.experiment_name_header').visible

    @property
    def url(self):
        return "{}/{}".format(self.base_url, self.url_fragment)