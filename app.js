var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// var rawBodySaver = function (req, res, buf, encoding) {
//   if (buf && buf.length) {
//     req.rawBody = buf.toString(encoding || 'utf8');
//   }
// }
// app.use(bodyParser.json({ verify: rawBodySaver }));
// app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
// app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));



var indexRouter = require('./routes/index');
var jokesRouter = require('./routes/jokes');
var usersRouter = require('./routes/users');
var ipaRouter = require('./routes/ipa');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/jokes', jokesRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

//{{POST}}
app.use('/ipa', ipaRouter);

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
