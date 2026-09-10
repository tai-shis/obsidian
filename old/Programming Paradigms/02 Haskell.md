### Functions
- everything is a function
```haskell
myPi = 3.14159 -- constant function
volume r = 4/3 * myPi * r^3
add x y = x + y -- add function
```
### Syntax
- symbols beginning with lower-case letters are either functions or variables
	- named constants are simply functions of arity 0
	- each case of a function definition must begin in column 0
		- leftmost
	- symbols beginning with a capital letter have a different meaning
- argument lists are neither parenthesized nor separated by commas
	- "\[]" and ":" symbols are list constructors
- prefix function application has highest precedence
	- operators like "+" are also functions, but default to infix notation
	- infix functions can be used normally by wrapping them in parenthesis
### Types
- pre-defined types include Int, Char, Bool, Double, Float, \[a], String, etc
	- \[a] is a type list of any
	- types are defined by Capital letters