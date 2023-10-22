const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  // loop through passTimes array
  for (const pass of passTimes) {
    // collect Date information and assign to const for simplicity
    const datetime = new Date(0);
    // convert date/time into universal time
    datetime.setUTCSeconds(pass.risetime);
    // collect pass duration from object and assign to const for simplicity
    const duration = pass.duration;
    // print corresponding information
    console.log(`The next pass of the ISS is at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, passTimes) => {
  // return error if error exists
  if (err) {
    return console.log('Error: It did not work', err);
  }

  // print a message & call printPassTimes function if no error
  console.log('\nBased on your IP, this is when you can expect to see the ISS: \n');

  printPassTimes(passTimes);
});