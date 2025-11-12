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
---
### Fetch + Promises
- fetch returns a promise object
	- a placeholder for a value that will eventually be received/available
	- also can not (fetch failing)
- this promise object has a small set of properties and methods
	- `then()`
	- `catch()`
- Both of these functions are then passed callback functions.
---
### Fetching Data
```js
const url = "https://www.whatever.com/products"
or
const url = "data/something.json"

fetch(url)
  // Then returns a promise or returns nothing
  .then(response => { // realistic callback function example
    // check for response 
    if (response.ok)
	  // also returns a promise
	  return response.json() // gets object within the JSON part of the response body
	else
	  throw new Error("fetch failed")
  })
  // after response.json is resolved, another callback with data is passed
  // i.e. the data retrieved from the url
  .then(data => {
    // do something with retrieved data
  })
  // now we typically provide a catch
  .catch(error -> {
    // do something with error
    // can modify DOM / put in connsole
  });
```
- For labs/lectures/tests, we usually will just do this:
```js
fetch(url)
  .then(resp => resp.json())
  .then(data => {...});
// with ... having actual code
```
- Example:
```js
{ // html
<select id='selContinents'>
	<option value=0>Select a Countinent</option>
	<option value=NA>North American</option>
	etc.
</select>
<select id='selCountries' disabled>
	<option value=0>Select a Country</option>
<Select>
<ul id='listCities'></ul>
}

const url1 = "..."
const url2 = "..."

const selContinents = document.querySelector("#selContinents");
const selCountries = document.querySelector("#setCountries");
const listCities = document.querySelector('#listCities");

selContinents.addEventListener("change", () => {
  if(setContinents.value != 0) {
    fetch(`${url1}/${selCountinents.value}`)
	  .then(res => res.json())
	  .then(data => {
	    // now populate the country selector
	    selCountries.innerHTML = '';
	    let placeholder = document.createElement("option");
	    placeholder.value = 0;
	    placeholder.textContent = "Select a Country";
	    selCountries.appendChild(placeholder);
	    
	    data.forEach(d => {
	      let opt = document.createElement("option");
	      opt.value = d.id;
	      opt.textContent = d.name;
	      selCountries.appendChild(opt);
	    });
	    
        selCountries.setAttribute("disabled", false)
	  })
	  .catch(err => {
	    throw new Error("Error while fetching countries");
	  })
	}
  }
})

selCountries.addEventListener("change",() => {
  if (selCountries.value != 0) {
    fetch(`${url2}/${selCountries.value}`)
      .then(resp => resp.json())
      .then(cities => {
	    listCities.innerHTML = '';
	    cities.forEach(c => {
	      const li = document.createElement("li");
	      li.textContent = c.name;
	      li.addEventListener("click", (e) => {
		    bleh
		  }  
	    });
	    listCities.appendChild(li);
	  })
	  .catch(err => {
	    throw new Error("Error while fetching cities");
	  })
    })
  }
})
```
- This is **JS Callback hell.**
	- it ends up being a massive triangle (deeply nested)
	- its hard to maintain :/
- We can make it less horrible by grouping many chunks into many functions
- async + await (wed) can help a bit
---
### Not-so-different stuff
- Loading animation
```js
#load {
  display: none,
  background-image: url(---)
  position: etc.
}

const load = document.querySelector('#load');
load.styles.display = "block";

fetch(url)
  .then(resp => resp.json())
  .then(data => {
    load.styles.display = none;
    // do something with data
  });
// Might be better to use classList if we wanted an animation!
```
- Toaster example`
```css
.snackbar {
	display: block;
	width: 200px;
	etc.
}

.snackbar.show {
	display: block;
	animation: fadein: 0.5sec fade-out: 0.5sec ...
}

@keyframes fadein {
	from {top: 0; opacity; 0}
	to {top: 50px; opacity: 1}
}

@keyframes fadeout {
	...
}
```
- but now we have an issue, we want to display this snackbar for only a set amount of time.
```js
function showSnackBar(msg) {
  const bar = document.querySelector('.snackbar');
  bar.textContent = msg;
  bar.classList.add("show");
  setTimeout(() => {
    bar.classList.remove("show");
  }, 2000);
  
}
```
--- 
### Other HTTP Methods with Fetch
- By default, `fetch()` makes a GET request
	- you can actually specify what fetch should do through the options parameter (POST, PUT, DELETE)
		- POST - create
		- GET - retrieve
		- PUT - update
		- DELETE - delete
		- or **CRUD operations**
```js
function addFavorite(e) {
  if (e.target.nodeName == "BUTTON") {
    // get product id from button
    const id = e.target.dataset.id;
    const name = e.target.dataset.name
    
    // now we create a querystring with the data
    const qString = new FormData()
    qString.set("id", id);
    qString.set("title", name)
    
    // set fetch options
    const options = {
	  method: "POST",
	  body: qString
    }
    
    // now we can fetch post
    fetch(url, options)
      .then(resp => resp.json())
      .then(data => { showSnackBar("item added") })
      .catch( err => { showSnackBar("favorite request failed") })
  }
}
```