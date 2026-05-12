//only used to upload the file in efficient way as it break the file in multiple parts and and send it in multiple request
import { Upload } from '@aws-sdk/lib-storage';

import fs from 'node:fs';
import { S3Client, S3 } from '@aws-sdk/client-s3';

const S3Client = new S3Client();

const fileReadStream = fs.createReadStream('./lecture.mp4');

const upload = new Upload({
    client: S3Client,
    params: {
        Bucket: 'devdrive-web',
        Key: 'videos/',
        Body: fileReadStream,
        ContentType: 'video/mp4',
    },
});

upload.on('httpUploadProgress', (progress) => {
    process.stdout.write((progress.loaded / progress.total)*100);
    
});

await upload.done();
