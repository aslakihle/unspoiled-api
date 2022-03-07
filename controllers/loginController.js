const loginDb = require('../db/loginDb');
const utils = require('../utils/utilities');


exports.login = (req, res) => {
  loginDb.findByName(req.body.username, (err, data) => {
      console.log(req.body.username)
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with name ${req.body.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with name " + req.body.username
        });
      }
      return;
    }
    if (utils.comparePassword(req.body.password, data.password_hash)) {
      res.send({ feedback: 'You are logged in!', userId: data.user_id});
      console.log(JSON.stringify(data));
    }
    // console.log('Compare: ' + utils.comparePassword(req.body.password, data.password_hash));
  });
};

exports.register = (req, res) => {
  loginDb.findByName(req.body.username, (err, data) => { 
    console.log('1Error: ' + err)
    console.log('1Data: ' + (JSON.stringify(data)));
    console.log()
    if(req.body.username === data.username) {
      console.log('Feedback: An account with this username already exists.' )
      res.status(409).send({ feedback: 'An account with this username already exists.' })
    } else {
      loginDb.addNewUser(req.body.username, utils.hashPassword(req.body.password), (err, data) => {
        console.log('2Error: ' + err)
        console.log('ID: ' + (data.insertId));
        res.send({ feedback: 'Your account has been created!', userId: data.insertId})
        
      });
    }
    
  });

}