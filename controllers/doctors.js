const {response} = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors = await Doctor.find()
        .populate('user', 'name img')
        .populate('hospital', 'name img');
    res.json({
        ok: true,
        doctors
    })
};

const addDoctor = async (req, res = response) => {
    const uid = req.uid;
    const doctor = new Doctor({user: uid, ...req.body});

    try {
        const doctorDB = await doctor.save();
        res.json({
            ok: true,
            doctor: doctorDB
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }

};

const updateDoctor = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Update Doctors'
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

const deleteDoctor = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Delete Doctors'
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
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
};
