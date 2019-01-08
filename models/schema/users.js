const Joi = require("joi");

module.exports ={
  schema : {
    name : Joi.string().min(3).required(),
    age : Joi.number().required()
  },
  validateUser :  function (user){
    return Joi.validate(user,this.schema);
  }
} ;