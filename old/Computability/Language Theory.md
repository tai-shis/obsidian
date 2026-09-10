### **Alphabet**
- *a pre-defined collection of a finite set of symbols*
- we define an alphabet as $\Sigma$ 
- e.g. $\Sigma = \{a, b\}$ has strings built with the alphabet
	- 'ab', 'aaa', 'aba', 'a', etc.
- cardinality of a string is the number of symbols in a word
	- $|ab| = 2$
	- $|bbb| = 3$
	- $|a| = 1$
	- an *empty string* is denoted as $\epsilon$ or epsilon, which has cardinality zero
### Concatenation
- given the strings 'u' and 'v' over the alphabet $\Sigma = \{a,b\}$, the *concatenation* of u and v, denoted as u.v or uv is the two next to each other.
- If $x = ab$ and $y=c$, $xy = abc$
	- This operation is associative
	- However it is *not* commutative
		- i.e. $xy \ne yx$ 
### String Operations
- Given a string $w \in \Sigma^*$
- **Length:** $|w| = |abba| = 4$
- missing
### Language
-  A **Languages** *is any set of strings, either finite or infinite, over an alphabet $\Sigma$*
	- the alphabet $\Sigma$ is **always** finite
- **Strings** are finite sequences of symbols in *length*, but the *number* of strings in a language could be infinite
- **Concatenation** of two languages: $L_1$ and $L_2$ denoted as $L_1L_2$ is defined as:
	- $L_1L_2 = \{xy | x \in L_1, y \in L_2\}$ 
	- take **every** string from $L_1$ and concatenate it with **every** string from $L_2$
	- **Properties**:
		- *Non-commutative* $L_1L_2 \ne L_2L_1$ in general.
		- *Associative*: $(L_1L_2)L_3 = L_1(L_2L_3)$
		- *Identity Element*: $L\{\epsilon\} = \{\epsilon\}L = L$
- The *empty string* $\epsilon$ (or $\lambda$) has length zero.
	- When concatenated with any string $w \in \Sigma$, it exhibits the identity element.
	- i.e. $w\epsilon = \epsilon w = w$ 
- This exhibits the same behaviour when concatenated with any language $L$
	- i.e. The identity language $\{\epsilon\}$: $\{\epsilon\} \cdot  L = L$ 
### Language Operations
- Given Languages $L_1,L_2 \subseteq \Sigma^*$ 
- **Union**: $L_1 \cup L_2$
- **Concatenation**: $L_1L_2 = \{xy | x \in L_1, y \in L_2\}$ 
- **Kleene Star**: $L^* = \bigcup^\infty_{n=0}L^n$
- **Positive Closure**: $L^+ = \bigcup^\infty_{n=1}L^n$
	- Same as Kleene star, but since n=1, the empty string $\epsilon$ is not included.
- **Reverse**: $rev(L) = \{rev(w) | w\in L\}$ 
### Kleene Closure
- The Kleene Star is a **Unary Operator**
- Operates on the set of symbols $\Sigma$ to produce all of the strings of all lengths, including the empty string $\epsilon$.
- The operator is written as $\Sigma^*$
	- $L^0$ is always $\epsilon$ as the empty string is length zero.
	- For example, given $\Sigma = \{a,b\}$ , $\Sigma^* = \{\epsilon, a, b, ab, ba, aa, bb, ...\}$
	- **If $\epsilon$ is excluded, we call it the positive closure:** $\Sigma^+$
		- Or, $\Sigma^+ = \Sigma^* - \epsilon$
- **Inductive Definition on the slides**
- If we have the empty set $\emptyset$:
	- $\emptyset^* = \{\epsilon\}$
	- $\emptyset^+ = \emptyset^*\cdot \emptyset = \emptyset$
- And for example: Language $L = \{a\}$ where:
	- $L^* = \{\epsilon, a, aa, aaa, ... \}$
	- $L^+ = \{a, aa, aaa, ...\}$
- **Properties:**
	- $V^*$ is the smallest superset of V that contains the empty string $\epsilon$
		- this is closed under string concatenation
	- $V^*$ is the set of all strings over symbols in $V$, including the empty string $\epsilon$
	- It is an Idempotent Unary Operator
		- i.e. $(V^*)^* = V^*$
### Reverse Operation
- **String Reverse**
	- self-explanatory
- **Language Reverse**
	- $rev(L) = \{rev(w)|w\in L\}$
	- $L = \{ab,aab\}. rev(L) = \{ba, baa\}$ 
### Defining a Language (properly)
- Here, we define the language $L$ over the alphabet $\Sigma =\{a,b\}$ such that every occurrence of the substring $ab$ is eventually followed by a $ba$.
	- $L = \{w\in \Sigma^* | \forall w_1, w_2: w = w_1 \text{ ab } w_2 \Rightarrow ba \text{ appears in } w_2\}$
	- so, b**abba**a $\in L$
- A string $w$ is *accepted* by a language $L$ if $w\in L$
- For example: $L = \{a^nb^n | n \geq 1\}$
	- so aabb, aaabbb are accepted
	- and abab, aab, are not
- We can also write a language of string which length is divisible by 2 as $\dot 2$
### Grammar Replacement Rules
- A grammar $G = (V, \Sigma, R, S)$ consists of:
	- $V$ : Variables (non-terminals)
	- $\Sigma$ : Terminal Symbols
	- $R$ : Production rules (e.g. $A \rightarrow aB$)
	- $S$ : Start symbol
	- **Derivation**: use rules to generate strings
### Morphisms and Mappings
- We will come back to this later in the semester