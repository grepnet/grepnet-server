var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var logger = require('express-logger');

var routes = require('./routes/index');

var app = express();

app.use(logger({
    path: 'logs/access.log'
}));
app.use(morgan('dev'));

var whitelist = ['http://localhost', 'http://www.grepnet.io'];
app.use(cors({
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(JSON.stringify({
            message: err.message,
            error: err
        }));
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
        message: err.message,
        error: {}
    }));
});


module.exports = app;
