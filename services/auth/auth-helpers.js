const bcrypt = require('bcryptjs');
const User = require('../../models/user');


function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}


function loginRedirect(req, res, next) {
  if (req.user) res.redirect('/');

  return next();
}

function createNewUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return User.create({
    username: req.body.username,
    password: hash,
    email:req.body.email,
    main: req.body.main,
    learning: req.body.learning,
    skype: req.body.skype,
    whatsapp: req.body.whatsapp
  });
}

function loginRequired(req, res, next) {
  if (!req.user) res.redirect('/auth/login');

  return next();
}

module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createNewUser
}
