random_mapping = {0: 'DEBAC', 1: 'DABEC', 2: 'CABED', 3: 'ACDEB', 4: 'EBADC', 5: 'BDECA', 6: 'EBCAD', 7: 'ADBCE', 8: 'CBAED', 9: 'DEACB', 10: 'ECDAB', 11: 'EDACB', 12: 'EBACD', 13: 'EADBC', 14: 'CBDEA', 15: 'CEDBA', 16: 'AEDCB', 17: 'DCBEA', 18: 'EDCAB', 19: 'ECBDA', 20: 'ABDCE', 21: 'BCAED', 22: 'ADECB', 23: 'BCADE', 24: 'BACED', 25: 'AEDBC', 26: 'EADCB', 27: 'AEBCD', 28: 'DBECA', 29: 'CAEBD', 30: 'ABECD', 31: 'CDAEB', 32: 'EABDC', 33: 'BDCEA', 34: 'CADEB', 35: 'DEABC', 36: 'BDACE', 37: 'AEBDC', 38: 'EBDAC', 39: 'ABCED', 40: 'EBCDA', 41: 'DACBE', 42: 'DCBAE', 43: 'BDCAE', 44: 'AECBD', 45: 'DCEBA', 46: 'ACEDB', 47: 'BCEAD', 48: 'CDEAB', 49: 'ECDBA', 50: 'DAECB', 51: 'BEACD', 52: 'CDBEA', 53: 'ACEBD', 54: 'DBEAC', 55: 'ACBED', 56: 'CBDAE', 57: 'ABCDE', 58: 'ADCBE', 59: 'BAECD', 60: 'DECAB', 61: 'ADCEB', 62: 'BCDAE', 63: 'CBADE', 64: 'CEADB', 65: 'CEBDA', 66: 'EACDB', 67: 'DBAEC', 68: 'EDCBA', 69: 'DEBCA', 70: 'CDEBA', 71: 'BAEDC', 72: 'CAEDB', 73: 'EDBCA', 74: 'ABDEC', 75: 'EDABC', 76: 'CADBE', 77: 'DCABE', 78: 'ADBEC', 79: 'ABEDC', 80: 'EBDCA', 81: 'DCAEB', 82: 'BEDCA', 83: 'CEBAD', 84: 'CBEDA', 85: 'DABCE', 86: 'BECDA', 87: 'EDBAC', 88: 'CBEAD', 89: 'BADEC', 90: 'BDAEC', 91: 'ADEBC', 92: 'CEABD', 93: 'DBCAE', 94: 'BECAD', 95: 'BCDEA', 96: 'BCEDA', 97: 'ECBAD', 98: 'DBCEA', 99: 'AECDB', 100: 'DCEAB', 101: 'BADCE', 102: 'DBACE', 103: 'EACBD', 104: 'CDABE', 105: 'BACDE', 106: 'ACDBE', 107: 'ECABD', 108: 'CDBAE', 109: 'DACEB', 110: 'BEADC', 111: 'EABCD', 112: 'CABDE', 113: 'BDEAC', 114: 'CEDAB', 115: 'DECBA', 116: 'DAEBC', 117: 'ECADB', 118: 'ACBDE', 119: 'BEDAC'}
random_mapping_ps2 = {0: '52341', 1: '32145', 2: '32514', 3: '32451', 4: '12453', 5: '32145', 6: '12354', 7: '12453', 8: '12543', 9: '52341', 10: '52431', 11: '42153', 12: '12354', 13: '52314', 14: '32514', 15: '32514', 16: '52413', 17: '32541', 18: '32145', 19: '42315', 20: '12435', 21: '52341', 22: '12354', 23: '52143'}




import sys
import hashlib

def get_coding(email):
	md5=hashlib.md5()
	md5.update(str(email).lower())
	encoded_email = md5.hexdigest()
	encoded_number = int(encoded_email, 16)%120
	encoded_number2 = int(encoded_email, 16)%24
	order = random_mapping[encoded_number]
	order2 = random_mapping_ps2[encoded_number2]
	print order
	print order2







if __name__ == "__main__":
   get_coding(sys.argv[1])