"use strict";function tokenNotFoundError(details) {
    return {
        name: "TokenNotFoundError",
        message: "token not found, invalid or expired, check and try again.",
        details,
    };
}
function emailnotFoundError(details) {
    return {
        name: "EmailnotFoundError",
        message: "email not found, check and try again.",
        details,
    };
}
function emailDuplicatedError(details) {
    return {
        name: "EmailDuplicatedError",
        message: "already have registered email.",
        details,
    };
}

function passwordNotMatchError(details) {
    return {
        name: "PasswordNotMatchError",
        message: "password does not match, check and try again.",
        details,
    };
}

module.exports = {
    tokenNotFoundError,
    emailnotFoundError,
    emailDuplicatedError,
    passwordNotMatchError
};
