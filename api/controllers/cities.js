'use strict';

import { Cities } from '../../models';

function getRandomCity(req, res) {
    Cities.count().exec((err, count) => {
        const random = Math.floor(Math.random() * count);

        Cities.findOne().skip(random).exec((err, result) => {
            res.send(result);
        });
    });
}

function getAllCities(req, res) {
    Cities.find({}).then(cities => {
        res.send(cities);
    });
}

function addCity(req, res) {
    const newCity = req.swagger.params.body.value;

    const city = new Cities({
        name: newCity.name,
        country: newCity.country,
        capital: newCity.capital,
        location: {
            lat: newCity.location && newCity.location.lat,
            long: newCity.location && newCity.location.long
        }
    });

    city.save((err, city) => {
        if (err) return res.sendStatus(500);
        res.send(city);
    });
}

function updateCityById(req, res) {
    const id = req.swagger.params.id.value;
    const newCity = req.swagger.params.body.value;

    Cities.findByIdAndUpdate(id, newCity, { new: true }, (err, city) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(400);
        } else {
            res.send(city);
        }
    });
}

function deleteCityById(req, res) {
    const id = req.swagger.params.id.value;

    Cities.findByIdAndRemove(id, {}, (err) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'Executed' });
        }
    });
}

module.exports = {
    getRandomCity,
    getAllCities,
    addCity,
    updateCityById,
    deleteCityById
};
