var schedulesRequest = request.createClient("https://raw.githubusercontent.com/theOehrly/f1schedule/master/")
request = require('request-json');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'formula1',
    password: '123456',
    port: 5432,
  })
 function getRaces(request, response) {
   
  }


exports.getSchedulesExterneAPI = (request, response) => {
// getRaces(request, response);
    // schedulesRequest.get('schedule_2020.json', (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   data = JSON.parse(results.body)
    //   console.log(data.location);
    //   response.status(200).json(JSON.parse(results.body).country)

    //   }); 
    var races = [];
    var data = [];
     pool.query(`SELECT * FROM "races" JOIN "circuits" ON "races"."circuitId" = "circuits"."circuitId"`
     , (error, results) => {
       if (error) {
         throw error
       }
       races = results.rows;
       console.log(races);
       races.forEach(race => {
         if(race)
        data.push({"Year" :race.date.substring(6,10), "Location": race.location});
       });
         
        //  try{
        //    schedulesRequest.get("schedule_"+ year +".json", (error, results) => {
        //      if (error) {
        //        throw error
        //      }
        //       if (results) {
        //         data = JSON.parse(results.body);
        //      schedules.push({year : data.location})
        //      }
            
        //    }); 
   
        //  }
        //  catch {
        //    error: console.log("error");
        //  }
       
       response.status(200).json(data)
     })
      };
  
  