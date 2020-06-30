const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

console.log(options);
console.log(process.env.PORT);

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
