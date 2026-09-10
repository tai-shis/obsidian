[Preface: Binary Operations Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FBinary%20Operations.pdf)
[Preface: Positional Number Systems](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FPositional%20Number%20Systems.pdf)
Each Compliment's Slides will be under their respective tabs
#### Fixed Length Binary Numbers
- Can represent $2^n$ values
- Range of values represented is **$0\ to\ 2^n -1$
- Exceeding the highest value will cause the number to wrap around
#### Signed Binary Numbers
- Signed numbers must be representable
- Three ways of representing signed numbers:
	- ##### Signed-Magnitude
		- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FOne%E2%80%99s%20Compliment%20Binary.pdf)
		- MSBit will be the indicator:
		- MSBit = 0; positive
		- MSBit = 1; negative
		- e.g. $$
			\begin{split}
			&-12_{10}\ \text{as an 8-bit signed magnitude number} \\
			&12_{10} = 0001100_2 \\
			& \text{is negative, so MSBit is 1} \\
			& -12 = 10001100_2
			\end{split}$$
		- Range is **$-(2^{n-1}-1)\ to\ 2^{n-1}-1$ 
			- Since there is both $\pm0$, we have -1 in both parts of the range
		- **Pros:
			- easy to read/understand as humans
		- **Cons:
			- arithmetic circuits must handle multiple sign/zero cases, so it makes things more complex
			- requires adder, subtractor, and comparators
			- 
	- ##### One's Complement
		- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FOne%E2%80%99s%20Compliment%20Binary.pdf)
		- Advancing from 0 gives positive numbers
		- Reversing from 0 gives negative numbers
		- Range is **$-(2^{n-1}-1)\ to\ 2^{n-1}-1$ 
			- Range is the same as Signed-Magnitude
		- All positives start with zero and all negatives start with 1
		- Positives are same as regular binary.
		- To indicate negative sign, negate the positive number to get the negative number
			- Can negate the negative number to get the positive number again.
		- To negate a number in one's complement, *flip each bit in the number*
		- **To convert from One's Comp Binary to Decimal:
			- If MSBit == 1, **negate** the number
			- Convert the binary number to decimal
			- If the number was negated, put a negative sign in front of the result.
		- **One's Comp Addition
			- to make addition work, the carry out bit **MUST** be added to the result of the addition.
			- Therefore, 1's comp addition requires two binary adds.
		- One's Comp still has two zeros, however one is all zeros and the other is all ones.
		- **Pros:
			- Easy negation
			- Subtraction is addition of negation
			- All numbers have inverses
			- MSB still indicates the sign
		- **Cons:
			- Still two zeros
			- different circuits are required for signed/unsigned addition
				- due to the 2nd addition required for signed addition
			- negative numbers are not directly identifiable
	- ##### Two's Complement
		- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FTwo%E2%80%99s%20Compliment%20Binary.pdf)
		- Same as One's Complement **but**:
			- Removed two zeros
			- No need for multiple additions
			- Positive numbers all start with zero
			- Negative numbers all start with **one**
		- Range:
			- $-(2^{n-1})\ to\ 2^{n-1}-1$
		- Two's Complement Negation
			- Same as One's Comp negation **BUT** add one after the operation
		- **Pros:
			- addition is identical to unsigned (no special cases)
			- one zero
			- MSB indicates the sign
			- subtraction is just addition of negation
		- **Cons:
			- negative numbers are also not directly identifiable
			- two numbers have no inverse
				- i.e. zero and max negative number
#### Generalized Compliments
- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FGeneralized%20Compliments.pdf)
- Essentially the same as One's/Two's Compliment Numbers except:
	- When negating, it will take the corresponding "opposite number" as the negated number
	- e.g. in Hex, 8's opposite is 7, 9's opposite is 6, etc.
- Refer to slides for more detailed examples.
#### Characters & Booleans
- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FCharacters%20%26%20Booleans.pdf)
- Characters are held as ASCII, or another encoding system
- Generally never use hard-coded "numbers" for characters as the encoding system is not always known.
- Booleans should be -1/0:
	- -1 for False
	- 0 for True
#### Error Detection
- [Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FError%20Detection.pdf)
- When can errors occur?
	- Unsigned Numbers:
		- Adding two positive numbers (going over max limit)
		- *Subtracting a larger number from a smaller number*
			- this is the only guaranteed error as it will flip back
	- Complement Numbers
		- Adding two numbers of the same sign (going over max/min limit)
		- Subtracting a negative number from a positive number (going over max limit) (essentially adding)
		- Subtracting a positive number from a negative number (going over min limit) (essentially subtracting)
	- ##### Carry Errors
		- When the result of a math operation exceeds the allowable range
			- **Only when the values are interpreted as _unsigned_ values**
		- During addition:
			- When a carry **out** of the MSBit occurs
		- During subtraction:
			- When a borrow **into** the MSBit occurs
	- ##### Overflow Errors
		- When the result of a math operation exceeds the allowable range
			- **Only when the values are interpreted as _signed_ values
		- During addition:
			- When the carry in to the MSBit $\ne$ carry out from the MSBit

	