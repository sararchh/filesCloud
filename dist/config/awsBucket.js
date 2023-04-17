"use strict";const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const awsBucket = new AWS.S3({
    accessKeyId: `${process.env.ID_BUCKET}`,
    secretAccessKey: `${process.env.SECRET_BUCKET}`,
    // ACL:'public-read-write'
});

module.exports = awsBucket;