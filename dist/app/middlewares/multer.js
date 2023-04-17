"use strict";const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', '..', 'upload'),
        filename: (req, file, cb) => {
            // callback(null, file.originalname);
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);

                return cb(null, res.toString('hex') + extname(file.originalname));
            })
        },
    }),
}