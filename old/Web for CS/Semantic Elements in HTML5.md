 ### Introduction
- By the 2010's most site's HTML was hard-to-read 'forest' of `<div>` tags
- To circumvent this, HMTL5 introduced a variety of 'semantic' elements that work like `<div>` but have more meaningful names
	- Such as:
		- `<header>`
		- `<footer>`
		- `<section>`
		- `<article>`
		- `<nav>`
		- `<main>`
		- `<aside>`
		- `<figure>`
			- `<figcaption>`
		- `<details>`
		- `<summary>`
		- `<address>`
---
### HTML Tables
- Sometimes, you will need to display tabular data in some way or form

| Name | Age |
| ---- | --- |
| Bob  | 23  |
| Sue  | 30  |
| Dave | 18  |
- This can be done in a form of fashion like to following:
```HTML
<table>
	<tr> <!-- Table Row -->
		<th> <!-- Table Heading -->
			Name
		</th>
		<th>
			Age
		</th>
	</tr>
	<tr>
		<td> <!-- Table Data -->
			Bob
		</td>
		<td>
			23>
		</td>
	</tr>
	<!-- etc -->
</table>
```
- This can also all be done on one line (yeah)
- Table cells are also able to be nested
	- can span multiple columns or rows
	- I can't put the output but here is the code
```HTML
<table>
	<tr>
		<td> ... </td>
		<td> ... </td>
	</tr>
	<tr>
		<td colspan=2> ... </td> <!-- Will take up two table data spaces or columns -->
	</tr>
	<!-- etc --->
</table>
```
- HTML5 has additional table elements such as:
	- `<tbody>`
	- `<thead>`
	- `<tfoot>`
	- `<caption>`
	- There was example code, but I couldn't see it
	- But using these additional elements is usually useful for styling
		- E.g. having `<thead>` be stationary as the rest of the table is *scroll-able*
---
### HTML Forms (IMPORTANT)
- Forms are a mechanism for *obtaining info* from the user
	- i.e. *sending* the obtained data from the browser to the server
		- i.e. frontend to backend
		- or making a request to the server
```HTML
<form method="?" action="?">
	<!-- The label element is not required but is a helpful semantic element that simplifies form styling and makes the site for accessible -->
	<label> Name </label>
	<input type="text" name="something" placeholder="Enter your name" />
</form>
```
- `<form>` element:
	- **method** - how to package the data
	- **action** - where to send the data
- **input** - form control
- **type** - type of control
	-  for example:
		- text
			- shows plaintext
		- password
			- does not show plaintext
		- phone number
		- email
		- colour
		- time
		- date
		- radio (kind of like checkbox but the circle thingy)
			- Usually *exclusive*, used in choosing one between multiple options
		- checkbox
			- Usually *non-exclusive*, used in choosing more than one between multiple options
		- etc.
- **name** essential form, 
	- kind of like a variable name for the elements content
- **placeholder** - optional which displays something when element is hovered over
```HTML
<textarea name="else"> </textarea>
```
- appears over a multi-line
- is a larger text input area compared to just 'text'
```HTML
<!-- This creates kind of like a dropdown option list --->
<select name="choice">
	<option>Canada</option>
	<option>France</option>
</select>
```
- These are also exclusive seeing as it is used to choose one option from a dropdown list
- A multi-line select is also possible
	- And even nested options
```HTML
<select name="#">
	<option value="0"> <!-- Essentially a null value for the server to know if a value has been selected -->
		select a country
	</option>
	<option value="CA">
		Canada
	</option>
</select>
```
- The value parameter specifies what exactly to send to the server.
	- This way, we can show a more detailed explanation of the option while keeping the data sent to the server minimal and easily handleable.
- There are also **'special'** input types available for us to use
	- **submit*** - a button which *submits the form data to the server*
		- can also use `<button type="submit"> ... </button>` to do the same thing
	- reset - clears form data
	- file - uploads a file
---
### Submitting Form Data (ALSO IMPORTANT)
``` HTML
<form method="POST" />
<form method="GET" />
```
- The **method** refers to two different HTTP verbs/actions:
	- GET - data is packaged in the URL
	- POST - data is 'packaged' in the HTTP header
- Then, an action can be specified in the tags
	- `action="process.php"`
		- server-side resource that's on the same server
	- `action="https://foo"`
		- Or just a URL to the server for processing
- Form data is packaged as a ***query string***
	- `name=bob&country=CA&email=bob@bob.com`
	- here:
		- name - element name
		- bob - element value
	- etc. for rest of form values.
---
### How Forms Work
- Submitting a form, like clicking a *hyperlink*, makes a **request**
	- Similar to all other requests, this requires specifying a resource on a server
	- This resource may also include a url.
	- e.g.
		- `<a href="product.html">` = `<form action="product.php">`
		- `<a href="https://somewhere/...">` and vice versa
- Form data is sent to the server packages as a ***querystring***
	- `name1=value1&name2=value2&etc.`
	- all in form-value pairs
	- `name1` could be written as `<input type=text name="name1>`
	- values in a querystring are **URL encoded**
		- e.g. spaces are turned to '+'
- If `method=GET`, the querystring appears *after* the url.
	- `GET /resource.php?name1=value1&name2=value2`
- If `method=POST`, the querystring appears after the HTTP request headers 
```HTTP
  POST /resource.php http/1.1
  {http headers} 
  name1=value1&name2=value2 
```
- **Best practice in most forms is to use POST**
	- However, if there is *state-changing* data in the form, it should definitely use **POST**
- querystrings can appear in *any* request
	- for example: 
		- `<a href="product.php?id=3456">Product 1 Name</a>`
		- for the server, the two are equivalent
	```HTML
	<form method=GET action=product.php>
		<input type=text name="id" value="3456">
		<input type=submit>
	</form>
	```
---
### HTTP (Important**)
- HTTP, or Hypertext Protocol, is what is used by browsers and web servers
	- A browser being a program for making HTTP requests and rendering received responses.
	- A web server being a program that *listens* for HTTP requests and send a response back
- HTTP is a simple protocol, as in, text based with a small number of commands
	- These commands are referred to as **verbs**
	- e.g.
		- `GET /product.html http/1.1`
		- verb, resource, and protocol respectively
	- There are also a variety of additional optional request headers
- **HTTP Verbs**
	- GET
		- all links, forms using `METHOD=GET`
			- form data is appended to the resource/url
			- this means the form data is visible to the user in the browser
	- POST
		- forms using `METHOD=POST`
			- this means the form data is in the HTTP header
	- PUT
		- requires JS
	- DELETE
		- requires JS