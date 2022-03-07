const bcrypt = require('bcrypt');


exports.hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
}


exports.comparePassword = (newPass, storedPass) => {
    return bcrypt.compareSync(newPass, storedPass);
}
