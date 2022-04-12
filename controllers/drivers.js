const Pool = require('pg').Pool
request = require('request-json');
var drivers = request.createClient('http://ergast.com/api/f1/');
var driversPG = [];

var driversExt = [];
var data = {}; 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'formula1',
  password: '123456',
  port: 5432,
})


exports.getDrivers = (request, response) => {
    pool.query('SELECT * FROM Drivers', (error, results) => {
      if (error) {
        throw error
      }
      driversPG = results.rows;
      console.log("DriverPG" ,driversPG );
      response.status(200).json(results.rows)
    })
  }



  exports.getDriversExterneAPI = (request, response) => {
    drivers.get('drivers.json', (error, results) => {
        if (error) {
          throw error
        }
        data = JSON.parse(results.body);
        driversExt = data.MRData.DriverTable.Drivers;
        driversExt.forEach(driver => {

            driver.dob = driver.dateOfBirth;
            driver.forename = driver.givenName;
            driver.surname = driver.familyName;
            delete driver.familyName;
            delete driver.givenName;
            delete driver.dateOfBirth; 

        });

        // driversExt.forEach(driver => {
            
        
        // });
        response.status(200).json(driversExt)
      });
  
  }

  exports.getDriversExterneAPI = (request, response) => {
    drivers.get('drivers.json', (error, results) => {
        if (error) {
          throw error
        }
        data = JSON.parse(results.body);
        driversExt = data.MRData.DriverTable.Drivers;
        driversExt.forEach(driver => {

            driver.dob = driver.dateOfBirth;
            driver.forename = driver.givenName;
            driver.surname = driver.familyName;
            delete driver.familyName;
            delete driver.givenName;
            delete driver.dateOfBirth; 

        });

        // driversExt.forEach(driver => {
            
        
        // });
        response.status(200).json(driversExt)
      });
  
  }