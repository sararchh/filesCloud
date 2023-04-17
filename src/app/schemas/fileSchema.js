const Yup = require("yup");

const fileSchema = Yup.object().shape({
    id_folder: Yup.string().required('Pasta é obrigatório'),
});

module.exports = {
    fileSchema,
};