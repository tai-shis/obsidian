### Tensors
- built around the *torch.Tensor* class
- **Scalar**
	- zero dimensional tensor
	- to get the item from the tensor, we can use the .item() method
		- retrieves a python integer
- **Vector**
	- single dimension tensor
	- can contain many numbers
	- e.g.
		- \[3, 2] can describe \[bedrooms, bathrooms] in a house
			- this has a "shape" of 2
		- also \[3, 2, 2] ---> \[bedrooms, bathrooms, car_parks]
			- this has a "shape" of 3
	- *a vector is flexible in what it can represent*
	- we can see the dimension number directly corresponds to the *number of brackets*
- **Matrix**
	- two dimension tensor
	- as flexible, but with another dimension
	- e.g.
		- matrix \[\[7, 8], \[9, 10]]
			- two dimensions (.ndim method)
			- shape \[2, 2]
				- 2x2 matrix
- *Tensor example*
```Python
# Tensor
TENSOR = torch.tensor([[[1, 2, 3],
                        [3, 6, 9],
                        [2, 4, 5]]])
TENSOR.ndim     #outputs 3
TENSOR.shape    #outputs torch.Size([1, 3, 3])
				#this basically means the outer has 1 item of 3 items of 3 items
```
- We usually start out with *large random tensors of numbers*
	- we hardly ever make these ourselves
- i.e.
	- `start with random numbers -> look at the data -> update random numbers -> look at data -> etc`
- **Steps**
	- *Initialization*
		- define how the machine learning model starts
	- *Representation*
		- how the mlm looks at data
	- *Optimization*
		- how the mlm updates its random numbers
```Python
# Create a random tensor of size (3, 4)
random_tensor = torch.rand(size=(3, 4))
random_tensor

""" 
Outputs
tensor([[0.6541, 0.4807, 0.2162, 0.6168],
         [0.4428, 0.6608, 0.6194, 0.8620],
         [0.2795, 0.6055, 0.4958, 0.5483]])
"""
```
- *We can also fill tensors with zeros/ones*
```Python
zeros = torch.zeros(size=(3,4))
"""
Output:
tensor([[0., 0., 0., 0.],
        [0., 0., 0., 0.],
        [0., 0., 0., 0.]])
"""

ones = torch.ones(size=(3,4))
"""
Output:
tensor([[1., 1., 1., 1.],
        [1., 1., 1., 1.],
        [1., 1., 1., 1.]])
"""
```
- **Basic arithmetic is possible on tensors**
```Python
# Create a tensor of values and add a number to it
tensor = torch.tensor([1, 2, 3])
tensor + 10

# Outputs: tensor([11, 12, 13])

# Multiply it by 10
tensor * 10

# Outputs: tensor([10, 20, 30])
```
- **Tensors to apply values must be reassigned**
	- notice how it didn't become 110, 120, 130
	- So, if we check the value after the code above, we get this:
```Python
tensor
# Outputs: tensor([1, 2, 3])
```
- There are methods to do this within functions, but it is easier to use operators
```Python
print(tensor, "*", tensor)
print("Equals:", tensor * tensor)
"""
Outputs:
tensor([1, 2, 3]) * tensor([1, 2, 3])
Equals: tensor([1, 4, 9])
"""
```
- The most common operation however, is **matrix multiplication**
- *PyTorch has a method for this: `torch.matmul()`*
- Standard Matrix Multiplication rules apply:
	- Inner dimensions must match
	- Product of matrices has the shape of the outer dimensions
		- (2, 3) @ (3, 2) -> (2, 2)
- **There is a difference between element-wise matrix multiplication and normal matrix multiplication**
```Python
# Element-wise matrix multiplication
tensor * tensor

# Matrix multiplication
torch.matmul(tensor, tensor)

# Matrix multiplication (shorthand)
torch.mm(tensor, tensor)

# Can also use the "@" symbol for matrix multiplication, though not recommended
tensor @ tensor
```
- *We avoid matrix multiplication by hand as matmul is faster*
- **We can also transpose matrices in PyTorch**
	- Through the method "T"
	- e.g. **tensor.T** will transpose the matrix tensor
- *There is a module: torch.nn.Linear() which implements the following equation:*$$ y = x\cdot{A^T} + b $$
- Where:
	- **x** is the input to the layer
	- **A** is the weights matrix created by the layer 
		- (starts out as random numbers which slowly get optimized to represent patterns in data)
	- **b** the bias term to offset the weights and inputs
	- **y** the output
---
### Finding the min, max, mean, sum, etc. (aggregation)
- There a few ways to go about getting these values
```Python
# Create a tensor
x = torch.arange(0, 100, 10)
# x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]

print(f"Minimum: {x.min()}")
print(f"Maximum: {x.max()}")
# print(f"Mean: {x.mean()}") # this will error
print(f"Mean: {x.type(torch.float32).mean()}") # won't work without float datatype
print(f"Sum: {x.sum()}")

"""
Outputs:
Minimum: 0
Maximum: 90
Mean: 45.0
Sum: 450
"""

```
- *We can also do these with torch methods.*
	- e.g. `torch.max(x)` gives `tensor(90)`
- Its also possible to obtain the **index** of where the max/min occurs using the following:
	- `torch.argmax()`
	- `torch.argmin()`
```Python
# Create a tensor
tensor = torch.arange(10, 100, 10)
print(f"Tensor: {tensor}")

# Returns index of max and min values
print(f"Index where max value occurs: {tensor.argmax()}")
print(f"Index where min value occurs: {tensor.argmin()}")

"""
Output:
Tensor: tensor([10, 20, 30, 40, 50, 60, 70, 80, 90])
Index where max value occurs: 8
Index where min value occurs: 0
"""
```
- ***A Common issue people face in deep learning operations is having your tensors in different datatypes***
- For example, if one tensor is in "torch.float64" and the other is in "torch.float32" you may run into errors
- To fix these, we can *change* the data types of tensors using `torch.Tensory.type(dtype=None)`
	- Where dtype is a parameter for the datatype you would like to use
```Python
# Creates a tensor and checks its datatype
tensor = torch.arange(10., 100., 10.)
tensor.dtype
# Outputs: torch.float32

# Creates a float16 tensor
tensor_float16 = tensor.type(torch.float16)
tensor_float16
#Outputs: tensor([10., 20., 30., 40., 50., 60., 70., 80., 90.], dtype=torch.float16)
```
- And so on so forth, we can do similar things with other data types.
- **Note: there are also methods to reshape/modify the sizes and dimensions of the tensors without changing the pre-existing values**
	- I don't think these will be all too important in my cases, but it is good to know that this is possible
---
### Indexing Tensors
- **We can index into tensors quite easily similar to python lists/numpy arrays**
	- Take the following example of a 3x3 matrix
```Python
import torch
x = torch.arange(1, 10).reshape(1, 3, 3)

"""
Where x is:
(tensor([[[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]])
"""

# Let's index bracket by bracket
print(f"First square bracket:\n{x[0]}") 
print(f"Second square bracket: {x[0][0]}") 
print(f"Third square bracket: {x[0][0][0]}")

"""
Outputs:
First square bracket:
tensor([[1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]])
Second square bracket: tensor([1, 2, 3])
Third square bracket: 1
"""
```
- You can also use `:` to specify "all values in this dimension" and then use a comma (,) to add another dimension.
	- I wont go into this, but its on [In/Out 60-63](https://www.learnpytorch.io/00_pytorch_fundamentals/)
		- (Where all this information is from lmao)
---
### PyTorch Tensors and NumPy
- **NumPy works with PyTorch very nicely!**
- There are two main methods that we will use:
	- [`torch.from_numpy(ndarray)`](https://pytorch.org/docs/stable/generated/torch.from_numpy.html) - NumPy array -> PyTorch tensor.
	- [`torch.Tensor.numpy()`](https://pytorch.org/docs/stable/generated/torch.Tensor.numpy.html) - PyTorch tensor -> NumPy array.
```Python
# Here is an example of them being used

# NumPy array to tensor
import torch
import numpy as np
array = np.arange(1.0, 8.0)
tensor = torch.from_numpy(array)
array, tensor

"""
Outputs:
(array([1., 2., 3., 4., 5., 6., 7.]),
 tensor([1., 2., 3., 4., 5., 6., 7.], dtype=torch.float64))
"""
```
- See for more concrete examples of conversion at [In/Out 64-67](https://www.learnpytorch.io/00_pytorch_fundamentals/)
---
### Reproducibility
- **We can set seeds easily is essentially it for this section**
	- using torch.manual_seed(seed=seed)
- Like this:
```Python
import torch
import random

# # Set the random seed
RANDOM_SEED=42 # try changing this to different values and see what happens to the numbers below
torch.manual_seed(seed=RANDOM_SEED) 
random_tensor_C = torch.rand(3, 4)

# Have to reset the seed every time a new rand() is called 
# Without this, tensor_D would be different to tensor_C 
torch.random.manual_seed(seed=RANDOM_SEED) # try commenting this line out and seeing what happens
random_tensor_D = torch.rand(3, 4)

print(f"Tensor C:\n{random_tensor_C}\n")
print(f"Tensor D:\n{random_tensor_D}\n")
print(f"Does Tensor C equal Tensor D? (anywhere)")
random_tensor_C == random_tensor_D

"""
Outputs:

Tensor C:
tensor([[0.8823, 0.9150, 0.3829, 0.9593],
        [0.3904, 0.6009, 0.2566, 0.7936],
        [0.9408, 0.1332, 0.9346, 0.5936]])

Tensor D:
tensor([[0.8823, 0.9150, 0.3829, 0.9593],
        [0.3904, 0.6009, 0.2566, 0.7936],
        [0.9408, 0.1332, 0.9346, 0.5936]])

Does Tensor C equal Tensor D? (anywhere)

Out[69]:

tensor([[True, True, True, True],
        [True, True, True, True],
        [True, True, True, True]])
"""
```
---
### Running PyTorch on the GPU
- Once we got a GPU ready, the next step is getting PyTorch to use for storing data (tensors) and computing on data (performing operations on tensors).
- We use the *torch.cuda* package to do this
- You can test if PyTorch has access to a GPU using [`torch.cuda.is_available()`](https://pytorch.org/docs/stable/generated/torch.cuda.is_available.html#torch.cuda.is_available).
```Python
# Check for GPU
import torch
torch.cuda.is_available()

# Outputs a boolean

# Set device type
device = "cuda" if torch.cuda.is_available() else "cpu"
device

# This will output which one we are using
```
- *If the above output `"cuda"` it means we can set all of our PyTorch code to use the available CUDA device (a GPU) and if it output `"cpu"`, our PyTorch code will stick with the CPU.*
- You can count the number of GPUs PyTorch has access to using [`torch.cuda.device_count()`](https://pytorch.org/docs/stable/generated/torch.cuda.device_count.html#torch.cuda.device_count).
---
# TODO: Do exercises.