[Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FAssembler%2C%20Linker%20and%20Loader%20-%20Copy.pdf)
#### The Assembler
- Assembler 
	- A program that translate assembly language source file into object code
	- Evaluates assemble-time expressions and expands macros
	- Checks for errors
	- Preforms the actual translation of assembly to machine code
- Translation Process
	- The assembler reads the source code sequentially, referred to as a **pass
	- To handle forwards and backwards references, assemblers are usually a *two pass assembler* 
	- The assembler maintains a *location counter*
	- **Pass 1
		- Uses the location counter to build a symbol table
		- at the end, either all symbols are fully defined **or** and error is reported
	- **Pass 2
		- Performs the translation using the symbol table to look up label locations
#### The Loader
- The assembly process produces an *executable image*, saved to disk as a file
- The ***loader*** loads the image from the disk to the ram
	- Will also reserve and initialize stack space, and jump to programs first instruction
- The executable file consists of
	- the machine language code (duh)
	- ***a relocation list
		- a list of all locations which contains absolute addresses
		- once the code image has been loaded into ram at address *A*
			- the offset A *(or the relocation constant)* is added to each absolute address in the relocation list
#### The Linker
- A program that combines multiple object modules into an executable module
- Each object module contains: 
	- machine code  
	- a relocation list – absolute addresses that need to be relocated  
	- a global reference list - the global symbols it exports to other modules, this is a series of symbol names and locations in the module  
	- an external reference list – the global symbols it imports from other modules, this is a series of names and locations in the module that need  to be updated with an actual address.  
	- When linking regardless of the number of modules to be linked the process is done pairwise starting from the front of the list.
- When linking:
	- machine code is combined of the multiple modules
		- contents of the first module will be unchanged
		- contents of second/other modules will need to be moved
			- all things in the 2nd module will be added to the relocation list, with the relocation constant as the *size of the first module*
	- Refer to slides for more detailed information about multi-file loading/linking