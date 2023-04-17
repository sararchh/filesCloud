"use strict";const invalidDataError = require("../erros/invalidDataError");

function validateBody(schema) {
    return async (req, res, next) => {
        let ErrosSchema = [];

        await schema.validate(req.body, {
            abortEarly: false,
        }).catch(({ errors }) => {
            ErrosSchema = errors;
        });

        if (!ErrosSchema.length) {
            next();
        } else {
            res.status(422).send(invalidDataError(ErrosSchema.map((item) => item)));
        }
    }
}

module.exports = validateBody;


