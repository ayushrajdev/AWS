import {
    CreateBucketCommand,
    DeleteBucket$,
    DeleteBucketCommand,
    DeleteObjectCommand,
    DeletePublicAccessBlockCommand,
    GetObjectCommand,
    GetPublicAccessBlockCommand,
    HeadObjectCommand,
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    PutPublicAccessBlockCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import fs from "fs/promises"

//if credentials are passed to the aws cli on terminal then its noot needed to write creds as it will read from the .aws/credentials file
// region -> config file
// creds -> credentials file
const s3Client = new S3Client({
    // region:"ap-south-1",
    // credentials:{
    //     accessKeyId:"",
    //     secretAccessKey:""
    // }
    profile: 'devdrive',
});

//return the command object
let command = new ListBucketsCommand();
//send method  send the http request to the http server
let response = await s3Client.send(command);
// console.log(response.Buckets)

command = new CreateBucketCommand({
    Bucket:"dev-drive-web",
})

command = new GetPublicAccessBlockCommand({
    Bucket:"devdrive-web"
})

command = new DeletePublicAccessBlockCommand({
    Bucket:"devdrive-web"
})

command = new PutPublicAccessBlockCommand({
    Bucket:"devdrive-web",
    PublicAccessBlockConfiguration:{
        BlockPublicAcls:true,
        BlockPublicPolicy:true,
        IgnorePublicAcls:true,
        RestrictPublicBuckets:true
    }
})

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3:::procodrr-nodejs-bucket/*",
    },
  ],
};

 command = new PutBucketPolicyCommand({
  Bucket: "procodrr-nodejs-bucket",
  Policy: JSON.stringify(policy,),
});

command = new DeleteBucketCommand({
    Bucket:"devdrive-web"
})

command = new ListObjectsV2Command({
    Bucket:"devdrive-web",
    Prefix:"img/"
})

let Bucket = 'devdrive-web';

 //help to get the metadata about the object
command = new HeadObjectCommand({
    Bucket,
    key:"img/hello.txt"
});



//download the object 
command = new GetObjectCommand({
    Bucket,
    Key: 'hello.png',
});

// response = await s3Client.send(command);

//req.body-> readable stream
// response.Body.on('data', (chunk) => {
//     console.log(chunk);
// });
// const fileData = await response.Body.transformToString()

// const writeStream = createWriteStream('img.png');
// response.Body.pipe(writeStream);

// await pipeline(response.Body,process.stdout)



// fileBuffer = await fs.readFile("./app.js")
// fileReadStream = await fs.createReadStream("./app.js")


//upload the file
command = new PutObjectCommand({
    Bucket,
    Key:"app.js",
    Body:fileReadStream,
    ContentType:"text/javascript"
})

command = new DeleteObjectCommand({
    Bucket,
    Key:"hello.txt"
})

//delete a folder
command = new DeleteObjectCommand({
    Bucket,
    Key:"video/"
})

response = await s3Client.send(command);
console.log(response);
