[Assembly Basics Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FAssembly%20Basics.pdf )
[Intro to C Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FIntroduction%20to%20C.pdf) - useful for 2659
[Branching Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FIntroduction%20to%20C.pdf)
[Arrays and Strings Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FArrays%20%26%20Strings.pdf)

#### Assembly Language Syntax
- Each line has **four** fields, separated by a whitespace component
	- **Label Field** (optional) - is the label idk its pretty self explanatory
		- must start with a-z, A-Z, \_, or @/? 
	- **Op-code Field** (required) - usually the instruction/directive
		- Directives are different from instructions:
			- things like dc, ds, even, equ.
		- Instructions:
			- Sorted into *three* general categories
				- Data Transfer
					- e.g. move
				- Arithmetic/Logic
					- e.g. addition, shifts, rotates, etc.
				- Program Sequencing & Control
			- Instructions have **direct results** and **indirect results
				- direct results are things like values being moved around
				- indirect results are the condition codes set/cleared 
	- **Operand Field** (optional depending on operation) - contains fields for operation
		- Addressing modes: (free)
			- register direct
			- immediate
			- absolute
				- move the address of x into a register
			- register indirect
	- **Comment Field** (optional) - used for commenting, *whitespace allowed*
#### Instructions
- only one that is hard is asr/asl/lsr/lsl and ror/rol
- asr shifts (signed) in a *copy of the old high bit*
- lsr shifts (unsigned) **always** shifts in 0
- ror/rol rotates the bits in the register
#### Errors
- Assembly-time errors
	- syntax errors
- Link-time errors
	- missing/unresolved external references 
	- i.e. xref
- Run-time "faults"
	- crashes/ends
	- Common Faults:
		- Bus Errors
			- accessing null/protected address
			- **seg fault**
			- two bombs
		- Address Errors
			- accessing of a word/long at an *odd address*
			- three bombs
		- Illegal instruction
			- attempted execution of invalid instruction
			- usually caused by bad jump/bra/rts
- Run-time "errors"
	- logic errors
#### Branching
- Two kinds of branching
- Unconditional Branching
	- jmp
		- sets PC to address
	- bra
		- sets PC to the PC + displacement 
			- displacement is destination address - source address
- Conditional Branching
	- Based on condition codes **N Z V C**
		- Data transfer affects N and Z bits (negative and zero as it compares the number to 0)
		- arithmetic/logical instructions affect most/all CC bits
		- C or carry bit is also the borrow bit, set off when borrow into the MSBit is required
	- Refer to reference sheet to see how each conditional branch uses the condition codes
- If / Else If / Else statements are pretty straightforward in the context of assembly, refer to slides for more info.
- Same with loops using dbra or comparing a register for branch conditions
#### Arrays and Strings
- Declaring Arrays:
	- Three options for directives:
		- dc.\<size> \<values>
			- declare an array with the given list of values
		- ds.\<size> \<# values>
			- declare an array with num value spots
		- dcb.\<size> \<# values>,\<value>
			- declare an array with num value spots each initialized to the value
- Writing assembly can be figured out on your own lol
