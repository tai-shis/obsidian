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
### Generalized NFA
- A GNFA is similar to an NFA, but allows **regular expressions** as transition labels
- For convenience, we assume:
	- one accept state, separate from the start state
	- One arrow from each state to each state *except:*
		- only exiting the start state
		- only entering the accept state
### Non-Regular Languages (HAS MIDTERM QUESTION (PUMPING LEMMA))
- How do we show a language is *not regular*?
	- We build a DFA to show a language is regular.
- **To show a language is not regular, we must give a proof**
	- its not enough to say that you couldn't find a DFA therefore the language isn't regular
- ***We use what is called the Pumping Lemma***
	- For every regular language $A$ there is a number $p$ ( the 'pumping length) such that if $s \in A$ and $|s| \geq p$ then $s = xyz$ where:
	1. $xy^iz\in A$ for all $i \geq 0$        $y^i = yy...y$
	2. $y \neq \epsilon$
	3. $|xy| \leq p$
	- informally, $A$ is regular $\rightarrow$ every long string in $A$ can be pumped and the result stays in $A$
	- **Proof:**
		- Let DFA $M$ recognize $A$. let $p$ be the number of states in $M$. Pick $s\in A$ where $|s| \geq p$.
		- $M$ will repeat a state $q_j$ when reading $s$ because $s$ is too long.
		- The path that $M$ follows is on the slides
	- 