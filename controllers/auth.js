const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {googleVerify} = require('../helpers/google-verify');
const {generateJWT} = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // verify email
        const userDB = await User.findOne({email});

        if (!userDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Incorrect user or password'
            })
        }

        // verify psw
        const validPsw = bcrypt.compareSync(password, userDB.password);

        if (!validPsw) {
            return res.status(404).json({
                ok: true,
                msg: 'Incorrect user or password'
            })
        }

        //Generate token
        const token = await generateJWT(userDB.id);

        res.status(200).json({
            ok: true,
            token
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        });
    }

};

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify(googleToken);

        // verify user
        const userDB = await User.findOne({email});
        let user;

        if (!userDB) {
            // new user
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            // existent user
            user = userDB;
            user.google = true;
        }

        await user.save();

        //Generate token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

};

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    //Generate token
    const token = await generateJWT(uid);
    res.json({
        ok: true,
        token
    });
};

module.exports = {login, googleSignIn, renewToken};
