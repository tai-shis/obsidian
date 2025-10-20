### Preface
- so far we have used JS in an unrealistic way to learn the language
- To use it realistically, we have to use the **DOM**
---

### **Document Object Model** *
- An API for manipulation the document (and its styling)
- Uses a hierarchical data structure to represent the document.
- We can visualize the structure of a document in a tree-like format
- **in the document tree, each element, each piece of white space, and each comment is represented as a *node****
- **Nodes are collected in a *node list*, which is similar to an array, but not identical**\*
	- is able to be iterated like an array
---
### Nodes
- a node object has properties and methods
- example properties:
	- \*`nodeName`
	- `nodeValue`
	- \*`nodeType`
	- `childNodes`
	- `nextSibling`
	- `previousSibling`
	- \*\*`textContent`
	- `parentNode`
		- `childNodes`, `nextSibling`, `previousSibling`, and `parentNode` aren't really that useful since white space is also a node
- **Selection Methods** (Important**)
	- provides a mechanism for selection a node or a collection of nodes (i.e. a node list)
	- Once a node is selected, you can manipulate that node.
	```js
	// Method 1
	// Retrieves an element node with a specific id attribute
	document.getElementById(something);
	
	// <div id="main">
	const node = document.getElementById("main");
	// now we can manipulate it like so
	node.styles.color = 'yellow';
	
	// Method 2
	// retrieves a node list of elements with a specifc class name
	document.getElementsByClassName(something);
	
	// <div class="box">, <div class="box">, ...
	const classNodes = document.getElementsByClassName("box");
	// we have to iterate through it to change anything though
	for (const node of classNode) {
		node.styles.color = 'yellow';
	}
	
	// Method 3
	// returns a node list of elements with matching element/tag name
	document.getElementByTagName(something)
	
	const divNodes = document.getElementsByTagName("div");
	// for blah blah blah...
	```
- These 3 methods are the original selection methods.
	- They have been essentially replaced by the next two methods
	- Theses are **important*****
```js
// Method 4
// returns a node that matches the css selector parameter
document.querySelector(something); 
// 'something' in this case, is a css selector.

const node = document.querySelector('#main'); //getElementById equivalent

// Method 5
// returns a node list matching the selector
document.querySelectorAll(something);
const list = document.querySelectorAll('#main .box');
```
---
### Element Nodes
- most of the time, you will be manipulating element nodes
	- which are returned by the selection methods above
- common properties:
	- `className` - name of style class
	- `classList` - list of `classNames`
	- `style` - collection of CSS properties
		- the 3 above are used to *change appearance*
	- `id` 
	- `tagName`
	- `innerHtml` - can be used to change content of an element
		- *its usage is discouraged.*
- more specific properties to certain element nodes
	- `src`
	- `href`
	- `name`
	- `value`
**Aside:**
- some programmers are lazy, (they don't type the whole `document.querySelector`), but will defined a shorthand function
```js
function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

const node = $("#main");
const nodeList = $$(".container p");
```