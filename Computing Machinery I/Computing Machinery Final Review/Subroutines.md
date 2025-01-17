[Stacks Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FStacks.pdf)
[Subroutines Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FSubroutines.pdf)
[Recursion Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FRecursion.pdf)

#### Stacks
- The "stack" or a7/sp in MC68k assembly **grows down**
- Used for subroutine/system calls'
- Placed in *high-memory* as to not affect system code/less chance of interacting with user code
- **Always** word aligned
	- when pushing a byte on it will push two bytes, just with the byte at the upper byte.
#### Subroutines
- Value-returning
	- functions
- Non-value-returning (void functions)
	- procedures
- JSR/BSR/RTS
	- jsr
		- ```subq.l #4,sp
		  move.l PC,(sp)
		  move.l address,PC```
	- bsr
		- ```subq.l #4,sp
		  move.l PC,(sp)
		  add.l offset+PC,PC ; cant actually do this, but ykwim```
	- rts
		- ```move.l (sp),PC
		  addq.l #4,sp```
- movem.l
	- \<registers>,-(sp)
		- "saves" registers on the stack
	- (sp)+,\<registers>
		- "restores" registers off the stack
	- order is irrelevant
	- **MUST CONTAIN SAME REGISTERS**
#### Recursion
- check slides!

