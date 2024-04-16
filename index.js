// index.js
// where your node app starts
// init project
var express = require('express');
var app = express();


//  ES la api para la entrada de la fecha
app.get('/api/:date?', (req, res) => {

  console.log (req.params.date);
  const dateParam = req.params.date; // 'tu_fecha_aqui'; // Reemplaza esto con tu fecha
  let fecha;
  
  if (/^\d+$/.test(dateParam)) {
    fecha = new Date(parseInt(dateParam));
    res.json({
      unix: fecha.getTime(),
      utc: fecha.toUTCString()
    });

} else if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?(Z|([+-]\d{2}:\d{2}))?)?$/.test(dateParam)) {
    // Intenta parsear la fecha como una cadena ISO 8601
    fecha = new Date(dateParam);
    res.json({
      utc: fecha.toUTCString()
    });
} else {
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
