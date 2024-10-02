"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("roles", {
            role_id: {
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            roleName: {
                type: Sequelize.STRING(255),
                allowNull: true
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
        await queryInterface.dropTable("roles");
    },
};
