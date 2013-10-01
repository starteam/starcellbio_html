#!/usr/bin/env python
import os
import re
import time
from subprocess import Popen, PIPE
import pudb


# email address to send feedback to
FEEDBACK_EMAIL="star@mit.edu"

FEEDBACK_SUBJECT_LENGTH = 85

IGNORED_EMAILS_FILE="/home/star/feedback/ignore_emails.txt"

MAIL_TEMPLATE="""
From: %(from_email)s
To: %(to_email)s
Subject: %(subject)s

%(message)s
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



def success(post):
   return SUCCESS_TEMPLATE % post

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
def get_post_dict(request):
   if globals()['POST_DICT'] is None:
       #pudb.set_trace()
       form = request.POST.dict()
       post_dict = {}
       post_dict['project'] = form.get('project')
       if post_dict['project'] is None:
           raise MissingData('Missing data for project', 'Please specify a project')
       post_dict['report'] = form.get('report')
       if post_dict['report'] is None:
           raise MissingData('Missing data for report', 'Please choose a report type')
       post_dict['note'] = form.get('note')
       if post_dict['note'] is None:
           raise MissingData('Missing data for note', 'Please leave a comment')

       post_dict['user_ip'] = request.environ.get('REMOTE_ADDR')
       post_dict['browser'] = request.environ.get('HTTP_USER_AGENT')
       post_dict['name'] = form.get('name')
       post_dict['source'] = form.get('source')
       post_dict['email'] = form.get('email')
       if post_dict['email'] == '' or post_dict['email'] is None:
       		post_dict['email']="starcellbio@starapp.mit.edu"
       post_dict['subscribe'] = form.get('subscribe')
       post_dict['localtime'] = time.ctime()
       post_dict['timestamp'] = int(time.time())
       post_dict['feedback'] = FEEDBACK_TEMPLATE % post_dict
       globals()['POST_DICT'] = post_dict
   return POST_DICT

def format_subject_from_post():
   post_dict = POST_DICT
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
