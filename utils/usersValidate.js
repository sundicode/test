import Joi from "joi";
export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().lowercase().email(),
  password: Joi.string().min(8).required(),
  matricule: Joi.string().uppercase(),
  department: Joi.string().uppercase(),
  image: Joi.string(),
});

export const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  matricule: Joi.string().uppercase(),
});

export const adminSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().lowercase().email(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().lowercase(),
});
export const adminSigninSchema = Joi.object({
  email: Joi.string().lowercase().email(),
  password: Joi.string().min(8).required(),
});


