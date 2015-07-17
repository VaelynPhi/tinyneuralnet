import numpy as np

# sigmoid function
def nonlin(x,deriv=False):
	if(deriv==True):
		return x*(1-x)
	return 1/(1+np.exp(-x))
	
# input dataset
X = np.array([ [0,0,1], [0,1,1], [1,0,1], [1,1,1] ])

# output dataset            
y = np.array([ [0,0,1,1] ]).T

# seed random numbers to make calculation deterministic (just a good practice)
# np.random.seed(1)

# initialize weights randomly with mean 0
# syn0 = 2*np.random.random((3,1)) - 1
syn0 = [[-0.16595599], [ 0.44064899], [-0.99977125]]
# syn0 = [[3], [5], [7]]

# for iter in range(10000):

# 	# forward propagation
l0 = X
print("l0:", *l0)
print("syn0:", *syn0)
ld = np.dot(l0,syn0)
print("ld:", *ld)

l1 = nonlin(np.dot(l0,syn0))
print("l1:", *l1)

# 	# how much did we miss?
l1_error = y - l1
print("l1_error:", *l1_error)

# 	# multiply how much we missed by the 
# 	# slope of the sigmoid at the values in l1
l1_nonlin = nonlin(l1,True)
print("l1_nonlin:", *l1_nonlin)
l1_delta = l1_error * nonlin(l1,True)
print("l1_delta:", *l1_delta)
l1_delta1 = l1_error * l1_nonlin
print("l1_delta1:", *l1_delta1)

l0t = l0.T;
print("l0t:", *l0t)

syn0_update = np.dot(l0t,l1_delta)
print("syn0_update:", *syn0_update)

# 	# update weights
#syn01 += np.dot(l0.T,l1_delta)
syn0 += syn0_update
print("syn0:", *syn0)

# print("Output After Training:", *l1)
