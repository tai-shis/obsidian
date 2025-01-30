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
 - The simplest stable circuit is a *t flip flop*
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
