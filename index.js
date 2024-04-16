// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


//  ES la api para la entrada de la fecha
app.get('/api/:date?', (req, res) => {

  console.log (req.params.date);

  let varibleEntrada;

  const dateParam = req.params.date; // 'tu_fecha_aqui'; // Reemplaza esto con tu fecha
  let date;
  
  // Intenta convertir la fecha en formato Unix a una fecha JavaScript
  if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
  } else {
      // Intenta parsear la fecha como una cadena ISO 8601
      date = new Date(dateParam);
  }
  
  if (isNaN(date.getTime())) {
      console.log('Fecha inválida');
  } else {
      console.log(`Fecha recibida: ${date.toISOString()}`);
  }
  

  if (/^\d+$/.test(dateParam)) {
    console.log ("es unix");
    date = new Date(parseInt(dateParam));
} else if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|([+-]\d{2}:\d{2}))?)?$/.test(dateParam)) {
    // Intenta parsear la fecha como una cadena ISO 8601
    console.log ("es iso 8601");
    date = new Date(dateParam);
} else {
    console.log ("formato invalido");
    date = null;
}


  if (req.params.date) {
    // Attempt to parse the date
    varibleEntrada = new Date(req.params.date);
  } else {
    // If date parameter is empty, use current time
    varibleEntrada = new Date();
  }

  // Check if the date is valid
  if (!isNaN(varibleEntrada.getTime())) {
    // Valid date, construct response
    res.json({
      unix: varibleEntrada.getTime(),
      utc: varibleEntrada.toUTCString()
    });
  } else {
    // Invalid date, return error
    res.json({ error: "Invalid Date" });
  }
});






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




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
