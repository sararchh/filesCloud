"use strict";require('reflect-metadata');
const express = require("express");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const routes = require("./routes");
const loadEnv = require("./config/envs");

const swaggerUi = require("swagger-ui-express");
const apiSchema = require('./docs/apiSchema.js');

require('./database/index');

const isDevelopment = process.env.NODE_ENV == "development"
const dirStaticFiles = isDevelopment ? path.join(__dirname, '..', 'client', 'dist', 'index.html') : path.join(__dirname, '..', 'dist', 'client', 'dist', 'index.html');


class App {
    constructor() {
        loadEnv();
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(compression());
        this.server.use(cors());
        this.server.use(express.json({ limit: "500mb" }));
        this.server.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
        this.server.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema))
    }


    routes() {
        this.server.use(routes);
        this.server.get("/*", function (req, res, next) {
            res.sendFile(dirStaticFiles, (err) => {
                if (err) {
                    // TO DO - criar uma pagina de erro customizada no client
                    res.status(500).send(err);
                }
            });
        });
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: 'Erro interno do Servidor' });
        });
    }

}

module.exports = new App().server;