// index.js
// where your node app starts
// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/:date?', (req, res) => {
  console.log('Requested URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
  const date = req.params.date;
 // console.log (date.length);
  if (!date) {
      // Return current time
      const currentDate = new Date().getTime();
      res.json({
          unix: currentDate,
          utc: new Date(currentDate).toUTCString()
      });
  } else if (!isNaN(Date.parse(date))) {
   
    const parsedDate = new Date(date);
    res.json({
        unix: parsedDate.getTime(),
        utc: parsedDate.toUTCString()
    });

  } else {

    if (date.length === 13) {

      console.log ("fecha unix")
      res.json({
          unix: parseInt(date),
          utc: new Date(parseInt(date)).toUTCString()
      });
  } else {
        res.json({ error: "Invalid Date" });
  }
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  //console.log(__dirname);
  console.log(`Servidor en ejecución en http://localhost:${process.env.PORT}`);
});
