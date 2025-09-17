### Introduction
- CSS stylesheets have a kind of pseudo inheritance (sometimes)
- CSS is meant to define the *presentation* of the document's content and structure
	- the content and structure being defined using HTML
```css
.div {
	color: red,
	font-size: 12px,
	foo: bar,
}
```
-  Here we have:
	- a declaration block - `{}`
	- a property - `foo:`
	- a value - `bar,`
- CSS  can appear in many different places
1. Directly within the HTML markup using the `<style>` attribute
	- `<div style="color:red; font-size:12px">`
	- generally avoided due to clutter and non-maintainability
	- this definition/location has the highest *specificity*
		- specificity, as in, it overrides *all other definitions*
	- This is referred to as *inline styles*
2.  Within a style element (called *Embedded styles*)
	- Appears anywhere usually in the `<head>` element
	- ```HTML
<style>
div{color:red}
.box{background-color:yellow}
</style>
```
3.  Within an external file (called *External Styles*)
	- that is imported via the `<link>` element in the `<head>`
- ```HTML
<head>
	<link href="styles.css">
```
	-  Which contains something like:
- ```css
div {
	color: red
}

.box {
	background-color: yellow
}
```
	- This is generally preferred
	- Learning CSS typically requires:
		- Learning CSS selectors
			- **These are used in JS too**
		- Learning specificity rules
		- Learning properties + values
		- and a lot more
---
### CSS Selectors (Important*)
- **Element Selector**
	- Selects **all** elements whose name matches the specified element selection
```css
div { ... }
span { ... }
```
- **ID Selector**
	-  matches all elements which the id matches the specified id selection
	- `<div id="name1>`
	- typically, each id **should** be unique, 
		- so an id selector should match a **single** element.
```css
#name1 { ... }
```
- **Class Selector**
	- matches all elements which the class name contains the specified class selection
	- `<div class="box">` and `<span class="big box">`
	- typically used for styling **multiple** elements in a consistent way.
	- **Note: attributes can contain multiple names *separated by spaces**** 
```css
.box { ... }
```
- **Contextual Selectors**
	- Allows you to select one or more elements within a specific context:
		- ***Descendent Selectors\**** (within)
		- ```css
		  div span { ... }
		  #container .box span { ... }
		  ```
			- This essentially means **all spans, within any div**
			- And also all spans within an element with `class="box"` within an element with `id="container"`
			- respectively of course
		- ```HTML
	  <div>
		  <p> ...
		  <span> ...
		  <span> ...
	  </div>
	  
	  <span> ...
	  ```
			- This will *not* select the bottom `<span>`, since its not contained in a `<div>`
		- The following **will not be tested**
		- Child Selectors
			- `div > h2`
			-  selects any `<h2>` that is a direct child
		- ```HTML
			  <div>
				  <h2>
			  <!-- but not -->
			  <div>
				  <p>
					  <h2>
		  ```
		- Adjacent Sibling
			- `div + h3`
			- selects an element that is adjacent
		- ```HTML
			  <h3> ...
			  <p>
		  ```
		- General Sibling
			- `h3 ~ p`
			- selects an element that shares the same parent
		- ```HTML
			  <h3>
			  <div> ... </div>
			  <p>
		  ```
- Note: Both class and id selectors can be prefaced with element name
	- (less common for id since it usually appears just once)
	- Usually just specify different class names
```css
div.box { ... }
span.box { ... }
div#name1 { ... }
```
---
### Selectors (Important**)
- id
	- `#id`
- class
	- `.class`
- element
	- `name`
- contextual
	- descendant
- attribute
	- used for selecting elements by their attributes
	- e.g.
		- `-[title]`
		- `-[title='bob']`
- We can also combine selectors
	- e.g.
		- `a[title]`
		- This selects all `<a>` elements that have a title attribute
- There are also 6 *pseudo selectors*
	- Selectors which select their elements based on 'aspects' of the element
	- e.g.
		- `a:link`
			- anchor elements that contain an `href`
			- typically used to specify link colour
		- `a:visited`
			- links that have been visited
			- also used to change colour of links that were visited
		- `ul.menu li:first-child`
			- selects the first `li` element
			- as apposed to `ul.menu li` which selects all `li` elements in the list
		- `table.teams tr:nth-child(2)`
			- selects every second *t*able *r*ow in a table called teams
- **Should know the first 5 for exams**
---
### Properties
- there are about a hundred properties, so it is difficult to memorise all of them
- however, there are about 20 or so that should be memorised (due to frequent use)
- **They fall under the following categories:**
	- **fonts**
		- `font:`
			- this can be a shorthand for multiple properties in one line
			- `font: [family] [size] [weight] [etc]`
				- apparently the order matters sometimes
		- `font-size:`
		- `font-weight:`
		- `font-family:`
		- etc.
	- **text**
	- **box**
	- **layout**
	- **effects** (transitions, animations, etc.)
	- miscellaneous 
---
### Values
- Properties can have different value types and units
- e.g.
	- `font-size:`
		- `12px`
		- `10pt`
		- `5in`
		- `2rem`
		- etc.
---
### Absolute vs Relative Measures
- in CSS, absolute measures (like in, px, or pt) are easy to use but not *ideal* for web contexts because devices can vary in size 
- Its better to instead use relative measures
	- such as em, rem, px, vw, vh
	- however, these are more complicated to use
```HTML
<body>
<main>
	<div id='header'>
		<h1>title</h1>
		<p>subtext</p>
	</div>
	<div class='box'>
		<article>
			<div class='box'>
				<h2>...</h2>
				<p>...</p>
			</div>
			<div class='box'>
				<h2>...</h2>
				<p>...</p>
			</div>
		</article>
		<article>
			...
		</article>
	</div>
</main>
</body>
```
- Take this block of html
```css
/* Below is example CSS*/
/* Changes background color */
background-color: yellow;
 
/* Changes text color */
color: brown;
font-weight: bold;

/* This order matters */
border: 1pt solid black;
text-align: left;

/* Now, some real styling */
/* Set text color and font weight for all p elements within a div */
div p {
	color: brown;
	font-weight: bold;
}

/* set border and background color for all box class elements 
within an article */
article .box {
	border: 1pt solid black;
	background-color: yellow;
}

/* set text align for all h2 elements */
h2 {
	text-align: left;
}

/* set the background color to #FFCC00 for the first div 
element within an article */
article div:first-child {
	background-color: #FFCC00;
}

/* set the link color to red for any hyperlink within 
element whose id is header */
#header a:link {
	color: red;
}
```
- Suppose we have general and specific styling for an element `<p>`
	- i.e. `p { color: red; } \\ div p { color: black; }`
- How does the browser handle rule conflicts?
	- Styles will interact in different ways:
		- *inheritance*
			- some styles are inherited from their ancestor element
			- some styles will be applied to their children
				- these include font, colour, list, and text properties
			- properties that are not inheritable include:
				- layout, box, effects
		- *location
			- the most recent rule replaces earlier rules
				- recent as in appears later in the document
		- *specificity*
			- more 'specific' rules will override less 'specific' rules
				- inline -> id + selectors -> id -> class + attribute -> descendant -> element
				- in order from most to least specific