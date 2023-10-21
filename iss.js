const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    if (!data.ip) {
      callback('Error, no IP address', null);
    } else {
      callback(null, data.ip);
    }

  });
};
module.exports = { fetchMyIP };