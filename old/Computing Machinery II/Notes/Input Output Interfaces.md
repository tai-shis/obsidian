### Main Functional Units
- **CPU**
	- executes instructions
- **Main Memory**
	- Stores data and instructions
- **I/O Interfaces**
	- read from/write to outside world
- These are all connected by *busses*, and synchronized by a clock
- So:
	- CPU controls memory
	- CPU controls I/O
	- Memory control I/O
	- Input and Output control each other
		- e.g. networking (in directly to out)
- **I/O interface $\ne$ I/O device**
	- interface:
		- *digital circuit* that connects to an I/O device to a computer bus
	- device:
		- a device which translates information between the computer and environment
	- A device connects to a port which is the *interface* that communicates with the computer
	- A *computer* includes only the parts that communicates through the bus(ses)
		- CPU
		- RAM
		- etc.
	- A *computer system* is everything that communicates with/within the computer
		- Hard Drives
		- USB Devices
		- etc.
	- Expansion Card Slots (like PCIe) count as both, as they are interfaces, which connect to an interface
- Common Input/Output Devices
	- Keyboard/Mouse
		- Output from these could be feedback (LEDs/Vibration)
	- Printers
	- Modem
		- multi-directional
	- Hard Drives are considered I/O devices
	- Essentially all USB drives
- An I/O interface acts as a *buffer*
	- A buffer in this context is:
		- a temporary storage unit
		- accepts information at one rate and delivers it at another*
	- [definition](https://www.merriam-webster.com/dictionary/buffer)
	- e.g. A Storage Device
		- CPU Clock speeds vs Storage Read/Write speeds
- *Why is buffering important?*
	- speed differences
		- like above, clock speeds vs read/write speeds
	- data format differences (like serial vs parallel)
		- transmitting between the two different formats
	- sound
		- analog to digital data
	- etc.
---
### I/O Interfaces
- **Functions
	- communication with the CPU via a bus
	- communication with a device
	- data buffering
		- syncing faster functions to slower ones (faster reading vs writing)
	- error detection
		- so the computer can detect errors in the hardware properly
	- controlling/monitoring I/O operation/status
- A typical interface has various *onboard registers*
	- input/output registers (*essentially buffers*)
	- status registers
		- to monitor status (idle/not idle)
	- control registers
		- to control operation (disabling error detection when idle)
- The CPU should be able to *read/write to these registers*
	- This is how CPU can interact with an I/O interface
	- Access may be limited
		- e.g. why write to the input register of a keyboard?
- There are chip diagrams/examples in the slides. They are important.
---
### Memory Mapping
- **How are I/O registers addressed?**
	- *Solution 1* (MC68k solution)
		- assign registers to addresses from the CPU's address space
		- they look like ordinary memory locations but they are not
		- this is *memory mapped I/O*
		- in the Atari ST, the I/O reserved memory is contained from 0xFFFF8000 - 0xFFFFFFFF
	- *Solution 2* (Intel/AMD solution)
		- have separate address spaces for memory and I/O
		- called *isolated I/O* or port mapped I/O
		- the instruction set includes in/out instructions to choose between the two when accessing
- **There do not need to be two distinct busses physically to handle data?**
	- No. We can multiplex the address and data lines to pick and choose.
	- However there does need to be separate I/O and memory R/W lines
		- To read/write to memory and interfaces (*4 options*)
- **Memory Mapped I/O**
	- *Pros*:
		- simpler CPU design (no specialized I/O instructions or logic)
		- simpler program logic
	- *Cons*:
		- some main memory address space is sacrificed to hold this
	- *How does an I/O interface know that is is being "addressed"?*
		- Possibility: Routing all address bus lines to every I/O interface
			- each interface will listen for it's own address, once theirs is found, they intake the rest of the data
			- **this is highly inefficient**
				- each chip would access *ALL* of the address pins on the bus (much more expensive)
		- Better option: platform specific "system controller"
			- decodes the address bus and tells the chip to select the proper signal
- **Programmed I/O**
	- How can we do this?
		- By reading/writing to the relevant I/O registers directly
		- We have an "idle flag" in the status bit, which will allow/not allow us to write to a register when it is set
	- There is keyword (*volatile*) which tells the compiler to *not* optimize access
	- Essential Steps:
		- Wait to exit idle,
		- do thing
	- In this method, the CPU *directly controls* the I/O interface
	- But how is the idle status changed so the loop knows the idle status?
		- This is done through *polling*
			- CPU repeatedly queries the I/O interface to determine when the next data value can be read
			- But this is highly inefficient as the code will most of its time waiting
				- processor is much faster than the device
					- *Alternatives to this:*
						- interrupt driven I/O
						- DMA
---
### Supervisor Mode 
- What happens if: when dereferencing a 'wild' point accidentally reprograms a register of something important? (like a hard drive)
```C
char *ptr*;
...
*ptr = 'a';     /* What happens here? */
```
- Many CPUs operate in one of *two or more* modes
	1. **User mode**         (restricts use of certain instructions and addresses)
		- in MC68k it bombs.
	2. **Supervisor mode**   (unrestricted address)
		- But every program can '*elevate*' itself to supervisor mode.
	- User mode uses a7/sp (USP) as its stack pointer
	- supervisor mode uses a7' (SSP)
- There is a "super system call" for switching into supervisor mode in TOS:
```C
volatile const char *kybd_status = 0xFFC02; /* Valid address to keyboard status */
long old_spp; /* this holds an address */
old_ssp = Super(0); /* Enters supervisor mode, saves old ssp value in old_spp */

/* Now you can do supervisor stuff */
if (*keybd_status == ...) 
	...

Super(old_ssp); /* Exits supervisor mode, restores old_ssp value, return is thrown away */
```
- but, **how does the CPU (mc68k) know which addresses are protected?**
	- it doesn't.
	- there is an external chip on the motherboard to determine this.
		- i.e. returning an error/proceeding with the given instruction
	- 