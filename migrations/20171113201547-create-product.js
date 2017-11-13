module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            brand: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.FLOAT
            },
            reviews: {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.NOW,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    }
};
