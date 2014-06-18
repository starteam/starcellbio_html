#!/usr/bin/env python
from fsevents import Observer
from fsevents import Stream
import os
import time
from threading import Timer
from subprocess import call

root = os.environ['VIRTUAL_ENV']+'/starcellbio_html/html_app/'

global_update_index = True
js = dict();
css = dict();
time = '?_='+str(int(time.time()))

css_prefix = '<link type="text/css" href="/static/'
css_suffix = '" rel="Stylesheet" />\n'

js_prefix='<script type="text/javascript" src="/static/'
js_suffix='" charset="UTF-8"></script>\n'

html_prefix = "<!DOCTYPE html><html><head><META http-equiv='Content-Type' content='text/html; charset=UTF-8'><meta http-equiv='content-type' content='text/html; charset=utf-8'><title>StarCellBio Prototype</title>\n"
#html_prefix += '<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=SourceSansPro">'
# html_suffix = js_prefix + "../scb/get_student_courses.js" + js_suffix
# html_suffix = js_prefix + "../scb/get_instructor_assignments.js" + js_suffix
# html_suffix += js_prefix + "../scb/get_model.js" + js_suffix
html_suffix = "</head><body><div id='main'></div><script>$(function(){starcellbio('#main',{});}); window.clearCookie = function() { document.cookie='sessionid=\"invalid\"'};</script></body>"
# <script>$(function(){ var jquery = $.noConflict();if(! window.$ ) { window.$ = jquery; } starcellbio('#main',{});}); window.clearCookie = function() { document.cookie='sessionid=\"invalid\"'};</script>
# add raven
html_suffix += "<script src='//cdn.ravenjs.com/1.1.11/jquery,native/raven.min.js'></script> <script> Raven.config('https://7845856fc975496e8dc2130b7140b19c@app.getsentry.com/19461', { whitelistUrls: ['starcellbio.mit.edu'] }).install(); </script>"

def index_html():
    global css,js
    if( js.has_key( 'js/jquery-1.7.2.min.js' )):
        js.pop('js/jquery-1.7.2.min.js')
    if( js.has_key( 'starcellbio.app.js' )):
        js.pop('starcellbio.app.js')
    if( js.has_key( 'swipe/Gruntfile.js' )):
        js.pop('swipe/Gruntfile.js')
    
    css_join = css_prefix + (time+css_suffix+css_prefix).join(css.keys())+ time + css_suffix
    js_join = js_prefix + (time+js_suffix+js_prefix).join(js.keys())  + js_suffix
    js_join = js_prefix + "../scb/get_user.js" + js_suffix + js_join
    js_join = js_prefix + "starcellbio.app.js" + js_suffix + js_join
    js_join = js_prefix + "js/jquery-1.7.2.min.js" + js_suffix + js_join
    return html_prefix + css_join + js_join + html_suffix 

def update_index_html():
    f = open(root+"index.html","w")
    f.write(index_html())
    f.close()
    print "new index.html"

def processor( path ): 
    global global_update_index, css, js
    update_index = False
    path = path.replace("//","/")
    url = path.replace(root,"")
    if( path.find("instructor/") > 0 ):
        return
    if( path.endswith(".js") ):
        js[url] = 1
        update_index = True
    if( path.endswith(".css") ):
        css[url] = 1
        update_index = True
    if( path.endswith(".soy") ):
        infile = path
        outfile = os.path.dirname(infile) + "/gen/" + os.path.basename(infile) + ".js"
        call(["java", "-jar" , "../tools/SoyToJsSrcCompiler.jar" , "--outputPathFormat" , outfile , infile ]) 
        print "compile soy %s " % (path)
    if( path.endswith(".gss") ):
        infile = path
        outfile = os.path.dirname(infile) + "/gen/" + os.path.basename(infile) + ".css"
        call(["java", "-jar" , "../tools/closure-stylesheets-20111230.jar" , "--pretty-print" , infile , "-o" , outfile])
        print "compile gss %s to %s " % (infile,outfile)
    if( path.endswith(".touch_index" ) ):
        update_index_html()
    if(update_index):
        global_update_index = True
        os.utime("%s.touch_index" % root, None)

def callback( e ):
    name = e.name
    cookie = e.cookie
    mask = e.mask
    processor(name)

for subdir, dir, files in os.walk( root ):
    for file in files:
        path = "%s/%s" % (subdir,file)
        processor(path)

update_index_html()

try:
    observer = Observer()
    stream = Stream( callback , root , file_events=True)
    observer.schedule(stream)
    observer.run()
except:
    observer.stop()
