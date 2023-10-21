const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Error: `, error);
    return;
  }
  console.log(ip);

  fetchCoordsByIP(ip, ((error, coordinates) => {
    console.log(coordinates);
  }));


});


