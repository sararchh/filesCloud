const { Router } = require("express");
const multer = require('multer');
const multerConfig = require('../app/middlewares/multer');

const ControllerAuth = require("../app/controllers/ControllerAuth");
const ControllerFolder = require("../app/controllers/ControllerFolder");
const ControllerFile = require("../app/controllers/ControllerFile");

const userSchema = require("../app/schemas/userSchema");
const { folderSchema, folderSchemaUpdate } = require("../app/schemas/folderSchema");

const authMiddleware = require("../app/middlewares/auth");
const validationSchemaMiddleware = require("../app/middlewares/validationSchema");


const uploadFile = multer(multerConfig);

const routes = Router();

routes
    .get("/api", (_req, res) => res.send("Server is running 🚀"));

// Autenticacao
routes
    .post("/api/sign-in", ControllerAuth.signIn)
    .post("/api/sign-up", validationSchemaMiddleware(userSchema), ControllerAuth.signUp)

// Pastas
routes
    .get("/api/folders", authMiddleware, ControllerFolder.list)
    .post("/api/folders", [authMiddleware, validationSchemaMiddleware(folderSchema)], ControllerFolder.store)
    .put("/api/folders/:id", [authMiddleware, validationSchemaMiddleware(folderSchemaUpdate)], ControllerFolder.update)
    .delete("/api/folders/:id", authMiddleware, ControllerFolder.delete)

// Arquivos
routes
    .get("/api/files/:id", authMiddleware, ControllerFile.list)
    .post("/api/files/:id", [authMiddleware, uploadFile.single('file')], ControllerFile.store)
    .delete("/api/files/:id", authMiddleware, ControllerFile.delete)

//TRATAMENTO PARA ROTAS INVALIDAS
routes
    .get('*', (req, res, next) => { return res.status(404).json({ message: `Não existe rota para a requisição solicitada ${req.url}, verifique.` }) })
    .post('*', (req, res, next) => { return res.status(404).json({ message: `Não existe rota para a requisição solicitada ${req.url}, verifique.` }) });


module.exports = routes;