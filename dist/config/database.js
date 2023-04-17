"use strict";const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    dialect: "mysql",
    host: `${process.env.DB_HOST}`,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    port: `${process.env.DB_PORT}`,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    pool: {//pool configuration
        max: 5,//maximum number of connection in pool
        min: 0,//minimum number of connection in pool
        acquire: 30000,//maximum time in ms that pool will try to get connection before throwing error
        idle: 10000//maximum time in ms, that a connection can be idle before being released
    }
};