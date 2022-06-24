var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

var userCtl = require("../controllers/user");
const user = require('../models/user');

/* GET get Account*/
router.get('/get/:id',auth, userCtl.getUser)

/* GET get all Accounts*/
router.get('/getAll', auth, userCtl.getAllUsers)
/* POST login account */
router.post('/login', userCtl.login );
  
/* POST create account */
router.post('/register',/*multer.array('files')*/ userCtl.signup);

router.post('/addMany', userCtl.addMultipleUser );

/* Deleteaccount */
router.delete('/:id'  , auth, userCtl.deleteUser);
  


module.exports = router;
