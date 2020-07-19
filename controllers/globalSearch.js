const {response} = require('express');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const globalSearch = async (req, res = response) => {
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    const [doctors, hospitals, users] = await Promise.all([
        Doctor.find({name: regex})
            .populate('user','name')
            .populate('hospital', 'name'),
        Hospital.find({name: regex})
            .populate('user','name'),
        User.find({name: regex}),
    ]);

    res.json({
        ok: true,
        doctors,
        hospitals,
        users
    })
};

const seachByCollection = async(req, res = response) => {
    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    let data = [];

    switch (collection) {
        case 'users':
            data = await User.find({name: regex});
            break;
        case 'hospitals':
            data = await Hospital.find({name: regex})
                .populate('user','name');
            break;
        case 'doctors':
            data = await Doctor.find({name: regex})
                .populate('user','name')
                .populate('hospital', 'name');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'invalid collection'
            })
    }

    res.status(200).json({
        ok: true,
        data
    })
};

module.exports = {
    globalSearch,
    seachByCollection
};
