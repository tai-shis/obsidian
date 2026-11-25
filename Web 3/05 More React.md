### React State
- every React component has its own state
- the following code does not update in the browser, but the value does (if we were to `console.log` it)
```jsx
function App() {
	let counter = 0;
	function handler() {
		counter++;
	} 
	
	return (
		<main>
			<h2>you havve clicked {counter} times</h2>
			<button onClick={handler}>click>/button>
		</main>
	)
}
```
- The react system calls the component's `render()` method when it decides the component needs to re-display itself
	- **It does this when: (IMPORTANT)**
		- *when first being displayed*
		- *whenever its state changes*
		- *whenever its input props change*
```jsx
import { useState } from 'react'

function App() {
	const [counter, setCounter] = useState(0);
	
	function handler() {
		setCounter(counter + 1);
	}
	
	return (
		<main>
			<h2>you havve clicked {counter} times</h2>
			<button onClick={handler}>click>/button>
		</main>
	)
}
```
- **useState**
	- creates a new state value for this component
	- returns an array with 2 elements
		- index 0: read-only, current value
		- index 1:  mutator/setter function
	- **when state changes, react "schedules" a re-render**
		- *counter won't actually change until there is a re-render
---
### React Forms
- two approaches:
	1) controlled form elements
		- uses React state to maintain form element state
		- *recommended by React*
	2) uncontrolled form elements
		- uses DOM to maintain form element state
		- *for big forms, this is easier*
```jsx
import { useState } from 'react';

function App() {
	const [user, setUser] = useState("");
	const [accept, setAccept] = useState(false);
	function changeUser(e) {
		let newUser = e.target.value
		// check input maybe
		setUser(newUser)
	}
	
	function changeAccept(e) {
		setAccept(e.target.value)
	}
	
	return (
		<main>
			<input type=text value={user} onChange={changeUser}/>
			<input type=checkbox value={accept} onChange={changeAccept} />
			<button />
		</main>
	)
}
```
---

### **Props Drilling**
- passing down info *and* behaviours (like handlers, setters, etc) through the component hierarchy
- components have no access to their ancestors nor their siblings
- state changing behaviours need to be passed down to the descendants via props
- not always the best reason (one or two descendants are feasible), instead we can use things like:
	- **context providers**
	- **redux?**
```jsx
import { useState } from 'react'
function App() {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	
	return (
		<div>
			<LeftPanel 
				name={name} 
				setName={setName} 
				address={address}
				setAddress={setAddress}
			/>
			<RightPanel 
				name={name} 
				address={addess}
			/>		
		</div>
	)
}

function LeftPanel(props) {
	const { 
		name, 
		setName, 
		address, 
		setAddress
	} = props;
	
	return(
		<div>
			<span className="small">New Entry</span>
			<h1>Tell us about yourself</h1>
			<span className="small">Full Name</span>
			<input
				type="text"
				placeholder="Jane Doe"
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<span className="small">Address</span>
			<textarea
				type="text"
				placeholder="123 Main St&#10;City, State, ZIP"
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>
		</div>
	)
}

function RightPanel(props) {
	const { name, address } = props;
	
	return (
		<div>
			<span className="small">Live Preview</small>
			<span className="small">Name</small>
			<p className="empty">
				{name ? name : "Your name here"}
			</p>
			
			<span className="small">Address</small>
			<p className="empty">
				{address ? address : "Your Address will appear here"}
			</p>
		</div>
	)
}
```
---
### Fetching Data in React
- data fetching has to happen at a specific time in the component life cycle.
	- with class components, it is in the `componentDidMount` method
	```jsx
	class App {
		componentDidMount() { 
			//fetch 
		}
		
		render ( 
			return ( ... ) 
		)
	}
	```
	- with **function components**, we use the **`useEffect`** hook
	```jsx
	import { useState, useEffect } from 'react';
	
	fucntion App() {
		const [data,setData] = useState([])
	
		// useEffect(function, options)
		useEffect(() => {
			...
			fetch(url)
				.then(res => res.json())
				.then(data => {
					// save fetched data in our state
					setData(data);			
				});
		}, []) // <- second parameter
	}
	```
	- *this second parameter determines **when** the fetch happens*
---
### React Router
- many React-based sites are single-page applications (SPAs)
	- contain a single html file
	- this is the default Vite approach
- as a result, many React apps need some easy way to *"swap"* views and *"navigate"* to views
	- typically, many React frameworks provide this functionality
	- There are also things like *React Router* that do this too
```sh
npm install react-router-dom
```
```jsx
// in main.jsx
import { BrowserRouter } from 'react-router-dom';
// use BrowserRouter here
	// something like this
	ReactDom.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	);

... // in another file

import { Routes, Route } from 'react-router-dom';

function App() {
	// use Routes and Route
	// defines the different "views"(components)
	return (
		<main>
			<Routes>
				<Route 
					path={/* route to be used by Link */}
					element={/* component to display */} 
				/>
				<Route 
					path=
					element= 
				/>
				<Route 
					path= 
					element=
				/>	
			</Routes>
		</main>
	);
}

... // in another file

import { Link } from 'react-router-dom';

function Nav(props) {
	// use Link here
	// replaces hyperlinks
	// specifies which view to display
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">
						<Button>Home</Button>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
```
---
### React and CSS
- a bunch of ways:
	- one css for entire app
	- components have their own css
	- "css in js"
		- define styles using JS via external packages
	- encapsulation (css modules)
	- css "modules", but just a prefix to differentiate pages
	- tailwindcss with approach 1
---
### Context Provider
- an alternative approach to state
	- somewhat like global state
- eliminates the need to pass state items down the component hierarchy via props
- ***The following is very important***
```jsx
import { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

const cartContextProvider = (props) => {
	// context provider owns this state
	const [cart, setCart] = useState([]); 
	
	// Value is whats available via the content
	return (
		<CartContext.Provider value={{cart, setCart}}> 
			{props.children}
		</CartContext.Provider>
	);
};

// in a different file
import { CartContext } from 'CartContextProvider.jsx'

const Header = (props) => {
	const { cart } = useContext(cartContext);
	
	return (
		<header>
			<Navigation />
			Cart <span>{cart.length}</span>
		</header>
	);
}

// also in a different file
import { CartContext } from ...;

const PaintingCard = (props) => {
	const { cart, setCart } = useContext(cartContext);
	
	const addCart = (e) => {
		const copy = [...cart];
		copy.push({ imagine cart stuff here });
		setCart(copy);
	}
	
	return (
		<div className="cart">
			{/* probably in some map */}
			<button onClick={addCart}>
				Add to Cart
			</button>
		</div>
	);
}

// then finallyin our App
import { CartContextProvider } from 'CartContextProvider.jsx'

const App = () => {

	// we must wrap any component that use the context in the provider
	return (
		<main>
			<CartContextProvider>
				<Header />
				<Browse />
				{/* etc */}
			</CartContextProvider>
		</main>
	);
}

```
---
### NextJS
- **Important**
	- *CSR vs SSG vs SSR*
		- **Client side rendering (Client)**: site isn't interactive until JS *jss downloaded, parsed, and executed*: **TTI**
			- **TTI** of a react side can be from 5-9 seconds
		- **Server Side Generation (Static)**: occurs at build time (when app is deployed)
			- hard to change components at run-time
			- eliminates as much js as possible
			- to improve *TTI*
		- **Server Site Rendering (Dynamic)**: occurs at request time
			- can improve *TTI*, but the main benefit is to simplify the development stack
			- data can be pre-fetched at build time
			- allows for a blend of server/client side rendering
---
### Server Functions
- alternate design pattern for hosting server functionality
---
