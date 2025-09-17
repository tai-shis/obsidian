### Preface
1. Applications
2. Basic Research
3. Connections to other fields
4. What is the nature of computation?
### Finite Automata
- See written notes on example
- **Strings and Languages**
	- A *string* is a *finite* sequence of symbols in $\Sigma$
	- A *language* is a set of strings (finite or infinite)
	- The *empty string* $\epsilon$ is the string of length 0
	- the *empty language* $\emptyset$ is the set with no strings
- **Definition**
	- $M$ accepts the string $w = w_1w_2...w_n$ each $w_i\in\Sigma$ if there is a sequence of states $r_0,r_1,r_2,...,r_n\in Q$
	- where:
		- $r_0=q_0$
		- $r_i = \delta(r_{i-1},w_i)$ for $1\leq i \leq n$
		- $r_n \in F$
- **Recognising Languages**
	- $L(M) = {w | M accepts w}$
	- $L(M)$ is *the language* of $M$
	- $M$ *recognises* $L(M)$
	- A language is **regular** if some finite automaton recognises it
- More examples from formal definitions in written notes
### Regular Expressions
- See slides for now