![[IMG_7325.jpg]]
![[IMG_7326.jpg]]

### Introduction
- Created back in 2009 as an open source project
- It uses JS as its programming language (ASP.NET uses C#, JSP uses Java, PHP uses PHP)
- How was it possible for Node to use JS?
	- At the time (2009) it was only possible to run JS in a web browser
	- Because Google separated the JS engine (V8) out of the browser and allowed other projects to license its use
		- The V8 engine in Node is always a little (a year or two) behind the one in Chrome
- **Node Advantages** \*
	- It is <u>very</u> popular
		- This means there is an incredibly deep ecosystem that supports it, which means less re-inventing the wheel
	- JS everywhere
		- Having a single language for client and server side is easier to support and hire for
	- Asynchronous code in JS allows for a **non-blocking** architecture, which improves performance dramatically
		- PHP for example is a **blocking** architecture, so when a request is made on a thread, it blocks until the request is completed before proceeding
		- On a Linux Server, each request is handled by its own thread (even if executing the same program)
			- A typical server can handle only about 1000 requests
			- Solution: Multiple servers
				- A load balancer would route server requests across a multitude of identical servers
			- Problem: Because of **blocking** code languages (PHP/JSP/ASP.NET) the server threads are usually just waiting (e.g. on a database or a file service)
				- get data ~ 150ms
				- generate HTML ~5ms
		- By contrast, because JS can easily implement async requests on separate threads, a typical Node application contains little to no blocking code (i.e. use callback functions). Node thus uses only a single thread, which means the server is not spending time context switching.
			- Thus, more requests per server, thus fewer servers needed (up to 100k requests per server)
	- Push Architectures
		- The async nature of JS makes Node ideal for **push-based** apps like online chat + games
			- Traditionally, the client pulls data from the server (HTTP protocol)
			- For push-based, the server pushes data to the client (WebSocket protocol)
- **Node Disadvantages** \*
	- Very poor for computationally intensive operations due to single-thread architecture
	- Can be tricky to code because of its async nature (lots and lots of callback functions)
---
### Using Node
- Node is a CLI (Command Line Interface) tool that needs to be installed
- It also installs npm and npx, which are used for installing packages
```javascript
//Hello world, version 1
console.log("hello world")
// since Node runs on a server, console.log will output to terminal

// $ node hello.js
// hello world
// $


//Hello world, version 2
const http = require("http"); 
// Node has its own module syntax (called CommmonJS), code in a module is private unless made public (return value of require is the public information)

// You can install packages using npm, which provides access to other modules

// Node has some "built-in" packages (such as http) which don't need to be installed via npm

const server = http.createServer((request, response) => {
	response.writeHead(200, {"Content-Type": "text/plain"});
	// "text/plain" MIME type (tells browser what type of content to expect)
	response.write("hello world");
	response.end();
});

server.listen(8080);
console.log("server running on port 8080");
```
---
### aside
- For exams, Randy will not ask for coding Node, it would be more so big picture (i.e. like the advantages and disadvantages).
- Says he doesn't expect us to memorize how to code the example above for example.
---

```javascript
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, resp) => {
	const filename = "public/sample.html";
	//      file to read | function to be invoked after file read
	fs.readFile(filename , (err, file) => {
		//          error code | contents
		//
		// lots of Node libraries use this pattern
		if (err) {
			resp.writeHead(500, {"Content-Type": "text/html"});
			resp.write("<h1>Server Error</h1>");
		} else {
			resp.writeHead(200, {"Content-Type": "text/html"});
			resp.write(file);
		}
	});
});

server.listen(8080);
console.log("Server started on port 8080");
```
---
### Node Promises
```javascript
const http = require("http");

//provides a "promisified" version of the module
const fs = require("fs").promises
//.....
fs.readFile(filename);
	.then (file => {
		//.....
	});
	.catch (err => {
		//.....
	});
```
OR
```javascript
const filename = http.createServer(async (req,resp) => {
	try {
		const filename = ".....";
		const file = await fs.readFile(filename);
		//.....
	} catch {
		//.....
	}
});
```

NOTE -> many (most?) node modules are not yet "promisified".

---
### Express
- A very popular Node package that simplifies the creation of web applications (especially web API's)
- In the late 2010s, it was common to hear about the MERN(MongoDB, Express, React, Node) stack
- Express needs to be installed
	- npm install express
	- npm: Node Package Manager
	- what does install do?
		- if it doesn't exist, this creates a subfolder named "node_modules"
		- installs it and its dependencies in "node_modules"

```javascript
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
//OR
//const app = require("express")();

// the "/" is called a route
//
// so for the line below, when a request is made for that route, it invokes the
// function.
// version 1
app.get("/", (req, resp) => {
	const file = "products.json";
	
	//__dirname is a node constant which returns absolute path of application
	//"data" is subfolder
	//file is the filename
	const jsonPath = path.join(__dirname, "data", file)
	const jsonData = fs.readFile(jsonPath, (err, contents) => {
		//express function
		resp.json(JSON.parse(contents));
	});
});

// version 2
const file = "products.json";
const jsonPath = path.join(__dirname, "data", file);

//blocking code, but this executes just once when app starts
const jsonData = fs.readFileSync(jsonPath);
const products = JSON.parse(jsonData);
app.get("/", (req, resp) => {
	resp.json(products);
});
app.get("/:id", (req,resp) => {
	//find product
	const match = products.find(p => p.id == req.params.id);
	resp.json(match);
});
```

- When requests are made, the server has something we call middleware, this is essentially a pipeline that handles certain aspects before it processes the request.
	- log request –> setup static file handling –> cookie handling –> authentication –> .....
- In express, middleware is added via the use() function
	- e.g. app.use(...)
- In this class, we will only use Node to create a web API (assignment 3), that handles different routes/paths and returns JSON data

```javascript
app.get(route1, handler1);
app.get(route2, handler2);
//etc.

//in assignment 3, you will likely have 11 handlers
//so to make your code cleaner, you SHOULD break it
//down into a few modules
```

- In a database table, each record has a unique identifier (usually called the **primary key**)

```javascript
const express = require("express");
const app = express();

//read + process our JSON data files before line below
app.get("/api/paintings", (req, resp) => {
	resp.json(paintings); //we need to populate this array earlier
});
app.get("/api/paintings/:id", (req,resp) => {
	//find the requested painting
	const matches = paintings.filter(p => p.paintingID == req.params.id);
	resp.json(matches);
});
```
---
### Creating Modules
- A module in Node can be either:
	- a commonJS module
	- a ES7 module (post 2020)
- At present, you can <u>not</u> mix them
- For this assignment, I suggest sticking with commonJS modules
- A module is a .js file, to use a module you simply do the following
	- = require("./modules/data-provider.js");
- In data-provider.js:
```javascript
//your code
//everything here will be private to the module
const fs = require("fs"); //modules can use other modules
const path = require("path");
const paintingFilename = "painting.json"
const paintingPath = path(__dirname, "./data", paintingFilename);
const paintingContent = fs.readFileSync(paintingPath, "utf8");
const paintings = JSON.parse(paintingContent);

function foo() {...};

...

//this is what the require() returns
//it also defines the "public" parts of the module
module.export = ...;
```
