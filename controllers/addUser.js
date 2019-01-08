
module.exports = function(router,usermodel){
  var users = usermodel.users;
  router.post('/api/user', (req,res)=>{
    res.contentType = "text";
    console.log(req);
    console.log(req.body);
    const result = usermodel.validateUser(req.body); 
  
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
};
