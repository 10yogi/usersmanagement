
module.exports = function(router,usermodel){
  var users = usermodel.users;
  router.put('/api/user/:id',(req,res)=>{
    //look up for user if not exits 404 
    let user = users.find(c=> c.id == parseInt(req.params.id));
    if(!user)return res.status(404).send("user not found");
  
    //validate user if error 400 bad request
    const result = usermodel.validateUser(req.body);
    if(result.error)return res.status(400).send(result.error.details[0].message); 
  
    user.name = req.body.name;
    user.age = req.body.age;
    res.send(`user updated `+JSON.stringify(user));
  })  
};
