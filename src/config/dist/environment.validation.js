"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports["default"] = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'test', 'production', 'staging')["default"]('development'),
    PORT: Joi.number().port()["default"](3000),
    DATABASE_PORT: Joi.number().port()["default"](5432),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_AUTOLOAD: Joi.boolean().required(),
    DATABASE_SYNC: Joi.boolean().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_TOKEN_AUDIENCE: Joi.string().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
    JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
    CRYPTO_PASSWORD: Joi.string().required(),
    CRYPTO_IV: Joi.string().required(),
    AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    AWS_CLOUDFRONT_URL: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required()
});
