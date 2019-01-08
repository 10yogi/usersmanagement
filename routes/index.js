const express = require("express");
var path = require('path');
var users = require('../models/users.js').users;
const userschema = require('../models/schema/users.js');

const router = express.Router();

router.get('/', (req,res)=>{
  res.render('index');
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

router.post('/api/user', (req,res)=>{
  res.contentType = "text";
  console.log(req);
  console.log(req.body);
  const result = userschema.validateUser(req.body); 

  //400 Bad Request
  if(result.error) return res.status(400).send(result.error.details[0].message);
 
  user = {
    id : users[users.length-1].id + 1,
    name : req.body.name,
    age : parseInt(req.body.age)
  };
  users.push(user);
  res.send("useradded "+ JSON.stringify(user));
});

router.get('/api/user', (req,res)=>{
  res.send(users);
});

router.get('/api/user/:id', (req,res)=>{
  const user = users.find(c=> c.id == req.params.id);
  if(!user)return res.status(404).send("user not found");
  res.send(user);
});



router.put('/api/user/:id',(req,res)=>{
  //look up for user if not exits 404 
  let user = users.find(c=> c.id == parseInt(req.params.id));
  if(!user)return res.status(404).send("user not found");

  //validate user if error 400 bad request
  const result = userschema.validateUser(req.body);
  if(result.error)return res.status(400).send(result.error.details[0].message); 

  user.name = req.body.name;
  res.send(`user updated `+JSON.stringify(user));

});

router.delete('/api/user/:id',(req,res)=>{
  //look up course if not exist 404
  console.log(req);
  let user = users.find(c=> c.id == parseInt(req.params.id));
  if(!user) return res.status(404).send("user not found");

  const index = users.indexOf(user);
  users.splice(index,1);
  res.send(user);
});

module.exports = router;