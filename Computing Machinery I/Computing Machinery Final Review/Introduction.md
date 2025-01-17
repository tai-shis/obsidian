[Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FSlides%2FIntroduction.pdf)
#### Computer Organization
- Refers to hardware design; ***the design of functional units and their interaction
	- i.e. CPU, memory, I/O, etc.
#### Computer Architecture
- Refers to the hardware-provided resources that low level programmers interact with
	- i.e. Operations, Systems Calls, etc.
- CPU, Main Memory, and I/O Interfaces are connected by a **Bus
##### Typical Resources
- <u>Instruction Set</u>: finite set of operations supported by the CPU
	- i.e. Operations
- <u>Registers</u>: high-speed memory locations on-board the CPU
	- i.e. Data/Address Registers
- <u>Address Space</u>: addressable range of slower, main memory locations
- <u>Addressing Modes</u>: finite set of ways instructions can access data
	- e.g. Register direct/indirect


Computer Systems __only__ store/process numbers.

#### Von Neumann Architecture
- Characteristics:
	- Is called a **Stored Program Architecture
	- Numbers are represented as *fixed-length* binary numbers
	- Each instruction is identified by a [unique number](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20I%2FComputing%20Machinery%20Final%20Review%2FInstruction%20Translation)
	- Data is represented as one or more numbers
		- Data is *always* stored either in a register or in main memory
	- Memory contains **both data and code
	- The processor controls the execution of the current instruction
		- Instructions are *sequentially executed
			- Process of executing is called the **Fetch-Execute Cycle**


#### Levels of Programming Language
- **High Level Language
	- i.e. Python, Java, C++, etc.
	- Much more abstract, simplifying frequently used procedures
	- HLL to ML is still required
		- Done through the use of a *compiler*
	 - **Pros**:
		 - allows programmers to work at a more abstract level
		 - complex operations are able to be done
	 - **Cons:**
		 - translation process is more involved (requires more programs)
		 - translation is not one-to-one
		 - translation is **not optimized
 - **Assembly Language
	 - Well, "assembly" (MC68k, x86, ARM, etc.)
	 - Differs between CPUs
		 - Principles stay mostly the same
		 - Are usually the same for CPUs in the same chipset
	 - **Pros:
		 - do not have to program numerically in binary as it is slow, difficult, and error-prone
		 - for each numeric machine instruction, there is a symbolic name and is correspondent to its only instruction counterpart
		 - allows for more conveniences like macros
		 - allows programming in a symbolic fashion
	 - **Cons:
		 - each assembly language is designed for a specific processor/processor family
			 - (will only run on one type of computer)
 - **Machine Language**
	 - All executable programs are sequences of instructions and data, loadable into memory.
	 - Once loaded, the CPU executes the instructions sequentially with the possibility of branching
	 - Is essentially **a sequence of numbers**
	 - Is also the CPU's native language
	 - **Pros:**
		 - good for the processor
		 - simple, fast, and efficient code
	 - **Cons:
		 - hard to understand/read
		 - difficult and slow to code
		 - very error prone

