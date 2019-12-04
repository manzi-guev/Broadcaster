/* eslint-disable consistent-return */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Joi from '@hapi/joi';

const signUp = (req, res, next) => {
  const schema = {
    firstname: Joi.string()
      .strict()
      .trim()
      .required(),
    lastname: Joi.string()
      .strict()
      .trim()
      .required(),
    email: Joi.string()
      .strict()
      .trim()
      .required()
      .email(),
    phonenumber: Joi.string()
      .strict()
      .required()
      .trim(),
    username: Joi.string()
      .strict()
      .required()
      .trim(),
    password: Joi.string()
      .strict()
      .required()
      .trim()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  req.user = schema;
  next();
};
const signIn = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .trim()
      .required()
      .email(),
    password: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const createRedflag = (req, res, next) => {
  const schema = {
    title: Joi.string()
      .strict()
      .trim()
      .required(),
    comment: Joi.string()
      .strict()
      .required()
      .trim(),
    location: Joi.string().required(),
    images: Joi.string()
      .strict()
      .trim()
      .required(),
    videos: Joi.string()
      .strict()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const editcomment = (req, res, next) => {
  const schema = {
    comment: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
const editlocation = (req, res, next) => {
  const schema = {
    location: Joi.string()
      .trim()
      .required()
  };
  const output = Joi.validate(req.body, schema);
  if (output.error != null) {
    return res.status(400).json({
      status: 400,
      error: `${output.error.details[0].message}`
    });
  }
  next();
};
export { signIn, signUp, createRedflag, editcomment, editlocation };
