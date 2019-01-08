const Joi = require("joi");
const express = require("express");
var path = require('path');
var users = require('models/users');
const schema = require('models/schema/users');
const app = express();

const port = process.env.port || 8086;

app.use(express.json());

const router = express.Router();

router.get('/', (req,res)=>{
  //res.send("welcome");
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

router.post('/api/user', (req,res)=>{
  res.contentType = "text";
  console.log(req);
  console.log(req.body);
  const result = validateUser(req.body); 

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

function validateUser(user){
  return Joi.validate(user,schema);
}


router.put('/api/user/:id',(req,res)=>{
  //look up for user if not exits 404 
  let user = users.find(c=> c.id == parseInt(req.params.id));
  if(!user)return res.status(404).send("user not found");

  //validate user if error 400 bad request
  const result = validateUser(req.body);
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

app.use('/',router);


app.listen(port,()=>{
  console.log(`listening on port ${port}`);
});
