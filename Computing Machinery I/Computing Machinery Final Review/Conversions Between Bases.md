[Preface Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FPositional%20Number%20Systems.pdf)
[Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FConversions.pdf)

#### Base-B to Decimal
- Two algorithms
	- *Sum Expanded*
		- Each number is represented as a sequence of digits from *left to right*
		- Largest positional value on the left, going smaller to the right
		- Each digit in sequence has a *weight*
			- Weight increases by multiple of *base* as you move left, starting with base$^{0}$
			-  e.g. base 10 to decimal$$ 		
			\begin {equation}
			\begin {split}
			7829_{10} & = 7000 + 800 + 20 + 9 \\
			& =  (7 * 1000) + (8*100) + (2*10) + (9*1) \\
			& = (7 * 10^{3}) + (8 * 10^{2}) + (2 * 10^{1}) + (9 * 10^{0})
			\end {split}
			\end {equation}
			$$
			- e.g. base 2 to decimal$$ 		
			\begin {equation}
			\begin {split}
			1001_{2} & = 1000_{2} + 0_{2} + 0_2 + 1_2 \\
			& =  (1 * 2^3) + (0*2^2) + (0*2^1) + (1*2^0) \\
			& = (1*8) + (1*1) \\
			& = 8 + 1 \\
			& = 9_{10}
			\end {split}
			\end {equation} $$
			- e.g. base 16 to decimal$$ 		
			\begin {equation}
			\begin {split}
			A5_{16} & = (A*16^1) + (5*16^0) \\
			& = (10 * 16) + (5 * 1) \\
			& = 160 + 5 \\
			& = 165_{10}
			\end {split}
			\end {equation} $$
			- Value of the number equals the sum of all the values
			- *Any* number in *any* base B can be expressed in this method
	- *Horner's Rule*
		- $A(x) = a_0 + x(a_1 + x(a_2 + x(a_3 + ... + x(a_{n-1} + x \ a_n)...)))$
		- Simplified Algorithm:
			- Set sum to 0.
				- For all digits in the number going left to right:
					- Sum = (Sum * B) + digit value
					- *where B is the base of the number*
		- e.g. base 16 to decimal$$
		\begin{equation}
		\begin{split}
		& Base = 16 \\
		& Sum = 0 \\
		& Steps: Sum = Sum * Base + digit\ value \\
		& AF452_{16} => Sum = Sum * Base + A = 0*16+10 = 10 \\
		& AF452_{16} => Sum = Sum * Base + F = 10*16+15  = 175 \\
		& AF452_{16} => Sum = Sum * Base + 4 = 175*16+4  = 2804 \\
		& AF452_{16} => Sum = Sum * Base + 5 = 2804*16+5  = 44869 \\
		& AF452_{16} => Sum = Sum * Base + 2 = 44869*16+2  = 717906 \\
		& Sum = 717906_{10}
		\end{split}
		\end{equation}
		$$
		- Check [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FConversions.pdf) for more examples
#### Decimal to Base-B
- Also two algorithms:
	- Decomposition
	- Repeated division by Base
	- Just check slides for examples, quite self-explanatory

#### Base-B to Base-C
- If bases are not related, go from Base-B to decimal, then decimal to Base-C
- If they are related, e.g. binary to hex:
	- Take binary chunks into four and convert each 4 bit chunk into a base 16 digit
	- **CHUNKS SIZE IS BY BASE**
		- hex is $2^4$ so chunk size is 4
		- octal (base 8) is $2^3$ so chunk size is 3
	- e.g.$$
	\begin {split}
	&1101\ 0011 \\
	&B \ \ \ \ \ \  3 \\
	&10110011_2 = B3_{16} \\
	\end {split}
	$$
