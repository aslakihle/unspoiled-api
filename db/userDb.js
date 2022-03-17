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
      // console.log(res[0].user_id)
      sql.query(
        `SELECT u.user_id, u.username, u.password_hash, r.role_id, r.name
        FROM users as u
        INNER JOIN user_roles as ur ON u.user_id=ur.user_id
        INNER JOIN roles as r ON ur.role_id=r.role_id
        WHERE u.user_id = ${res[0].user_id};`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          if (res.length) {
            // console.log(res[0]);
            result(null, res[0]);
          } else {
            result("No sql err state but empty response", null);
          }
          
        });
      // result(null, res[0]);
      return;
    } else {

      result('No user with this name', null);
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