"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = exports.s3 = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const aws_sdk_1 = require("aws-sdk");
const REGION = 'ap-south-1';
const Bucket = process.env.AWS_S3_BUCKET;
exports.Bucket = Bucket;
const s3Client = new client_s3_1.S3Client({ region: REGION });
exports.s3Client = s3Client;
const s3 = new aws_sdk_1.S3({
    region: REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
exports.s3 = s3;
//# sourceMappingURL=aws.config.js.map