
module.exports = function(router,usermodel){
  var users = usermodel.users;
  router.get('/api/user/:id', (req,res)=>{
  const user = users.find(c=> c.id == req.params.id);
  if(!user)return res.status(404).send("user not found");
    res.send(user);
  })
}