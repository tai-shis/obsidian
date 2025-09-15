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