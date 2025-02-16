import { registerAs } from "@nestjs/config";

export default registerAs('appConfig', () => ({
    port: parseInt(process.env.PORT) || 3000,
    awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    awsRegion: process.env.AWS_REGION,
    awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}));

