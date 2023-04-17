"use strict";const Yup = require("yup");

const userSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email("Dever ser e-mail valido").required('E-mail é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    password: Yup.string().required('Senha é obrigatório'),
    oldpassword: Yup.string(),
});

module.exports = userSchema;