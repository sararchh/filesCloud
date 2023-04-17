const awsBucket = require('../../config/awsBucket');
const fs = require('fs');
const path = require('path');
const { formatBytes } = require('../utils/filesUtils');
// const sharp = require('sharp');


class AwsBucketUpload {


    async uploadFile(file) {
        let { filename, originalname, mimetype, destination } = file;
        let pathfile = file.path

        // let fileName = `${prefixname}.${filename.split('.')[1]}`;
        let pathdestination = path.resolve(destination, filename);

        let fileContent = fs.readFileSync(`${pathdestination}`);

        try {

            const params = {
                Bucket: `${process.env.NAME_BUCKET}`,
                Key: filename, // File name you want to save as in S3
                Body: fileContent,
                ContentType: mimetype,
                ACL: 'public-read'
            };

            const dataupload = await awsBucket.upload(params, function (err, data) {
                if (err) {
                    throw err;
                    // throw new Error('Upload Failure');
                }
                // console.log(`File uploaded successfully. ${data.Location}`);
            }).promise();

            let datatosave = {
                original_name: originalname,
                name: filename,
                size: formatBytes(file.size),
                url: dataupload.Location,
                type: filename.split('.')[1]
            }


            fs.unlinkSync(pathdestination);

            return datatosave;
        } catch (error) {
            // console.log("error upload ", error);

            fs.unlinkSync(pathdestination);

            return false;

        }

    }



    async deleteFileCloud(filename) {

        try {
            let params = { Bucket: `${process.env.NAME_BUCKET}`, Key: filename };

            await awsBucket.deleteObject(params, function (err, data) {
                if (err) {
                    // console.log(err, err.stack);  // error
                    return false;
                }
            });
            return true;

        } catch (error) {
            // console.log("Erro ao excluir imagem", error);  // error
            return false;

        }

    }


    async deleteMultiplesFileCloud(arrayToDelete) {

        try {

            let params = {
                Bucket: `${process.env.NAME_BUCKET}`,
                Delete: {
                    Objects: arrayToDelete, // [ {Key: 'foo.jpg'}]
                    Quiet: false
                }
            };

            await awsBucket.deleteObjects(params, function (err, data) {
                if (err) {
                    // console.log("err: ", err.stack);
                    return false;
                }
            });

            return true;

        } catch (error) {
            // console.log("error: ", error);
            return false;

        }

    }

}


module.exports = new AwsBucketUpload();