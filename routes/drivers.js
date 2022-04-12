var express = require('express');
var router = express.Router();
const driverCtrl =  require('../controllers/drivers');
/* get All drivers from DataWareHouse 
http://localhost:3000/drivers/allDriversFromPG
*/
router.get('/allDriversFromPG',driverCtrl.getDrivers);
/* get All drivers from postmanApi */
router.get('/allDriversExtern',driverCtrl.getDriversExterneAPI);

module.exports = router;
