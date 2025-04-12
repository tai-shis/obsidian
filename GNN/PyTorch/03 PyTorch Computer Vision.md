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
