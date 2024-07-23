// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const dateFormat = require("dateformat");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { type } = require("express/lib/response");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Date API endpoint...
app.get("/api/:date?", (req, res) => {
  const { date } = req?.params;
  let timeChanger = date;

  if (!date) {
    let currentdate = new Date();
    timeChanger = (Math.floor(currentdate.getTime() / 1000) * 1000).toString();
  } else if (timeChanger.includes("-")) {
    timeChanger = new Date(date).getTime().toString();
  }

  const dateTime = new Date(parseInt(timeChanger, 10));
  if (isNaN(dateTime.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }
  const formattedDate = dateFormat(
    dateTime,
    "ddd, dd mmm yyyy HH:MM:ss 'GMT'",
    true
  );

  return res.send({
    unix: timeChanger,
    utc: formattedDate,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
