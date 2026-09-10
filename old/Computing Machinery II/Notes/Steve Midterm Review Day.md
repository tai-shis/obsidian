### Shifters
- Works by shifting values from one bit to the other
- **Logical Shifts**
	- Left Shift:
		- bits shift left, putting zeros into the MSB, the shifted out bit is lost
	- Right Shift:
		- bits shift right, putting zeros into the LSB, the shifted out bit is lost
- **Arithmetic Shift**
	- Left Shift:
		- bit shifts left, shifting in the old MSB into the MSB, the shifted out bit is lost.
	- Right Shift:
		- bit shifts right, shifting in the old LSB into the LSB, the shifted out bit is lost
---
### SR Latch with D Latch, Enable, and Reset Switches
- **If enable is not on, both S and R values should be one**
	- (To force into metastable point)
	- Will hold Q(current)
- **Reset should set Q(next) to zero.**
	- So, S should be 1 and R is 0.
---
### Minterms and Maxterms
- **Minterms:
	- Product of Sums
	- Product (\*) of when output is 0
- **Maxterms:**
	- Sum of Products
	- Sum (+) of when output is 1
---
# Things to know:
---
### Raster Graphics
- Need to know how to plot things 
	- Lines
	- Pixels
	- Bitmaps
	- etc.
---
### Sequential Circuits
- Need to know how to:
	- Make tables
		- Excitation Tables
			- Given a Q(cur), and a goal Q(next), what S and R values do you need to achieve this
		- Characteristic Tables
			- Given S and R values, determine Q(next)
- Create a Register
- Use circuits to make stuff
---
### Combinational Logic
- Everything from the list on the paper except the last two should be able to be replicated
- Knowledge of ALU implementation given an operation
---

---
Well, everything else on the topic list