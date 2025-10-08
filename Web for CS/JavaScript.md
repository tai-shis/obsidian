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
### **Conditionals**
- if , else, etc.
- `=, ==, ===, <, >, <=, etc, |, ||, &&`
- === refers to exact type and value matching
- everything can be evaluated as a boolean value
	- everything is true except:
		- false, nothing, null, undef,"", NaN
- ternary operatior
	- `let foo = (num == 3) ? 5 : 8;
- **loops**
	- for:
		- as usual
		- `for(let p in obj)`
			- for each property in object (uncommon)
		- `for(let p of array`
			- iterates through array
		- arrayForEach(p)
			- later
---
### **Arrays**
- as usual
- mixed variables work
- nested arrays, as usual
- `names.push("bruh")` assuming names is an array (end of array)
- `names.unshift("foo")` adds element to beginning of the array
- `names.length()` O(n) time
- Arrays are a type of object
-  destructing
	- `const foo = ["a", "b", "c"]`
	- you can split them easily:
		- `let char1, char2, char3 = foo`
		- equal to:
		- `let char1 = foo[0]; let char2 = foo[1]; let char3 = foo[2]`
	- spread operator:
		- `let char1, ...charRest = foo`
		- `char1 is a, charRest is ["b", "c"]`
---
### **Objects**
- basically everything in js is an object
- an object is a collection of properties and their vallues
```js
const studentList = {
	name1: foo,
	name2: bar,
	name3: john
}

const class1 = {
	name: web,
	id: 3612,
	students: student
}
```
-  **There are two ways to access properties:** (important**)
	- dot notation
		- `class1.id`
	- bracket notation
		- `class1["id"]`
- **Ways of creating objects:** (important*)
	- object function
	```js
	const obj = Object(); obj.propertyName = someValue;
	```
- Using Construction functions:
	- we cover this after functions
- We also have object destructuring:
	```js
	let { name, age } = someObject;
	```
---
### JSON
- JavaScript Object Notation
- a way to represent a JS object as a string
- parsing is available to files/through backend/server
```js
const obj = JSON.parse(json_string);
const objString = JSON.stringify(json_string);
```
- Syntax:
	```js
	const jsonString = `{"name": "sue", "age": 23}`
	```
	- \`\` is used for strings
---
### Functions (important**)
- *Functions are actually objects*  
- **Ways of creating functions**:
	- function delcaration
	```js
	function foo() {
		alert("foo");
	}
	
	function bar(abc) {
		return abc;
	}
	
	const xyz = bar; // This actually works
	// Now, you can actually call xyz
	let a = xyz("bruh");
	let b = xyz(foo);
	// lmao.
	let c = b("bruh");
	
	// function expression
	const foo = function(a, b) {
			return a + b;
		}
	const x =foo(1, 2);
	```
-  Nested functions also exist
 ```js
 function foo() {
	 const a;
	 return bar(a);
	 
	 function bar(a) {
		 return a + 2;
	 }
 }
 ```
- quite common, so get used to it
- **Note**:
	- nested function declarations are essentially "thrown" to the top of the parent function (so the above actually works)
	- **function expressions** however, are not.
---
### Objects and Functions
```js
const obj = { 
	name: "sue",
	age: 23,
	output: function() {
		alert(`${name} bruh ${age}`)
	}
}
obj.output()
```
- Kind of a method, but:
	- its technically a property whose value is a function
	- see the function expression definition
	- 