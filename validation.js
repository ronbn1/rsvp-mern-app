//VALIDATION
const Joi = require("@hapi/joi");

//Register validation
const registerValidtion = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

const lognValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};
const guestValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(1)
      .required(),
    phone: Joi.string()
      .min(9)
      .required(),
    dietary: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports.registerValidtion = registerValidtion;
module.exports.lognValidation = lognValidation;
module.exports.guestValidation = guestValidation;
