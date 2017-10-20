var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');

var db = monk('mongodb://the-wire:Success%401996@ds227035.mlab.com:27035/rce-db');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//Initialize global variables
var t_users = [];
var t_teams; // len(team_users)
var team_users = [];

/*
team_users definition
----------------------
team_users = [
  {
    team_id : XYZ,
    t_users : 2,
    connected : 2
  },
  {
    team_id : ABC,
    t_users : 3,
    connected : 2
  }
]

t_users definition
----------------------
t_users = [
  {
    team_id : XYZ
    user_id ; XXXX
  }
]
*/

//set global access
app.set('db', db);
app.set('t_users', t_users);
app.set('t_teams', t_teams);
app.set('team_users', team_users);


module.exports = app;
