### Cloud-Based Databases
- this class uses `supabase`
- you can query supabase directly through the client - either by using raw sql, or by using its built-in data APIs
- **SQLite**
```js
const db = new sqlite3.Database(path);

db.call("select * from foo", (err, rows) => {
	if (err) {
		return
	}
	
	// do something
});
```
- **Supabase**
```js
const db = supa.createClient(url, key)

const { data, error } = await db
							.from('table')
							.select('field1, field2')
```
- **Database helpers:**
	- rather than using raw SQL statements, many serverless database/backend providers will have you use their respective APIs to call the database
	- benefits:
		- you don't need to know SQl
		- DBMS-specific SQL syntax is hidden
			- you won't have to rewrite the SQL if you switch platforms
	- cons:
		- you need to know the specific syntax for that cloud provider
		- no control over/ability to use database-specific features
		- re-write code when moving to a different cloud platform
### **ORM (Object Relational Mapper)**
- typically, software development using databases and object-oriented programming languages have needed to map database tables to/from objects/classes
	- type safety across db/backend!
- *Two Approaches to ORMs*
	- Use an ORM supplied tool to generate code
	- the developer writes the "mapping" code
---
### NoSQL Databases
- noSQL refers to a wide range of databases that do not use a relational structure (ie. without the use of SQL)
- wide range of use cases
- typical categorization:
	- Key/Value stores
		- hash table/map but a database
		- optimized for speed 
		- eg. redis: stored in memory and in persistent storage
	- Document Stores 
		- store any type of data
		- stores hierarchical data
		- useful for unstructured data
		- most noSQL is of this type
		- eg. MongoDB Firebase, DynamoDB
	- Column store
		- stores columns of daata
	- Graph store
		- stores relationships between data
- **MongoDB (Important\*\*)** 
	- most popular noSQL database (probably)
	- uses JS as its query language
	- extremely fast writes, slower reads
	- a relational DBMS constructs index files which are essentially balanced binary tress
		- every time new data is added, these index files are regenerated
		- benefit is that query times are fast.
		- does not support transactions, not support for reliability
		- doesnt have a schema, so data is unstructured (can have a lot of redundancy)
		- can handle large data sets
		- uses sharding (data can be split across many files across many machines)
		- in relational databases changing the schema of an existing database is costly.
			- noSQL has no schema, so they can adapt to new requirements easily