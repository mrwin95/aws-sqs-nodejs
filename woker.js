const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    
});

const accountId = '593910075404';
const queueName = 'set-result';

const QueueUrl = `https://sqs.us-east-1.amazonaws.com/${accountId}/${queueName}`;

const sqs = new AWS.SQS({
    apiVersion: '2012-11-05'
});

const params = {
    QueueUrl: QueueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
};

sqs.receiveMessage(params, (err, data) => {
    if(err) { console.log('Error', err);}
    if(data.Messages.length <= 0){
        console.log('Nothing to process');
        return;
    }
    const resultData = JSON.stringify(data.Messages[0].Body);
    console.log('result received: ', resultData);
});