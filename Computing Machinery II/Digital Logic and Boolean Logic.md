#### Charges & Electrons
- can be positive/negative
- unit of measurement for a charge is a coulomb
- like charges repel and unlike charges attract
- 
#### Conductors vs Insulators
- **Conductors**
	- allow electricity to flow freely
	- the better the conductor, the better the electricity flows
		- less energy loss
	- copper wiring is used as a default as it is very conductive
		- (most conductive is silver though it is expensive)
- **Insulator**
	- prevents electricity flow
		- can be used to resist/cancel the flow of electricity
	- rubber/glass are good insulators
#### Voltage
- *the difference in electrical potential*
- the *amount* of work needed to move a charged unit from point a to point b
- measured in *Volts \[V\]*
	- **Calculated by Joules/Coulomb**
#### Current
- rate of charged motion
- measured in *Amp \[Ampere\]*
	- **Calculated by Coulomb/Second**
#### Resistance/Resistors
- opposition to the flow of the electrons
- similar to mechanical friction
- *resistors* are the method used to add resistance to circuits to reduce the electrical flow in circuits
#### Circuit
- **closed path** formed by interconnecting various electronic components
	- must be a closed path as the electricity will not flow
#### Ohm's Law
- current through a conductor between two points
	- directly proportional to the voltage (potential difference)
	- inversely proportional to the resistance between the points
- Calculations:
	- $I = V\space/\space R$
	- $V = I\space * \space R$
#### Short Circuit
- A different path found *for current* than the intended path through a circuit
	- skips/behaves unintentionally
- abbreviated as a **short** or **s/c**
#### Voltage Drops (across resistors and switches)
- voltage/power in a circuit will drop as it goes through the circuit
- when energy is lost, it has to go somewhere
	- resistors convert excess energy into **heat**
- e.x. an LED is a diode
	- as the voltage drops as it passes through the diode, the remaining voltage has to go somewhere
		- **the resistor dissipates it**
#### How is a bit represented?
- they are represented by **voltage levels**
	- +0V (low)
	- +5V (high)
- in this case, low can be 0 and high can be 1
- However, voltage levels are continuous
	- thus, we can group them (round them from the middle)
#### Digit Circuit
- Electronic circuits will process *discrete* voltage levels
	- only 1s and 0s
- Built out of logic gates
	- and/or/xor
- *Punctuation for circuitry definitions are important*
	- assume rules from symbolic logic

#### Modern Computers and Logic Gates
- Gates are built using *transistors*
	- is a semiconductor component
		- acts as an electrically controlled electrical switch
		- **no moving parts**
- e.x. using CMOS technology
	- an **inverter** is achievable by using two transistors
#### Integrated Circuit (IC)
- miniaturized electronic circuit
- is manufactured in a thin layer of semiconductor material
	- usually silicone
- a modern chip can contain hundreds of millions of transistors
- each chip
#### Boolean Algebra
- Captures the essential properties of the logic operations, such as:
	- AND Gates
	- OR Gates
	- NOT Gates
- we are able to write out these complex circuits using boolean algebra notation
	- these are essentially symbolic logic (classical logic) rules

#### SOP vs POS
- pretty much equivalent!
- better is dependent on usage
- ex:
	- NAND gates
		- **SOP is better**
	- NOR gates
		- **POS is better**
#### Boolean Operations
- ##### Completeness
	- all boolean functions can be implemented out of not, and, and or gates
	- *set of these three is said to be complete*
	- A set of operations/gates is said to be complete if **any** boolean function/circuit can be implemented using only combinations of the operations/gates in the set
- there are 4 *1-input* operations, however we are only interested in the NOT operation
	- identity (buffer)
	- not
	- constant 0
	- constant 1
- there are 16 *2-input* operations, we are only interested in AND, OR, XOR, NAND, NOR, and XOR
#### Grey Code
- sequence of bit patterns that meet the  following criteria
	- n-bits long for some value of on
	- each pattern **must** differ from the previous by  exactly one bit
	- all possible n-bit patterns must be included in the grey code
	- no bit pattern can be repeated in the code
		- *essentially the symbolic logic t/f patterns that you write for x amount of things*
	- $2^n$ patterns