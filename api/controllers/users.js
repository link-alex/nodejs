'use strict';

import { Users } from '../../models';

function getAllUsers(req, res) {
    Users.find({}).then(users => {
        res.send(users);
    });
}

function deleteUserById(req, res) {
    const id = req.swagger.params.id.value;

    Users.findByIdAndRemove(id, {}, (err) => {
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
    getAllUsers,
    deleteUserById,
};
