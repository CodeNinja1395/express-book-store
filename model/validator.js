const Joi = require('joi');

const schemaRequired = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
  author: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
  isDeleted: Joi.boolean()

});
const schemaOptional = Joi.object().keys({
  name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/),
  author: Joi.string().regex(/^[a-zA-Z0-9\s]+$/),
  isDeleted: Joi.boolean()   

});

module.exports.validateReq = (obj, callback) => {

  Joi.validate(obj, schemaRequired, callback);

}

module.exports.validateOptional = (obj, callback ) => {

  Joi.validate(obj, schemaOptional, callback);

}
