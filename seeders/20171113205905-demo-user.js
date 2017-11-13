module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            login: 'admin',
            password: 'admin',
            firstName: 'Ivan',
            lastName: 'Ivanov',
            email: 'ii@ii.ru',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            login: 'useri',
            password: 'ipassword',
            firstName: 'Petr',
            lastName: 'Petrov',
            email: 'pp@pp.ru',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
