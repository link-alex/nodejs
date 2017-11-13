import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://nodejsuser:nodejspassword@postgres:5432/nodejsdb');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to postgres has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
