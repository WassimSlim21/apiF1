var express = require('express');
var router = express.Router();
const constructorsCtrl =  require('../controllers/constructors');
/* get All constructors from DataWareHouse 
http://localhost:3000/constructors/allConstructorsFromPG
*/
router.get('/allConstructorsFromPG',constructorsCtrl.getConstructors);
/* get All Constructors from postmanApi */
router.get('/allConstructorsExtern',constructorsCtrl.getConstructorsExterneAPI);

module.exports = router;
