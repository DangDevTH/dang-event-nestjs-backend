"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('jwt', function () {
    var _a;
    return ({
        secret: process.env.JWT_SECRET,
        audience: process.env.JWT_TOKEN_AUDIENCE,
        issuer: process.env.JWT_TOKEN_ISSUER,
        accessTokenTtl: parseInt((_a = process.env.JWT_ACCESS_TOKEN_TTL) !== null && _a !== void 0 ? _a : '3600', 10),
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        cryptoPassword: process.env.CRYPTO_PASSWORD,
        cryptoVI: process.env.CRYPTO_IV
    });
});
