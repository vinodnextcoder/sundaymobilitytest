/**
 * server start
 * @author vinod khetade on 13/03/2020..
 */
var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended:true}))
// Configuring the database
const dbConfig = require('./config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

require('./routes/emp.routes.js')(app);

// Create a Server
var server = app.listen(3000, function () {

  var port = server.address().port

  console.log("App listening at http://%s",  port)
})