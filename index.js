const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log(`Error: `, error);
    return;
  }
  console.log(ip);
});