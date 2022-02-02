const { use } = require('chai');
let mongoose = require('mongoose');
let User = require('../models/user');

const createUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'create user successfully', user });
    }
  });
};

const getUsers = (req, res) => {
  let query = User.find({});
  query.exec((err, users) => {
    if (err) {
      res.send(err);
      res.send('kushal');
    } else {
      res.json({ users });
    }
  });
};

const updateUser = (req, res) => {
  User.findById({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    Object.assign(user, req.body).save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'user updated', user });
      }
    });
  });
};

const deleteUser = (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);
    res.json({ message: 'User deleted sucessfully', user });
  });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
