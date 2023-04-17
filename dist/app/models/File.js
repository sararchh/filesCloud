"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class File extends _sequelize.Model {

    static init(sequelize) {
        super.init({
            id_folder: _sequelize2.default.INTEGER,
            name: _sequelize2.default.STRING,
            original_name: _sequelize2.default.STRING,
            size: _sequelize2.default.STRING,
            url: _sequelize2.default.STRING,
            type: _sequelize2.default.STRING,
        },
            {
                sequelize,
                tableName: 'cad_files'
            }
        );


        return this;

    }

    static associate(models) {
        this.belongsTo(models.Folder, { foreignKey: 'id_folder', as: 'folder' });
    }


}

module.exports = File;