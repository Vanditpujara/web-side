// app.use(express.static('public'));

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const os = require('os');
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
const IP = getLocalIP();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, IP, () => {
  console.log(`✅ Server running at http://${IP}:${PORT}`);
});