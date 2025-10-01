### Introduction
- Similar to css, it can appear in various places
	- Within an element
		- `<a hreaf='' onclick='js code here'`>
		- avoid this, its old
	- Within a `<script>` element
		- Usually within the head/end of the doc
	```html
	<script>
		javscript code
	</script>
	```
	- Within an extended file
		- This is preferred
	```html
	<script src='foo.js'></script>
	```
---
### Language Overview
- JavaScript is a dynamically-typed language
	- like python.
	- not like c
- However, there are still data types in JavaScript.
	- data type of variable is determined at runtime by its content
	- again, like python
---
### Declaring Variables
```javascript
// Declares a global variable named foo, avoid this.
foo = 3; 

// Declares a variable with either function or global scope
var foo = 3; 

// value: undefined; data type: undefined
var foo; 

// declares a block scoped variable that can be changed 
let foo = 3; 
foo = 5;

// will generate a runtime error
const foo = 3;
foo = 5
```
- note: **const**
	- you cannot reassign a const, but if it is an object or array, *you can* change its properties
	```javascript
		const data = [3, 4, 5]
		data[0] = 2 // This works
		data = [6, 7, 8] // This will not.
 	```
- block scope in js:
```javascript
function() {
	/* This is a block, inbetween {} */
}

if () {
	/* Also a block, inbetween {} */
}
```
- *best practices:*
	- always use var, let or const.
		- i.e. don't use global variables.
	- use let or const and avoid var.
	- unless you need to reassign a variable, **use const**
	- basically, use const whenever you can
- *variable names*
	- can use most unicode characters
		- +, -, (), \[], \*,; ,: cant be used
		- but this works
			- let `_ = "_"`
---
### JavaScript Output
```javascript
alert( foo ); // Browser displays content in a popup dialog
document.write( foo ); // Outputs content to browser document
console.log( foo ); // Outputs to the browser console
bar = prompt( foo ); // Browser asks user for input in a popup dialog
bar = confirm( bar ); // Browser asks for a yes/no in a popup
```
- On `document.write()`:
	- helpful when first learning JavaScript, but its rarely used
	- Instead, we use DOM to modify the document
		- this is covered in chapter 9 (this is chapter 8)
----
### Data Types 
- 6(?) data types
	- Boolean
	- Number
	- String
	- Undefined 
		- is a value too
	- Null
		- is a value too
	-  Symbol
		- rarely encountered
	- Object
		- not technically a data type, but kinda is
- Variables in JavaScript are either:
	- Primitives/Value Types
	- Reference Types
```js
let a = 3;
let b = "abc";
let c = [3, 4, 5];
let d = b;
b = "hello";
let e = c;
e[1] = 23
```
- The memory structure for above is structured like so:
	- chunk of memory for a, holding 3
	- chunk of memory for b, holding "abc"
	- chunk of memory for c, holding the address to the array \[3, 4, 5]
	- chunk of memory for d, holding "abc"
		- it copies the value since its a primitive type
		- next line `b = "hello"` only changes the value of b, not d
	- chunk of memory for l, holding the value of c which is the address to \[3, 4, 5]
		- next line `e[1] = 23`, changes both variables (technically not),
			- as in, the array both are pointing to is modified.
	- Essentially:
		- arrays/objects are by reference, passed by reference
		- primitives are by value.
- *Built-in Objects*
	- JavaScript has a variety of preexisting objects we can use
		- for the class, we make our own but w/e
	- e.g.
		```javascript
		let d = new Date()
		alert(d.toString())
		```
	- Objects can have properties and methods as usual
		- called functions rather than methods :/
		- uses dot notation
- *Concatenation*
	- like string cat
	- uses the `+` operator
	- JavaScript string literals can use:
		- single quote: 'foo'
		- double quote: "foo"
		- tilde: \`foo\`
			- these are used for embedding variables (kinda like fstring)
			```js
			const foo = "bruh";
			console.log(`the value of foo is: ${foo}`);
			```
			- also preserves whitespace
			```js
			let a = `<div>
						<p> hello </p>
					 </div>`;
			```
---
