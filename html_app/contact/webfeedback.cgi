#!/usr/bin/env python
import os
import re
import time
from subprocess import Popen, PIPE
import cgi
import cgitb

# disable for production
cgitb.enable()

# email address to send feedback to
FEEDBACK_EMAIL="star@mit.edu"

FEEDBACK_SUBJECT_LENGTH = 85

FEEDBACK_LOG_FILE="/home/star/feedback/feedback_%s"

IGNORED_EMAILS_FILE="/home/star/feedback/ignore_emails.txt"

MAIL_TEMPLATE="""
From: %(from_email)s
To: %(to_email)s
Subject: %(subject)s

%(message)s
"""

FEEDBACK_LOG_TEMPLATE="""
IP: %(user_ip)s
Browser: %(browser)s
%(feedback)s
"""

FEEDBACK_TEMPLATE="""
Star WebFeedback
Time: %(localtime)s
Name: %(name)s
Project: %(project)s
Source: %(source)s
Report: %(report)s
Email: %(email)s
Subscribe: %(subscribe)s
Note: %(note)s
"""

SUCCESS_TEMPLATE="""
<html>
<head>
<meta http-equiv="refresh" content="2;url=http://web.mit.edu/star/"/>
</head>
<body>
Thank you for your feedback.
</body>
</html>
"""

class MissingData(Exception):
   def __init__(self, msg, value):
       self.msg = msg
       self.value = value

   def __str__(self):
       return str(self.msg)

def log_feedback(post):
   log_file = open(FEEDBACK_LOG_FILE % post['timestamp'],'w')
   log_contents = FEEDBACK_LOG_TEMPLATE % post
   log_file.writelines(log_contents)
   log_file.close()

def success(post):
   print SUCCESS_TEMPLATE % post

def send_feedback(post):
   from_email = post['email']
   to_email = FEEDBACK_EMAIL
   subject = format_subject_from_post()
   message = post['feedback']
   send_email(from_email, to_email, subject, message)

def send_email(from_email, to_email, subject, message):
   email_vars = {'from_email': from_email, 'to_email': to_email,
   'subject': subject, 'message': message}

   SENDMAIL = "/usr/sbin/sendmail" # sendmail location

   #p = os.popen("%s -t" % SENDMAIL, "w")
   p = Popen("%s -t" % SENDMAIL, shell=True, stdin=PIPE).stdin
   lines = (MAIL_TEMPLATE % email_vars).splitlines()[1:]
   lines = [ line.strip() + '\n' for line in lines ]
   p.writelines(lines)
   sts = p.close()
   if sts is not None:
       print "sending mail failed: ", sts

# caching needed since cgi drains data 
POST_DICT = None
def get_post_dict():
   if globals()['POST_DICT'] is None:
       form = cgi.FieldStorage()
       post_dict = {}
       post_dict['project'] = form.getvalue('project')
       if post_dict['project'] is None:
           raise MissingData('Missing data for project', 'Please specify a project')
       post_dict['report'] = form.getvalue('report')
       if post_dict['report'] is None:
           raise MissingData('Missing data for report', 'Please choose a report type')
       post_dict['note'] = form.getvalue('note')
       if post_dict['note'] is None:
           raise MissingData('Missing data for note', 'Please leave a comment')

       post_dict['user_ip'] = os.environ.get('REMOTE_ADDR')
       post_dict['browser'] = os.environ.get('HTTP_USER_AGENT')
       post_dict['name'] = form.getvalue('name')
       post_dict['source'] = form.getvalue('source')
       post_dict['email'] = form.getvalue('email', default="star@mit.edu")
       post_dict['subscribe'] = form.getvalue('subscribe')
       post_dict['localtime'] = time.ctime()
       post_dict['timestamp'] = int(time.time())
       post_dict['feedback'] = FEEDBACK_TEMPLATE % post_dict
       globals()['POST_DICT'] = post_dict
   return POST_DICT

def format_subject_from_post():
   post_dict = get_post_dict()
   pattern = re.compile('[\W_]+')
   subject = 'WebFeedback - %s: ' % post_dict['project']
   trailing = '...'
   numchars = FEEDBACK_SUBJECT_LENGTH - len(subject) - len(trailing)
   subject += pattern.sub(' ', post_dict['note'])[:numchars]
   subject += trailing
   return subject

def print_post_report(post):
   print "<ul>"
   for var in post:
       print "<li>%s: %s</li>" % (var, post[var])
   print "</ul>"

def get_ignored_emails():
   return open(IGNORED_EMAILS_FILE).read().splitlines()

def main():
   print "Content-Type: text/html"     # HTML is following
   print                               # blank line, end of headers

   method = os.environ['REQUEST_METHOD']
   if method == "POST":
       try:
           post = get_post_dict()
       except MissingData, e:
           print "<h1>Error: %s</h1>" % e.value
           return
       #print_post_report(post)
       if not post.get('email', '') in get_ignored_emails():
           send_feedback(post)
           log_feedback(post)
       success(post)
   else:
       print 'POST-only cgi'

if __name__ == "__main__":
   main()