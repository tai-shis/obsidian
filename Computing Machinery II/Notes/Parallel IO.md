[Slides](obsidian://open?vault=Obsidian%20Vault&file=Computing%20Machinery%20II%2FNotes%2FSlides%2FParallel%20I_O.pdf)
### General Details
- *An n-bit value can be transmitted in parallel meaning all bits simultaneously over n lines *
- More on slides
---
### Asynchronous Parallel I/O
- A special signal (*data valid*) signal must be supplied to the receiver to signify that there is valid incoming data
- The data valid signal will be sent into the status register *so that the CPU can know if there is valid data to take*
- The CPU, will have to send a *data taken* signal so that the data is not overwritten before the CPU can receive it.
	- This is called a *handshaking* protocol
- Even in serial communications like **TCIP/IP Networking Protocols:**
	- Handshaking can be used to make sure that the receiver is not overwhelmed by the amount of data being sent.
---
### Interfaces of Asynchronous Parallel I/O
- Typical CPU accessible registers:
	- Command
	- Status
	- Data
	- Data direction register
		- When this is present, each of its bits specifies the direction of the data line
		- Bit == 0 means input
		- Bit == 1 means output
		- Can also be wider, not limited to one bit
---
### Serial vs Parallel
- Parallel busses are verry common
	- Every thing else being equal, *parallel is faster than serial*
- **Serial 
	- Pros:
		- Cost of electrical considerations
		- time required to transmit in parallel is the same, but for one bit is significantly decreased
		- Narrower, cheaper cable
		- better for longer distances
		- Smaller connectors (imagine parallel connector vs usb-c)
	- Cons:
		- In theory, slower than parallel