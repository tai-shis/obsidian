[Slides](obsidian://open?vault=obsidian&file=Computing%20Machinery%20II%2FNotes%2FSlides%2FRaster%20Graphics.pdf)
### Raster Graphics
- raster = a rectangular grind of *pixels*
- (0,0) refers to the *top left corner*
- In monochrome graphics, each pixel is either on or off
- In colour graphics, each pixel is a mixture of shades of RGB.
---
### Vector Graphics
- Alternative to raster graphics
- based on geometric primitives such as lines
	- instead of pixels
- Can draw Straight lines and smooth curves
---
### Frame Buffers and Bitmaps
- *Frame Buffer (FB)* is a region of memory that holds an image to display
	- FB gets displayed to the screen
	- We do **not** write directly to the screen
- *Bitmap* is raster image data
- the FB is simply memory, can only access the screen in the same methods we access memory
- **On the Atari ST:**
	- the frame buffer is *32,000 bytes*
	- Located at highest RAM locations ($3F8000 - $3FFCFF) on an st with 4Mb of Ram)
		- Right above the stack
	- Video hardware will automatically and periodically scan the buffer and send to the monitor.
	- In monochrome mode:
		- *Resolution:* 640 x 400
			- 256,000 pixels
			- 32,000 bytes
	- Frame buffer location *can be changed*
		- any 256 byte aligned region of memory can serve as the frame buffer
- Programmers can access memory via variables which are memory locations whose size is either a byte, word, or a longword.
---
### Plotting Routines
- *Plotting* is performed by writing into the frame buffer
- e.g. Code which will plot to the frame buffer on the Atari ST:
```C 
char *base = (char *)Physbase(); /* system call returns FB start*/
*base = 0x80;
*base = *(base + 80) = *(base + 160) = 0xFF /* turns on 3x8 box of pixels on the screen */
```
- Some primitive plotting routines include the following:
	- plot pixel
	- plot vertical line
	- plot horizontal line
	- plot line (generic)
	- plot "shape"
		- triangle, rectangle, generic polygon, circle, etc.
	- plot bitmap
	- clear screen/region
	- etc.
- *plot_pixel routine*
```c
define SCREEN_WIDTH  640
define SCREEN_HEIGHT 400

void plot_pixel(char *base, int row, int col) {
	if (col >= 0 && col < SCREEN_WIDTH && row >= 0 && row < SCREEN_HEIGHT)
		*(base + row * 80 + (col >> 3)) |= 1 << (7 - (col & 7));
/*                          ----------                ---------
							 col / 8                  col % 7
*/
}
```
- **Shifts and bitwise operations are far faster**
	- compared to div/mod
	- the speed difference can be seen on the reference card
- Trying to plot lines and other large details using plot_pixel is expensive due to the amount of multiplication operations needed.
- **Vertical Line**
	- re-calculating pixel positions in the same byte is redundant
	- vertical line, the pixel position is the *same* for every line
	- For a *vertical line, (x,y$_1$) to (x, y$_2$)*:
		- vertical line is a single pixel on a series of consecutive scan lines
		- Compute the address of the byte for x, y$_1$
		- compute the bit position for x, y$_1$ in this byte
		- in byte with one set, shift the pixel to the correct position
- **Horizontal line**
	- from (x$_1$, y) to (x$_2$,y)
	- assuming mod of x$_1$ by 8 is 0 and x$_2$ is 7
		- compute the start address of the byte for x$_1$,y
		- compute the end address of the byte for x$_2$,y
		- loop from start address to the end address writing 0xFF to each byte
	- without assumption:
		- from start address+1 to end address-1
		- shift 0xFF to the *right* the appropriate number of bits based on x$_1$ and write it to the start address
		- shift 0xFF to the *left* the appropriate number of bits based on x$_2$ and write it to the end address
