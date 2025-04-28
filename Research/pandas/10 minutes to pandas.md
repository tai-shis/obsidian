### Basic Data Classes
- Two main types
- *Series
	- **one-dimensional labeled array holding data of any type**
- *DataFrame*
	- two-dimensional data structure that holds data (rows, columns)\
---
### Object Creation
- Examples of various data creation methods are shown in the [guide](https://pandas.pydata.org/docs/user_guide/10min.html)
	- for both Series and DataFrames
---
### Viewing Data
- Commonly used functions to access different sections of data:
	- `DataFrame.head()`
		- from "head" (top)
	- `DataFrame.tail()`
		- from "tail" (bottom)
	- `DataFrame.index`
		- get all rows
	- `DataFrame.columns`
		- get all columns
	- `DataFrame.to_numpy()`
		- np representation without index/column labels
	- `DataFrame.describe()`
		- quick statistic summary of data
	- `DataFrame.T`
		- transpose
	- `DataFrame.sort_index()`
		- sorts by an axis
	- `DataFrame.sot_values()`
		- sorts by values
---
### Selection of Data
- Commonly used methods/techniques:
	- *Get item (\[])*
		- Essentially indexing the dataframe like a list
		- Can also use ":" for other things (not sure exactly how this works but looks simple enough)
	- *Selection by Label*
		- `DataFrame.loc()`
		- `Dataframe.at()`
		- We can for example:
			- select a row matching a label
			- select all rows with a select column labels (using ":")
			- etc.
	- *Selection by Position*
		- `DataFrame.iloc()`
		- `DataFrame.iat()`
		- We can also:
			- Select by the position of the passed integers
			- Get integer slices similar to NumPy/Python
			- Get rows/columns explicitly
			- Get values explicitly
			- etc.
	- *Boolean Indexing*
		- we can use boolean expressions to select specific bits of data
		- `DataFrame[DataFrame[x] == y]`
			- this format
		- `DataFrame[DataFrame["x"].isin(["row1", "row2"])`
---
### Setting
- Setting a new column automatically aligns the data by the indexes
	- To be honest, not sure what this means
- We can set values by:
	- label
	- position
	- numpy array
---
### Missing Data
- `NaN` represent missing data usually
- reindexing allows for changing/adding/deleting the index on a specific axis
	- `DataFrame.reindex()`
	- returns a copy of the data
- `DataFrame.dropna()`
	- drops any rows that have missing data
	- `DataFrame.dropna(how="any)`
- `DataFrame.fillna()`
	- fills missing data
	- `DataFrame.fillna(value=x)`
---
### Operations
- See the [Basic section on Binary Ops](https://pandas.pydata.org/docs/user_guide/basics.html#basics-binop).
---
### Stats
- We can get statistics of dataframes
- `DataFrame.mean()`
	- we can get the means of each row/column etc.
---
### Other methods
- other methods are listed in on the [Site](https://pandas.pydata.org/docs/user_guide/10min.html)
- use the rest of this page as a reference for the methods possible     