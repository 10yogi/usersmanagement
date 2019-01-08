
module.exports = function(router,usermodel){
  var users = usermodel.users;
  router.delete('/api/user/:id',(req,res)=>{
    //look up course if not exist 404
    console.log(req);
    let user = users.find(c=> c.id == parseInt(req.params.id));
    if(!user) return res.status(404).send("user not found");
  
    const index = users.indexOf(user);
    users.splice(index,1);
    res.send(user);
  })
};
