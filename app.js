let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let jsonParser = bodyParser.json();
let logger = require('morgan');
let modelInitializer = require('./models/init');
let auth = require('./auth/auth');
let util = require('./utils/utils');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let eventsRouter = require('./routes/events');
let programRouter = require('./routes/programs');
let ticketRouter = require('./routes/tickets');
let speakerRouter = require('./routes/speaker');
let sponsorRouter = require('./routes/sponsor');
let exhibitorRouter = require('./routes/exhibitor');
let purchaseRouter = require('./routes/purchase');
let myprogramRouter = require('./routes/myprograms');
let yenagoaRouter = require('./routes/yenagoa');
let generalRouter = require('./routes/general');
let messageRouter = require('./routes/messaging');
let pollRouter = require('./routes/polling');
let responseRouter = require('./routes/qanswer');
let notificationRouter = require('./routes/notifications');
let progrlistRouter = require('./routes/prolist');
let uploadRouter = require('./routes/uploads');

let app = express();

//run models
new modelInitializer();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(jsonParser);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//manage cors
app.options('*', cors());
//top level app middle ware and header control
app.use(auth.allowHeaders);
app.use(auth.friendToken);
//start routing
app.use('/', indexRouter);
//handshake
app.use('/api/handshake', (req, res, next) => {
    res.json({status: true, data: [], msg: "successfully connected !"});
});
//log writer
//app.use('*',, )
//api route
app.use('/api/user', usersRouter);
app.use('/api/event', eventsRouter);
app.use('/api/program', programRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/speaker', speakerRouter);
app.use('/api/sponsor', sponsorRouter);
app.use('/api/exhibitor', exhibitorRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/myprogram', myprogramRouter);
app.use('/api/general', generalRouter);
app.use('/api/yenagoa', yenagoaRouter);
app.use('/api/message', messageRouter);
app.use('/api/polling', pollRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/mylist', progrlistRouter);
app.use('/api/response', responseRouter);
//uploads api
app.use('/api/uploads', uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    util.Jwr(res, false, {}, "Error: " + err.status)
});

module.exports = app;
