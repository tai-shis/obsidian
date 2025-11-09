### Event Handling
- We handle events in JS by assigning a handler function to a particular event of a node
- We can do this using the ***`addEventListener`*** method
	- This is important*
```js
<button id="btn">Click me</button>

// New, preferred method
const node = document.querySelector("#btn");
node.addEventListener("click", handlerFn);
// "click" is the event name
// handlerFn is a function that will be called when even si triggered


// older approach:
node.click = handleFn; // note, this is an object being passed, above too
// not all events have a corresponding property
// they will only have one handler
```
- handler functions do not return anything.
- handler functions can take a parameter
	- the event object (later)
- They're pretty commonly defined through an anonymous function
```js
node.addEventListener("click", function() {
	alert("clicked")
});

// or, elegantly :D
document.querySelector("#box").addEventListener("click", () => { alert("clicked") });
```
- Let's look at an example:
```js
function foo() {
	let abc = "whatever";
	const node = doucment.querySelector("#box");
	node.addEventListener("clicK", () => {
		console.log(abc);
	});
}

foo();
// What will this output?

// it will output "whatever", this is because of closures.
```
- closure makes JS work, because of the closure
	- as in, the closure property of the function maintains its scope state when it is defined.
```js
<button id="btn"> Click </button>
const btn = document.querySelector("#btn")
// Version 1
btn.addEventListener("click", handler);
function handler() {
	alert("woo")
}

// Version 2
btn.addEventListener("click", () => {alert("woo")});
```
- Quite common for handlers to be unique, depends on use case
```js
<div id="cart>
	<div class="card">
		...
		<button>___</button>
	</div>
	<div class="card">
		...
		<button>___</button>
	</div>
	etc.
</div>

// To put a handler in these buttons, we have a few options.
// Version 1
const buttons = document.querySelectorAll("#cart button");
for (let b of buttons) {
	b.addEventListener("click", () => {
		alert(b.textContent); // this works here, but not in ver 2...
	});
}

// Version 2
for (let b of buttons) {
	b.addEventListener("click", handler)
}

// We use the event object
function hander(e) {
	alert(e.target.textContent)
}
```
- JS will provide the data for this object if we include it in the definition of the handler function
- **There are several common event object properties**
	- `target` - the object that triggered the event
	- `preventDefault()` - a method to stop default behaviour of the event
		- useful for submit buttons and hyperlinks
	- `clientX, clientY` - mouse position for mouse events
```js
const data = [
	{ id: 36, name: "untitled" },
	{ id: 45, name: "untitled" },
	{ id: 18, name: "Sunset" },
	etc.
];

<ul id="chosen"></ul>
<div id="details">
	<h2></h2>
</div>

// With the above information/code. lets populate with the titles
//    :when list item (<li>) is clicked, then display the details
//    (in this example, will simply redisplay the title)

const ul = document.querySelector("#chosen");
for(const d of data) {
	const li = document.createElement("li");
	li.textContent = d.name;
	// Say there are additional fields in data
	// to access them easily, we can add the data id to the element
	li.dataset.id = d.id; // id is now used to acces the data array to search through easily.
	// this makes: <li data-id=something>
	
	li.addEventListener("click", displayDetails);
	ul.appendChild(ul)
}

function displayDetails(e) {
	//
	const h2 = document.querySelector("#details h2");
	// we can now find the data value
	// Option 1
	for (const d of data) {
		if(d.id == e.target.dataset.id) {
			h2.textContent = d.name + d.artist + etc.
		}
	}
	
	// Option 2 (much better)
	const match = data.find(d => d.id == e.target.dataset.id);
	h2.textContent = match.name + match.artist + etc.
	
	//  then add it :D
	details.appendChild(h2);
}
```
---
### Event Propagation
- JS elements are propagated up the DOM tree.
- So, **any** parent can handle its children's events.
	- by default it moves from the child that provided the event *up*; you can change it to go from uppermost ancestor to child
- This gives us the capability to implement event delegation
- Last time, we programatically did this using a for loop, adding an event handler to each `<li>` item.
	- There is an issue as it can lead to essentially, a duplication of the event functions
- However, using propagation, we can *delegate this event* to the children's parent element, effectively *reducing* the needed event functions from N copies to just one. 
	- This is called **event delegation**
	- ***memorize the below code*****
  ```js
	  const parent = document.querySelector("#list");
	  parent.addEventListener("click", (e) => {
		// Check if <li> item was actually clicked
		if (e.target.nodeName == "LI") { // nodeName is uppercase lol
			// do event handle stuff
			// ...
			// ...
			e.stopPropagation(); // dont let it continue propagating up
		}
	  });
    ```
	- Here, we consider the case which the clickable parent container must *ignore* the clicks which are not part of the item
- There are a few issues with propagation as it *does not stop propagating up*; which may cause unwanted behaviour based on how the event is handled
	- the easy solution(fix) to this is by using `e.stopPropagation()
---
### Other Events
1. **Frame Events**
	- `DOMContentLoaded` - **memorize this***** 
		- This is when the HTML is fully downloaded and the DOM tree is populated
		```js
		document.addEventListener("DOMContentLoaded", () => {
			// entire application goes here
		});
		```
	- `window.addEventListener("load", foo);`
		- This will load when *everything* has loaded (images too)
		- This is much slower.
2. **Form Events**
	- usually you are interested in:
		- change
		- submit
		- focus + blur (entering/leaving a field)
		- etc.
	- we often work with the *value* property of the element
		```js
		// lets say we add to a list when something is selected
		<select id="selector">
			<option value=0>Select a Country</option>
			<option>Canada</option>
			etc...
		</select>
		<h1>Favourite Countries</h1>
		<ul id="favourites"></ul> 
		
		const list = document.querySelector("#focus");
		const selector = document.querySelector("selector");
		
		selector.addEventListener("change", () => {
			// ignore first option
			if (selector.value != 0) {
				const li = document.createElement("li");
				li.textContent = selector.value;
				list.appendChild(li);
			}
		});
		```
	- another example: form content
		```js
		<label>Country</label>
		<select id="country">
			<option value = 0>Select a Country</option>
			<option>Canada</option>
			<option>US</option>
		</select>
		<div id="region" class=""> // .visible { display: block }
			<label id="lab"></label>
			<select id="reg"></select>
		</div>
		
		const states = ["AL", ... ] // list of states
		const provs = ["AB", "BC", ...] // list of provinces
		
		// We will want to display either one based on the country selected
		const region = document.querySelector("#reg");
		reg.classList("hidden"); // .hidden { display: none };
		const label = document.querySelector("#lab");
		const countrySelector = document.querySelector("#country");
		const regionSelector = document.querySelector("#region");
		
		countrySelector.addEventListener("change", () => {
			if (countrySelector.value != 0) {
				populateRegion(countrySelector.value);
				reg.classList.toggle("visible") 
			}
		});
		
		function populateRegion(country) {
			reg.innerHTML = "";
			let data;
			if (country == "Canada") {
				data = provs;
			} else {
				data = states;
			}
			
			for (d of data) {
				const option = document.createElement("option");
				option.textContent = d
				region.appendChild(option);
			}
		}
		```
3. cont
4. 
---
