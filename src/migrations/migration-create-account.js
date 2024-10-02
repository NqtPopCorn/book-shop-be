"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("accounts", {
            id: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            phone_number: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'role',
                    key: 'role_id'
                }
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            last_login: {
                type: Sequelize.DATE,
                allowNull: true
            },
            otp: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            otp_expire: {
              type: Sequelize.DATE,
              default: new Date()
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("accounts");
    },
};
