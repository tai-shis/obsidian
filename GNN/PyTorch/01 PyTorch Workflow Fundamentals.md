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
