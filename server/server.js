var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var url = require('url');
var app = express();
var sqlite3 = require('sqlite3').verbose();

// setup the db
var db = new sqlite3.Database('ccapply.db');
db.serialize(function() {
	var create = "CREATE TABLE IF NOT EXISTS applications (" +
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"created DATETIME DEFAULT current_timestamp, " +
		"first_name TEXT, " + 
		"last_name TEXT, " + 
		"name_suffix TEXT, " + 
		"address_1 TEXT, " +
		"address_2 TEXT, " +
		"address_city TEXT, " +
		"address_zip TEXT, " +
		"address_state TEXT, " +
		"email TEXT, " +
		"phone TEXT, " +
		"dob_month TEXT, " +
		"dob_day TEXT, " +
		"dob_year TEXT, " +
		"ssn TEXT, " +
		"employ_status TEXT, " +
		"yearly_income TEXT, " +
		"monthly_house_cost TEXT, " + 
		"status TEXT DEFAULT Pending)";
	
	db.run(create);
});

app.use(cors());

// accept JSON-encoded data
app.use( bodyParser.json() );

app.get('/', function(req, res){
	res.send('Hello There!')
})

// accept POST to application endpoint
app.post('/applications', function (req, res) {	
	var stmt = db.prepare('INSERT INTO applications (first_name, last_name, name_suffix, address_1, address_2, address_city, address_state, address_zip, email, phone, dob_month, dob_day, dob_year, ssn, employ_status, yearly_income, monthly_house_cost) VALUES ($first_name, $last_name, $name_suffix, $address_1, $address_2, $address_city, $address_state, $address_zip, $email, $phone, $dob_month, $dob_day, $dob_year, $ssn, $employ_status, $yearly_income, $monthly_house_cost)');
	stmt.run({
		$first_name: req.body.first_name, 
		$last_name: req.body.last_name, 
		$name_suffix: req.body.name_suffix, 
		$address_1: req.body.address_1, 
		$address_2: req.body.address_2, 
		$address_city: req.body.address_city, 
		$address_state: req.body.address_state,
		$address_zip: req.body.address_zip,
		$email: req.body.email, 
		$phone: req.body.phone, 
		$dob_month: req.body.dob_month, 
		$dob_day: req.body.dob_day, 
		$dob_year: req.body.dob_year, 
		$ssn: req.body.ssn, 
		$employ_status: req.body.employ_status, 
		$yearly_income: req.body.yearly_income, 
		$monthly_house_cost: req.body.monthly_house_cost,
	}, function(err){
		if(err){
			res.send(JSON.stringify({error: true, message: 'database error'}));
		} else {
			var stmt = "SELECT * FROM applications WHERE id = '" + this.lastID + "'";
			db.get(stmt, function(err, row){
				if(err){
					res.send(JSON.stringify({error: true, message: 'database errorz'}));
				} else {
					res.send(JSON.stringify({error: false, application: cleanRowsForResponse([row])[0]}));
				}
			});
		}
	})
});

app.get('/search', function (req, res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var stmt = "SELECT * FROM applications WHERE email = '" + query.email + "' AND ssn LIKE '%" + query.ssn + "'";

	db.all(stmt, function(err, rows){
		if(err){
			res.send(JSON.stringify({error: true, message: 'database error'}));
		} else {
			res.send(JSON.stringify({error: false, applications: cleanRowsForResponse(rows)}));
		}
	});
})

function cleanRowsForResponse(rows){
	for(var el in rows){
		delete rows[el].ssn
	}

	return rows;
}

// run the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('server is running on port', port);
});