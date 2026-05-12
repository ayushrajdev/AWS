import { getSignedS3Url } from "./app.js";

//generaate the signed url for viewing the private object from the s3 server
let signedurl = getSignedS3Url({
    bucketName:"devdrive-web",
    objectKey:"hello.txt"
})

//generate the signed url using for uploading the file on the s3 server 
signedurl = getSignedS3Url({
    bucketName:"devdrive-web",
    objectKey:"lecture.mp4",
    method:"PUT"
})

//! we can sign the object of s3 resource including the content-type which will verify the content type while uploading the file and if it is not a correct content type then it will not not generate the signed url nor it will upload the file on the aws server 

signedurl = getSignedS3Url({
    bucketName:"devdrive-web",
    objectKey:"lecture.mp4",
    method:"PUT",
    contentType:"image/webp"
})