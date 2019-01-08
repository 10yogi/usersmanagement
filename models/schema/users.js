module.exports = {
  name : Joi.string().min(3).required(),
  age : Joi.number().required()
};