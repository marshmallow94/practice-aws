/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mysql = require('mysql');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/makeList', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/makeList/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/makeList', function(req, res) {
  // Add your code here
  
  console.log("reached to post req");
  const result = req.body;
  const mysql = require('mysql');
  console.log(req.body);

  const con = mysql.createConnection({
    host     : "database-1.cwd3greadrvm.us-east-1.rds.amazonaws.com",
    user     : "admin",
    password : "922962700",
    port     : 3306
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("reached to connect");
    con.query("INSERT INTO db.LocationList (name, description, is_public, owner_fk)" +
      "VALUES ('ListFive','5' , 1, 1);", function (err, result, fields) {
      res.json({success: 'send succeeded!', url: req.url, result});
    });
    con.end();
  });
  
  /*
  con.connect(function(err) {
    if (err) throw err;
    console.log("reached to connect");
    con.query("INSERT INTO db.LocationList (name, description, is_public, owner_fk)" +
      "VALUES (" + result["name"] +", " + result["description"] + ", 1, 1);", function (err, result, fields) {
      res.json({success: 'send succeeded!', url: req.url, result});
    });
    con.end();
  });*/

  
});

app.post('/makeList/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/makeList', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/makeList/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/makeList', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/makeList/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
