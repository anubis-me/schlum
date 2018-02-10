var express         = require('express');           // Experss JS Framework
var app             = express();                    // Invoke express to variable for use in application
var port            = process.env.PORT || 8080;     // Set default port or assign a port in enviornment
var bodyParser      = require('body-parser');       // Parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
var router          = express.Router();             // Invoke the Express Router
var path            = require('path');              // Import path module
var helmet          = require('helmet');
var compression     = require('compression');
var mongoose        = require('mongoose');      // HTTP request logger middleware for Node.js
var morgan          = require('morgan');          // Import Morgan Package
var appRoute       = require('./app/routes/api')(router); // Import the application end points/API


require('dotenv').config();


mongoose.connect('mongodb://schl:schl@ds231658.mlab.com:31658/schl', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
        app.use(morgan('dev')); // Morgan Middleware
        app.use('/api', appRoute); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

        app.use(bodyParser.json());                         // Body-parser middleware
        app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
        app.use(express.static(__dirname + '/public'));     // Allow front end to access public folder
        // Secures Express Apps by setting various HTTP headers
        app.use(helmet());
        // Requests that pass through the middleware will be compressed
        app.use(compression());

        // Set Application Static Layout
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
        });

        // Start Server
        app.listen(port, function() {
            console.log('Running the server on port ' + port); // Listen on configured port
        });
    }
});