### pandas
- pandas is essentially a data manipulation package for Python (specifically tabular data)
- we can easily, intuitively, think of DataFrame as an *Excel Sheet*
- I skip a lot of precursor data or things covered in [[10 minutes to pandas]]
- `.DataFrame.info()`
	- quick way to look at the data types, missing values, and data size of a dataframe
- `DataFrame.shape
	- You can find the number of rows and columns using this method
	- can be indexed to get only rows and only columns as output
	- `df.shape[0]` gets number of rows
	- `df.shape[1]` gets number of columns
- `DataFrame.columns`
	- self explanatory
	- can be converted into a list
		- `list(df.columns)`
- `DataFrame.isnull()`
	- you can check if each element in a DataFrame is `NaN`
	- and you can count all nulls in a column using `.sum()`
		- two to count all nulls in the entire DataFrame
- **Sorting Data**
	- in the previous info, we know that we can sort values by column with `DataFrame.sort_values()`
	- When we do this, our indexes might become misaligned
		- to fix this, we use `df.reset_index()`
- **Isolating Data**
	- Isolate one column using `df[]`
	- Isolate two or more columns using `df[["x", "y", "z", ...]]`
- **Duplicate Data** (when concatenating two dataframes)
	- When we concatenate two dataframes, they may contain duplicates of data, possibly skewing processes
	- we can use `df.drop_duplicates()` do remove all duplicate rows
- `DataFrame.value_counts()`
	- counts how many of a value exists
---
### Data Visualization
- you can easily chart out relationships among variables using line plots
- example:
```Python
"""
Basic Syntax
"""
df[['x', 'y']].plot.line()

"""
Other Settings (we can just look them up)
"""
df[['x', 'y']].plot.line(figsize=(20, 10), 
                                 color={"x": "red", "y": "blue"})
```
- We can also use subplots! (kinda cool)
	- `df.plot.line(subplots=True)`
- Bar plots also exist
	- `df[x].value_counts().plot.bar()`
- Also boxplots :3
	- like from stats lol