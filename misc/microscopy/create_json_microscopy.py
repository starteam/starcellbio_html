import os

object = {}
slides = 0

for (dirpath, dirnames, filenames) in os.walk(os.getcwd()):
    for filename in filenames:
        if (filename != '.DS_Store'):
            slides = slides + 1
            object['img' + str(slides)] = dirpath.replace(
                '/Users/srkadmin/VE/scb2/starcellbio_html/html_app/', ''
            ) + '/' + filename
            print filename

#print object

f = open('slides.txt', 'w')
f.write(str(object))
f.close()
