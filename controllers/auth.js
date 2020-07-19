const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
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

}

module.exports = { login };
