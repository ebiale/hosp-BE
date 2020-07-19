const {response} = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
    const hospitals = await Hospital.find()
        .populate('user', 'name img');
    res.json({
        ok: true,
        hospitals
    })
};

const addHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({user: uid, ...req.body});

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }


};

const updateHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update hospitals'
    });
    try {

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
};

const deleteHospital = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Delete hospitals'
    });
    try {

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
};

module.exports = {
    getHospitals,
    addHospital,
    updateHospital,
    deleteHospital
};
