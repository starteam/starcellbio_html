import random

list = []
indices =[]
counter = 0
while len(indices) <120:
	indices.append(counter)
	counter+=1

#indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

f = open('706_2014_ps2_mapping.txt','w')

while len(list) < 120:
	string = ""
	while len(string) != 5 :
		num = random.randint(1, 5)
		if num == 1 and not ('1' in string):
			string+='1'
		elif num == 2 and not ('2' in string):
			string+='2'
		elif num == 3 and not ('3' in string):
			string+='3'
		elif num == 4 and not ('4' in string):
			string+='4'
		elif num == 5 and not ('5' in string):
			string+='5'
	if string in list:
		print 'alreadythere'
	else:
		list.append(string)

print list
dict_list = zip(indices,list)
dict_list = dict(dict_list)
print dict_list
f.write(str(dict_list))
f.close()