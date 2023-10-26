import { S3Client } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
// Set the AWS Region.
const REGION = 'ap-south-1'; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const Bucket = process.env.AWS_S3_BUCKET;
const s3Client = new S3Client({ region: REGION });
const s3 = new S3({
  region: REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
export { s3Client, s3, Bucket };
