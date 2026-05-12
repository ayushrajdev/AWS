import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({ profile: 'devdrive' });

const getCommand = new GetObjectCommand({
    Bucket: 'devdrive-web',
    Key: 'hello.txt',
});

const getPreSignedUrl = await getSignedUrl(s3Client, getCommand, {
    expiresIn: 3600,
});

const putCommand = new PutObjectCommand({
    Bucket: 'devdrive-web',
    Key: 'app.js',
    ContentType: 'text/javascript', //restrict the content that can be uploaded i.e js file
});

const putPreSignedUrl = getSignedUrl(s3Client, putCommand, {
    expiresIn: 3600,
    signableHeaders: new Set(['content-type']),
});
