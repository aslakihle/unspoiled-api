const { redirect, json } = require("express/lib/response");
const sql = require("./connect");

// const User = function(user) {
//   this.username = user.username;
//   this.password = user.password;
// };

exports.findByName = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = "${username}"`, (err, res) => {
    // if (error) throw error;
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      // console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    } else {

      result('No user with this name', false);
    }
  });
};

exports.addNewUser = (username, password, result) => {
  sql.query(`INSERT INTO users (username, password_hash) VALUES ("${username}", "${password}");`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } 
    if (res) {
      result(null, res);
      return;
    } 
  });
};



// module.exports = User;