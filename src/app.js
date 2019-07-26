const path = require("path");
const express = require("express");
const request = require("request");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETUP HANDLEBARS
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// SETUP PATH FOR SERVING STATIC VIEWS
app.use(express.static(publicDirectoryPath));

// ROUTES
app.get("", (req, res) => {
  res.render("index", {
    title: "weather.",
    name: "Anthony Ellis"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Anthony Ellis"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Anthony Ellis"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide a search term."
    });
  }
// default desctuctured items in case object is undefined
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anthony Ellis",
    errorMessage: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Anthony Ellis",
    errorMessage: "Page not found."
  });
});

// RUN SERVER

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
