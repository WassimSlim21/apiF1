const Pool = require('pg').Pool
request = require('request-json');
var constructors = request.createClient('http://ergast.com/api/f1/');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'formula1',
  password: '123456',
  port: 5432,
})


exports.getConstructors = (request, response) => {
    pool.query('SELECT * FROM constructors', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }



  exports.getConstructorsExterneAPI = (request, response) => {
    constructors.get('constructors.json', (error, results) => {
        if (error) {
          throw error
        }
        data = JSON.parse(results.body);
        response.status(200).json(data)
      });
  
  }

