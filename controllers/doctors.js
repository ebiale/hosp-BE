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
    const id = req.params.id;
    const uid = req.uid;
    try {

        const drDB = await Doctor.findById(id);
        if (!drDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        const changes = {...req.body, user: uid};
        const updatedRecord = await Doctor.findByIdAndUpdate(id, changes, {new: true});

        res.json({
            ok: true,
            doctor: updatedRecord
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }
};

const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {

        const drDB = await Doctor.findById(id);
        if (!drDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Doctor deleted'
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
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
};
