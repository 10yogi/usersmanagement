const express = require("express");
var path = require('path');
var usermodel = require('../models/users');

const getUser = require('../controllers/getUser');
const addUser = require('../controllers/addUser');
const deleteUser = require('../controllers/deleteUser');
const updateUser = require('../controllers/updateUser');

var users = usermodel.users;

const router = express.Router();

router.get('/', (req,res)=>{
  res.render('index');
});
router.get('/getuser',(req,res)=>{
  res.render('getuser');
});
router.get('/adduser',(req,res)=>{
  res.render('adduser');
});
router.get('/updateuser',(req,res)=>{
  res.render('updateuser');
});
router.get('/deleteuser',(req,res)=>{
  res.render('deleteuser');
});

getUser(router,usermodel);
addUser(router,usermodel);
updateUser(router,usermodel);
deleteUser(router,usermodel);

router.get('/api/user', (req,res)=>{
  res.send(users);
});

module.exports = router;