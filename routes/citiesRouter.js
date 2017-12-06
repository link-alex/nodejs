const express = require('express');
import { Cities } from '../models';

const citiesRouter = express.Router();


citiesRouter.get('/cities/random', function (req, res) {

    Cities.count().exec((err, count) => {
        const random = Math.floor(Math.random() * count);

        Cities.findOne().skip(random).exec((err, result) => {
            res.send(JSON.stringify(result));
        });
    });
});

citiesRouter.get('/cities', function (req, res) {
    Cities.find({}).then(cities => {
        res.send(cities);
    });
});


citiesRouter.put('/cities/:id', function (req, res) {
    const id = req.params.id;
    const newCity = req.body;

    Cities.findByIdAndUpdate(id, newCity, { new: true }, (err, city) => {
        if (err) {
            res.sendStatus(400);
        } else {
            res.send(city);
        }
    });
});

citiesRouter.post('/cities', function (req, res) {
    const newCity = req.body;

    if (newCity && newCity.name && newCity.country) {
        const city = new Cities({
            name: newCity.name,
            country: newCity.country,
            capital: newCity.capital,
            location: {
                lat: newCity.lat,
                long: newCity.long
            }
        });

        city.save((err, city) => {
            if (err) return res.sendStatus(400);
            res.send(city);
        });
    } else {
        res.sendStatus(400);
    }
});

citiesRouter.delete('/cities/:id', function (req, res) {
    const id = req.params.id;

    Cities.findByIdAndRemove(id, {}, (err) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'Executed' });
        }
    });
});

module.exports = citiesRouter;
