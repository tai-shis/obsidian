### Problem with Programmed I/O
- It requires busy-wait loop
- i.e. 
	- the CPU can't proceed with other computations
	- the CPU can't service other devices
		- If you are polling on one device, you can't be polling on another
- So, the CPU must be able to juggle many tasks concurrently
	- Particularly true for modern multi-tasking O/S
---
### Definitions
- **Interrupt**
	- A signal delivered to a CPU to tell it to suspend its current task. Usually just temporarily, and invoke an interrupt service routine
- **Interrupt Service Routine**
	- A segment of code that is specific to this interface
	- This routine *must* be quick, it must access the data and do any simple/minor processing and return
- **IRQ**
	- Interrupt ReQuest
- **ISR**
	- Interrupt Service Routine
- **Context Switch**
	- The process of saving and restoring state (e.g. CPU State)
	- So multiple processes can share a resource
---
### Interrupt Basics
- An alternate to Programmed I/O is Interrupt Driven I/O
- Basic Idea:
	- Have the CPU communicate with the interface *ONLY* when "required"
	- Required meaning:
		- Asking the I/O interface to do something
		- I/O interface is notifying the CPU of a "status" change
- The user is able to "type ahead"
	- If the buffer has extra free space, at least.
	- If not, then it is essentially polling
- *A program is not being continuously executed by the CPU*
	- In reality, the code is being continually interrupted:
		- By I/O interfaces
		- By timers
		- By other processes in the run-queue
- **When a program is interrupted, it does not realize that it has stopped**
- How is this done?
	- Multi-tasking
	- Two types of Multi-tasking
		1) Co-Operative Process Share
			- Invoking an OS System call causes a process shift
			- Lets the OS handle the resource temporarily
		2) Pre-Emptive Processes
			- Change the active process due to a timer
- *On a simple computer with interrupts:*
	- The Processor **needs** an IRQ input
		- (The signal might be asserted by an I/O interface, such as a keyboard controller)
	- It also needs a 1-bit *IRQ Mask* register which defaults to 1 on reset
		- When the mask is *on*, the IRQ is *ignored*
		- Basically tells the CU whether or not to handle/leave the IRQ signal
	- The mask is used to *temporarily block a request*
		- If the mask is set, the request is blocked
			- Request is processed once the mask is cleared
			- This is after the execution of the next instruction
	- **The IRQ and the IRQ Mask are *NOT* the same**
	- Basic Fetch Execute Cycle Pseudo-Code:
```
while !done
	IR <- Mem[PC]
	Increment PC
	Execute Instruction in the IR
```
---
