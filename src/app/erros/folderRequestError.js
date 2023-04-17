
function folderDuplicatedError(details) {
    return {
        name: "FolderDuplicatedError",
        message: "already have registered folder with this name.",
        details,
    };
}

function registerNotFoundError(details) {
    return {
        name: "RegisterNotFoundError",
        message: "register folder not found, check and try again.",
        details,
    };
}



module.exports = {
    folderDuplicatedError,
    registerNotFoundError,
};
