import os
from pprint import pprint

object = {}
sorted_object = {}
slides = 84

for(dirpath, dirnames, filenames) in os.walk(os.getcwd()):
    for filename in filenames:
        if(filename != '.DS_Store' and filename != 'slides_composites.txt' and filename != 'create_json_microscopy2.py' ):
            slides = slides+1
            object['img'+str("%04d" % (slides,))] = dirpath.replace('/Users/srkadmin/VE/scb2/starcellbio_html/html_app/', '')+'/'+filename
            print filename
            
#print object
for key in sorted(object.iterkeys()):
    sorted_object[key] =  object[key]

with open('slides_composites2.txt','wt') as out:
    pprint(sorted_object, stream=out)