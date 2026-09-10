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
---
### Manipulating a Node
- innerHTML vs textContent
```js
// <div id="box" class="box"> hello <span> world </span></div>
const node = document.querySelector("#box");
console.log(node.innerHTML)   // "hello <span> world </span>" 
console.log(node.textContent) // "hello world"
// Note how both are strings.

node.innerHTML = "<h2> something </h2>"
// innerHTML is now "<h2> something </h2>"
node.textContent = "here"
// innerHTML is now "here"
```
- There are a couple of reasons to avoid innerHTML
	1. content added this way may not be part of the DOM tree
		- i.e. can't manipulate them further in JS
	2. security risks.
		- XSS attacks / cross site attacks
		- i.e. javascript injection.
- So instead, we use DOM manipulation methods
- Setting the className
```js
node.className = "card"
// <div id="box" class="card"> -> which is replacing the previous class

node.classList.add("visible")
// <div id="box" class="card visible"> -> adds to the classes

node.classList.remove("visible")
// <div id="box" class="card"> -> removes it

node.classList.toggle("main")
// <div id="box" class="card main"> -> adds if non-existant

node.classList.toggle("main")
// <div id="box" class="card"> -> removes if exists
```
- Generally, we use *classList over className*
```js
node.style.[someCSSProperty] = something;

// For example...
node.style.backgroundColor = "something";
```
- But from a maintainability standpoint, just use classList and style in the css file.
---
### DOM Manipulation Methods
- There are a few common methods:
	- \*`appendChild()`
	- \*`createElement()`
	- \*`createTextNode()`
	- `insertChild()`
	- `removeChild()`
	- `replaceChild()`
	- `insertAdjacent()`
	- etc.
	- **These will be on exams/quizzes**
```js
const parent = document.querySelector("#box");
const h2 = document.createElement("h2");

h2.textContent = "hello";
parent.appendChild(h2);

// Result:
// <div id="box"><h2>hello</h2></div>
```
- Example of use case(?)
```js
const data = [
	{ id: 3, name: "pants" },
	{ id: 4, name: "shirt" },
	more stuff
];

// We now have a parent:
// <ul id="list"></ul>

// Now we can programmatically add to the list with our data

// first we grab the parent element
const list = document.querySelector("#list");
// now we iterate
for(item of data) {
	// create list item
	const li = document.createElement("li");
	const div = document.createElement("div");
	
	// Now lets manipulate the div element
	div.classList.add("card");
	div.textContent = item.name;
	
	// Now lets make it a child of the li
	li.appendChild(div);
	
	// Finally, add it to list
	list.appendChild(li);
}
```
- We can also take the approach of adding a text node so we can manipulate the text separate from the node.
---
### DOM Timing
- There are a list of Browser Tasks that are done in order
	1. HTML parsing
	2. On a separate thread, download and parse styles
	3. On a separate thread, parse **then** execute the JS
- Consider the following code
```html
<html>
<head>
  <link src="styles.css" />
  <script>
	  // This script might actually try to select "x" before the html has been parsed
	  // This can result in node being undefined, causing errors
	  const node = document.querySelector("#x"); 
	  
	  node.appendChild(foo); // This might error.
  </script>
</head>
<body>
	<div id="x">foo</div>
</body>
</html>
```
- There are some solutions to this:
	1. Putting all `<script>` elements at the end of the document
		- i.e. just before `</body>`
	2. **A better solution:**
		- instead only execute the DOM code *after* the DOM is loaded
		- *to do this, you must use the `DOMContentLoaded` event or `window.load` event*
---

- **Continued below**
---
### Templates (aside)
- an alternate approach to modifying the DOM
- mostly used when the markup being generated is complex
	- e.g. many classes
1. *Use the template tag in the markup to defined the structure*
	```html
	<!-- Card Template -->
	<template id="sampleCard">
		<div class="flex ...">
			<div class="...">
				<img class="...">
				<h2></h2>
				<p></p>
			</div>
		</div>
	</tempalte>
	```
	- This template can appear anywhere in the html
	- the browser will simply ignore it
2. Use the clone method in JS to create a DOM structure that will mirror the template (note, not for exams, but for assignments)
	```js
	// First, select the template
	const template = document.querySelector("#sampleCard");
	// create a clone of it -> a DOM structure in memory
	const clone = template.content.cloneNode(true); // no idea why its this
	// now we can change the elements in the clone
	const img = clone.querySelector("img") // note we use clone, not document
	img.src = data.filename; // some value
	const h2 = clone.querySelector("h2");
	// ...
	parent.appendChild(clone);
   ```
   - Now, this is normally done in a loop, to save time
---
