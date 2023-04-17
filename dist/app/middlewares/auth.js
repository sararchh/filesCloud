"use strict";const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const authRequestError = require('../erros/authRequestError');


module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(authRequestError.tokenNotFoundError());
    }

    const [, token] = authHeader.split(' '); // receber do header de forma desestruturada para pegar somente o token pois a posicao [0] é o bearer

    try {

        const decoded = await promisify(jwt.verify)(token, authConfig.secret); // Transformar uma função de callback modelo antigo para utilizar async await
        // Valida se o token é valido e procede com a aplicação

        req.userId = decoded.userId;


    } catch (err) {
        return res.status(401).json(authRequestError.tokenNotFoundError());
    }

    return next();

}