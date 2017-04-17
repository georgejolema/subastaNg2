var express = require('express'),
app = express(),
PORT = process.env.PORT || 8080;

app.use(express.static('node_modules'));
app.use(express.static('dist'));
app.use(express.static('bower_components'));
app.use('/business',express.static('dist/business'));

app.get('*', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(PORT, function () {
   console.log('server running!... listening port '+PORT); 
});