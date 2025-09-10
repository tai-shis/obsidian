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
	<tr>
	<!-- etc -- >
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
### HTML Forms
