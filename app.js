var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
var authRouter = require('./routes/auth');
var routes = require("./routes/index");
var app = express();
require('dotenv').config();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
// app.use(flash());
// app.use(expressValidator());
 
// app.get('/', routes.index);
// app.get('/login', routes.login);
// app.get('/register', routes.register);
app.get("/",authRouter)
 
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

const PORT = process.env.PORT ;
app.listen(PORT, () => {
 console.log( `Server started on port ${PORT}`)
  });
  
 
module.exports = app;