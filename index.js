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


// app.get('/api/:date?', (req, res) => {
//   console.log ('entrada : ' + req.params.date);
//   console.log('Requested URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
//     res.json({utc:"HOLA"});


// });
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/:date?', (req, res) => {
  console.log('Requested URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
  const date = req.params.date;
  if (!date) {
      // Return current time
      const currentDate = new Date().getTime();
      res.json({
          unix: currentDate,
          utc: new Date(currentDate).toUTCString()
      });
  } else if (!isNaN(Date.parse(date))) {
      // If it's a timestamp
      if (date.length === 13) {
          res.json({
              unix: parseInt(date),
              utc: new Date(parseInt(date)).toUTCString()
          });
      } else {
          // If it's a date string
          const parsedDate = new Date(date);
          res.json({
              unix: parsedDate.getTime(),
              utc: parsedDate.toUTCString()
          });
      }
  } else {
      res.json({ error: "Invalid Date" });
  }
});





// //  ES la api para la entrada de la fecha
// app.get('/api/:date?', (req, res) => {

//   console.log ('entrada : ' + req.params.date);
//   const dateParam = req.params.date; // 'tu_fecha_aqui'; // Reemplaza esto con tu fecha
//   let fecha;
//   console.log('Requested URL:', req.protocol + '://' + req.get('host') + req.originalUrl);

//   if (/^\d+$/.test(dateParam)) {
//     console.log ("fecha unix");
//     fecha = new Date(parseInt(dateParam));
//     res.setHeader('Content-Type', 'application/json');
//     res.send(
//       {
//       unix: fecha.getTime(), utc: fecha.toUTCString()
//     }
  
// );

 
// } else if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|([+-]\d{2}:\d{2}))?)?$/.test(dateParam)) {
//     // Intenta parsear la fecha como una cadena ISO 8601
//     fecha = new Date(dateParam);
//     console.log ("fecha valida iso" );
//     res.json({
//       utc: fecha.toUTCString()
//     });
// } else {
//   console.log ("fecha no valida");
//   res.json({error: "Invalid Date"});   
// }
// });




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

