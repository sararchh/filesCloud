'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cad_users', [
      {
        name: 'master',
        email: 'master@email.com',
        phone: '27999999999',
        password_hash: '$2a$08$EbqVM1Hl5Zl2xkn6QGwH6usk2QTN62zRlsYUeHyfHsu2dDbe9nPmq',
        email_verified: true,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },


  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cad_users', null, {});
  }
};
