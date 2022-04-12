var express = require('express');
var router = express.Router();
const seasonsCtrl =  require('../controllers/seasons');
/* get All seasons from api  
http://localhost:3000/seasons/allSeasonsExtern
*/
router.get('/allSeasonsExtern',seasonsCtrl.getSeasonsExterneAPI);

module.exports = router;
