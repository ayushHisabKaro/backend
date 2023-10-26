import { S3Client } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
declare const Bucket: string;
declare const s3Client: S3Client;
declare const s3: S3;
export { s3Client, s3, Bucket };
