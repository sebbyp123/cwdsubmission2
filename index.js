

const express = require('express'); // setting express constant
const Datastore = require('nedb'); // setting Datastore constant 

const app = express(); // setting app constant
const port = process.env.PORT | | 3000;
app.listen(port, ()=>{
	console.log('Starting server at${port}');
}); // setting up host (3000 if local, port number if external)
app.use(express.static('public')); // using public file including html and css
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db'); //creating database
database.loadDatabase(); // loading database

app.post('/api', (request, response) => { // posting API key
    const data = request.body;
    const timestamp = Date.now(); //setting timestamp to the current date each time
    data.timestamp = timestamp;
    database.insert(data); // inserting data to database each time
    response.json(data); // reads the response to completion
});

app.get('/api', (request, response) => { //getting api key
   database.find({}).sort({timestamp: 1}).exec(function (err,docs){ // sorting data chronologically by timestamp
    response.json(docs); // same as above
    });
});

