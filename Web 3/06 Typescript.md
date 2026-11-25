### Typescript
- type-safe version of JS
- .ts file compiled to .js
```ts
let msg: string = "hello";

msg = "bye"; // this works
msg = 123; // this does not (compile error) 
```
- this way we can catch errors at design time rather than runtime 
```ts
let total: number = 123;

function calculateTax(a: number): number {
	return a * 0.05;
}

let foo = calculateTax(total);

// below cause compile errors
let foo2 = calculateTax(); 
let foo3 == caalculateTax("ab");

// new example

const years: number[] = [1, 2, 3];

years.push(4);
years.push("ab"); // compile time error

const artist: [string, string, number] = ["Bob", "Smith", 23];

const country: readonly [string, string] = ["Canada", "Ottowa"];
county[0] = "France" //  compile error

//

const a1 = {
	name: "bob"
	age: 23
}
a1.address = "123" // compile error (cant add properties at runtime)
```
- Interfaces are ways to create typed objects much more reliably
```ts
let foo: { name: string, age: number } = { name: "foo", age: 23 };
// or more commonly
interface Artist {
	name: string,
	birth: number
}

const foo: Artist = { name: "Picasso", birth: 1881 }

function output(a: Artist) {
	console.log(a.name);
}
```
- these can also have optional properties, and even be extended
```ts
interface Artist {
	name: string,
	birth: number,
	nationality?: string // optional
}

interface Person {
	name: string,
	birth: number
}

// an interface can "inherit" properties from another interface
interface Artist extends Person {
	nationality: string
}
```
- similarly we have something called a Type
```ts
type Painting {
	medium: string;
	basse: string;
}

type Sculpture {
	material: string;
	height: number;
}

const p1: Painting =  {
	medium: "oil",
	base: "canvas"
}
```
- Types are meant to be used to create *type aliases*, which is a way to create new types out of existing types
```ts
type Artwork = Painting | Sculpture;

type Combo = Painting & Sculpture;
```
- we also have *function signatures*
```ts
type PersonContainer = (a: Person) => string;
	
const personSpan: personContainer = (c) -> {
	return `<span>${aaa.name</span>`;
}

}
node.addEventListener("click", personSpan)
```
- there are no constructors/prototypes, so we must use classes
```ts
class Movie {
	title: string,
	year: number,
	constuctor(t: string, y: number) {
		this.title = t;
		this.title = year;
	},
	getInfo(): string {
		return this.title + " " + this.year;
	}
}
// we can also do
interfaec IInfo {
	getInfo(): string
}

class Movie implements IInfo {
	// blah
}
```
---
### TS Generics
- function that searches array for a matching item
- doesn't really matter for types
```ts
function findIndex(search, searchFor) {
	let i = 0
	for (let item of search) {
		if (item == searchFor) return index;
		index++;
	}
}
// we can do type safety in two ways
// the bad way
function findIndex(search: any, searchFor:any): number {}

// better way (generics)
function findIndex<X>(search: X[], searchFor: X): number {}
```