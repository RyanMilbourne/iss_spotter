const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Error: `, error);
    return;
  }
  console.log(ip);

  fetchCoordsByIP(ip, ((error, coordinates) => {
    if (error) {
      console.log(`Error: `, error);
      return;
    }
    console.log(coordinates);

    fetchISSFlyOverTimes(coordinates, ((error, passes) => {
      if (error) {
        console.log(`Error: `, error);
        return;
      }
      console.log(passes)
    }))

  }));

});