const { fn, col } = require('sequelize');
const Folder = require("../models/Folder");
const File = require("../models/File");
const User = require("../models/User");
const AwsBucketUpload = require("../libs/awsBucket");
const requestOperationError = require("../erros/requestOperationError");
const folderRequestError = require("../erros/folderRequestError");

class ControllerFolder {

    async store(req, res) {

        try {
            const folderExists = await Folder.findOne({ where: { title: req.body.title } });
            if (folderExists) throw folderRequestError.folderDuplicatedError();

            const folderCreated = await Folder.create({ ...req.body, date: new Date() });
            return res.status(201).send(folderCreated)

        } catch (error) {
            if (error.name == "FolderDuplicatedError") {
                return res.status(400).send(folderRequestError.folderDuplicatedError());
            }
            return res.status(400).send(requestOperationError());
        }

    }


    async update(req, res) {

        try {
            const { id } = req.params

            const folderExists = await Folder.findByPk(id);
            if (!folderExists) throw folderRequestError.registerNotFoundError();

            const folderUpdated = await folderExists.update(req.body);
            return res.status(200).send(folderUpdated)

        } catch (error) {
            if (error.name == "RegisterNotFoundError") {
                return res.status(400).send(folderRequestError.registerNotFoundError());
            }
            return res.status(400).send(requestOperationError());
        }

    }

    async delete(req, res) {

        try {
            const { id } = req.params

            const folderExists = await Folder.findByPk(id);
            if (!folderExists) throw folderRequestError.registerNotFoundError();

            const listFiles = await File.findAll({ where: { id_folder: id } });

            const filesToDelete = listFiles.map((item) => { return { Key: item?.name } })

            await AwsBucketUpload.deleteMultiplesFileCloud(filesToDelete);

            await Folder.destroy({ where: { id: id } });
            return res.status(200).send({ message: "Registro excluído com sucesso." })

        } catch (error) {
            if (error.name == "RegisterNotFoundError") {
                return res.status(400).send(folderRequestError.registerNotFoundError());
            }
            return res.status(400).send(requestOperationError());
        }

    }

    async list(req, res) {

        try {
            const userId = req.userId;

            const folderList = await Folder.findAll({
                attributes: [
                    "id", "id_user", "title",
                    [fn("date_format", col("date"), "%d-%m-%Y %H:%m:%s"), "date"],
                    [fn("COUNT", col("files.id")), "files_count"]
                ],
                include: [
                    {
                        model: User,
                        as: 'user',
                        where: { id: userId },
                        attributes: ['id', 'name']
                    },
                    {
                        model: File,
                        as: "files",
                        attributes: []
                    }
                ],
                group: ['id'],
                order: [
                    ["title", "asc"]
                ],
            });


            return res.status(200).send(folderList)

        } catch (error) {
            console.log("error: ", error);
            return res.status(400).send(requestOperationError());
        }

    }



}

module.exports = new ControllerFolder();