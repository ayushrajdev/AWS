import {
    CloudFrontClient,
    CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront';

const cloudFrontClient = new CloudFrontClient({ profile: 'devdrive' });

const command = new CreateInvalidationCommand({
    DistributionId: 'E2KCD7046K668',
    InvalidationBatch: {
        CallerReference: '1234', //unique id so that it does not create the invalidation for the same resource
        Paths: {
            Quantity: 1,
            Items: ['images/logo.png'],
        },
    },
});
const res = await cloudFrontClient.send(command);
console.log(res);
