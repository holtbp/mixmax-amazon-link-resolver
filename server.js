var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var synchronize = require('synchronize');
var cors = require('cors');

// Use fibers in all routes so we can use synchronize.await() to make async code easier to work with.
app.use(function(req, res, next) {
  synchronize.fiber(next);
});

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 9146);
