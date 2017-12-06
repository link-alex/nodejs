function fillMockData(User) {
    const mockData = [
        new User({
            firstName: 'Ivan',
            lastName: 'Ivanov',
            login: 'vanya',
            password: 'susanin',
            email: 'iv@gm.ru'
        }),
        new User({
            firstName: 'Petya',
            lastName: 'Petrov',
            login: 'pppp',
            password: 'ovovov',
            email: 'pp@gm.ru'
        }),
        new User({
            firstName: 'Kto',
            lastName: 'Nikto',
            login: 'gde',
            password: 'nigde',
            email: 'pochemu@gm.ru'
        }),
    ];

    mockData.forEach((user) => {
        user.save((err, user) => {
            if (err) return console.error(err);
            console.log(`mocked ${user.login} added`);
        });
    });
}

module.exports = (mongoose, autoIncrement) => {

    const userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        login: { type: String, unique: true },
        password: { type: String, required: true },
        email: String
    });
    userSchema.plugin(autoIncrement.plugin, 'User');

    userSchema.pre('findOneAndUpdate', function (next) {
        this.update({ lastModifiedDate: Date.now() });
        next();
    });

    userSchema.pre('save', function (next) {
        this.lastModifiedDate = Date.now();
        next();
    });

    const User = mongoose.model('User', userSchema);

    // drop collection and fill with mock
    User.remove({}, (err) => {
        fillMockData(User);
    });

    return User;
};
