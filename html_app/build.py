#!/usr/bin/env python

"""The static asset pipeline for StarCellBio.

Usage:
  build.py
  build.py watch
  build.py -p | --prod
  build.py -h | --help


Options:
  -p --prod       Do production javascript/css pipelining
  -h --help       Show this help screen.

"""

import logging
import os
import sh
from subprocess import call
import time

from docopt import docopt
from ordereddict import OrderedDict  # For 2.6 compatibility
from watchdog.observers import Observer
from watchdog.events import RegexMatchingEventHandler
import yaml

ROOT = os.path.dirname(os.path.realpath(__file__))
REPO_ROOT = os.path.dirname(ROOT)
STATIC_ASSETS = 'static_assets.yml'

prod_minify = False
global_update_index = True
js = dict()
css = dict()

TIME = '?_=' + str(int(time.time()))

CSS_PREFIX = '<link type="text/css" href="/static/'
CSS_SUFFIX = '" rel="Stylesheet" />\n'

JS_PREFIX = '<script type="text/javascript" src="/static/'
JS_SUFFIX = '" charset="UTF-8"></script>\n'

HTML_PREFIX = """
<!DOCTYPE html>
<html>
  <head>
    <META http-equiv='Content-Type' content='text/html; charset=UTF-8'>
    <meta http-equiv='content-type' content='text/html; charset=utf-8'>
    <title>StarCellBio Prototype</title>
"""
HTML_SUFFIX = """
</head>
<body>
  <div id='main'></div>
  <script>
    $(function() {
      init_scb('#main', {});
    });
    window.clearCookie = function() {
      document.cookie = 'sessionid="invalid"'
    };
  </script>
</body>
"""
# add raven
HTML_SUFFIX += """
<script src='//cdn.ravenjs.com/1.1.11/jquery,native/raven.min.js'></script>
<script>
  Raven.config(
    'https://7845856fc975496e8dc2130b7140b19c@app.getsentry.com/19461',
    { whitelistUrls: ['starcellbio.mit.edu'] }
  ).install();
</script>
"""


def minify_all_js(js):
    """Concatenates and then minifies each file passed in"""
    all_file_packed = os.path.join(ROOT, 'gen', 'all.packed.js')
    dynamic_scripts = []
    uglify_params = []
    for file_name in js:
        path = os.path.join(ROOT, file_name)
        if os.path.isfile(path):
            uglify_params.append(path)
        else:
            dynamic_scripts.append(file_name)
    sh.uglifyjs(
        *uglify_params, o=all_file_packed
    )
    dynamic_scripts.append(os.path.join(
        'gen',
        os.path.basename(all_file_packed)
    ))
    return dynamic_scripts


def minify_all_css(css):
    """Concatenate and minify all css"""
    all_file_packed = os.path.join(ROOT, 'gen', 'all.packed.css')
    css_paths = [os.path.join(ROOT, x) for x in css]
    sh.cleancss(o=all_file_packed, *css_paths)
    return [os.path.join('gen', os.path.basename(all_file_packed))]


def index_html():
    # Load yaml file of javascript deps
    with open(os.path.join(
            os.path.dirname(ROOT),
            STATIC_ASSETS
    )) as yaml_file:
        static_assets = yaml.load(yaml_file)
        js = static_assets['javascripts']
        css = static_assets['css']

    # Concatenate all the CSS includes
    css = list(OrderedDict.fromkeys(css))
    if prod_minify:
        css = minify_all_css(css)
    css_join = (
        CSS_PREFIX +
        (TIME + CSS_SUFFIX + CSS_PREFIX).join(css) +
        TIME + CSS_SUFFIX
    )
    # Concatenate all the js files
    # Remove duplicates
    js = list(OrderedDict.fromkeys(js))
    # If production, then minify everything
    if prod_minify:
        js = minify_all_js(js)
    js_join = (
        JS_PREFIX +
        (TIME + JS_SUFFIX + JS_PREFIX).join(js) +
        JS_SUFFIX
    )

    return HTML_PREFIX + css_join + js_join + HTML_SUFFIX


def update_index_html():
    f = open(
        os.path.join(ROOT, "index.html"),
        "w"
    )
    f.write(index_html())
    f.close()
    print "new index.html"


def processor(path):
    """The translation pipeline for static assets.

    Arguments:
    path (str) -- the path to the static asset to process.

    """

    global global_update_index
    update_index = False
    path = path.replace("//", "/")
    if path.endswith(".js"):
        update_index = True
    if path.endswith(".css"):
        update_index = True
    if path.endswith(".soy"):
        infile = path
        outfile = "{}/gen/{}.js".format(
            os.path.dirname(infile),
            os.path.basename(infile)
        )
        call([
            "java",
            "-jar", os.path.join(REPO_ROOT, "tools/SoyToJsSrcCompiler.jar"),
            "--outputPathFormat", outfile,
            infile
        ])
        print "compile soy {} ".format(path)
    if path.endswith(".gss"):
        infile = path
        outfile = "{}/gen/{}.css".format(
            os.path.dirname(infile),
            os.path.basename(infile)
        )
        call([
            "java",
            "-jar", os.path.join(REPO_ROOT, "tools/closure-stylesheets-20111230.jar"),
            "--pretty-print", infile,
            "-o", outfile
        ])
        print "compile gss {} to {} ".format(infile, outfile)
    if update_index:
        global_update_index = True
        os.utime(os.path.join(ROOT, ".touch_index"), None)


def process_all():
    for subdir, _, files in os.walk(ROOT):
        for f in files:
            path = "{}/{}".format(subdir, f)
            processor(path)

    update_index_html()


class StaticConversionEventHandler(RegexMatchingEventHandler):
    """
    Match static files in the source directory and translate them.
    """

    def __init__(self):
        super(StaticConversionEventHandler, self).__init__(
            regexes=[".*\.(soy|gss)$"],
            ignore_directories=True,
            case_sensitive=False
        )

    def do_conversion(self, event):
        """
        Translate the static assets.
        """
        processor(event.src_path)
        update_index_html()

    def on_modified(self, event):
        """
        Process modified markdown files.
        """
        self.do_conversion(event)

    def on_created(self, event):
        """
        Process newly created markdown files.
        """
        self.do_conversion(event)


def watch(source):
    """
    Watch the source directory for changes until a KeyboardInterrupt is
    encountered.
    """
    observer = Observer()
    event_handler = StaticConversionEventHandler()
    observer.schedule(event_handler, source, recursive=True)

    logging.info("Starting watcher..")

    try:
        observer.start()
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logging.info("Keyboard interrupt received; stopping watcher..")
        observer.stop()

    observer.join()


if __name__ == "__main__":
    args = docopt(__doc__)

    logging.basicConfig(
        level=logging.INFO,
        format='[%(asctime)s] %(levelname)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    if args['--prod']:
        prod_minify = True
    if args['watch']:
        watch(".")
    else:
        process_all()
