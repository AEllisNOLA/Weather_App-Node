const request = require("request");

const geocode = (address, callback) => {
  // NOTE: just using address would typically work, but encodeURIComponent is a fail-safe in case someone uses and weird characters in their search
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWVsbGlzbm9sYSIsImEiOiJjanhkcmh0aHIwMWxuM3lveWtseGxlZzgxIn0.HTjTekjdoWATojQocjf3lQ`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
