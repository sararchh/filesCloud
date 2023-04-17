const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');
const User = require('../app/models/User');
const Folder = require('../app/models/Folder');
const File = require('../app/models/File');

const models = [
    User,
    Folder,
    File
];

class Database {

    constructor() {
        this.init();

    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));


    }

}

export default new Database();
