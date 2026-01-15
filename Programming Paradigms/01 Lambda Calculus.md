### Basics
- example; take a doubling function `def double(x): return x + x` 
	- what this returns can actually be interpreted *differently* depending on how the programming language acts
	- in $\lambda$-calculus: ($\lambda$n.n + n)
		- $\lambda$ tells you that it is a function
		- it is anonymous (no names are given)
	- to apply the function:
		- double(3) == ($\lambda$n.n+n)3 
		- notice we apply it on the right
		- our applied expression will result in 3+3
			- this simplified, non-lambda expression is called *normal form*; cannot be simplified any more
- **formal definition**
	- start with a countably infinite set of "variables"
		- {a, b, c, ..., x, y, ...}
	- grammar for $\lambda$-terms is:
		- \<term> ::= \<id>            \<- variable
		-         |  ($\lambda$\<id>.\<term>)  \<- abstraction
		-         |  (\<term>\<term>)  <- application
	- abstraction: captures the notion of a function
	- application: captures the notion of applying a function to an argument
	- then we can obtain a countably infinite set of terms inductively using these three properties
---
### Conventions
- Parentheses are cringe, here are some conventions that are followed
	- Outermost parentheses may be omitted
	- Abstraction binds a variable to the longest possible body
		- $\lambda$x.x **is** ($\lambda$x.(xx)) **not** (($\lambda$x.x)x)
		- xyz **is** ((xy)z) **not** (x(yz))
	- leftmost applied
---
### Introduction to Representation
- Currently, we don't have:
	- real recursion
	- data types/representation
		- **booleans**
		- integers
		- lists
		- etc.
- Preface:
	- in $\lambda$-calculus, every term represents a function
	- a variable also stands for a function
	- when apply a function to another term/input, a function is still returned
- Numbers and their operators aren't built in, so functions have to be represented beforehand
---
### Booleans
- booleans represent binary alternatives
- we can now construct the *church-boolean* representations
	- **true** = ($\lambda$xy.x)
	- **false** = ($\lambda$xy.y)
	- if = ($\lambda$xyz.xyz)
	- not = ($\lambda$b.b false true) or ($\lambda$b.b($\lambda$xy.y)($\lambda$xy.x))
	- and = ($\lambda$ab.a b a) ie: if a is true, return b, else return a
	- or = ($\lambda$ab.a a b), ie: if a is true, return a, else return b
---
### Natural Numbers
- with natural numbers, we are able to do things a certain number of times (i.e. loops)
- using this logic, we can represent basic numbers
	- take 2 for example, it takes in a value (that is being repeated, lets say g) and returns two of them
- consider an add function:
	- this is essentially a concatenation of the two values
- We can do all of this in **church numerals**
- the number *n* is represented as:
	- a function that takes another function $f$
	- and iterates $f$ a total of *n* times
	- example: $$3 = \lambda f.(\lambda x.f(f(fx)))$$
	- so: $$3g = \lambda x.g(g(gx))$$
	- following this pattern down, we compose these$$
		\begin{aligned}
		2 &= \lambda f.(\lambda x.f(f(x)))\\
		1 &= \lambda f.(\lambda x.f(x)))\\
		0 &= \lambda f.(\lambda x.x)\\
		\end{aligned}
	   $$
- *Now, we can move on to representing arithmetic operators*
- The successor or 'succ' function takes a natural number and returns its successor
	- succ 0 -> 1
	- succ 1 -> 2
	- etc.
- So, we can try defining it like so: $$ \text{succ} = \lambda n.(\lambda f.(\lambda x. f((nf)x))) $$
- also, a zero check is useful: $$ \text{isZero} = \lambda n.n(\lambda x.\text{false})\text{true} $$
	- we can see the reduction: $$
	   \begin{aligned}
		   \text{isZero 0} &= \text{0} (\lambda x.\text{false}) \text{true}\\
		   &= (\lambda f.(\lambda (x.x))) (\lambda x.\text{false}) \\
		   &= (\lambda(x.x))\text{true} \\
		   &= \text{true} \\
		   \\
		   \text{isZero 2} &= 2(\lambda x.\text{false}) \text{true} \\
		   &= \lambda f.(\lambda x.f(f(x))) (\lambda x.\text{false}) \text{true} \\
		   &= (\lambda x. (\lambda x.\text{false})((\lambda x.\text{false})(x))) \text{true} \\
		   &= (\lambda x.\text{false})((\lambda x.\text{false})(\text{true}))
	   \end{aligned} 
	$$
- now add is simple with successor: $$\text{add} = \lambda m n. m \text{ succ }n$$
	- essentially, repeat the successor function on m *n* times
- multiplication is also super easy: $$\text{mult} =\lambda mn. m (\text{ add } n) 0 $$
- **the pred function**
	- pred will only go to zero, never below $$
	\text{pred} = \lambda n . snd (n(\lambda (last,sndLast).(succ (last,last)))(0,0))
	$$
	- essentially, the pred function will recount from 0 to n, but omit the first count, which will effectively recount 0 to n-1 skipping the first number.
---
### Lists and Tuples
- Pairs (also called 2-tuples) $$\begin{aligned} \text{pair} &= \lambda xyf. fxy\\
\text{fst}&=\lambda p.p\text{ true}\\
\text{snd}&=\lambda p.p\text{ false}\\
\end{aligned}$$
- practice:
	- pair 1 2:$$
	  \begin{aligned}
		\text{pair 1 2} &= (\lambda x y f. fxy)\text{1 2}\\
		&=_{x2} (\lambda f.f\text{ 1 2})\\
		\\
		&\text{now we can get the 1st} \\
		&= \text{1st} (\lambda f.f \text{ 1 2}) \\
		&= (\lambda p.p \text{ true})(\lambda f.f \text{ 1 2}) \\
		&= (\lambda f.f \text{ 1 2}) \text{true} \\
		&= \text{true 1 2} \\
		&= 2
	  \end{aligned}
	$$
- Now, we can intuitively find that lists can be represented as nested pairs, similar to numerals.
	- essentially linked lists
- we can represent the empty set '\[]' as: $$[] = (\text{true, \_} ) $$
- the true being for emptyness. TODO add the rest of these $$
\begin{aligned}
3 = false, (3, [])
\end{aligned}
$$
---
### Recursion
- **factorial example**
	- since we cant define factorial recursively using lambda calculus, we must use the y combinator: $$ Y = \lambda f. f(\lambda x.xx)(\lambda x.xx) $$
	- let fact: $$ \begin{aligned} fact' &= \lambda f n . \text{isZero n }1 (\text{mul n }(f (\text{pred n})))\\ fact &= Y fact' \end{aligned}$$
		- this lets us expand our y combinator enough that it satisfies the amount of inner fact' 's needed to evaluate the number.
- To write a recursive function,
- first write an "invalid" recursive lambda expression, then replace any recursive invocations into an f as func prime
	- next let the invocation be Y func'
