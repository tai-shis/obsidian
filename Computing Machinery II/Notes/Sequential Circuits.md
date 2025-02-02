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