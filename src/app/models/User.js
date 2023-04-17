import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {

    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            phone: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            status: Sequelize.ENUM(['0', '1', '2']),
            email_verified: Sequelize.BOOLEAN,
        },
            {
                sequelize,
                tableName: 'cad_users'
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        this.addHook('beforeUpdate', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;

    }


    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }





}

module.exports = User;