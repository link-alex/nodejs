module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Products', [{
            name: 'Supreme T-Shirt',
            brand: 'Supreme',
            price: 99.99,
            reviews: [
                'That is good product',
                'whhhhhaaaaat?'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Some Shoes',
            brand: 'Abibas',
            price: 93.10,
            reviews: [
                'Abibas ne ochen'
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Products', null, {});
    }
};
