const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const requestOperationError = require("../erros/requestOperationError");
const authRequestError = require("../erros/authRequestError");

class ControllerAuth {

    async signIn(req, res) {

        try {
            const userExists = await User.findOne({ where: { email: req.body.email } });;
            if (!userExists) throw authRequestError.emailnotFoundError();


            const isPasswordValid = await bcrypt.compare(req.body.password, userExists.password_hash);
            if (!isPasswordValid) throw authRequestError.passwordNotMatchError();

            const token = jwt.sign({ userId: userExists?.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

            userExists.password_hash = undefined;
            return res.status(200).send({ user: userExists, token: token })

        } catch (error) {
            if (error.name == "EmailnotFoundError") {
                return res.status(400).send(authRequestError.emailnotFoundError());
            }
            if (error.name == "PasswordNotMatchError") {
                return res.status(400).send(authRequestError.passwordNotMatchError());
            }
            return res.status(400).send(requestOperationError());
        }

    }

    async signUp(req, res) {

        try {

            const userExists = await User.findOne({ where: { email: req.body.email } });;
            if (userExists) throw authRequestError.emailDuplicatedError();

            const userCreated = await User.create(req.body);

            const token = jwt.sign({ userId: userCreated?.id }, authConfig.secret, { expiresIn: authConfig.expiresIn });

            userCreated.password_hash = undefined;
            userCreated.password = undefined;

            return res.status(201).send({ user: userCreated, token: token })
        } catch (error) {
            // console.log("error: ", error);
            return res.status(400).send(requestOperationError());
        }

    }

}

module.exports = new ControllerAuth();