var createError = require('http-errors');
var express = require('express');
var secure = require('ssl-express-www');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(secure);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + '/about.html'));
});
app.get('/events', function(req, res) {
    res.sendFile(path.join(__dirname + '/events.html'));
});
app.get('/programs', function(req, res) {
    res.sendFile(path.join(__dirname + '/programs.html'));
});
app.get('/resources', function(req, res) {
    res.sendFile(path.join(__dirname + '/resources.html'));
});
app.get('/launch-fellows', function(req, res) {
    res.sendFile(path.join(__dirname + '/launchfellows.html'));
});
app.get('/project-funding', function(req, res) {
    res.sendFile(path.join(__dirname + '/projectfunding.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
