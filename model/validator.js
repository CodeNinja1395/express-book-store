const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().alphanum().required(),
  author: Joi.string().alphanum().required()

});

module.exports = Joi;
