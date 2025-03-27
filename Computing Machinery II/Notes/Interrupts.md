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
### Context Switch for Handling IRQ
- **To start processing an IRQ**
	1) Setting the IRQ mask
		- while the IRQ is running, it cannot be interrupted by another interrupt
	2) Pushing the PC on the stack
		- Both supervisory byte and user byte
	3) Pushing SR on the stack
	4) Loading PC with the ISR start address
- *Once these are done, the fetch-execute cycle continues as usual*
	- The next instruction is the *first* instruction of the ISR
- **At the end of the ISR**
	1) SR must be popped and restored
	2) PC must be popped and restored
	3) The IRQ mask must be cleared
- *These steps after the ISR are in reverse order to the steps handling the ISR*
- The ISR **cannot** end with an ordinary "return" (rts) instruction
	- This is because the SR has been saved and needs to be restored
	- (rts does not do this, only the PC)
	- Instead it ends with an **rte**
---
### ISR Invocations and SR
1) The executing program can be interrupted at any point in the code:
```asm
cmp.x     ...
bcc       somewhere
```
- If the interrupt request occurs *during* the cmp.x instruction:
- This instruction is completed *before* it is determined whether or not to handle the IRQ
- So what will happen to the bcc instruction if the ISR is handled?
	- Since the bcc value requires all of the CC values from the SR
	- *ALL* arithmetic/logic and data transfer instructions affect the CCs
		- ISRs are **guaranteed** to alter the CC bits during its execution
	- So if we don't restore the SR:
		- **the CCs will be altered from its original state**
	- So, to avoid unwanted actions, we *must* restore the SR.
	- Also, **the SR contains the mode bit which the code is in**
		- i.e. if the code is in supervisory mode or not.
---
### ISR's on the 68000
- Whether there are one or more ISRs the address(es) need to be maintained in a known location
- Also, these locations must be changeable
	- or else we can't update the system
- Also, in easily accessible locations
- The 68000 has a vector table which is stored in main memory
	- Containing 256 vectors, each a longword
- ***Called the Exception Vector Assignment on the reference sheet***
- The table is *always* located at addresses 0-1023
	- Each vector is located at address: *vector # * 4*
	- e.g.
		- Address Error is vector #3: so stored at location 12
			- *As a longword*
			- (Since they are addresses to the location to the ISR)
---
### Types of Interrupts
- There mainly are two different kinds of interrupts
	1) Internal
		- system calls
		- exceptions trace
	2) External (outside CPU)
		- bus errors
		- rests
---
### Interrupt Condition Detected
- **The following steps are completed in the hardware**
	1) A copy of SR is saved in a temp reg.
	2) The SR's S bit is set and its T bit is cleared
		- supervisory mode entered, trace exited
	3) PC is pushed on the system stack as a longword
	4) The original SR (from temp) is pushed on the system stack as a word
	5) PC is loaded with the appropriate ISR vector from the vector table
	6) First instruction of ISR executed on next Fetch-Execute Cycle
	7) Rest is missing from slides
---
### Interrupt Condition Handling Finished
- What (lol)
---
### Supervisory Mode on Startup
- **Upon CPU reset, the computer *starts* in supervisory mode**
	- or else the vectors won't be loaded
	- hence, we would not be able to re-enter supervisor mode
---
### Internal Interrupts
- (for this course)
- Internal Interrupt is an interrupt whose interrupt condition is generated by the CPU itself. **not by an external IRQ signal**
- This is usually triggered by the running program
	- On purpose (e.g. a system call)
	- Result of an exception (e.g. division by zero)
	- A trace
---
### System Calls (Interrupt)
- Apps need to invoke OS routines but it should not/do not need to know the routine's start address
	- Also usually needs to run in supervisor mode
- System calls are normally implemented as internal interrupts itself.
	- When using a special instruction, the app will voluntarily interrupt itself
	- *The ISR is the system call handler*
		- (i.e. the subroutine which implements the system call)
- The 68000 provides the trap instruction
	- When TOS boots, it loads the vector table
	- Includes:
		- trap #1   (GEMDOS)
		- trap #13  (BIOS)
		- trap #14  (XBIOS)
	- When the system call handler takes over, it looks at the stack to determine which system call to perform.
	- Also to access any additional parameters
---
### Internal Interrupts on the 68000
- *Address error*:
	- Trapped if attempting to access a word/longword at an odd address
- *trapv, chk, divu, divs*:
	- These instructions generate exceptions (or run-time errors) under certain conditions
	- *trapv* traps on a signed overflow
	- *chk* compares a source operand against the contents of a                  data register (the bound) and traps if the first operant isn't within range
		- e.g. (chk     x,d0    ;trap if x < 0 or x > d0)
	- *div* - trap on division by zero
- *Privilege violation*
	- Trap if attempt made to execute privileged instruction in user mode
- *Illegal Instruction
	- Same idea, but for illegal opcodes
	- Can be used by debuggers to implement breakpoints
- *Trace*
	- If trace bit is set, CPU traps to trace *ISR* after every instruction
	- Used by debuggers to implement single-step
- *Unimplemented Instruction*
	- Same Idea, but for "reserved" opcodes
	- Can be used to implement line-a 
---
### S and T Bits of SR
- The Super call sets the S bit in the caller's SR on the stack
- How is the T bit set on a ctrl-z in the debugger?
	- The debugger is running two processes
		1) The debugger
		2) The program being debugged
	- The debugger is still active when ctrl-z is invoked
		- A context switch is done
			- (switching control from debugger to the program in debugger)
		- Therefore, set the T bit in the *SR of the program to be debugged*
---
### External Interrupts
- **External interrupt = an interrupt which is requested via an externally delivered signal
- Bus errors have been discussed as an example.
	- The *GLUE* (external controller) will:
		- When an access to an invalid/protected address is requested,
		- It will terminate the process
- And obviously the reset switch.
- **On the 68000:**
	- We have three interrupt inputs
		- These three lines can be interpreted/implemented in the following ways:
			- Individual levels (lv. 1, lv. 2, lv. 3 interrupts)
			- As a group        (Binary number)
	- *The 68000 uses them in a group.*
		- IRQs will be assigned a priority of 1 through 7
		- We have a 3-bit interrupt mask in the SR.
		- Can only be interrupted by a *higher priority interrupt*
			- 111 - (priority 7: not interruptible/can interrupt anything)
			- 000 - (priority 0: anything can interrupted/cannot interrupt anything)
		- So, we can only interrupt with a priority higher than the **interrupt mask**
			- *i.e. the priority of the currently executing code*
- Steps to the hardware interrupt mechanism are located on the slides.
	- as well as important information for specific steps.
- Upon reset, *the 68000's SR is loaded with $2700*
	- So, in Supervisor Mode and Highest Priority Interrupt Mask
		- *So it cannot be interrupted while loading bios*
---
### Timers
- *Is implemented using a counter*
	- Usually down-counting
- Used to measure time periods, and also to trigger *synchronous events*
- Timers can be *one shot* or *free running*
	- One shot:
		- deciding if a mouse press/release should be a normal click, or a drag
		- e.g. pressing a key once vs holding it down (and handling these cases)
	- Free running:
		- means the down counter is automatically reloaded from the register at t = 0
		- Timer circuit may have a control register with a mode select bit
		- This can be used for generating square wave signals in a PSG
		- horizontal and vertical blank signals for controlling a monitor can be used as free running timers
---
### Real Time System
- A computer system with constraints on operational deadlines, such as a max time from input event to system response
	- Hardware timers must be used
	- Software timing is unreliable
		- program may be interrupted!
- A timer may be re-triggerable
	- it may be possible to reinitialize it before it expires
---
### Preemptive Multitasking
- See slides, missing notes
---
### Device Drivers
- *Is a Software Module*
	- Which manages an I/O Interface
	- And reads/writes the data from/to its registers
- Examples of such are also on the slides.
-  *Interrupts are Operating System entry points
	- O/S hands control off to user processes and then sits in memory until invoked by an interrupt
	- e.g. an internal interrupt such as a system call or an exception
	- e.g. an external interrupt due to a timer or I/O
- Each interrupt vectors (points) to the appropriate O/S routine
---
### Concurrency
- *We now know about interrupts, and we know that two different routines may overlap in terms of execution time.*
- If they share resources, they *must* be synchronized
- Example of such concurrency is on the slides.
- **Critical Section**
	- A segment of code which accesses a shared resource
	- These sections *must be protected*, so that they have exclusive access the necessary shared resource(s)
	- *The access to the critical section does not need to be write access but *
- How can we do this?
	- The relevant interrupts should be masked at the start of the critical section and then unmasked at the end.
	- The CPU can mask all IRQs, but this may be too broad
	- And interrupts from specific sources can usually be masked individually
---
### Interrupt Details
- **Programmable Interrupt Controller (PIC)**
	- Manages IRQ sources, offloads CPU burden
		- The IRQs can be programmatically prioritized, disabled, masked, etc.
---
### MFP (Multifunction Peripheral)
- Manages the IRQ
- Has 4 onboard timers (A - D)
- Has 1 onboard USART  (for the serial port)
- Manages 16 interrupt sources
	- 8 external (on its GPIP$_{0-7}$ input pins)
	- 8 internal (timers A - D, USART)
- Assigns a *relative priority* to each interrupt source
	- prioritizes the interrupts before the 68000 sees an interrupt request
- Flow ish:
	- 68901 MFP <- IRQ senders (peripherals)
	- GLUE      <- 68901 MFP   (MFPINT)
	- 68000     <- GLUE        (Forwards IRQ, generates VBL, HBL, IRQ, etcc)
- 