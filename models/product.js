function fillMockData(Product) {
    const mockData = [
        new Product({
            name: 'Shoe',
            brand: 'Belshina',
            price: 9999,
            reviews: ['kak shina']
        }),
        new Product({
            name: 'Book',
            brand: 'IT',
            price: 99,
            reviews: []
        }),
        new Product({
            name: 'Drink',
            brand: 'Juice',
            price: 0.99,
            reviews: ['norm', 'norm?']
        })
    ];

    mockData.forEach((product) => {
        product.save((err, product) => {
            if (err) return console.error(err);
            console.log(`mocked ${product.name} added`);
        });
    });
}

module.exports = (mongoose, autoIncrement) => {

    const productSchema = mongoose.Schema({
        name: { type: String, required: true },
        brand: String,
        price: { type: Number, min: 0, required: true },
        reviews: [String]
    });
    productSchema.plugin(autoIncrement.plugin, 'Product');

    productSchema.pre('findOneAndUpdate', function (next) {
        this.update({ lastModifiedDate: Date.now() });
        next();
    });

    productSchema.pre('save', function (next) {
        this.lastModifiedDate = Date.now();
        next();
    });

    const Product = mongoose.model('Product', productSchema);

    // drop collection and fill with mock
    Product.remove({}, (err) => {
        fillMockData(Product);
    });

    return Product;
};
