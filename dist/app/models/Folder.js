"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Folder extends _sequelize.Model {

    static init(sequelize) {
        super.init({
            id_user: _sequelize2.default.INTEGER,
            title: _sequelize2.default.STRING,
            date: _sequelize2.default.DATE,
        },
            {
                sequelize,
                tableName: 'cad_folders'
            }
        );


        return this;

    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
        this.hasMany(models.File, { foreignKey: 'id_folder', as: 'files' });
    }


}

module.exports = Folder;