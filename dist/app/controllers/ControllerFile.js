"use strict"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }const Folder = require("../models/Folder");
const File = require("../models/File");
const User = require("../models/User");
const AwsBucketUpload = require("../libs/awsBucket");
const requestOperationError = require("../erros/requestOperationError");
const folderRequestError = require("../erros/folderRequestError");
const fileRequestError = require("../erros/fileRequestError");

class ControllerFile {

    async store(req, res) {

        try {
            const { id } = req.params;
            const file = req.file;

            if (!file) throw fileRequestError.fileNotFoundError();

            const folderExists = await Folder.findByPk(id);
            if (!folderExists) throw folderRequestError.registerNotFoundError();

            const dataFile = await AwsBucketUpload.uploadFile(file);

            const fileToSave = {
                ...dataFile,
                id_folder: id,
            }


            const fileCreated = await File.create(fileToSave);
            return res.status(201).send({ message: "Register created successfully.", data: fileCreated })

        } catch (error) {
            // console.log("error: ", error);
            if (error.name == "FileNotFoundError") {
                return res.status(400).send(fileRequestError.fileNotFoundError());
            }
            if (error.name == "RegisterNotFoundError") {
                return res.status(400).send(folderRequestError.registerNotFoundError());
            }
            return res.status(400).send(requestOperationError());
        }

    }


    async delete(req, res) {

        try {
            const { id } = req.params;

            const fileExists = await File.findByPk(id);
            if (!fileExists) throw fileRequestError.fileNotFoundError();

            await AwsBucketUpload.deleteFileCloud(_optionalChain([fileExists, 'optionalAccess', _ => _.name]));

            await File.destroy({ where: { id: id } });
            return res.status(200).send({ message: "Registro excluído com sucesso." })

        } catch (error) {
            if (error.name == "FileNotFoundError") {
                return res.status(400).send(fileRequestError.fileNotFoundError());
            }
            return res.status(400).send(requestOperationError());
        }
    }

    async list(req, res) {

        try {
            const { id } = req.params;

            const folderList = await File.findAll({ where: { id_folder: id } });

            return res.status(200).send(folderList)

        } catch (error) {
            // console.log("error: ", error);
            return res.status(400).send(requestOperationError());
        }

    }



}

module.exports = new ControllerFile();