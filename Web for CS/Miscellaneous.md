### Array Functions/Methods (IMPORTANT**)
```js
const foo = [5, 6, 7];
const bar = [
	{ id: 3, name: "Suzie" },
	{ id: 7, name: "Bob" }, etc.
];
```
- The array object has a variety of helpful methods/functions
- These sometimes work in a functional manner, i.e. they are passed functions which operate on each element in the array
- **For Each**
	- used to iterate an array prior to for of loops
```js
bar.forEach((b) => { console.log(b.name) })
```
- **Find**
	- used to find an element in an array
	- undefined/null if no match
	- matching item if match
```js
const match = bar.find((b) => { b.name == "sue" })
```
- **Filter**
	- returns an array of matches
```js
const matches = bar.filter((b) => { b.id < 10 })
// returns the entirety of bar in this case.
```
- **Map**
	- transfers an array into a different, *new* array
```js
const messages = bar.map((b) => { "hello" + b.name })
```
- **Reduce**
	- reduce an array to a single value
```js
const sum = foo.reduce( (element, prev) => { prev + element }, 0)
// 0 is our initial value
```
- **Sort**
	- sorts and array
```js
const sortedFoo = foo.sort()
const sortedBar = bar.sort((a, b) => { a.name < b.name ? -1 : 1 })
```
---
### Asynchronous Coding with Fetch (IMPORTANT**)
- contemporary JS applications frequently fetch their data from a *web API*
	- web API as in, a server that returns JSON (or maybe XML)
- this data is requested *asynchronously*, i.e. a separate thread.
- ***Using Fetch***
	- fetch does not return the requested data, in fact, it is a *Promise* object.
```js
const url = "https://.../";
const foo = fetch(url);
```
 - **Promises**
	 - these are objects that represent a value that will be obtained *in the future*.
 - To handle waiting for the promise to be resolved, we use the `then` method.
 ```js
 console.log('before fetch');
 fetch(url)
 .then(foo => { "fetch resolved" })
 
 console.log('after fetch')
 
 // console:
 // before fetch
 // after fetch
 // fetch resolved
 ```
- Here is a more realistic use-case for fetch:
	- **This will 99% be on the exam**
```js
fetch(url)
.then(response => response.json()) // extracts data JSON from response
.then(data => { // do somethign with the data }) // data is a JS object
.catch(err => { // if there is an error })
```