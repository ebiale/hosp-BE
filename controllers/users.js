const {response} = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');

const getUsers = async (req, res) => {
    const users = await User.find();
    res.json({
        ok: true,
        users
    })
};

const addUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        const existentEmail = await User.findOne({email});
        if (existentEmail) {
            return res.status(500).json({
                ok: false,
                msg: 'Email already registered'
            })
        }
        const user = new User(req.body);

        // encrypt psw
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // save user
        await user.save();

        //Generate token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }


};

const updateUser = async (req, res = response) => {
    const uid = req.params.id;
    try {

        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not found'
            })
        }

        // update
        const {password, google, email, ...fields} = req.body;

        if (userDB.email !== email) {
            const existentMail = await User.findOne({email});
            if (existentMail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already registered'
                })
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});


        res.json({
            ok: true,
            user: updatedUser
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });

    }

    const users = await User.find();
    res.json({
        ok: true,
        users
    })
};

const deleteUser = async (req, res) => {
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not found'
            })
        }

        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'user deleted'
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
