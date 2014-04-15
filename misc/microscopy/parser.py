slides = 0
from pprint import pprint
# 
# '1': [{
# 		hash: 'img31',
# 		mag: 'N/A',
# 		if_type: 'merge'
# 	}]
	
object = {}
	
for x in range(295, 1303):
	slides = slides + 1
	object[str(slides)] = [{'hash': 'img'+str("%04d" % (x,)) ,'mag': 'N/A', 'if_type': 'merge'}]


with open('composite4.txt','wt') as out:
	pprint(object, stream=out)
