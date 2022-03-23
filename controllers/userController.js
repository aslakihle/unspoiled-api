const loginDb = require('../db/userDb');
const utils = require('../utils/utilities');
// const { jwtAuth } = require('../middleware/jwtAuth');

var jwt = require('jsonwebtoken');


exports.login = (req, res) => {
  // console.log('login controller')
  loginDb.findByName(req.body.username, (err, data) => {
      // console.log(req.body.username)
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false, feedback: `Not found user with name ${req.body.username}.`
        });
      } else {
        return res.status(500).json({
          success: false, feedback: "Error retrieving user with name " + req.body.username
        });
      }
      // return;
    }
    if (utils.comparePassword(req.body.password, data.password_hash)) {
      // console.log(typeof data);
      let user = data;
      delete user.password_hash
      
      const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET_KEY, { expiresIn: "1h"});
        // console.log(token);
      // res.status(200).cookie("jwt", token, {
      //   httpOnly: true,
      // }).send({ 
      //   success: true, feedback: 'You are logged in!', userId: data.user_id
      // });
      return res
        // .cookie("token", token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        //   maxAge: 3600000,
        // })
        .status(200)
        .json({ token: token, feedback: "Logged in successfully!" });
    } else {
      return res.status(403).json({ 
        success: false, feedback: 'The username or password provided is wrong.'
      });
    }
    // console.log('Compare: ' + utils.comparePassword(req.body.password, data.password_hash));
  });
};

exports.register = (req, res) => {
  loginDb.findByName(req.body.username, (err, data) => { 
    // console.log('1Error: ' + err)
    // console.log('1Data: ' + (JSON.stringify(data)));
    
    if(data && req.body.username === data.username) {
      // console.log('Feedback: An account with this username already exists.' )
      res.status(409).send({ 
        success: false, feedback: 'An account with this username already exists.' 
      });
    } else {
      loginDb.addNewUser(req.body.username, utils.hashPassword(req.body.password), (err, data) => {
        // console.log('2Error: ' + err)
        // console.log('ID: ' + (data.insertId));
        res.send({ 
          success: true, feedback: 'Your account has been created!', userId: data.insertId
        });
      });
    }
  });
}

exports.user = (req, res) => {
  // console.log(req.body.jwt);
  // //Add return of cookie to front-end
  // return res.status(200).send({ 
  //         success: true, feedback: 'auth response'
  //       });
  // console.log(req.header.cookie);
  loginDb.getUserData('1', (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          success: false,
          feedback: `Not found user with name ${req.body.username}.`,
        });
      } else {
        return res.status(500).json({
          success: false,
          feedback: "Error retrieving user with name " + req.body.username,
        });
      }
      // return;
    }
    else if (data) {
      return res.status(200).json({
        success: true,
        user: data,
      });
    }
    
  });
}

exports.logout = (_req, res) => {
  res.json({ status: 'OK' })
}
