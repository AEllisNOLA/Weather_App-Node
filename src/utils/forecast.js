const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/a539f8353e7d87c240eb011c407aa755/${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } with a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
