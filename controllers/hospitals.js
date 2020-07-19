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

const updateHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {

        const hospDB = await Hospital.findById(id);
        if (!hospDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const changes = {...req.body, user: uid};
        const updatedRecord = await Hospital.findByIdAndUpdate(id, changes, {new: true});

        res.json({
            ok: true,
            hospital: updatedRecord
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
};

const deleteHospital = async (req, res) => {
    const id = req.params.id;
    try {

        const hospDB = await Hospital.findById(id);
        if (!hospDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        });
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
