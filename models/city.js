function fillMockData(City) {
    const mockData = [
        new City({
            name: 'Brest',
            country: 'Belarus',
            capital: false,
            location: {
                lat: 52.097621,
                long: 23.734050
            }
        }),
        new City({
            name: 'Minsk',
            country: 'Belarus',
            capital: true,
            location: {
                lat: 52.33333,
                long: 23.44444
            }
        }),
        new City({
            name: 'Grodno',
            country: 'Belarus',
            capital: false,
            location: {
                lat: 52.66666,
                long: 23.77777
            }
        }),
    ];

    mockData.forEach((city) => {
        city.save((err, city) => {
            if (err) return console.error(err);
            console.log(`mocked ${city.name} added`);
        });
    });
}

module.exports = (mongoose, autoIncrement) => {

    const citySchema = mongoose.Schema({
        name: { type: String, unique: true },
        country: String,
        lastModifiedDate: { type: Date, default: Date.now },
        capital: { type: Boolean, default: false },
        location: {
            lat: { type: Number, min: -90, max: 90 },
            long: { type: Number, min: -180, max: 180 }
        }
    });
    citySchema.plugin(autoIncrement.plugin, 'City');

    citySchema.pre('findOneAndUpdate', function (next) {
        this.update({ lastModifiedDate: Date.now() });
        next();
    });

    citySchema.pre('save', function (next) {
        this.lastModifiedDate = Date.now();
        next();
    });

    const City = mongoose.model('City', citySchema);

    // drop collection and fill with mock
    City.remove({}, (err) => {
        fillMockData(City);
    });

    return City;
};
