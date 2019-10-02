# REST_API_NODE.js
A basic REST API with Authentication built using Node.js and MongoDB

# Steps to run
1. Run server.js
2. send a post request to ' URL:3000/signup ' (URL -> localhost in my case) with a json file as body containing the fields "email" and "password".
3. send a post requist to ' URL:3000/login ' with a json file as body containing the fields "email" and "password". Note down your auth token for future use.
4. There are 5 requests available to manage the records.
	
	GET : /person
	
	GET : /person/<person_ID>
	
	POST : /person
	
	PATCH : /person/<person_ID>
	
	DELETE : /person/<person_ID>

# GET /person is used to get all the records
	usage: URL:3000/person
	
	send a json body with the field { "token" : "<your auth token>" }

# GET /person/<person_ID> is used to get a specific record
	usage: URL:3000/person/<person_ID
	
	send a json body with the field "{ "token" : "<your auth token>" }
	
# POST /person is used to add a new record
	usage: URL:3000/person
	
	send a json body with the fields { "token" : "<your auth token>", "name" : "<person name>" }
	
	you can also add an optional field "createdAt" : "<Date time>"
	
# PATCH /person/<person_ID> is used to update a record
	usage: URL:3000/person/<person_ID>
	
	send a json body with the fields 
	"{ "token" : "<your auth token>", 
	"fields" : [ { 
		"propValue" : "<name of the field in record>" , 
		"value" : "<the value to be updated>" 
		}, { "propValue" : "<name of another field in record (if you need to update)>" , 
		"<the value to be updated>"}... 
		] 
	}"
	
	NOTE : you can add as many fields as you want to update. 
	It should be an array of objects with two fiels namely " propName" and "value"

# DELETE /person/<person_ID> is used to delete a record
	usage: URL:3000/person/<person_ID
	
	send a json body with the field "{ "token" : "<your auth token>" }
