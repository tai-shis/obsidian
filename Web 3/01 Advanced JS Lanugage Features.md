### Modules
- in normal JS, all code is in the global namespace or in a function namespace
	- this can be real hard to maintain, since JS function allows identifiers to be redefined at runtime
	```js
	function abc() {
		foo;
	}
	
	abc = 23; // this overwrites abc()
	```
- JS apps are often composed of many scripts combined together - many of which are created by someone else
	- in Node, this is especially true
- *modules*  are a potential solution to this problem.
	- modules add the ability to **encapsulate** your code
	- things like classes, private methods, etc.
- in ES modules, you can make identifiers public/private
	- by default, identifiers in a module are private
	- a  module is simply code in a seperate file that has been marked as a module:
	```js
		<script src="abcdje" type="module">
	```
	- **Note\*: the browser only allows the use of modules if it is an HTTP request***
		- (e.g. LiveServer, VisualCode, LocalHost, file, etc.)
- we can do this by using the `export` keyword
```js
// in a module
const x = 3
function w(b) { ... }

let a = w(x)
// two methods to export
export function foo() { ... }

export { cde, fgh } // conventionally at the bottom of the file for readability
```
- to use a module, you must:
	- include the `type="module"` in `<script>` reference
	- use `import` in the code using the module
	```js
		// e.g.
		import * as ab from './abc.js';
		ab.foo()
		// or
		import { foo } from './abc.js'
		foo()
	```
---
### Prototypes
- JS is sometimes said to be a protoype-based language and not a class-based one
	- prototypes provide an "inheritance"-like ability to shove functionality objects
	- but JS uses functions and not classes; how do we give identical behaviours to different objects?
	``` js
		function Car(year, make) {
			 this.year = year;
			 this.make = make;
			 this.output = function() {
				 console.log(this.year + this.model);
			 }
		}
		
		const c1 = new Car( ... );
		const c2 = new Car( ... );
		c2.output();
	```
	- though constructors provide this capability, they are *memory inefficient*
- Every function object has a *prototype* property whose value is shared by all objects with the same definition
	```js
	// instead of above, we can do the following
	function Car(year, make) {
		this.year = year; // these two we can't get rid of
		this.make = make; // but the function was repeated for no reason
	}
	
	Car.prototype.output = function() {
		console.log(this.year + this.model)
	}
	
	const c3 = new Car( ... )
	c3.output() // same exact behaviour, much less memory/code duplication
	```
	- this prototype property lets us define something like this, which is not going to be repeated in memory for each instance
	- the main problem/benefit with prototypes is that you can add it to anywhere
		```js
		String.prototype.randy = function() {
			alert("hi randy")
		}
		```
	- while this can be powerful, it does make the code less maintainable/understandable
---
### Class
- as JS class is "syntactical sugar", an alternate syntax that combines constructor functions and prototype additions
	- essentially a *memory efficient function constructor*
		```js
		class Car {
			// data
			constructor(year, make) {
				this.year = year
				this.make = make
			}
			
			// behaviour: stored in the prototype
			output() {
				alert(this.year + this.make)
			}
		}
		```