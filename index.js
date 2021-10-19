const result = [1234,2345,1212];

// Load AWS SDK

const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAYUR6MSAGCOBFWUNN',
    secretAccessKey: '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'
});

// Create SQS service

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const accountId = '593910075404';

const queueName = 'set-result';

//setup the send message parameter

const QueueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`;

const params = {
    MessageBody: JSON.stringify({
        site: 1,
        result: result,
        date: (new Date()).toISOString()
    }),

    QueueUrl: QueueUrl
};

sqs.sendMessage(params, (err, data) => {
    if(err) {
        console.log("Error", err.stack);
    }else {
        console.log("Successfully added result to queue", data);
    }
});

