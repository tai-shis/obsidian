### Overview
- Serial communication (one bit at a time) can allow for any n-bit value to be transmitted serially
	- (over n clock cycles)
- Is accomplished using *Transmit (Tx) and Receive (Rx) shift registers*
- For example:
	- Assuming a serial connection between a keyboard and a computer.
	- What is an appropriate minimum transfer rate?
		- Average typing speed (50-70 wpm)
		- Average 5 letters per word
	- So, $(70*5)/60$
	- Each character is 8 bits so $6*8 = 48$ bits/second
---
### Terms
- **Baud rate**
	- Signalling rate 
		- *number of symbols transmitted per second*
	- Not data rate
		- which is 0/1 only
	- Baud rate is more general
- **Duplex**
	- *Simultaneous bidirectional communication*
	- Requires *two* data lines
		- since sending and receiving simultaneously
- **Half-Duplex**
	- *Non-Simultaneous* bidirectional communication
	- Requires *one* data line
		- not simultaneous so we do not need two
- **Simplex**
	- *Unidirectional* communication
	- Requires one data line
---
### Synchronous Transmission
- Serial connection may be Synchronous or Asynchronous
- **Synchronous:**
	- Transmission between sender and receiver is synchronized using a common clock
	- *bits are sent continuously*
	- Even if there is nothing meaningful to send, bits are still send
		- used as an idle state
	- there is a way to distinguish idle bits vs real bits
	- The timing of the transitions in the data stream reveal the sender's clock signal pretty well
		- *Assuming that transitions happen often enough to deduce this*
- **Asynchronous**
	- There is *no* common clock to synchronize sender and receiver
	- Communication is not continuous. It starts and stops
	- When data is not being transmitted, the line is idle 
		- (probably just sending 1 constantly, can also be 0)
	- Frames are kept short
		- 5 to 9 data bits, commonly 8
	- *Each frame has the following format*
		1) Start bit                   <- non-idle level to signal start of frame
		2) Data bit                    <- usually LSB first (due to shift registers' behaviour)
		3) Optional Parity bit         <- see below section
		4) 1, 1 1/2, or 2 stop bits    <- return to idle level (minimum duration)
	- First bit after start bit will be the LSB, so the data transmitted will be read backwards
---
### Error Detection - Parity
- Beyond the scope of the course
- Uses the number of set bits in the original value to allow the receiver to determine if any changed
	- Limited to only odd number bit changes
- Odd parity
	- sum of the number of set data bits + the parity bit *must* be odd
		- if number of 1s in data is even, parity will be set to 1
		- if number of 1s in data is odd, parity will be set to 0
- Even parity
	- the opposite of odd parity, odd 1s: parity bit 0, even 1s: parity bit 1
- If a parity mismatch was detected, an error occurred.
	- if not, it is possible that an error still occurred
- However, *the parity bit itself may have changed*
---
### Transmission Details 
- Without a clock, the receiver uses its *own high frequency clock* to sample the data stream
	- much higher than the transmission rate
	- e.g. at 16 times the agreed-upon baud rate
- It will detect the start time of a frame (idle to non-idle) within a margin of 1/16th of the transmitter clock period
- It will use that information to find the centre of the bits of each transmitted clock
	- 16 + 8 or so
- Sender and receiver clock *are not in sync*
	- They will drift slowly, and error will accumulate at each sample
	- As long as the frames are short, the error will not accumulate to the point where bits are being sampled outside their beginning and end times