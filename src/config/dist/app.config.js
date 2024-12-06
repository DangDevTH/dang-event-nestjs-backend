"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('appConfig', function () { return ({
    port: parseInt(process.env.PORT) || 3000,
    awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    awsRegion: process.env.AWS_REGION,
    awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}); });
