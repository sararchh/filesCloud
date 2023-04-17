import Sequelize, { Model } from 'sequelize';

class Folder extends Model {

    static init(sequelize) {
        super.init({
            id_user: Sequelize.INTEGER,
            title: Sequelize.STRING,
            date: Sequelize.DATE,
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