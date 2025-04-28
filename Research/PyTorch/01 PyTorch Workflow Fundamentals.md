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
- **We can check the contents of a PyTorch model easily with the `.parameters()` method**
- We can also get the state of the model using `.state_dict()`
	- gets named parameters
- **We want to initialize our weight and bias tensors using `torch.randn()`**
	- we essentially want to start from random parameters and get the model to update them towards parameters that fit our data best
- **Now, we can make predictions using `torch.inference_mode()`**
	- we pass x-test and see how closely it predicts y-test
	- As we pass data into the model, it goes through the models *forward()* method and produces a result using the defined computation
	- **inference mode is used as a context manager to make predictions**
	- *turns off things like gradient training
		- makes going through data with forward() faster
---
### Training the Model
- With the basic setup from the previous section, our model is making predictions using random parameters
	- its essentially guessing
- *To fix this, we can update its internal parameters*
	- mainly, the:
		- **weights and bias values**
		- which were set randomly using `nn.Parameter()` and `torch.randn()`
- Now, to do this, we will have to write something so the model will update the parameters on its own.
- **We need a loss function and optimizer**
	- *Loss Function:
		- Measures how wrong your model's predictions are compared to the truth labels
		- *The lower the better*
		- Built-in PyTorch function in `torch.nn`
		- Common values??
	- *Optimizer:*
		- Tells your model how to update its internal parameters to best lower the loss
		- Bult-in PyTorch optimization functions implementations in `torch.optim`
- Take our straight line example:
	- *Depending on the problem, the kind of loss function and optimizer used will change*
	- In our problem, we are predicting a number so **MAE** is used as our loss function
		- mean absolute error
		- measures the absolute difference between two points then takes the mean across all examples
	- we use `torch.optim.SGD(params, lr)`
		- *params: target model parameters to optimize*
			- the weights and bias values that were set before
	  - *lr: learning rate that the optimizer updates* the parameters at
		  - higher means the updates will be larger and smaller means the updates will be smaller
			  - higher can overshoot its updates and not work
			  - smaller can take too long to find the best values
		  - **the learning rate is the hyperparameter because its set by the ML engineer**
			  - common values: 0.01, 0.001, 0.0001
			  - can be adjusted over time
	- which gives us the following code:
```Python
# Create the loss function
loss_fn = nn.L1Loss() # MAE loss is same as L1Loss

# Create the optimizer
optimizer = torch.optim.SGD(params=model_0.parameters(), # parameters of target model to optimize
                            lr=0.01) # learning rate (how much the optimizer should change parameters at each step, higher=more (less stable), lower=less (might take a long time))
```
- **Now, we create an optimization loop**
	- i.e. *a training and testing loop*
- The training loop involves the model going through the training data and *learning the relationships between the features and labels*
- In each training loop, *we go through the testing data and evaluate how good the patterns the model learned on the training data is*
- "Unofficial" optimization loop song:
```It's train time! 
do the forward pass, 
calculate the loss, 
optimizer zero grad, 
losssss backwards! 

Optimizer step step step 

Let's test now! 
with torch no grad: 
do the forward pass, 
calculate the loss, 
watch it go down down down!
```
- Since this song is kinda hard to understand, here are the actual **steps**:
	1) Forward pass
		- Model goes through all the training data once, performing its `forward() function calculations`
		- e.g. `model(x_train)`
	2) Calculate the loss
		- Model's outputs (predictions) are compared to the ground truth and evaluated to see how wrong they are
		- e.g. `loss = loss_fn(y_pred, y_train)`
	3) Zero gradients
		- The optimizers are set to zero so they can be recalculated for the specific training step
		- e.g. `optimixer.zero_grad()`
	4) Perform backpropagation on the loss
		- Computes the gradient of the loss with respect for every model parameter to be updated
		- (Also called *backpropagation*) so we are moving backwards
		- *Done on each parameter with* `requires_grad=True`
		- e.g. `loss.backward()`
	5) Update the optimizer (*gradient descent*)
		- Update the parameters with `requires_grad=True` with respect to the loss gradients in order to improve them
		- e.g. `optimizer.step()`
![[01-pytorch-training-loop-annotated.png]]
```Python
torch.manual_seed(42)

# Set the number of epochs (how many times the model will pass over the training data)
epochs = 100

# Create empty loss lists to track values
train_loss_values = []
test_loss_values = []
epoch_count = []

for epoch in range(epochs):
    ### Training

    # Put model in training mode (this is the default state of a model)
    model_0.train()

    # 1. Forward pass on train data using the forward() method inside 
    y_pred = model_0(X_train)
    # print(y_pred)

    # 2. Calculate the loss (how different are our models predictions to the ground truth)
    loss = loss_fn(y_pred, y_train)

    # 3. Zero grad of the optimizer
    optimizer.zero_grad()

    # 4. Loss backwards
    loss.backward()

    # 5. Progress the optimizer
    optimizer.step()

    ### Testing

    # Put the model in evaluation mode
    model_0.eval()

    with torch.inference_mode():
      # 1. Forward pass on test data
      test_pred = model_0(X_test)

      # 2. Caculate loss on test data
      test_loss = loss_fn(test_pred, y_test.type(torch.float)) # predictions come in torch.float datatype, so comparisons need to be done with tensors of the same type

      # Print out what's happening
      if epoch % 10 == 0:
            epoch_count.append(epoch)
            train_loss_values.append(loss.detach().numpy())
            test_loss_values.append(test_loss.detach().numpy())
            print(f"Epoch: {epoch} | MAE Train Loss: {loss} | MAE Test Loss: {test_loss} ")
```
- If we run this, we can actually see that the loss goes down with every epoch
- Now we can plot it to see a visual representation of the decrease in loss:
```Python
# Plot the loss curves
plt.plot(epoch_count, train_loss_values, label="Train loss")
plt.plot(epoch_count, test_loss_values, label="Test loss")
plt.title("Training and test loss curves")
plt.ylabel("Loss")
plt.xlabel("Epochs")
plt.legend();
```
- Which outputs: (wow this doesn't look good in my theme)
![[download 1.png]]
- *The longer we train our model, the closer our weights and bias approach the exact original values*
---
### Making Predictions with a Trained PyTorch Model (Inference Step)
- **When we are making predictions, we must remember 3 things**
	- Set the model in evaluation mode
		- `model.eval()`
	- Then, make predictions using the inference mode context manager
		- `with torch.inference_mode(): \\ ...code
	- *All predictions should be with with objects on the same device*
		- e.g. data and model on GPU only
- The first two are to disable any unneeded calculations during inference for faster computation
- Third one is so that everything is cross-compatible
- *this is kind of what it looks like*
```Python
# 1. Set the model in evaluation mode
model_0.eval()

# 2. Setup the inference mode context manager
with torch.inference_mode():
  # 3. Make sure the calculations are done with the model and data on the same device
  # in our case, we haven't setup device-agnostic code yet so our data and model are
  # on the CPU by default.
  # model_0.to(device)
  # X_test = X_test.to(device)
  y_preds = model_0(X_test)
y_preds
```
- Running this, the predicted dots are much closer to the testing data
---
### Saving and Loading a PyTorch Model
- look [here](https://www.learnpytorch.io/01_pytorch_workflow/) for how to do this, idrc rn so :3
- Section 5 ^
---
### Putting it Together
- As this implies, we put all the above together
```Python
# Import PyTorch and matplotlib
import torch
from torch import nn # nn contains all of PyTorch's building blocks for neural networks
import matplotlib.pyplot as plt

# Check PyTorch version
torch.__version__

# Setup device agnostic code
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
```
- Now we create some data
	- Hard coded *weight* and *bias*
	- Range of numbers between *0 and 1* as our *x values*
	- Then we can use the x, weight, and bias values to create the linear regression formula
```Python
# Create weight and bias
weight = 0.7
bias = 0.3

# Create range values
start = 0
end = 1
step = 0.02

# Create X and y (features and labels)
X = torch.arange(start, end, step).unsqueeze(dim=1) # without unsqueeze, errors will happen later on (shapes within linear layers)
y = weight * X + bias 
X[:10], y[:10]

"""
Now we split this data into training and test sets
"""

# Split data
train_split = int(0.8 * len(X))
X_train, y_train = X[:train_split], y[:train_split]
X_test, y_test = X[train_split:], y[train_split:]

len(X_train), len(y_train), len(X_test), len(y_test)

# Note: If you've reset your runtime, this function won't work, 
# you'll have to rerun the cell above where it's instantiated.
plot_predictions(X_train, y_train, X_test, y_test)
```
- Now, we *build the model*
	- This time, instead of defining the weight and bias parameters, we use:
		- `nn.Linear(in_features, out_features()`
		- **in_features:** # of dimensions the input data has
		- **out_features:** # of dimensions to output to
	- for our example we have 1 for both (x and y -> input and output respectively)
```Python
# Subclass nn.Module to make our model
class LinearRegressionModelV2(nn.Module):
    def __init__(self):
        super().__init__()
        # Use nn.Linear() for creating the model parameters
        self.linear_layer = nn.Linear(in_features=1, 
                                      out_features=1)
    
    # Define the forward computation (input data x flows through nn.Linear())
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.linear_layer(x)

# Set the manual seed when creating the model (this isn't always needed but is used for demonstrative purposes, try commenting it out and seeing what happens)
torch.manual_seed(42)
model_1 = LinearRegressionModelV2()
model_1, model_1.state_dict()

"""
Next, check the model device, and select it (preferrably the GPU)
"""

# Check model device
next(model_1.parameters()).device

# Set model to GPU if it's available, otherwise it'll default to CPU
model_1.to(device) # the device variable was set above to be "cuda" if available or "cpu" if not
next(model_1.parameters()).device
```
- **Now we train :)**
	- We need a loss function and an optimizer
	- From before, we used `nn.L1Loss()` and `torch.optim.SGD()`
	- now, we pick a learning rate (here, 0.01 is used)
```Python
# Create loss function
loss_fn = nn.L1Loss()

# Create optimizer
optimizer = torch.optim.SGD(params=model_1.parameters(), # optimize newly created model's parameters
                            lr=0.01)

torch.manual_seed(42)

# Set the number of epochs 
epochs = 1000 

# Put data on the available device
# Without this, error will happen (not all model/data on device)
X_train = X_train.to(device)
X_test = X_test.to(device)
y_train = y_train.to(device)
y_test = y_test.to(device)

for epoch in range(epochs):
    ### Training
    model_1.train() # train mode is on by default after construction

    # 1. Forward pass
    y_pred = model_1(X_train)

    # 2. Calculate loss
    loss = loss_fn(y_pred, y_train)

    # 3. Zero grad optimizer
    optimizer.zero_grad()

    # 4. Loss backward
    loss.backward()

    # 5. Step the optimizer
    optimizer.step()

    ### Testing
    model_1.eval() # put the model in evaluation mode for testing (inference)
    # 1. Forward pass
    with torch.inference_mode():
        test_pred = model_1(X_test)
    
        # 2. Calculate the loss
        test_loss = loss_fn(test_pred, y_test)

    if epoch % 100 == 0:
        print(f"Epoch: {epoch} | Train loss: {loss} | Test loss: {test_loss}")
```
- *We can now compare our new values to the original parameters we hard-coded*
```Python
# Find our model's learned parameters
from pprint import pprint # pprint = pretty print, see: https://docs.python.org/3/library/pprint.html 
print("The model learned the following values for weights and bias:")
pprint(model_1.state_dict())
print("\nAnd the original values for weights and bias are:")
print(f"weights: {weight}, bias: {bias}")
```
- Lets make our predictions now with the trained model
```Python
# Turn model into evaluation mode
model_1.eval()

# Make predictions on the test data
with torch.inference_mode():
    y_preds = model_1(X_test)
    
y_preds

# plot_predictions(predictions=y_preds) # -> won't work... data not on CPU

# Put data on the CPU and plot it
plot_predictions(predictions=y_preds.cpu())

```