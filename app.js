var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexCliente = require('./routes/cliente.js');
var indexGuia = require('./routes/guia.js');
var indexTracking = require('./routes/tracking.js');
var usuarios = require('./routes/users.js');

var app = express();
app.use(cors());
app.set("port", process.env.port || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/clientes', indexCliente);
app.use('/api/guias', indexGuia);
app.use('/api/trackings', indexTracking);
app.use('/api/usuarios', usuarios);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
