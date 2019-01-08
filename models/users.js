const Joi = require("joi");
module.exports ={
  users:[
    {
      id : 1,
      name : "Raghav",
      age : 28
    },
    {
      id : 2,
      name : "Yogesh",
      age : 20
    }
  ],
  schema : {
    name : Joi.string().min(3).required(),
    age : Joi.number().required()
  },
  validateUser :  function (user){
    return Joi.validate(user,this.schema);
  }
};