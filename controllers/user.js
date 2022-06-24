const User = require("../models/user");
const jwt = require('jsonwebtoken');
const fs = require('fs');


//login function

exports.login = async (req, res,next) => {
  User.findOne({
    userName: req.body.userName
    }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(),'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
        });
          // return the information including token as JSON
        var   responseUser = {
            email: user.email,
            role: user.role,
            userName: user.userName,
            _id : user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            picture:user.picture

          } 
          User.findByIdAndUpdate({_id : responseUser._id}).then(u=>{
            u.etat = 1;
          })
          res.json({success: true, token: token ,user: responseUser});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}



/* Sign Up function */
exports.signup = async (req, res, next) => {
  // const url = req.protocol + '://' + req.get('host');
  // if (!req.files) {
  //   res.status(400).json({
  //     error: 'there is no file'
  //   });
  // }
  // req.files.map(fileTemp => {
  //   fileUrl= url + '/' + fileTemp.filename  })

    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please pass email and password.'}); //missing parameters
    } else {
      var newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        // picture:fileUrl

      });
      // save the user
     
      
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'email or username already exists'}); //If email exists already
        }
        res.json({success: true, msg: 'Successful created new user.'});  //creation successfull
      });
    }
    

}

//Get Account Function
exports.getUser = (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.send(user);
  }).catch(err => {
    console.log('ERROR', err)
    res.status(401).json({
      error: err
    });
  });
}

/*
//Update User Role
*/

exports.updateUserProfile = (req, res, next) => {
	user = new Object();
	console.log(req.body);

    if (req.body.firstname)
		{user.firstname = req.body.firstname;}
    if (req.body.lastname)
		{user.lastname = req.body.lastname;}
    if (req.body.phone)
		{user.phone = req.body.phone;}
	console.log("new Account is :", user);
	User.updateOne({ _id: req.params.id }, user).then(
		() => {
			res.status(201).json({
				message: 'Account role updated !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}


  

  
exports.addMultipleUser = (req, res, next) => {
    User.insertMany(req.body.users).then(function(){
        return res.status(201).json({ success: true, msg: 'Successful created multiple User'});  //creation successfull
    }).catch(function(error){
        console.log(error)      // Failure
    });
  }

  exports.getAllUsers = (req, res, next) => {+-
	User.find().then(users => {
		res.send(users);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
  };


  
  exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id }).then(
      () => {
        res.status(201).json({
          message: 'User Deleted !'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

