const Yup = require("yup");

const folderSchema = Yup.object().shape({
    id_user: Yup.string().required('Usuário é obrigatório'),
    title: Yup.string().required('Nome da pasta é obrigatório'),
});

const folderSchemaUpdate = Yup.object().shape({
    title: Yup.string().required('Nome da pasta está vazio'),
});

module.exports = {
    folderSchema,
    folderSchemaUpdate
};