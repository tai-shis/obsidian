### Classification Problems
- **This is when we predict whether something is one thing or another**
- *For example:*
	- For the given problem:
		- *Binary Classification*
			- Predict if something is true or false
			- Using given parameters to give a binary answer (e.g. yes or no)
		- *Multi-class Classification*
			- Predict if something is one of more than two options
			- Pick what something is from a group of items (but only one choice is possible)
		- *Multi-label Classification*
			- Predicting the assignment to more than one option
			- Putting something into multiple different categories (can have more than one choice)
![[02-different-classification-problems.png]]
- Classification; like predicting a number is the most common types of ML problems
---
### Architecture of a Classification Neural Network (CNN)
- **General Architecture of a CNN:**
	- *Input Layer Shape* (`in_features`)
		- Binary Classification:     Same as number of features
		- Multiclass Classification: Same as binary classification
	- *Hidden Layers*
		- Binary Classification:     Problem specific (min = 1, max = unlimited)
		- Multiclass Classification: Same as binary classification
	- *Neurons per hidden layer
		- Binary Classification:     Problem specific (generally 10 to 512)
		- Multiclass Classification: Same as binary classification
	- *Output Layer Shape* (`out_features`)
		- Binary Classification:     1 (one class or the other)
		- Multiclass Classification: 1 per class (e.g. 3 for photo of food, person, or dog)
	- Skipped two
	- *Loss Function* (both in PyTorch)
		- Binary Classification:     Binary Crossentropy (`torch.nn.BCELoss`)
		- Multiclass Classification: Cross Entropy (`torch.nn.CrossEntropyLoss`)
	- *Optimizer*
		- Binary Classification:     SGD (Stochastic Gradient Descent) or Adam (in `torch.optim`)
		- Multiclass Classification: Same as binary classification
---
### Making Classification Data (and getting it ready)
- Start by making data
- **Example: Circles**
	- See [Source: Section 1](https://www.learnpytorch.io/02_pytorch_classification/)
---
### Kinds of Loss Functions/Optimizers
- **SGD**
	- *Classification/regression/many others*
	- `torch.optim.SGD()`
- **Adam Optimizer**
	- *Classification/regression/many others*
	- `torch.optim.Adam()`
- **Binary Cross Entropy Loss**
	- *Binary Classification*
	- `torch.nn.BCELoss
		- loss function that measures the binary cross entropy between the target label and input features
	- `torch.nn.BCELossWithLogits`
		- same as above but with a built-in sigmoid layer
- **Cross Entropy Loss**
	- *Multi-Class Classification*
	- `torch.nn.CrossEntropyLoss`
- **MAE/L1 Loss**
	- *Regression*
	- `torch.nn.L1Loss`
- **MSE/L2 Loss**
	- *Regression*
	- `torch.nn.MSELoss`
---
### Evaluation Metric
- Where a loss function measures *how wrong your model is*, the **Evaluation Metric** measures *how right your model is*
- There are several evaluation metrics that can be used for classifications problems
	- In the textbook *accuracy* is used
		- Dividing the total number of correct predictions over the total number of predictions
```Python
# Calculate accuracy (a classification metric)
def accuracy_fn(y_true, y_pred):
    correct = torch.eq(y_true, y_pred).sum().item() # torch.eq() calculates where two tensors are equal
    acc = (correct / len(y_pred)) * 100 
    return acc
```
---
### Going from raw model outputs to predicted labels
- This is a little confusing but essentially:
	- When we take the *raw output* from our `forward()` function, the numbers are hard to interpret
	- also, we want numbers that are able to be *compared to our truth labels* (i.e. the correct ones)
	- Our model's raw outputs (*also called **logits***) we use a ***sigmoid activation function***
		- Remember above with `BCELossWithLogits` and it's built-in sigmoid layer?
	- With this, they are in the form of *prediction probabilities*
		- (we will call these `y_pred_probs`)
		- This represents *how much the model thinks the data points belongs to one class or another*
	- **In binary classification, our ideal outputs are 0 or 1**
		- we can use the values as a decision boundary
		- i.e. >= 0.5 means class 1 and vice versa
- To turn our prediction probabilities into prediction labels, we can round the outputs of the sigmoid activation function.
```Python 
# Find the predicted labels (round the prediction probabilities)
y_preds = torch.round(y_pred_probs)

# In full
y_pred_labels = torch.round(torch.sigmoid(model_0(X_test.to(device))[:5]))

# Check for equality
print(torch.eq(y_preds.squeeze(), y_pred_labels.squeeze()))

# Get rid of extra dimension
y_preds.squeeze()
```
---
# Read through the chapter 2, its mostly example work
---
### Improving a Model (Fixing an Underfitting Problem)
- **We focus mostly on the model (not the data)**
- A few ways to do this:
	- *Adding more layers*
		- Each layer can potentially increase the learning capabilities of the model
		- Each layer being able to learn some kind of new pattern in the data
		- More layers are usually referred to as making your neural network *deeper*
	- *Adding more Hidden Units*
		- Potential increases in learning capabilities of the model
		- More hidden units are usually referred to as making your neural network *wider*
	- *Fitting for longer (more epochs)*
		- Your model might learn more if it had more opportunities to look at the data
	- *Changing the activation functions*
		- Some data can't be fit with only straight lines
		- using non-linear activation functions can help with this (**probably the fix for this e.g.**)
	- *Changing the learning rate*
		- less model specific (still important)
		- learning rate of the optimizer decides how much a model should change its parameters each step
		- too much:   model overcorrects
		- too little: model doesn't learn enough
	- *Changing the Loss Function*
		- less model specific (still important)
		- different problems require different loss functions
	- *Use Transfer Learning*
		- Take a pretrained model from a problem similar to yours and adjust it to your own problem
		- see section 06
- Rest of section covers trying out these methods
---
### Building a model with non-linearity
- So far we've only modelled using linear line functions
- *We can introduce the ability to use non-linear activation functions*
	- PyTorch has many read-made non-linear activation functions
	- The most common (and best performing) being **ReLU** `torch.nn.ReLU()`
		- Or rectified linear-unit
---
### Classification Evaluation Metrics (cont.)
- **There are many ways of evaluating a classification model**
- A good starting point are using some common methods:
	- *Accuracy*
		- Out of x predictions, how many does your model get correct?
		- `torchmetrics.Accuracy()`
		- `sklearn.metrics.accuracy_score()`
	- *Precision*
		- Proportion of true positives over total number of samples
		- Higher precisions leads to less false positives
		- `torchmetrics.Precision()`
		- `sklearn.metrics.precision_score()`
	- *Recall*
		- Proportion of true positives over total number of true positives and false negatives
		- Higher recall leads to less false negatives
		- `torchmetrics.Recall()`
		- `sklearn.metrics.recall_score()`
	- *F1-Score*
		- Combines precision and recall into one metrics
		- 1 is best, 0 is worst
		- `torchmetrics.F1Score()`
		- `sklearn.metrics.f1_score()`
	- *Confusion Matrix*
		- Compares predicted values with true values in a tabular way
		- if 100% correct, all values in the matric will be top left to bottom right (a diagonal line)
		- `torchmetrics.ConfusionMatrix()`
		- `sklearn.metrics.plot_confusion_matrix()`
	- *Classification Report*
		- Collection of some of the main classification metrics (like precision, recall and f1-score)
		- `sklearn.metrics.classification_report()`
- A popular and world-class machine learning library **Scikit-Learn** implements many of the above metrics (As you can see in the example methods)
- A PyTorch like version **TorchMetrics** is another possibility.