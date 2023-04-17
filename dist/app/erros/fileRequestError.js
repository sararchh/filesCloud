"use strict";function fileNotFoundError(details) {
    return {
        name: "FileNotFoundError",
        message: "file not found on request, check and try again.",
        details,
    };
}



module.exports = {
    fileNotFoundError,
};
