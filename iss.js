const request = require('request');

const fetchMyIP = function(callback) {
  //assign api to constant url
  const url = 'https://api.ipify.org?format=json';

  request(url, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // if status code is unsuccessful (not 200), print error & return
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // assign body info to constant data (now an object)
    const data = JSON.parse(body);

    // if IP address cannot be found, return and print error
    if (!data.ip) {
      callback('Error, no IP address', null);
    } else {
      // store ip address pulled from object
      callback(null, data.ip);
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  // assign api to constant url
  const url = 'http://ipwho.is/'

  request(url, (err, resp, body) => {

    // if error from the start, print error & return
    if (err) {
      callback(err, null);
      return;
    }

    // if status code is unsuccessful (not 200), print error & return
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parse body info to an object and assign to new constant, data
    const data = JSON.parse(body);

    // assign latitude & longitude from key values of data object
    const latitude = data.latitude;
    const longitude = data.longitude;

    // generate new object with two values, latitude and longitude
    const coordinates = {
      lat: latitude,
      lon: longitude
    };

    callback(null, coordinates);
  })
}

const fetchISSFlyOverTimes = function(coordinates, callback) {
  // generate url w/ correct latitude & longitude
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coordinates.lat}&lon=${coordinates.lon}`;

  request(url, (err, resp, body) => {

    // if error from the start, print error & return
    if (err) {
      callback(err, null);
      return;
    }

    // if status code is unsuccessful (not 200), print error & return
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // create object and collect "response" data
    const passes = JSON.parse(body).response;
    callback(null, passes);

  })
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null)
    }

    fetchCoordsByIP(ip, ((error, coordinates) => {
      if (error) {
        return callback(error, null)
      }

      fetchISSFlyOverTimes(coordinates, ((error, passes) => {
        if (error) {
          return callback(error, null)
        }
        callback(null, passes);
      }));
    }));
  });
};

// export functions
module.exports = { nextISSTimesForMyLocation };