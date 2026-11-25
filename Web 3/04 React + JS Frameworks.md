### Preface
- working with Vanilla JS (DOM), has some drawbacks:
	- doesn't scale well with a larger number of developers
	- repetitive + verbose DOM code modifications
	- can be hard to maintain with lots of event handling
	- slow execution (every DOM change "rebuilds" the document area)
- we ended up with 3 very popular frameworks:
	- React
		- facebook project
		- in 2023, it "moved" to Vercel
		- facebook dogfoods it in all their software
	- Angular
		- google project 
		- uses a **Model** **View** **Controller** architecture
			- M: Data
			- V: presentation
			- C: event handling
		- complex with a steep learning curve
		- google doesn't use it for their own projects
	- Vue
		- similar to react
		- created by ex-react developers
---
# React
- uses a *component* approach
	- a **component** is an independent block of functionality that contains **presentaion** and **behaviour**
		- components can contain components to create complex structure
- React uses a *virtual DOM* to improve performance
	- this reduces DOM reprints, and removes "DOM" code from your code
	- react app -> virtual DOM -> DOM -> browser window
	- so, your code never actually touches the DOM
	- instead of every single DOM change re-creating the layout (causing flickering), we modify the virtual DOM, then react will push larger changes to the DOM. (similar to double buffering)
---
### Components
- **Benefits of Components **
	- rich ecosystem of components available because they allow re-use 
	- components are independent of other components, so they work well with teams
	- components are relatively easier to manage compared to vanilla js
- when creating components in React, you combine HTML and JS. To do so, we use **JSX** (JavaScript and XML)
	- JSX -> JSX Compiler -> .js
	- two ways to do this conversion:
		- at runtime via react libraries
			- runtime converter script
			- react jsx code `<script type="text/babel">`
			- *slower for users*
		- do the conversion at design-time using tools
			- JSX -> tools -> .js
			- tools like webpack, react compiler, vite 
			- *best approach, requires many tools*
				- install vite, run vite when  creating a new react app
					- vite sets up webpack, react compiler, and a dev server
				- then, vite can create a production build for the server to run
			- in vite/tools-based approach, each component is its own file
			- code exists its a specific file structure
- each component is implemented as a function or a class
	-  now functions can do everything so we don't use classes anymore
---
### JQuery (Aside)
- JQuery used to be the dominant JS library
- *use cases*:
	- provided a browser-independent way to write JS. up until around 2012, JS syntax and features differed between browsers
	- provided a way to select elements via css selectors (`querySelector` and `querySelectorAll` also provided this functionality)
	- provided an easy way to fetch data asynchronously
	- provided ways to animate/do effects (CSS3 got this later too)
	- provided a concise syntax
		- `const document.querySelectorAll("#first").forEach(n => n.styles.backgroundColor = "green");`
		- `$("#first").css("backgroundColor","green");`
- *why did it die out?*
	- use cases were no longer relevant
	- it was a large library, and added considerably to the time-to-interactive
		- parsing the js file took considerably long
	- didn't work with react/angular/vue
---
### React continued
- two development approaches:
	- **Pure**
		- good when first learning
		- fast to develop, slow to execute
	- **Tools**
		- real world
		- faster to execute
---
### React Components
- instead of the convention of adding/modifying elements using the DOM, React allows the developer to do it *declaratively*
- JSX uses XML syntax rules
	- every close needs an explicit close 
	- attribute values must be in double quotes
	- case sensitive
	- single root element
- we typically use components to represent a block of markup
- functional vs class components
- **functional components**
	- return markup
	```jsx
	function Link() {
		return <a href="foo">foo</a>;
	}
	```
- **Props**
	- every react component is passed a props parameter, which contains attributes passed to the component
	- we can generalize our code
	- **IMPORTANT: props data is read only**
		```jsx
	function Link(props) {
		return <a href={props.url}>{props.label}</a>
	}
	
	<Link url="foo" label="Foo" />
		```
	- this is great for loops too
	```jsx
	function Link( props ) {
		const { link, label } = props.data;
	
		return (
			<a href={link}>
				{label}
			</a>
		);
	}
	
	function Navigation() {
		const data = [
			{link: "foo", label: "Foo"},
			{link: "bar", label: "Bar"},
			etc.
		];
		
		return (
			<nav>
				{data.map(d => (
					<Link data={d}>
				))}
			</nav>
		)
	}
	```
```jsx
function App() {
	const data = [
		{
			id: 3, name: "brush" cost: 34, ... 
		}
	]
	
	return (
		<main>
			<ExampleHeader title="samplee app" />
			<ProductList products={data} />
			<ProductDetails />
		</main>
	)
}
```
- generally we want an application's data in the top level component in the hierarchy. 
- react components are self-contained
	- only has access to what was passed to it via state
	- two "parallel" components (same parent, both children), have no way of interacting with each other directly, instead, it must be done through the parent
```jsx
import "./ProductList.css" // possible to define css for a component in its own file
function ProuctList(props) {
	
	return (
		<div className="prodList">
			<ul>
				{props.products.map(p => (
					<ProductListItem product={p} />
				))}
			</ul>
		</div>
	)
}

function ProductListItem(props) {
	function handler() {
		alert("bruh")
	}
	
	//ver 2
	function handler(p) {
		alert(`bruh ${p.name}`)
	}

	return (
		<li onClick={handler}>
			{props.product.name}
		</li>
		
		//ver 2
		<li onClick={() => handler(props.product.name)}
			{props.product.name}
		</li>
	)
}

```

---
### Component Behaviours
- in React, you *don't use* `addEventListener` from the DOM, instead we use inline attributes to add behaviours
	- handlers are simply nested functions within the component
	- see above
- **Ultimately, we want to change our event handler so that it changes `ProductDetails`**
	- our parent component will have to handle message passing
	- in our example, our app creates that handler that's used in `ProductList` (invoked by `ProductListItem`), which then the parent app can modify `ProductDetails` in the provided handler
```jsx
function App() {
	const data = [{
		//product info
	}];
	
	let selectedProduct = data[0];
	
	function updateSelectedProduct(product) {
		// this doesn't actually work, we have to use a useState
		selectedProduct = product;
	}
	
	return (
		<main>
			<ExampleHeader title="samplee app" />
			<ProductList 
				products={data} 
				update={updateSelectedProduct} 
			/>
			<ProductDetails product={selectedProduct} />
		</main>
	)
}
```