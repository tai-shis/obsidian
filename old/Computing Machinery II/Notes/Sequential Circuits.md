[Slides](obsidian://open?vault=obsidian&file=Computing%20Machinery%20II%2FNotes%2FSlides%2FSequential%20Circuits.pdf)
### Sequential Circuit
- A circuit is sequential if the outputs are determined by its current and *previous* inputs
- To implement a basic computer, only a small number of fundamental sequential components are needed:
	- register
	- shift registers
	- counters
- These are built out of *flip-flops*, which are built out of latches
---
### Bistability
- Feedback is when output is connected back to input
- not all feedback is useful or stable 
	- e.x. an inverter connected to itself
---
### Simple Stable Sequential Circuit
 - The simplest stable circuit is an *RS-NOR Latch*
 - see slides for more details
---
### Transfer Functions - Metastable Point
- A metastable point is an *equilibrium point*, which will be driven to a stable state by random noise(?)
- If the circuit doesn't start at the metastable point, the feedback will drive it to the nearest possible stable point.
- If the circuit starts at the metastable point, it will most likely be pushed slightly to one side by circuit noise
- **Entering a Metastable state**
	- It is possible to enter on startup
	- *This is why a memory check is done initially*: to force your memory into a stable state
---
### SR Latch
- The **Set/Reset Latch**
- A Latch is a sequential circuit that watches its inputs continuously and can change its outputs at any time
- When S=R=0, the circuits are equivalent and the current state is *stable*
- A Signal on R (reset) forces Q = 0, Q' = 1
- A Signal on S (set) forces Q = 1, Q' = 0
- If Q = 0 and we assert R, what will happen? How about Q = 1 and we assert S?
	- In a *stable state* both will produce the same outputs. 
		- Q = 0, Q' = 1
		- (When Q = 1, the circuit will loop once to reach a stable state)
	- **It may take multiple loops through the circuit to reach a stable state due to propagation delay** 
- Simultaneous signals on S and R (same signals), they will both be forced to 0. *we don't want this*
---
### Propagation Delay
- *All circuits entail propagation delay*
	- since it takes time for a signal to travel from the output to input
	- It takes time for a gate's output to change in response to an input
		- *This is called gate delay*
- This means that there is a minimum pulse requirement for S and R
	- If the pulse is too short, *the circuit can become metastable*
		- **Refer to simultaneous signals from above**
---
### Sequential Circuits Part 2
- Truth tables aren't used to describe sequential circuits
	- Since truth tables use *fixed inputs* 
		- (sequential circuits need to use feedback values)
- There are *two* common ways to analyze sequential circuits
	1. Characteristic Table
		- Provides information about what the next state of the circuit will be on specific input
	2. Excitation Table
		- Specifies which changes require inputs
		- *x's means it does not matter*
		- Times where both S and R are 1 are not included as we do not want that.
- #### SR Latch Table

| S     | R     | Q$_{cur}$ | Q$_{next}$ | Q'$_{next}$ |
| ----- | ----- | --------- | ---------- | ----------- |
| 0     | 0     | 0         | 0          | 1           |
| 0     | 0     | 1         | 1          | 0           |
| **1** | **0** | 0         | **0**      | **1**       |
| **1** | **0** | 1         | **0**      | **1**       |
| **0** | **1** | 0         | **1**      | **0**       |
| **0** | **1** | 1         | **1**      | **0**       |
| **1** | **1** | 0         | **0**      | **0**       |
| **1** | **1** | 1         | **0**      | **0**       |
- See slides for examples/more specification, bold rows means Q$_{cur}$ does not matter.
---
### D Latch
- To fully avoid the possibility of **S = R = 1**
- To do this, we take the input *D*, and have one input negated and the other normal entering an SR Latch
	- *see slides for example*
- *Q$_{next}$* will **always** follow the value of *D* if the circuit is enabled
- Due to this, we have lost the error state by the preservation of the hold state
- We can add an enable input so that D is ignored and Q is held in a stable state until the circuit is told to load D
- We eliminate the error state as with the enable circuit, it is not possible for both inputs of the SR Latch to be one (as mentioned previously with the D input being opposites)
- It is useful to add a reset signal so that Q can be reset to 0 independently of enable. (or held values)
- Boolean functions to the S and R inputs
	- $S = D * enable * reset'$
	- $R = D' * enable + reset$
---
### Edge Triggered D Flip-Flop
- *beginning of notes missing, check slides*
- Flip-flops have:
	- a setup time
	- a hold time
- The circuit that drives D must ensure that D is stabilized before the active edge, and that it is stable late enough afterwards
- *The clock period must be slow enough to allow D to stabilize and to allow sufficient setup time* 
	- The propagation delay leading up to D must be great enough to allow sufficient hold time 
	- Zero delay time is bad.
- A normal SR-Latch is a simple circuit, but *a flip-flop circuit contains a clock input*
---
### Registers
- We can easily build a 1-bit register out of a D flip-flop
- flip-flop loads itself on every active edge
	- It loads either its current value (Q) or an external value *(determined by the use of a MUX)*
- Note: a triangle on an input on logisim means it is expecting a clock input.
- *We do not gate the clock as it leads to "clock skew" and destroys synchronization*
- We want to keep the clock to be synchronized to the clock at all positions it is used in (i.e. same in all instances, does not pass through gates before being used)
	- see 1 bit register example on slides
- To create a simple 8-bit register, we chain together 8 1-bit registers
---
### Counters
- A sequential circuit that goes through a prescribed sequence of states upon the application of an input pulse
- From one state, any state can go to one of two other states
	- $\pm1$
- Counters are registers whose contents can be incremented/decremented
- Can be used for:
	- PC / SP / index register
	- Counting the # of occurrences of an event
	- generating a timing sequence
- *A counter is simply a modification to the register (previously mentioned)*
- For a 2-bit load signal, the load source can be:
	- 00 = hold (reuse/hold current Q)
	- 01 = load given bit (Set Q to D)
	- 10 = load Q' (flip the Q signal)
	- 11 = (unused/synchronous reset)
- MSBit = toggle
- LSBit = load held bit
- We can see that the 1st bit will be 1 when bit 0 is 1 and will toggle
	- Can be when the previous bit is one and will toggle next
- To determine if there should be a *toggle out*, we use the value of toggle in and Q.
	- **when Q and Toggle In are both one, it will toggle out.**
---
### Shift Registers
- A useful circuit is the shift register (shifting contents left or right)
- However, we must decide how to handle the incoming bit. Options include:
	- Always shift 0 (or 1?)     - > shift left, logical shift right
	- Replicate previous bit     - > arithmetic shift right
	- Replicate the outgoing bit - > rotate
	- From an external source?   - > Rx register in serial communications
		- value coming from an external source/external connector
- Also, what do we do with the outgoing bit
	- Drop the bit?
	- Or an extra output 
		- use as an output in serial communications
- *Actions:*
	- 00 hold
	- 01 load (from external source)
	- 10 shift right
	- 11 shift left
	- *Where will the low/high order bit go?*
		- Shifting right:
			- low order goes to simply output
			- high order bit is 0 for logical shift
		- Shifting left
			- low order bit is 0 for logical shift
			- high order bit is simply output
---
### Serial vs Parallel
- two ways to transfer data between registers (or units/computers)
	- Parallel
		- n outputs of Tx (output reg) reg connected to n inputs of Rx reg
		- all in one clock signal, asynchronous (all values)
	- Serial
		- 1 bit at a time is transferred between Tx and Rx registers
		- (faster)
		- 1 input bit, 1 output bit
		- *Note*:
			- Can shift both directions (LSB into MSB and vice versa)
			- The operation is destructive for Tx, unless it rotates.