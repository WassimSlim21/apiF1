var express = require('express');
var router = express.Router();
const weatherAPICtrl =  require('../controllers/weatherAPI');
/* get All drivers from DataWareHouse 
http://localhost:3000/drivers/allDriversFromPG
*/
router.get('/all',weatherAPICtrl.getSchedulesExterneAPI);

module.exports = router;
