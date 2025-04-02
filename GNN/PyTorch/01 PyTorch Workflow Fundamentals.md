### Basic PyTorch Workflow
1) Getting data ready
	- turning stuff into tensors
2) Build or pick a pretrained model
	1) Pick a loss function and optimizer
	2) Build a training loop
3) Fit the model to the data and make a prediction
	- Try finding patterns in the training data
4) Evaluate the model
	- Compare the findings in the data to the actual data
5) Improve through experimentation
6) Save and reload your trained model
---
### Data (Preparing and Loading)
- **Data can be anything.**
- Now, Machine learning has *two main parts:*
	- Turning data into numbers. (a representation)
	- Pick/Build a model to learn the representation as best as possible
- Lets take an example (straight line of data)
```Python
# Create *known* parameters
weight = 0.7
bias = 0.3

# Create data
start = 0
end = 1
step = 0.02
X = torch.arange(start, end, step).unsqueeze(dim=1)
y = weight * X + bias

X[:10], y[:10] # Prints all the tensor data
```
- From this, we build a model that learns the relationship between:
	- **Features:** *x*
	- **Labels:**   *y*
- Now, we can *split data into training and test sets*
	- With the data, we need to split it up before we build the data.
	- Each split of the dataset serves a specific purpose
		- **Training Set**
			- Model will learn from this data
			- *around 60%-80% of data*
			- is always used
			- e.g. course materials
		- **Validation Set**
			- Model will get tuned/refined on this data
			- *around 10%-20% of data*
			- often used
			- e.g. practice exam
		- **Testing Set**
			- Model will get evaluated on this data to test its learning
			- *around 100%-20% of data*
			- is always used
			- e.g. final exam
	- In these examples, we will only use the training and testing sets
- We can achieve this by splitting our x and y tensors.
```Python
# Create train/test split
train_split = int(0.8 * len(X)) # 80% of data used for training set, 20% for testing 
X_train, y_train = X[:train_split], y[:train_split]
X_test, y_test = X[train_split:], y[train_split:]
```
- Now, we can visualize this data
```Python
def plot_predictions(train_data=X_train, 
                     train_labels=y_train, 
                     test_data=X_test, 
                     test_labels=y_test, 
                     predictions=None):
  """
  Plots training data, test data and compares predictions.
  """
  plt.figure(figsize=(10, 7))

  # Plot training data in blue
  plt.scatter(train_data, train_labels, c="b", s=4, label="Training data")
  
  # Plot test data in green
  plt.scatter(test_data, test_labels, c="g", s=4, label="Testing data")

  if predictions is not None:
    # Plot the predictions in red (predictions were made on the test data)
    plt.scatter(test_data, predictions, c="r", s=4, label="Predictions")

  # Show the legend
  plt.legend(prop={"size": 14});
```
- Whatever we do, **always try to visualize something (the data)**
---
### Build The Model
- Now that we have data, we want to build a model to use the blue dots to predict the green dots
- Here is an example for a *standard linear regression model* (pure PyTorch)
```Python
# Create a Linear Regression model class
class LinearRegressionModel(nn.Module): # <- almost everything in PyTorch is a nn.Module (think of this as neural network lego blocks)
    def __init__(self):
        super().__init__() 

		#Initialize model parameters
        self.weights = nn.Parameter(torch.randn(1, # <- start with random weights (this will get adjusted as the model learns)
                                                dtype=torch.float), # <- PyTorch loves float32 by default
                                   requires_grad=True) # <- can we update this value with gradient descent?)

        self.bias = nn.Parameter(torch.randn(1, # <- start with random bias (this will get adjusted as the model learns)
                                            dtype=torch.float), # <- PyTorch loves float32 by default
                                requires_grad=True) # <- can we update this value with gradient descent?))

    # Forward() defines the computation in the model
    def forward(self, x: torch.Tensor) -> torch.Tensor: # <- "x" is the input data (e.g. training/testing features)
        return self.weights * x + self.bias # <- this is the linear regression formula (y = m*x + b)
```
- PyTorch has *four (or so)* essential modules you can use to create any kind of neural network
	- `torch.nn`
		- **contains the larger building blocks (layers)**
		- *contains all of the building blocks for computational graphs*
	- `torch.nn.Parameter`
		- **contains the smaller parameters like weights and biases**
		- stores tensors that can be used with `nn.Module`
	- `nn.Module`
		- the base class for *all* neural network modules
		- all the building blocks for neural networks are subclasses
		- *requires a forward() method to be implemented*
	- `torch.optim`
		- **contains optimization methods on how to improve the parameters within Parameter to better represent input data**
		- contains various optimization algorithms
		- these tell the model parameters stored in `nn.Parameter` how to best change to improve gradient descent and reduce loss
	- `def forward()`
		- **tells the larger blocks how to make calculations on inputs within module**
		- All `nn.Module` subclasses require a forward method
		- this defines the computation that will take place on the data passed to the module 
			- (like the linear regression formula)
- 