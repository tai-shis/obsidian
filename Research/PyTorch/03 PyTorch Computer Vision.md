### Computer Vision
- **The art of teaching a computer to see**
	- We can use it to classify whether a photo is of a cat/dog (*binary classification*)
	- If the photo is of a dog/cat/chicken (*multi-class classification*)
	- Where a car appears in a video frame (*object detection*)
	- Finding where different objects in an image can be separated (*panoptic segmentation)*
- For example, camera and photo apps use computer vision to enhance and sort images
- Modern Cars use computer vision to avoid other cars and stay within lanes
- etc.
- *Anything that can be described in a visual sense can be a potential computer vision problem*
---
### Computer Vision Libraries (PyTorch)
- There are some common libraries that are good to be aware of:
	- *torchvision*
		- contains datasets, model architectures, and image transformations often used for computer vision problems
	- *torchvision.datasets*
		- example computer vision datasets for a range of problems
			- including image classification, object detection, image captioning, video classification
		- *contains a series of base classes for making custom datasets*
	- *torchvision.models*
		- contains well-performing and commonly used computer vision model architectures implemented in PyTorch
	- *torchvision.transforms*
		- often images need to be transformed before being used with a model
		- *common image transformations are found here*
	- *torch.utils.data.Dataset*
		- base dataset class for PyTorch
	- *torch.utils.data.DataLoader*
		- creates a python iterable over a dataset
		- (that were created with `torch.utils.data.Dataset`)
- Here are also some **relevant dependencies**
```Python
# Import PyTorch
import torch
from torch import nn

# Import torchvision 
import torchvision
from torchvision import datasets
from torchvision.transforms import ToTensor

# Import matplotlib for visualization
import matplotlib.pyplot as plt

# Check versions
# Note: your PyTorch version shouldn't be lower than 1.10.0 and torchvision version shouldn't be lower than 0.11
print(f"PyTorch version: {torch.__version__}\ntorchvision version: {torchvision.__version__}")
```
---
### Getting a Dataset
- To work with a computer vision problem, we need a computer vision dataset
- Take **FashionMNIST**
	- *MNIST: Modified National Institute of Standards and Technology*
		- The original one is thousands of examples of handwritten digits 0 to 9
		- This can be used to identify numbers that were handwritten
	- We'll use it to find "What type of clothing is in this image?"
		- Multiclass Classification
- We can access it through `torchvision.datasets.FashionMNIST()`
- However, it requires the following parameters:
	- `root: str` - which folder do you want to download the data to?
	- `train: Bool` - do you want the training or test split?
	- `download: Bool` - should the data be downloaded?
	- `transform: torchvision.transforms` - what transformations would you like to do on the data?
	- `target_transform` - you can transform the targets (labels) if you like too.
```Python
# Setup training data
train_data = datasets.FashionMNIST(
    root="data", # where to download data to?
    train=True, # get training data
    download=True, # download data if it doesn't exist on disk
    transform=ToTensor(), # images come as PIL format, we want to turn into Torch tensors
    target_transform=None # you can transform labels as well
)

# Setup testing data
test_data = datasets.FashionMNIST(
    root="data",
    train=False, # get test data
    download=True,
    transform=ToTensor()
)
```
- If you check the data its like a million numbers lmao
	- the first index of training data has so many numbers
- The shape is quite interesting for the computer vision model
- If we check it, it will give us `[1, 28, 28]`
	- color_channels: 1, height: 28, width: 28
- In this dataset, its 28 by 28 pixels with 0-1 greyscale color value
- Also, it contains 60,000 training samples and 10,000 testing samples
- We can also check the classes using `.classes`
```Python
# See classes
class_names = train_data.classes
class_names
"""
Outputs:
['T-shirt/top',
 'Trouser',
 'Pullover',
 'Dress',
 'Coat',
 'Sandal',
 'Shirt',
 'Sneaker',
 'Bag',
 'Ankle boot']
"""
```
- There are 10 classes, so our problem is a multi-class classification problem.
---
### Prepare DataLoader
- After preparing a *dataset*, we now want to prepare it with a *DataLoader*
- Which, well it loads data into a model
	- this can be done using `torch.utils.data.DataLoader`
- A DataLoader turns large data sets into *Python iterable smaller chunks*
	- Chunks which are called **batches** or **mini-batches** (set by the `batch_size` parameters)
- We do this since our datasets can be quite large and by doing this, it makes everything more computationally efficient
- **A good batch size to start with is 32
	- *The batch size is actually a **hyperparameter** that you can set.*
	- Generally we use **powers of 2** most often.
- Here is an example of setting up training and test sets
```Python
from torch.utils.data import DataLoader

# Setup the batch size hyperparameter
BATCH_SIZE = 32

# Turn datasets into iterables (batches)
train_dataloader = DataLoader(train_data, # dataset to turn into iterable
    batch_size=BATCH_SIZE, # how many samples per batch? 
    shuffle=True # shuffle data every epoch?
)

test_dataloader = DataLoader(test_data,
    batch_size=BATCH_SIZE,
    shuffle=False # don't necessarily have to shuffle the testing data
)

# Let's check out what we've created
print(f"Dataloaders: {train_dataloader, test_dataloader}") 
print(f"Length of train dataloader: {len(train_dataloader)} batches of {BATCH_SIZE}")
print(f"Length of test dataloader: {len(test_dataloader)} batches of {BATCH_SIZE}")

"""
Outputs:

Dataloaders: (<torch.utils.data.dataloader.DataLoader object at 0x7fc991463cd0>, <torch.utils.data.dataloader.DataLoader object at 0x7fc991475120>)
Length of train dataloader: 1875 batches of 32
Length of test dataloader: 313 batches of 32
"""

# Check out what's inside the training dataloader
train_features_batch, train_labels_batch = next(iter(train_dataloader))
print(train_features_batch.shape, train_labels_batch.shape)

"""
Ouputs:

(torch.Size([32, 1, 28, 28]), torch.Size([32]))
"""

```
