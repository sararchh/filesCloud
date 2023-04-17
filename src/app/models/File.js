import Sequelize, { Model } from 'sequelize';

class File extends Model {

    static init(sequelize) {
        super.init({
            id_folder: Sequelize.INTEGER,
            name: Sequelize.STRING,
            original_name: Sequelize.STRING,
            size: Sequelize.STRING,
            url: Sequelize.STRING,
            type: Sequelize.STRING,
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