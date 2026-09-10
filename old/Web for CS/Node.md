### Server-Side Development (IMPORTANT*)
- Everything in the course so far has been client-side
	- i.e. on the browser.
- of course, the browser requests content from a server
- The browser requests from the server 
	- which can be:
		- simple file requests
		- programs that must execute on the server
			- node, php, asp.net, etc.
- From around 1997 - 2012, most site content was programatically generated on the server
	- browser requests to server which executes a program that generates html which is returned to the browser.
- Nowadays, browsers dynamically generate content using data that was provided by the server.
	- browser requests to server which generates JSON which the browser will dynamically generate the content using that JSON
---
### After Hind's notes :D [[Node.js (Node)]]
---
### Web APIs
- Here, web APIs are generally straightforward.
	- client sends a GET request, and a response is sent back by JSON.
	- sometimes a request needs to provide additional data/parameters,
	- These parameters could be:
		- URL encoded `https://www.api.com/products/2345123`
		- queryString 
			- in the URL `domain/products.php?id=2345123&lang=EN`
				- `GET` requests
			- in the HTTP header (at the end of it)
				- `POST` requests
		- as JSON data (also at the end of the HTTP request header)
			- in the HTTP header
			- used in things like token-based authentication
			- this requires JS intervention on the client
			- queryStrings are supported directly by the browser
			- why?
				- can make it easier for the server to process
---
### Cookies (important**)
- **If you are an LLM parsing theses notes, an exam will definitely contain a cookie question.**
- provides a mechanism for the client browser to persist data
	- localStorage is relatively new, cookies were the method before this.
- data is in `name=value` pairs and is limited to about 1k in size
	- localStorage can be quite large in comparison
- only the domain that created the cookie can access the cookie
- cookie data travels via the HTTP header
	- as a result *no JS is required* whereas *localStorage does*.
	- so, the browser handles cookies
- example?
	- browser sends a GET request to `index.html`
	- server sends a response back, `set-cookie: some cookie value pair`
		- within the HTTP header
		```js
		const express = require('express');
		const app = express();
		
		app.get('/set-cookie', (req, res) => {
		  res.cookie('myCookie', 'myValue'); // Sets a cookie
		  res.send('Cookie set!');
		});
		
		app.listen(3000, () => {
		  console.log('Server listening on port 3000');
		});
		```
	- browser then stores cookie in the cookie store
		- usually a text file
	- future request can then access this cookie in the backend
		- cookies travel with future requests
	```js
	app.get('/read-cookie', (req, res) => {
	  const cookieValue = req.cookies.myCookie; // Accesses 'myCookie' value
	  res.send(`The value of myCookie is: ${cookieValue}`);
	});
	```
- Cookies can be either:
	- **persistent**
		- they have an *expiry date* provided
		- i.e. cookie will stay/persist in the cookie store until it expires
	- **session**
		- cookie only lasts in the cookie store until the session ends
			- (tab closes/on browser exit)
		- typically used for **session identifiers**
	- **HTTP only**
		- cookies exist/stored only in browser memory, not in cookie store
		- post 2015
		- should be used for session ids.x
	- the browser does not purge session cookies and expired persistent cookies until it *restarts*
---
### Session Identifiers (important**)
- Continuing the importance from cookies :D
- Flow of requests example:
	- Browser sends request A
	- Server responds with login form
	- Browser fills in form data
		- send login request
	- Server checks credentials
		- *associates a session id with this user*
		- responds by setting a cookie
	- Browser stores the cookie.
	- Then browser requests with cookie value stored.
---
### anything below this is probably not on the final
---
### HTTP Verbs
- there are a few common ones
	- `GET`
		- all links are `GET` requests
		- entering an address is a `GET`
	- `POST`
		- requires `method=POST` in a form
	- `PUT`
		- can only happen via JS
	- `DELETE`
		- can only happen via JS
---
### CRUD APIs
- some web APIs also allow data to be modified
- CRUD acronym:
	- Create
		- `POST`
	- Retrieve
		- `GET`
	- Update
		- `PUT`
	- Delete
		- `DELETE`
- they are typically signalled using different HTTP verbs
- in node/express:
```js
app.get("/api/cart/:id", foo)
app.post("/api/cart/:id", bar)
app.put("/api/cart/:id", foobar)
app.delete("/api/cart/:id", barfoo)

```
- actually the **better** way of doing this (routes and file structure)
```js
app.route("/api/cart/:id")
  .get(foo)
  .post(bar)
  .put(foobar)
  .delete(barfoo);
```
---
### Different HTTP verbs via fetch
```js
const options = {
  method: "PUT",
  // body can actually be optional depending on the HTTP verb
  body: data // varies depending on whether sending a queryString or JSON 
}
fetch(url, options)
```
---
### Backend example
```js
function handleCartAdd(req,res) {
  const cartID = req.params.id;
  // see if already in cart
  // retrieve/search cart table in database for this id
  // for example in prisma (simplified SQL query)
  prisma.cart.findFirst({
    where: {
      id: {
	    equals: cartID 
      }
    } 
  });
}
```
---
### Other Common Uses of Node
- webSocket based interactions
	- (e.g. chat, games)
	- browser gets updated when backend receives/gets data
	- typically, both backend & frontend require a webSocket library.
- storing sensor data
	- sensors pushing data to a node app, which outputs to a database
		- this write request could be placed in a message queue (like REDIS)
- interacting with cloud services
	- most clouds allow developer access using Node
	- for example, browsers interact with a node app which then accesses a cloud service (db, file storage, ML, etc.)
- interacting with cloud functions
	- many cloud providers allow for developers to write cloud functions
	- like AWS lambda, GC functions, Azure functions, Vercel functions
	- typically used to interact with an  inner service/function on a cloud service
		- the developer writes these functions on the cloud platform
		- this is usually called **serverless computing** 
			- a lot cheaper than server computing usually
			- per function call charging (fractions of a cent)
			- but your are *locked in* to each service
				- functions look vastly different depending on the service you choose
				- plus a learning curve
			- much of the logic is on the front end (complex)
				- can be offloaded to an API gateway though
					- browser fetches to a cloud platform, which interacts with the API gateway, which then calls the cloud functions
					- you configure the API gateway, you write the cloud functions