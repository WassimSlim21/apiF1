const Pool = require('pg').Pool
request = require('request-json');
var seasons = request.createClient('http://ergast.com/api/f1/');
var data = {}; 




  exports.getSeasonsExterneAPI = (request, response) => {
    seasons.get('seasons.json', (error, results) => {
        if (error) {
          throw error
        }
        data = JSON.parse(results.body);
        seasonsExt = data.MRData.SeasonTable;
        

        // driversExt.forEach(driver => {
            
        
        // });
        response.status(200).json(seasonsExt)
      });
  
  }

