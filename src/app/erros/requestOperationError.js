function requestOperationError(details) {
    return {
        name: "RequestOperationError",
        message: "error on request, check and try again",
        details,
    };
}

module.exports = requestOperationError;
