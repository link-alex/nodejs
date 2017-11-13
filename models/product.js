module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        price: DataTypes.FLOAT,
        reviews: DataTypes.ARRAY(DataTypes.STRING)
    }, {
        classMethods: {
            associate: (models) => {
                // associations can be defined here
            }
        }
    });
    return Product;
};
